
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { matches as initialMatches } from "../data/matches";
import { ShieldCheck, Plus, Save } from "lucide-react";
import { auth, db } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  writeBatch,
} from "firebase/firestore";

export default function AdminDashboard() {
  const [matches, setMatches] = useState([]);
  const [team1, setTeam1] = useState("");
  const [team2, setTeam2] = useState("");
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState("");
  const [adding, setAdding] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadMatches() {
      try {
        if (!auth.currentUser) {
          setMessage("Please login first.");
          return;
        }

        let snapshot = await getDocs(collection(db, "matches"));

        if (snapshot.empty) {
          const batch = writeBatch(db);

          initialMatches.forEach((match) => {
            const { id, ...data } = match;
            batch.set(doc(db, "matches", String(id)), data);
          });

          await batch.commit();
          snapshot = await getDocs(collection(db, "matches"));
        }

        setMatches(
          snapshot.docs.map((item) => ({
            ...item.data(),
            id: item.id,
            score1: item.data().score1 ?? "-",
            score2: item.data().score2 ?? "-",
            overs: item.data().overs ?? "-",
            status: item.data().status ?? "UPCOMING",
            result: item.data().result ?? "",
          }))
        );
      } catch (error) {
        console.error(error);
        setMessage("Load error: " + error.message);
      } finally {
        setLoading(false);
      }
    }

    loadMatches();
  }, []);

  function editMatch(id, field, value) {
    setMatches((prev) =>
      prev.map((match) =>
        match.id === id ? { ...match, [field]: value } : match
      )
    );
  }

  async function saveMatch(match) {
    try {
      setSavingId(match.id);
      setMessage("");

      const matchRef = doc(db, "matches", match.id);

      await updateDoc(matchRef, {
        score1: String(match.score1 ?? "-"),
        score2: String(match.score2 ?? "-"),
        overs: String(match.overs ?? "-"),
        status: match.status || "UPCOMING",
        result: match.result || "",
      });

      setMessage("✅ Score Firebase mein save ho gaya!");
    } catch (error) {
      console.error("Score update error:", error);
      setMessage("❌ Save error: " + error.message);
    } finally {
      setSavingId("");
    }
  }

  async function addMatch() {
    if (
      !team1.trim() ||
      !team2.trim() ||
      team1.trim().toLowerCase() === team2.trim().toLowerCase()
    ) {
      setMessage("Do different teams ke naam likho.");
      return;
    }

    try {
      setAdding(true);
      setMessage("");

      const newMatch = {
        team1: team1.trim(),
        team2: team2.trim(),
        date: "Upcoming",
        time: "09:00 PM",
        status: "UPCOMING",
        score1: "-",
        score2: "-",
        overs: "-",
        result: "",
      };

      const result = await addDoc(collection(db, "matches"), newMatch);

      setMatches((prev) => [
        ...prev,
        { ...newMatch, id: result.id },
      ]);

      setTeam1("");
      setTeam2("");
      setMessage("✅ Match Firebase mein save ho gaya!");
    } catch (error) {
      console.error("Add match error:", error);
      setMessage("❌ Match error: " + error.message);
    } finally {
      setAdding(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0b1912] text-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-5 py-10">
        <p className="text-yellow-400 text-sm font-semibold">
          CONTROL PANEL
        </p>

        <h1 className="text-4xl font-bold mt-2 mb-8">
          <ShieldCheck className="inline mr-2 text-yellow-400" />
          Admin Dashboard
        </h1>

        {message && (
          <p className="mb-5 text-sm break-words text-yellow-300">
            {message}
          </p>
        )}

        <section className="bg-[#142b22] border border-white/10 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-5">
            <Plus className="inline mr-2 text-yellow-400" />
            Add New Match
          </h2>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <input
              value={team1}
              onChange={(e) => setTeam1(e.target.value)}
              placeholder="Team 1 name"
              className="w-full bg-[#0b1912] border border-white/20 rounded-xl p-3"
            />

            <input
              value={team2}
              onChange={(e) => setTeam2(e.target.value)}
              placeholder="Team 2 name"
              className="w-full bg-[#0b1912] border border-white/20 rounded-xl p-3"
            />
          </div>

          <button
            onClick={addMatch}
            disabled={adding}
            className="bg-yellow-400 text-black font-bold rounded-xl px-5 py-3 disabled:opacity-50"
          >
            {adding ? "Saving..." : "Add Match"}
          </button>
        </section>

        <h2 className="text-2xl font-bold mb-5">
          Manage Match Scores
        </h2>

        {loading ? (
          <p>Matches load ho rahe hain...</p>
        ) : matches.length === 0 ? (
          <p>Koi match nahi mila.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-5">
            {matches.map((match) => (
              <div
                key={match.id}
                className="bg-[#142b22] border border-white/10 rounded-2xl p-5"
              >
                <h3 className="font-bold mb-4">
                  {match.team1} vs {match.team2}
                </h3>

                <label className="block text-sm text-gray-400 mb-1">
                  Team 1 Score
                </label>
                <input
                  value={match.score1}
                  onChange={(e) =>
                    editMatch(match.id, "score1", e.target.value)
                  }
                  className="w-full bg-[#0b1912] border border-white/20 rounded-lg p-3 mb-3"
                />

                <label className="block text-sm text-gray-400 mb-1">
                  Team 2 Score
                </label>
                <input
                  value={match.score2}
                  onChange={(e) =>
                    editMatch(match.id, "score2", e.target.value)
                  }
                  className="w-full bg-[#0b1912] border border-white/20 rounded-lg p-3 mb-3"
                />

                <label className="block text-sm text-gray-400 mb-1">
                  Overs
                </label>
                <input
                  value={match.overs}
                  onChange={(e) =>
                    editMatch(match.id, "overs", e.target.value)
                  }
                  placeholder="Example: 10.4"
                  className="w-full bg-[#0b1912] border border-white/20 rounded-lg p-3 mb-3"
                />

                <label className="block text-sm text-gray-400 mb-1">
                  Match Status
                </label>
                <select
                  value={match.status}
                  onChange={(e) =>
                    editMatch(match.id, "status", e.target.value)
                  }
                  className="w-full bg-[#0b1912] border border-white/20 rounded-lg p-3 mb-3"
                >
                  <option value="UPCOMING">UPCOMING</option>
                  <option value="LIVE">LIVE</option>
                  <option value="COMPLETED">COMPLETED</option>
                </select>

                <label className="block text-sm text-gray-400 mb-1">
                  Match Result
                </label>
                <input
                  value={match.result}
                  onChange={(e) =>
                    editMatch(match.id, "result", e.target.value)
                  }
                  placeholder="Match result"
                  className="w-full bg-[#0b1912] border border-white/20 rounded-lg p-3 mb-4"
                />

                <button
                  onClick={() => saveMatch(match)}
                  disabled={savingId !== ""}
                  className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold rounded-xl px-5 py-3 disabled:opacity-50"
                >
                  <Save className="inline mr-2" size={18} />
                  {savingId === match.id ? "Saving..." : "Save Score"}
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
