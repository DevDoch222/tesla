import Link from "next/link";
import { TeslaLogo, TeslaWordmark } from "@/components/icons/TeslaLogo";
import { models } from "@/lib/data";

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-4 md:px-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <TeslaLogo className="size-9" />
            <TeslaWordmark className="text-sm" />
          </div>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/60">
            Iconic styling, modern personality, futuristic work of engines and
            personalized customization.
          </p>
        </div>
        <div>
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-white/40">Vehicles</p>
          <ul className="space-y-2 text-sm">
            {models.map((m) => (
              <li key={m.id}>
                <Link href="/#models" className="text-white/80 transition-colors hover:text-white">
                  {m.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-white/40">Explore</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="text-white/80 hover:text-white">Home</Link></li>
            <li><Link href="/cart" className="text-white/80 hover:text-white">Cart</Link></li>
            <li><Link href="/about" className="text-white/80 hover:text-white">About</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-6 text-xs text-white/40 md:flex-row md:justify-between md:px-8">
          <p>Portfolio concept — not affiliated with Tesla, Inc.</p>
          <p>Photos from Unsplash · Video from Pexels</p>
        </div>
      </div>
    </footer>
  );
}
