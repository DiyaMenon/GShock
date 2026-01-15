const { GoogleGenerativeAI } = require('@google/generative-ai');
const Interaction = require('../models/interaction.model');
const { getSystemContext } = require('../utils/chatbotContext');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// --- Define Tools ---
const tools = [
  {
    functionDeclarations: [
      {
        name: "recommend_item",
        description: "Display a visual card for a specific coffee, workshop, or artwork.",
        parameters: {
          type: "OBJECT",
          properties: {
            itemName: { type: "STRING", description: "The exact name of the item from the inventory" },
            price: { type: "NUMBER", description: "The price of the item" },
            imageUrl: { type: "STRING", description: "The image URL of the item" },
            reason: { type: "STRING", description: "A 1-sentence reason why you are showing this card." }
          },
          required: ["itemName", "price", "imageUrl", "reason"]
        }
      }
    ]
  }
];

async function chatWithAI(req, res) {
  try {
    let { message, history } = req.body; 
    const userId = req.user ? req.user._id : null;

    // Sanitize History
    if (Array.isArray(history) && history.length > 0) {
      while (history.length > 0 && history[0].role === 'model') {
        history.shift(); 
      }
    }

    const liveContext = await getSystemContext();

    // --- 🧠 THE BRAIN UPGRADE ---
    // We give it a specific persona and strict instructions on how to behave.
    const model = genAI.getGenerativeModel({ 
      model: "gemini-flash-latest", 
      tools: tools,
      systemInstruction: `
      ROLE: You are 'G-Shock', the expert Barista and Curator at Rabuste Coffee.
      
      TONE: Warm, knowledgeable, sophisticated, but brief. Like a cool coffee expert.
      
      DATA SOURCE:
      ${liveContext}

      INSTRUCTIONS:
      1. **Check the Date:** Always look at 'TODAY'S DATE' in the data before answering "When is the next workshop?".
      2. **Be Specific:** If asked about "rate" or "price", give the exact price in ₹.
      3. **Use the Tool:** If you mention a specific product, workshop, or painting that is IN STOCK, you MUST use the 'recommend_item' tool to show it.
      4. **No Hallucinations:** Do not make up items. Only sell what is on the list.
      5. **Short Answers:** Keep text responses under 2 sentences unless explaining a complex flavor.
      
      EXAMPLE INTERACTION:
      User: "What's the nearest workshop?"
      You: (Checks date) "The 'Latte Art Basics' is coming up on Jan 12th. It's a great start for beginners." (Calls Tool)
      `
    });

    const chat = model.startChat({
      history: history || [],
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const functionCalls = response.functionCalls ? response.functionCalls() : [];

    let finalResponse;

    if (functionCalls && functionCalls.length > 0) {
      const call = functionCalls[0];
      const args = call.args;
      
      finalResponse = {
        type: 'recommendation',
        text: args.reason, // This ensures the text bubble matches the card
        data: {
          itemName: args.itemName,
          price: args.price,
          imageUrl: args.imageUrl
        }
      };
    } else {
      finalResponse = {
        type: 'text',
        text: response.text(),
        data: null
      };
    }

    // Log Interaction
    Interaction.create({
      user: userId,
      query: message,
      intent: finalResponse.type,
      response: finalResponse.text
    }).catch(err => console.log('Log Error:', err.message));

    res.status(200).json(finalResponse);

  } catch (error) {
    console.error('❌ Chat Error:', error.message);
    if (error.message.includes('429')) {
      return res.status(429).json({ type: 'text', text: "Whoa, huge line at the counter! Give me 30 seconds." });
    }
    res.status(500).json({ type: 'text', text: "My espresso machine needs a reboot. Try again in a sec." });
  }
}

module.exports = { chatWithAI };