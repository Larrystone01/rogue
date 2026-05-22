interface MetaItem {
  label: string;
  value: string;
}

const meta: MetaItem[] = [
  { label: "Founded", value: "Lagos, 2018" },
  { label: "Ateliers", value: "Lagos · London · Paris" },
  { label: "Runs", value: "Max 200 per design" },
];

export default function RogueAbout() {
  return (
    <div className="w-full min-h-screen px-12 py-16">
      <span className="block font-[var(--font-montserrat)] text-sm tracking-[0.35em] uppercase font-light text-[#c8a96e] mb-16">
        Rogue
      </span>

      <h1 className="font-[var(--font-cormorant)] text-[5rem] leading-none font-light mb-2">
        About
      </h1>

      <p className="font-[var(--font-cormorant)] italic text-2xl font-light text-[#c8a96e] mb-10">
        by design, not by accident.
      </p>

      <p className="font-[var(--font-cormorant)] text-lg font-light leading-relaxed opacity-75 max-w-lg mb-12">
        We make clothes that refuse to disappear. Born in Lagos in 2018, ROGUE
        was built on one belief — that a garment should carry its own gravity.{" "}
        <em className="text-[#c8a96e] not-italic">Felt before it is seen.</em>{" "}
        Every piece is cut by hand in limited runs. No fast fashion. No seasonal
        churn. Just craft, repeated with intent.
      </p>

      <hr className="border-t border-current/10 mb-8" />

      <div className="flex gap-12">
        {meta.map(({ label, value }) => (
          <div key={label}>
            <span className="block font-[var(--font-montserrat)] text-[0.55rem] tracking-[0.25em] uppercase opacity-40 mb-1">
              {label}
            </span>
            <span className="font-[var(--font-cormorant)] text-base font-light">
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
