import React, { useState, useRef, useEffect } from 'react';
import { sendChatMessage } from '../services/api';

// --- Icons ---
const MessageIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
);
const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);
const SendIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
);

// --- Types ---
interface RecommendationData {
  itemName: string;
  price: number;
  imageUrl: string;
}

interface Message {
  sender: 'user' | 'bot';
  type?: 'text' | 'recommendation';
  text: string;
  data?: RecommendationData;
}

// --- Component: Product Card ---
const ProductCard = ({ data }: { data: RecommendationData }) => (
  <div className="mt-3 mb-2 bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 w-full max-w-[240px]">
    <div className="h-32 overflow-hidden bg-gray-100 relative">
      <img 
        src={data.imageUrl} 
        alt={data.itemName} 
        className="w-full h-full object-cover"
        onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/200x150?text=No+Image')}
      />
      <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-md px-2 py-1 rounded-md shadow-sm">
         <span className="text-[#D4AF37] font-bold text-xs">₹{data.price}</span>
      </div>
    </div>
    <div className="p-3">
      <h4 className="font-bold text-[#3E2723] text-sm truncate" title={data.itemName}>{data.itemName}</h4>
    </div>
  </div>
);

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'bot', type: 'text', text: 'Hello! I am your G-Shock Barista. What can I get for you?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userText = input;
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setInput('');
    setIsLoading(true);

    try {
      const token = localStorage.getItem('token');
      
      // 1. Prepare History (Last 5 messages)
      const historyPayload = messages.slice(-5).map(m => ({
        role: m.sender === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }]
      }));

      // 2. Call API (Sending text + history)
      const response = await sendChatMessage(userText, token, historyPayload);

      // 3. Handle Structure Response
      // Backend returns { type, text, data }
      setMessages(prev => [...prev, { 
        sender: 'bot', 
        type: response.type, 
        text: response.text, 
        data: response.data 
      }]);

    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { sender: 'bot', text: 'Sorry, I am having trouble connecting.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-sans">
      {isOpen && (
        <div className="bg-[#FAF9F6] w-80 md:w-96 h-[550px] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-[#3E2723]/20 animate-fade-in-up">
          {/* Header */}
          <div className="bg-[#3E2723] p-4 flex justify-between items-center shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#D4AF37] flex items-center justify-center text-[#3E2723]">
                <MessageIcon />
              </div>
              <div>
                <h3 className="font-bold text-white text-md">G-Shock Barista</h3>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <p className="text-[10px] text-white/80">Online</p>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors">
              <CloseIcon />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.sender === 'bot' && (
                  <div className="w-6 h-6 rounded-full bg-[#3E2723] text-[#D4AF37] flex items-center justify-center text-xs mr-2 mt-1 flex-shrink-0">G</div>
                )}
                <div className={`max-w-[85%] flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  
                  {/* Text Bubble */}
                  <div className={`p-3 rounded-2xl text-sm shadow-sm ${
                    msg.sender === 'user' 
                      ? 'bg-[#3E2723] text-white rounded-tr-none' 
                      : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>

                  {/* Recommendation Card */}
                  {msg.type === 'recommendation' && msg.data && (
                    <ProductCard data={msg.data} />
                  )}

                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-gray-100">
            <div className="flex gap-2 items-center bg-gray-50 rounded-full px-2 py-1 border border-gray-200 focus-within:border-[#3E2723] focus-within:ring-1 focus-within:ring-[#3E2723]/20 transition-all">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about coffee..."
                className="flex-1 bg-transparent px-3 py-2 text-sm focus:outline-none text-gray-700 placeholder-gray-400"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="bg-[#3E2723] text-white p-2 rounded-full hover:bg-[#5D4037] disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-md transform active:scale-95"
              >
                <SendIcon />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center justify-center bg-[#3E2723] text-[#D4AF37] w-14 h-14 rounded-full shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300"
        >
          <MessageIcon />
        </button>
      )}
    </div>
  );
};

export default Chatbot;