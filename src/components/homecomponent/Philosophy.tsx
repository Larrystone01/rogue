import { ourPhilosophyItems } from "@/lib/data";

export default function OurPhilosophy() {
  return (
    <section className="bg-gray-100">
      <div className="container mx-auto px-6 py-20">
        <h2 className="text-[clamp(2.5rem,4vw,4rem)] font-cormorant font-light mb-6">
          Our Philosophy
        </h2>
        <p className="text-[1.05rem] max-w-175 text-gray-700 leading-[1.9] mb-16">
          We believe in fewer, better things. Each piece is crafted with
          intention from the world's finest materials — designed to become a
          lasting part of your wardrobe.
        </p>
        <div className="grid-container flex flex-wrap gap-y-6 lg:grid grid-cols-3 space-x-12">
          {ourPhilosophyItems.map((item) => {
            return (
              <div key={item.id} className="border-t border-gray-300 pt-5">
                <h3 className="text-[1rem] font-medium tracking-[0.5px] mb-4">
                  {item.title}
                </h3>
                <p className="text-[0.75rem] text-gray-700 tracking-[1.8]">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
