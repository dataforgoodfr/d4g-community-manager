import { createFileRoute, isRedirect, redirect } from "@tanstack/react-router";
import NavButton from "@/components/NavButton";

export const Route = createFileRoute("/")({
  // beforeLoad: async ({ location }) => {
  //   try {
  //     const user = await verifySession();
  //     if (!user) {
  //       throw redirect({
  //         to: "/login",
  //         search: { redirect: location.href },
  //       });
  //     }
  //     return { user };
  //   } catch (error) {
  //     if (isRedirect(error)) throw error;

  //     throw redirect({
  //       to: "/login",
  //       search: { redirect: location.href },
  //     });
  //   }
  // },
  component: Home,
});

function Home() {
  return (
    <div className="text-center">
      <main className="min-h-screen flex flex-col items-center justify-center bg-primary-background text-white text-[calc(10px+2vmin)]">
        <img
          src={"./logo.png"}
          className="h-[13vmin] pointer-events-none"
          alt="logo"
        />
        <div className="flex gap-4 mt-10 items-center">
          <NavButton to="/users" className="text-black">
            Utilisateurs
          </NavButton>
          <NavButton to="/projects" className="text-black">
            Projets
          </NavButton>
        </div>
      </main>
    </div>
  );
}
