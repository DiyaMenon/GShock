import React from "react";

const OurStory: React.FC = () => {
  return (
    <section className="bg-cream text-onyx w-full">
      {/* HERO */}
      <section className="min-h-[70vh] flex items-center justify-center px-6 text-center">
        <div className="max-w-3xl">
          <h1 className="font-oswald uppercase text-4xl md:text-6xl tracking-wide mb-6">
            Our Story
          </h1>
          <p className="text-lg md:text-xl text-onyx/80">
            born from strength. built on culture.
          </p>
        </div>
      </section>

      {/* STORY CONTENT */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* INTRO */}
          <div className="space-y-6">
            <p className="text-xl leading-relaxed">
              rabuste began with a simple but stubborn belief —{" "}
              <span className="font-semibold">robusta deserves respect</span>.
            </p>
            <p className="leading-relaxed text-onyx/80">
              for years, coffee culture told us that arabica was refined and
              robusta was inferior. the founder of rabuste never believed that.
              raised around strong flavours and deeply rooted indian food
              traditions, he saw robusta for what it truly is — bold, resilient,
              and honest.
            </p>
          </div>

          {/* WHY ROBUSTA */}
          <div className="space-y-6">
            <h2 className="font-oswald uppercase text-3xl tracking-wide">
              why robusta. and only robusta.
            </h2>
            <p className="leading-relaxed text-onyx/80">
              india is the world’s no. 1 producer of high-quality robusta coffee —
              yet most cafés ignore it. we don’t.
            </p>
            <p className="leading-relaxed text-onyx/80">
              every cup at rabuste is brewed exclusively using{" "}
              <span className="font-semibold">
                premium indian robusta coffee seeds
              </span>
              , responsibly sourced and roasted to highlight what robusta does
              best.
            </p>

            <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm uppercase tracking-widest">
              <li>deep body</li>
              <li>higher caffeine</li>
              <li>earthy intensity</li>
              <li>long finish</li>
            </ul>

            <p className="leading-relaxed text-onyx/80">
              no blends. no dilution. no compromise. this is coffee meant to be
              felt, not softened.
            </p>
          </div>

          {/* ART */}
          <div className="space-y-6">
            <h2 className="font-oswald uppercase text-3xl tracking-wide">
              coffee meets art
            </h2>
            <p className="leading-relaxed text-onyx/80">
              the founder comes from an art-driven background, and rabuste was
              always imagined as more than a café. the space itself functions as
              a living gallery.
            </p>
            <p className="leading-relaxed text-onyx/80">
              we actively support local and emerging artists by displaying and
              selling their work directly in the café. the walls don’t just hold
              art — they hold stories.
            </p>

            <div className="border border-onyx/20 rounded-xl p-6 text-center text-sm uppercase tracking-widest text-onyx/50">
              artist artworks / reels placeholder
            </div>
          </div>

          {/* COMMUNITY */}
          <div className="space-y-6">
            <h2 className="font-oswald uppercase text-3xl tracking-wide">
              a space to gather & create
            </h2>
            <p className="leading-relaxed text-onyx/80">
              rabuste is also a space for people to come together. we open our
              doors for workshops, creative meetups, coffee tastings, and
              intimate conversations.
            </p>
            <p className="leading-relaxed text-onyx/80">
              whether you’re an artist, a student, or simply curious — this is a
              space built for conversation, creation, and community.
            </p>

            <div className="border border-onyx/20 rounded-xl p-6 text-center text-sm uppercase tracking-widest text-onyx/50">
              workshops / events photos placeholder
            </div>
          </div>

          {/* VALUES */}
          <div className="space-y-6">
            <h2 className="font-oswald uppercase text-3xl tracking-wide">
              what we stand for
            </h2>
            <ul className="space-y-3 uppercase tracking-widest text-sm">
              <li>robusta only — proudly indian</li>
              <li>local first — coffee, art, people</li>
              <li>culture over trends</li>
              <li>space for voices & ideas</li>
            </ul>
            <p className="leading-relaxed text-onyx/80">
              rabuste isn’t trying to be everywhere. it’s trying to mean
              something where it exists.
            </p>
          </div>

          {/* CTA */}
          <div className="flex flex-col md:flex-row gap-4 pt-10">
            <button className="px-6 py-3 border border-onyx uppercase tracking-widest text-sm hover:bg-onyx hover:text-cream transition">
              learn about robusta
            </button>
            <button className="px-6 py-3 border border-onyx uppercase tracking-widest text-sm hover:bg-onyx hover:text-cream transition">
              collaborate with us
            </button>
          </div>
        </div>
      </section>
    </section>
  );
};

export default OurStory;
