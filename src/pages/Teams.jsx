
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TeamCard from "../components/TeamCard";
import { Users } from "lucide-react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "teams"),
      (snapshot) => {
        setTeams(
          snapshot.docs.map((item) => ({
            ...item.data(),
            id: item.data().id ?? item.id,
          }))
        );
        setLoading(false);
      },
      (err) => {
        console.error(err);
        setError("Teams load nahi hui: " + err.message);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  return (
    <div className="min-h-screen bg-[#0b1912] text-white">
      <Navbar />
      <main className="max-w-7xl mx-auto px-5 py-10">
        <p className="text-yellow-400 text-sm font-semibold">
          MEET THE CONTENDERS
        </p>

        <h1 className="text-4xl font-bold mt-2 mb-3">
          <Users className="inline mr-2 text-yellow-400" size={32} />
          Tournament Teams
        </h1>

        <p className="text-gray-400 mb-8">
          Total {teams.length} teams participating.
        </p>

        {error && <p className="text-red-400">{error}</p>}

        {loading ? (
          <p>Teams load ho rahi hain...</p>
        ) : teams.length === 0 ? (
          <p>Firebase ke `teams` collection mein abhi koi team nahi hai.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {teams.map((team) => (
              <TeamCard key={team.id} team={team} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
