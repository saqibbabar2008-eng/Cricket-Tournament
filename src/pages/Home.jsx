
import { Trophy, Users, Radio, CalendarDays, ArrowRight } from "lucide-react";
import { teams } from "../data/teams";
import { matches } from "../data/matches";
import MatchCard from "../components/MatchCard";
import TeamCard from "../components/TeamCard";

export default function Home() {
  const liveMatches = matches.filter((match) => match.status === "LIVE");

  return (
    <div className="min-h-screen bg-[#0b1912] text-white">
      <section className="max-w-7xl mx-auto px-5 py-12">
        <div className="bg-gradient-to-r from-[#183d2b] to-[#14251c] border border-white/10 rounded-3xl p-8 md:p-12">
          <p className="text-yellow-400 font-semibold tracking-widest text-sm mb-4">
            RAMZAN NIGHT CRICKET CUP
          </p>

          <h1 className="text-4xl md:text-6xl font-black leading-tight">
            THE BATTLE
            <br />
            <span className="text-yellow-400">FOR GLORY.</span>
          </h1>

          <p className="text-gray-300 mt-5 max-w-lg">
            Follow live scores, match fixtures, team standings and tournament results.
            Everything about your cricket tournament in one place.
          </p>

          <div className="flex flex-wrap gap-3 mt-8">
            <a href="#live" className="bg-yellow-400 text-black font-bold px-6 py-3 rounded-xl hover:bg-yellow-300">
              <Radio size={18} className="inline mr-2" />
              Live Scores
            </a>

            <a href="#teams" className="border border-white/20 px-6 py-3 rounded-xl hover:bg-white/10">
              Explore Teams <ArrowRight size={18} className="inline ml-2" />
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-12">
            {[
              { label: "Total Teams", value: teams.length, icon: Users },
              { label: "Live Matches", value: liveMatches.length, icon: Radio },
              { label: "Total Matches", value: matches.length, icon: CalendarDays },
              { label: "Tournament", value: "2026", icon: Trophy },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.label} className="bg-black/20 rounded-2xl p-4">
                  <Icon className="text-yellow-400 mb-3" size={22} />
                  <p className="text-2xl font-bold">{item.value}</p>
                  <p className="text-gray-400 text-sm">{item.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="live" className="max-w-7xl mx-auto px-5 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-yellow-400 text-sm font-semibold">MATCH CENTER</p>
            <h2 className="text-3xl font-bold mt-1">Live & Upcoming</h2>
          </div>
          <Radio className="text-yellow-400" size={28} />
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {matches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      </section>

      <section id="teams" className="max-w-7xl mx-auto px-5 py-12">
        <p className="text-yellow-400 text-sm font-semibold">MEET THE CONTENDERS</p>
        <h2 className="text-3xl font-bold mt-1 mb-7">Tournament Teams</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {teams.map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
      </section>

      <footer className="border-t border-white/10 text-center text-gray-400 p-6">
        <Trophy className="inline text-yellow-400 mr-2" size={18} />
        Mohalla Premier League · Demo Tournament
      </footer>
    </div>
  );
}
