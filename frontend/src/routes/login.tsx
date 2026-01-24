import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/auth";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/login")({
  component: Login,
});

function Login() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate({ to: "/" });
    }
  }, [auth.isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await auth.login(username, password);
      navigate({ to: "/" });
    } catch (err) {
      setError("Invalid credentials");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="text-center">
      <header className="min-h-screen flex flex-col items-center justify-center bg-[#282c34] text-white text-[calc(10px+2vmin)]">
        <h1 className="text-4xl mb-8">Data for Good Community Manager</h1>
        <p className="mb-8">Please log in to continue</p>
        <form onSubmit={handleSubmit} className="w-full max-w-sm text-left">
          <label className="block mb-4">
            <span className="block text-sm font-semibold mb-1">Username</span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 rounded text-white"
              required
            />
          </label>
          <label className="block mb-6">
            <span className="block text-sm font-semibold mb-1">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded text-white"
              required
            />
          </label>
          {error && <p className="text-red-300 mb-4">{error}</p>}
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded w-full"
          >
            {isSubmitting ? "Signing in..." : "Log in"}
          </button>
        </form>
      </header>
    </div>
  );
}
