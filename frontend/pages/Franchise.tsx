import React from "react";

const Franchise = () => {
  return (
    <section className="w-full px-6 md:px-12 py-36 bg-cream-dark/40">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-32 items-start">

        {/* LEFT CONTENT */}
        <div className="relative flex flex-col justify-center pl-0 md:pl-8 animate-fade-up">

          {/* vertical accent */}
          <span className="absolute left-0 top-1 h-28 w-[2px] bg-coffee-primary/40 hidden md:block" />

          <p className="text-[11px] tracking-[0.45em] uppercase text-coffee-dark/60 mb-10">
            Franchise
          </p>

          <h1 className="text-4xl md:text-5xl font-light leading-[1.12] mb-4 text-coffee-dark font-['Playfair_Display']">
            Become a Part of <br />
            the Rabuste Story
          </h1>

          {/* animated underline */}
          <div className="h-[2px] bg-coffee-primary/50 mb-10 animate-underline-draw" />

          {/* description + points */}
          <div className="animate-fade-up-delayed">
            <p className="text-sm text-coffee-dark/70 max-w-md leading-relaxed mb-14">
              Rabuste cafés are cultural spaces — where bold Robusta,
              thoughtful design, and local art coexist. We partner with
              people who believe in slow, intentional growth.
            </p>

            <div className="space-y-4 text-sm text-coffee-dark/70 tracking-wide">
              <div>— Coffee-first, design-led brand</div>
              <div>— Art-forward, community-driven cafés</div>
              <div>— End-to-end operational & brand support</div>
            </div>
          </div>

        </div>

        {/* RIGHT FORM */}
        <div
          className="relative bg-cream p-12 md:p-16 border border-coffee-dark/10
                     shadow-[0_30px_80px_-40px_rgba(0,0,0,0.18)]
                     animate-fade-up-delayed"
        >
          <h2 className="text-[11px] tracking-[0.4em] uppercase mb-16 text-coffee-dark">
            Franchise Application
          </h2>

          <form className="space-y-12">

            {[
              "Full Name",
              "Email Address",
              "Phone Number",
              "Preferred City",
            ].map((label) => (
              <div key={label} className="group">
                <label className="block text-[10px] tracking-widest uppercase mb-3 text-coffee-dark/60">
                  {label}
                </label>
                <input
                  type="text"
                  className="w-full bg-transparent border-b border-coffee-dark/25 py-2 text-sm
                             focus:outline-none focus:border-coffee-primary
                             transition-colors duration-300"
                />
              </div>
            ))}

            {/* Investment */}
            <div className="group">
              <label className="block text-[10px] tracking-widest uppercase mb-3 text-coffee-dark/60">
                Investment Capacity
              </label>
              <select
                className="w-full bg-cream border-b border-coffee-dark/25 py-2 text-sm
                           focus:outline-none focus:border-coffee-primary
                           transition-colors duration-300"
              >
                <option value="">Select range</option>
                <option>₹20–30 Lakhs</option>
                <option>₹30–50 Lakhs</option>
                <option>₹50+ Lakhs</option>
              </select>
            </div>

            {/* Message */}
            <div className="group">
              <label className="block text-[10px] tracking-widest uppercase mb-3 text-coffee-dark/60">
                Why Rabuste?
              </label>
              <textarea
                rows={3}
                className="w-full bg-transparent border-b border-coffee-dark/25 py-2 text-sm
                           focus:outline-none focus:border-coffee-primary
                           transition-colors duration-300 resize-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="mt-20 w-full py-4 border border-coffee-dark text-coffee-dark
                         uppercase tracking-[0.38em] text-[11px]
                         hover:bg-coffee-primary hover:text-white hover:border-coffee-primary
                         hover:-translate-y-[1px] active:translate-y-0
                         transition-all duration-300"
            >
              Submit Application
            </button>

          </form>
        </div>

      </div>
    </section>
  );
};

export default Franchise;
