import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";

import Header from "../components/Header";

interface AuthState {
  isAuthenticated: boolean;
  user: { id: string; username: string; email: string } | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  verifySession: () => Promise<{
    id: string;
    username: string;
    email: string;
  } | null>;
}

interface AuthenticationContext {
  auth: AuthState;
}

export const Route = createRootRouteWithContext<AuthenticationContext>()({
  component: () => (
    <>
      <Header />
      <Outlet />
    </>
  ),
});
