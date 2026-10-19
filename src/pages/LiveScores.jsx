
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import MatchCard from "../components/MatchCard";
import { Radio } from "lucide-react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

export default function LiveScores() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
        setError("");
      },
      (err) => {
        console.error("Live scores error:", err);
        setError("Scores load nahi huay: " + err.message);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  const liveMatches = matches.filter(
    (match) => match.status === "LIVE"
  );

  const otherMatches = matches.filter(
    (match) => match.status !== "LIVE"
  );

  return (
    <div className="min-h-screen bg-[#0b1912] text-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-5 py-10">
        <p className="text-yellow-400 text-sm font-semibold">
          MATCH CENTER
        </p>

        <h1 className="text-4xl font-bold mt-2 mb-3">
          <Radio className="inline mr-2 text-red-400" size={30} />
          Live Scores
        </h1>

        <p className="text-gray-400 mb-8">
          Live, upcoming aur completed matches.
        </p>

        {error && (
          <p className="text-red-400 mb-5">{error}</p>
        )}

        {loading ? (
          <p>Matches load ho rahe hain...</p>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-5">
              Live Matches
            </h2>

            {liveMatches.length ? (
              <div className="grid md:grid-cols-2 gap-5">
                {liveMatches.map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            ) : (
              <p className="bg-[#142b22] rounded-xl p-6 text-gray-400">
                Abhi koi live match nahi hai.
              </p>
            )}

            <h2 className="text-2xl font-bold mt-10 mb-5">
              Other Matches
            </h2>

            {otherMatches.length ? (
              <div className="grid md:grid-cols-2 gap-5">
                {otherMatches.map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            ) : (
              <p className="text-gray-400">Koi aur match nahi hai.</p>
            )}
          </>
        )}
      </main>
    </div>
  );
}
