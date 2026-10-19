
import { Trophy, Users } from "lucide-react";

export default function TeamCard({ team }) {
  return (
    <div className="bg-[#142b22] border border-white/10 rounded-2xl p-5 hover:border-yellow-400/50 transition">
      <div className="flex items-center justify-between mb-5">
        <div className="bg-yellow-400/10 p-3 rounded-xl text-2xl">
          🏏
        </div>

        <span className="text-xs text-gray-400">
          Team #{team.id}
        </span>
      </div>

      <h3 className="text-white text-lg font-bold mb-4">
        {team.name}
      </h3>

      <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-4">
        <div>
          <p className="text-gray-400 text-xs">Played</p>
          <p className="text-white font-bold">{team.played}</p>
        </div>

        <div>
          <p className="text-gray-400 text-xs">Won</p>
          <p className="text-green-400 font-bold">{team.won}</p>
        </div>

        <div>
          <p className="text-gray-400 text-xs">Points</p>
          <p className="text-yellow-400 font-bold">{team.points}</p>
        </div>
      </div>
    </div>
  );
}
