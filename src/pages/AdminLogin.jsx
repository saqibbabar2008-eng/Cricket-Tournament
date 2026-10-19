
import { useState } from "react";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase";
import {
  ShieldCheck,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
} from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      window.location.href = "/?page=admin";
    } catch (error) {
      console.error("Login error:", error.code, error.message);
      setMessageType("error");
      setMessage(error.code || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  async function resetPassword() {
    if (!email.trim()) {
      setMessageType("error");
      setMessage("Pehle apni email enter karo.");
      return;
    }

    setMessage("");
    try {
      await sendPasswordResetEmail(auth, email.trim());
      setMessageType("success");
      setMessage("Reset link bhej diya. Apni email aur Spam folder check karo.");
    } catch (error) {
      console.error("Reset error:", error.code, error.message);
      setMessageType("error");
      setMessage(error.code || "Password reset failed");
    }
  }

  const inputClass =
    "block w-full min-w-0 border-0 outline-none bg-transparent text-white text-base placeholder:text-gray-500 focus:outline-none focus:ring-0";

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#07140f] px-4 py-10 text-white">
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-yellow-400/10 blur-3xl" />

      <section className="relative w-full max-w-md">
        <button
          type="button"
          onClick={() => (window.location.href = "/")}
          className="mb-5 inline-flex items-center gap-2 rounded-lg py-2 text-sm text-gray-400 transition hover:text-yellow-400"
        >
          <ArrowLeft size={17} />
          Back to Home
        </button>

        <div className="rounded-3xl border border-white/10 bg-[#10251c] p-6 shadow-2xl sm:p-9">
          <div className="mb-5 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-400 shadow-lg shadow-yellow-400/10">
              <ShieldCheck size={34} className="text-[#10251c]" />
            </div>
          </div>

          <header className="mb-8 text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-yellow-400">
              Mohalla Premier League
            </p>
            <h1 className="text-3xl font-extrabold tracking-tight">
              Admin Login
            </h1>
            <p className="mt-2 text-sm leading-6 text-gray-400">
              Sign in to manage your tournament
            </p>
          </header>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="min-w-0">
              <label htmlFor="admin-email" className="mb-2 block text-sm font-medium text-gray-200">
                Email address
              </label>
              <div className="flex h-12 w-full min-w-0 items-center gap-3 overflow-hidden rounded-xl border border-white/15 bg-[#091810] px-3 transition focus-within:border-yellow-400 focus-within:ring-2 focus-within:ring-yellow-400/15">
                <Mail size={18} className="shrink-0 text-yellow-400" />
                <input
                  id="admin-email"
                  name="email"
                  type="email"
                  placeholder="Enter Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="username"
                  required
                  className={inputClass}
                />
              </div>
            </div>

            <div className="min-w-0">
              <label htmlFor="admin-password" className="mb-2 block text-sm font-medium text-gray-200">
                Password
              </label>
              <div className="flex h-12 w-full min-w-0 items-center gap-3 overflow-hidden rounded-xl border border-white/15 bg-[#091810] px-3 transition focus-within:border-yellow-400 focus-within:ring-2 focus-within:ring-yellow-400/15">
                <Lock size={18} className="shrink-0 text-yellow-400" />
                <input
                  id="admin-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className={inputClass}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-400 transition hover:bg-white/10 hover:text-white"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {message && (
              <p
                role="status"
                className={`break-words rounded-xl border p-3 text-sm ${
                  messageType === "error"
                    ? "border-red-400/20 bg-red-400/10 text-red-300"
                    : messageType === "success"
                    ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
                    : "border-white/10 bg-white/5 text-gray-300"
                }`}
              >
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex h-12 w-full items-center justify-center rounded-xl bg-yellow-400 px-4 font-bold text-[#10251c] transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Login to Dashboard"}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={resetPassword}
                className="rounded-md py-2 text-sm font-medium text-gray-400 underline-offset-4 transition hover:text-yellow-400 hover:underline"
              >
                Forgot Password?
              </button>
            </div>
          </form>

          <div className="mt-6 border-t border-white/10 pt-5 text-center">
            <p className="text-xs text-gray-500">
              <Lock size={12} className="mr-1 inline" />
              Authorized tournament staff only
            </p>
          </div>
        </div>

        <p className="mt-5 text-center text-xs text-gray-600">
          © 2026 Mohalla Premier League
        </p>
      </section>
    </main>
  );
}
