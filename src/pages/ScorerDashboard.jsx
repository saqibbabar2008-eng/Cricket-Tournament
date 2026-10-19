
import { useState } from "react";
import Navbar from "../components/Navbar";
import { matches as initialMatches } from "../data/matches";
import { ClipboardList, Save } from "lucide-react";

export default function ScorerDashboard() {
  const [matches, setMatches] = useState(initialMatches);

  function updateMatch(id, field, value) {
    setMatches((prev) =>
      prev.map((match) =>
        match.id === id ? { ...match, [field]: value } : match
      )
    );
  }

  return (
    <div className="min-h-screen bg-[#0b1912] text-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-5 py-10">
        <p className="text-yellow-400 text-sm font-semibold">SCORER PANEL</p>

        <h1 className="text-4xl font-bold mt-2 mb-3">
          <ClipboardList className="inline mr-2 text-yellow-400" />
          Scorer Dashboard
        </h1>

        <p className="text-gray-400 mb-8">
          Match select karo aur score, overs aur status update karo.
        </p>

        <div className="grid md:grid-cols-2 gap-5">
          {matches.map((match) => (
            <section
              key={match.id}
              className="bg-[#142b22] border border-white/10 rounded-2xl p-5"
            >
              <h2 className="text-lg font-bold mb-5">
                {match.team1} vs {match.team2}
              </h2>

              <label className="block text-sm text-gray-400 mb-1">
                Team 1 Score
              </label>
              <input
                value={match.score1}
                onChange={(e) =>
                  updateMatch(match.id, "score1", e.target.value)
                }
                className="w-full bg-[#0b1912] border border-white/20 rounded-lg p-3 mb-4"
                placeholder="120/3"
              />

              <label className="block text-sm text-gray-400 mb-1">
                Team 2 Score
              </label>
              <input
                value={match.score2}
                onChange={(e) =>
                  updateMatch(match.id, "score2", e.target.value)
                }
                className="w-full bg-[#0b1912] border border-white/20 rounded-lg p-3 mb-4"
                placeholder="Yet to bat"
              />

              <label className="block text-sm text-gray-400 mb-1">
                Overs
              </label>
              <input
                value={match.overs}
                onChange={(e) =>
                  updateMatch(match.id, "overs", e.target.value)
                }
                className="w-full bg-[#0b1912] border border-white/20 rounded-lg p-3 mb-4"
                placeholder="8.2"
              />

              <label className="block text-sm text-gray-400 mb-1">
                Match Status
              </label>
              <select
                value={match.status}
                onChange={(e) =>
                  updateMatch(match.id, "status", e.target.value)
                }
                className="w-full bg-[#0b1912] border border-white/20 rounded-lg p-3 mb-4"
              >
                <option value="UPCOMING">UPCOMING</option>
                <option value="LIVE">LIVE</option>
                <option value="COMPLETED">COMPLETED</option>
              </select>

              <p className="text-yellow-400 text-sm">
                <Save className="inline mr-1" size={15} />
                Demo changes only — database connected nahi hai.
              </p>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
