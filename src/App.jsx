import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";

import Home from "./pages/Home";
import LiveScores from "./pages/LiveScores";
import Teams from "./pages/Teams";
import Fixtures from "./pages/Fixtures";
import PointsTable from "./pages/PointsTable";
import Players from "./pages/Players";
import AdminDashboard from "./pages/AdminDashboard";
import ScorerDashboard from "./pages/ScorerDashboard";
import AdminLogin from "./pages/AdminLogin";

const pages = [
  ["Home", "home"],
  ["Live Scores", "live"],
  ["Teams", "teams"],
  ["Fixtures", "fixtures"],
  ["Points Table", "points"],
  ["Players", "players"],
];

export default function App() {
  const [page, setPage] = useState(() => {
    const params = new URLSearchParams(window.location.search);

    if (window.location.pathname === "/admin-login") {
      return "login";
    }

    return params.get("page") || "home";
  });

  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!authLoading && !user && (page === "admin" || page === "scorer")) {
      setPage("login");
      window.history.replaceState({}, "", "/admin-login");
    }
  }, [page, user, authLoading]);

  function navigate(nextPage) {
    if (
      (nextPage === "admin" || nextPage === "scorer") &&
      !user
    ) {
      nextPage = "login";
    }

    setPage(nextPage);

    const url =
      nextPage === "home"
        ? "/"
        : nextPage === "login"
        ? "/admin-login"
        : `/?page=${nextPage}`;

    window.history.pushState({}, "", url);
    window.scrollTo(0, 0);
  }

  async function handleLogout() {
    try {
      await signOut(auth);
      setPage("home");
      window.history.replaceState({}, "", "/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#0b1912] text-white flex items-center justify-center">
        Checking login...
      </div>
    );
  }

  if (page === "login") {
    return <AdminLogin />;
  }

  return (
    <div className="min-h-screen bg-[#0b1912] text-white">
      <nav className="flex flex-wrap justify-center gap-2 bg-[#10271e] p-3">
        {pages.map(([label, value]) => (
          <button
            key={value}
            onClick={() => navigate(value)}
            className={`px-3 py-2 rounded-lg transition ${
              page === value
                ? "bg-yellow-400 text-black font-bold"
                : "hover:bg-white/10"
            }`}
          >
            {label}
          </button>
        ))}

        {user ? (
          <button
            onClick={handleLogout}
            className="px-3 py-2 rounded-lg hover:bg-white/10"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigate("login")}
            className="px-3 py-2 rounded-lg hover:bg-white/10"
          >
            Admin Login
          </button>
        )}
      </nav>

      {page === "home" && <Home />}
      {page === "live" && <LiveScores />}
      {page === "teams" && <Teams />}
      {page === "fixtures" && <Fixtures />}
      {page === "points" && <PointsTable />}
      {page === "players" && <Players />}
      {page === "admin" && user && <AdminDashboard />}
      {page === "scorer" && user && <ScorerDashboard />}
    </div>
  );
}
