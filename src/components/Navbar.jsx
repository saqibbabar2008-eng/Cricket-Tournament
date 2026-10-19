
import { Trophy, Home, Radio, Users, CalendarDays, Medal } from "lucide-react";

const links = [
  { name: "Home", href: "/", icon: Home },
  { name: "Live Scores", href: "#live", icon: Radio },
  { name: "Teams", href: "#teams", icon: Users },
  { name: "Fixtures", href: "#fixtures", icon: CalendarDays },
  { name: "Points Table", href: "#points", icon: Medal },
];

export default function Navbar() {
  return (
    <nav className="bg-[#10271e] text-white border-b border-white/10">
      <div className="max-w-7xl mx-auto px-5 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <a href="/" className="flex items-center gap-3">
          <div className="bg-yellow-400 text-black p-2 rounded-xl">
            <Trophy size={25} />
          </div>
          <div>
            <h1 className="text-lg font-bold">
              MOHALLA <span className="text-yellow-400">PREMIER LEAGUE</span>
            </h1>
            <p className="text-xs text-gray-400 tracking-widest">
              RAMZAN NIGHT CRICKET CUP
            </p>
          </div>
        </a>

        <div className="flex flex-wrap justify-center gap-4 text-sm">
          {links.map((link) => {
            const Icon = link.icon;

            return (
              <a
                key={link.name}
                href={link.href}
                className="flex items-center gap-2 text-gray-300 hover:text-yellow-400 transition"
              >
                <Icon size={17} />
                {link.name}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
