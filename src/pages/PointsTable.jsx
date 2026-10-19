
import Navbar from "../components/Navbar";
import { teams } from "../data/teams";
import { Medal, Trophy } from "lucide-react";

export default function PointsTable() {
  const sortedTeams = [...teams].sort(
    (a, b) => b.points - a.points || b.won - a.won
  );

  return (
    <div className="min-h-screen bg-[#0b1912] text-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-5 py-10">
        <p className="text-yellow-400 text-sm font-semibold">TOURNAMENT STANDINGS</p>
        <h1 className="text-4xl font-bold mt-2 mb-8">
          <Trophy className="inline mr-2 text-yellow-400" />
          Points Table
        </h1>

        <div className="overflow-x-auto bg-[#142b22] border border-white/10 rounded-2xl">
          <table className="w-full text-left">
            <thead className="bg-white/5 text-gray-300 text-sm">
              <tr>
                <th className="p-4">Pos</th>
                <th className="p-4">Team</th>
                <th className="p-4">P</th>
                <th className="p-4">W</th>
                <th className="p-4">L</th>
                <th className="p-4">Pts</th>
              </tr>
            </thead>

            <tbody>
              {sortedTeams.map((team, index) => (
                <tr key={team.id} className="border-t border-white/10">
                  <td className="p-4 font-bold">
                    {index < 3 ? (
                      <Medal
                        className={`inline mr-1 ${
                          index === 0
                            ? "text-yellow-400"
                            : index === 1
                            ? "text-gray-300"
                            : "text-orange-400"
                        }`}
                        size={18}
                      />
                    ) : null}
                    {index + 1}
                  </td>
                  <td className="p-4 font-semibold">{team.name}</td>
                  <td className="p-4">{team.played}</td>
                  <td className="p-4 text-green-400">{team.won}</td>
                  <td className="p-4 text-red-400">{team.lost}</td>
                  <td className="p-4 text-yellow-400 font-bold">{team.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-gray-400 text-sm mt-4">
          Demo standings — points abhi manually set hain.
        </p>
      </main>
    </div>
  );
}
