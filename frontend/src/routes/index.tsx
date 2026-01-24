import {
  createFileRoute,
  isRedirect,
  redirect,
  RouterProvider,
} from "@tanstack/react-router";
import logo from "../logo.svg";
import { AuthProvider, useAuth } from "@/auth";
import { router } from "../main";

export const Route = createFileRoute("/")({
  beforeLoad: async ({ location }) => {
    try {
      const user = await verifySession(); // might throw on network error
      if (!user) {
        throw redirect({
          to: "/login",
          search: { redirect: location.href },
        });
      }
      return { user };
    } catch (error) {
      if (isRedirect(error)) throw error;

      throw redirect({
        to: "/login",
        search: { redirect: location.href },
      });
    }
  },
  component: Home,
});

function InnerApp() {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
}

function App() {
  return (
    <AuthProvider>
      <InnerApp />
    </AuthProvider>
  );
}

function Home() {
  return (
    <div className="text-center">
      <header className="min-h-screen flex flex-col items-center justify-center bg-[#282c34] text-white text-[calc(10px+2vmin)]">
        <img
          src={logo}
          className="h-[40vmin] pointer-events-none animate-[spin_20s_linear_infinite]"
          alt="logo"
        />
        <p>
          Edit <code>src/routes/index.tsx</code> and save to reload.
        </p>
        <a
          className="text-[#61dafb] hover:underline"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <a
          className="text-[#61dafb] hover:underline"
          href="https://tanstack.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn TanStack
        </a>
      </header>
    </div>
  );
}
