import { getUserSession } from "@/app/actions/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const response = await getUserSession();
    if (!response?.user) {
      redirect("/login");
    }
    return <>{children}</>;
  }