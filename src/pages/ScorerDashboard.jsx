import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { db } from "../firebase";
import {
  collection,
  onSnapshot,
  doc,
  setDoc,
} from "firebase/firestore";

export default function ScorerDashboard() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "matches"),
      (snapshot) => {
        setMatches(
          snapshot.docs.map((item) => ({
            ...item.data(),
            id: item.id,
          }))
        );
        setLoading(false);
      },
      (error) => {
        setMessage("Error: " + error.message);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  function handleChange(id, field, value) {
    setMatches((current) =>
      current.map((match) =>
        match.id === id ? { ...match, [field]: value } : match
      )
    );
  }

  async function saveScore(match) {
    setSavingId(match.id);
    setMessage("");

    try {
      const { id, ...data } = match;

      await setDoc(doc(db, "matches", id), data, {
        merge: true,
      });

      setMessage("Score successfully save ho gaya!");
    } catch (error) {
      setMessage("Score save nahi hua: " + error.message);
    } finally {
      setSavingId("");
    }
  }

  return (
    <div className="min-h-screen bg-[#0b1912] text-white">
      <Navbar />

      <main className="max-w-5xl mx-auto px-5 py-10">
        <h1 className="text-3xl font-bold mb-2">
          Scorer Dashboard
        </h1>

        <p className="text-gray-400 mb-8">
          Match ka score update karo aur Save Score dabao.
        </p>

        {message && (
          <p className="mb-5 rounded-lg bg-[#183326] p-4">
            {message}
          </p>
        )}

        {loading ? (
          <p>Matches load ho rahe hain...</p>
        ) : matches.length === 0 ? (
          <p>Firebase mein koi match nahi mila.</p>
        ) : (
          <div className="grid gap-6">
            {matches.map((match) => (
              <div
                key={match.id}
                className="rounded-2xl border border-gray-700 bg-[#142b22] p-5"
              >
                <h2 className="text-xl font-bold mb-1">
                  {match.team1 || "Team 1"} vs{" "}
                  {match.team2 || "Team 2"}
                </h2>

                <p className="text-gray-400 text-sm mb-5">
                  Status: {match.status || "UPCOMING"}
                </p>

                <div className="grid sm:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-sm">Team 1 Score</span>
                    <input
                      className="mt-1 w-full rounded-lg bg-[#0b1912] border border-gray-600 p-3 text-white"
                      value={match.score1 ?? ""}
                      onChange={(e) =>
                        handleChange(
                          match.id,
                          "score1",
                          e.target.value
                        )
                      }
                      placeholder="76/3"
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm">Team 2 Score</span>
                    <input
                      className="mt-1 w-full rounded-lg bg-[#0b1912] border border-gray-600 p-3 text-white"
                      value={match.score2 ?? ""}
                      onChange={(e) =>
                        handleChange(
                          match.id,
                          "score2",
                          e.target.value
                        )
                      }
                      placeholder="Yet to bat"
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm">Overs</span>
                    <input
                      className="mt-1 w-full rounded-lg bg-[#0b1912] border border-gray-600 p-3 text-white"
                      value={match.overs ?? ""}
                      onChange={(e) =>
                        handleChange(
                          match.id,
                          "overs",
                          e.target.value
                        )
                      }
                      placeholder="8.2"
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm">Match Status</span>
                    <select
                      className="mt-1 w-full rounded-lg bg-[#0b1912] border border-gray-600 p-3 text-white"
                      value={match.status || "UPCOMING"}
                      onChange={(e) =>
                        handleChange(
                          match.id,
                          "status",
                          e.target.value
                        )
                      }
                    >
                      <option value="UPCOMING">UPCOMING</option>
                      <option value="LIVE">LIVE</option>
                      <option value="COMPLETED">COMPLETED</option>
                    </select>
                  </label>

                  <label className="block sm:col-span-2">
                    <span className="text-sm">
                      Match Result (optional)
                    </span>
                    <input
                      className="mt-1 w-full rounded-lg bg-[#0b1912] border border-gray-600 p-3 text-white"
                      value={match.result ?? ""}
                      onChange={(e) =>
                        handleChange(
                          match.id,
                          "result",
                          e.target.value
                        )
                      }
                      placeholder="Islamabad United won by 25 runs"
                    />
                  </label>
                </div>

                <button
                  onClick={() => saveScore(match)}
                  disabled={savingId === match.id}
                  className="mt-5 w-full rounded-lg bg-yellow-400 p-3 font-bold text-black hover:bg-yellow-300 disabled:opacity-50"
                >
                  {savingId === match.id
                    ? "Saving..."
                    : "Save Score"}
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}