
import Navbar from "../components/Navbar";
import { matches } from "../data/matches";
import { CalendarDays, Clock } from "lucide-react";

export default function Fixtures() {
  const upcoming = matches.filter((match) => match.status === "UPCOMING");
  const completed = matches.filter((match) => match.status === "COMPLETED");

  return (
    <div className="min-h-screen bg-[#0b1912] text-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-5 py-10">
        <p className="text-yellow-400 text-sm font-semibold">MATCH SCHEDULE</p>
        <h1 className="text-4xl font-bold mt-2 mb-8">
          <CalendarDays className="inline mr-2 text-yellow-400" />
          Fixtures & Results
        </h1>

        <h2 className="text-2xl font-bold mb-4">Upcoming Fixtures</h2>

        {upcoming.length ? (
          <div className="grid md:grid-cols-2 gap-5">
            {upcoming.map((match) => (
              <div key={match.id} className="bg-[#142b22] border border-white/10 rounded-2xl p-5">
                <p className="text-yellow-400 text-sm mb-4">UPCOMING MATCH</p>
                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                  <p className="font-bold">{match.team1}</p>
                  <span className="text-gray-500">VS</span>
                  <p className="font-bold text-right">{match.team2}</p>
                </div>
                <div className="border-t border-white/10 mt-5 pt-4 flex flex-wrap gap-4 text-sm text-gray-400">
                  <span><CalendarDays className="inline mr-1" size={15} />{match.date}</span>
                  <span><Clock className="inline mr-1" size={15} />{match.time}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 mb-8">No upcoming fixtures available.</p>
        )}

        <h2 className="text-2xl font-bold mt-10 mb-4">Completed Matches</h2>

        <div className="grid md:grid-cols-2 gap-5">
          {completed.map((match) => (
            <div key={match.id} className="bg-[#142b22] border border-white/10 rounded-2xl p-5">
              <p className="text-green-400 text-sm mb-4">COMPLETED</p>
              <div className="flex justify-between gap-4 font-bold">
                <span>{match.team1}</span>
                <span>{match.score1}</span>
              </div>
              <div className="flex justify-between gap-4 mt-3">
                <span>{match.team2}</span>
                <span className="text-yellow-400 font-bold">{match.score2}</span>
              </div>
              <p className="text-green-400 text-sm mt-4">{match.result}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
