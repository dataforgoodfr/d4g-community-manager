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
      setError("Identifiants invalides");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center">
      <section className="w-full max-w-md bg-gray-800 backdrop-blur-md rounded-xl p-8 shadow-lg text-white">
        <h1 className="text-2xl font-bold mb-2">Data for Good</h1>
        <p className="text-sm text-white/80 mb-6">Connectez-vous pour continuer</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nom d'utilisateur</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 placeholder-white/60 text-white outline-none focus:ring-2 focus:ring-primary"
              placeholder="Votre username"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 placeholder-white/60 text-white outline-none focus:ring-2 focus:ring-primary"
              placeholder="••••••••"
              required
            />
          </div>

          {error && <p className="text-red-300 text-sm">{error}</p>}

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-2 rounded-lg"
            >
              {isSubmitting ? "Connexion…" : "Se connecter"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
