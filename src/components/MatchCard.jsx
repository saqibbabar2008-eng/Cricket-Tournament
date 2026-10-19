
import { Radio, Clock, CalendarDays } from "lucide-react";

export default function MatchCard({ match }) {
  const isLive = match.status === "LIVE";
  const isCompleted = match.status === "COMPLETED";

  return (
    <div className="bg-[#142b22] border border-white/10 rounded-2xl p-5 hover:border-yellow-400/50 transition">
      <div className="flex items-center justify-between mb-6">
        <span className="text-xs text-gray-400 flex items-center gap-2">
          <CalendarDays size={14} />
          {match.date}
        </span>

        <span
          className={`text-xs font-bold px-3 py-1 rounded-full ${
            isLive
              ? "bg-red-500/20 text-red-400"
              : isCompleted
              ? "bg-green-500/20 text-green-400"
              : "bg-yellow-500/20 text-yellow-400"
          }`}
        >
          {isLive && <Radio size={12} className="inline mr-1" />}
          {match.status}
        </span>
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <div className="text-center">
          <div className="text-3xl mb-2">🏏</div>
          <h3 className="text-white font-bold text-sm">
            {match.team1}
          </h3>
          <p className="text-yellow-400 text-xl font-bold mt-2">
            {match.score1}
          </p>
        </div>

        <span className="text-gray-500 font-bold">VS</span>

        <div className="text-center">
          <div className="text-3xl mb-2">🏏</div>
          <h3 className="text-white font-bold text-sm">
            {match.team2}
          </h3>
          <p className="text-yellow-400 text-xl font-bold mt-2">
            {match.score2}
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 mt-5 pt-4 flex items-center justify-between text-xs text-gray-400">
        <span className="flex items-center gap-1">
          <Clock size={14} />
          {match.time}
        </span>

        <span>{isLive ? `${match.overs} overs` : isCompleted ? "Match finished" : "Upcoming match"}</span>
      </div>

      {isCompleted && match.result && (
        <p className="text-green-400 text-xs text-center mt-4">
          {match.result}
        </p>
      )}
    </div>
  );
}
