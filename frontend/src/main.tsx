import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { routeTree } from "./routeTree.gen.ts";
import { AuthProvider, useAuth } from "./auth";

import "./styles.css";
import reportWebVitals from "./reportWebVitals.ts";

export const router = createRouter({
  routeTree,
  context: {
    auth: undefined!,
  },
  defaultPreload: "intent",
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function AppWithRouter() {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
}

const queryClient = new QueryClient();

const rootElement = document.getElementById("app");
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AppWithRouter />
        </AuthProvider>
      </QueryClientProvider>
    </StrictMode>,
  );
}

reportWebVitals();
