import { getUserSession } from "@/app/actions/auth";
import { AppSidebar } from "@/app/components/navigation-bar/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
  // TODO: sidebar isn't open by default

  const response = await getUserSession();
  if (!response?.user) {
    redirect("/login");
  }
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar  />
      <main className="m-4">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
