import { createFileRoute, redirect } from "@tanstack/react-router";
import { useAuth } from "@/auth";
import { useEffect } from "react";

export const Route = createFileRoute("/callback")({
  component: RouteComponent,
});

function RouteComponent() {
  const auth = useAuth();

  useEffect(() => {
    if (auth.isAuthenticated) {
      redirect({ to: "/" });
    }
  }, [auth.isAuthenticated]);

  return (
    <div className="text-center">
      <header className="min-h-screen flex flex-col items-center justify-center bg-[#282c34] text-white text-[calc(10px+2vmin)]">
        <h1 className="text-4xl mb-8">Authenticating...</h1>
        <p className="mb-8">
          Please wait while we complete your authentication.
        </p>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
      </header>
    </div>
  );
}
