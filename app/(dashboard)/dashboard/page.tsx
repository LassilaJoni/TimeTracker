import { ProjectCard } from "@/app/components/projects/ProjectCard";
import { createClient } from "@/app/utils/supabase/server";
import { fetchUserProjects } from "@/lib/api/projects";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { redirect } from "next/navigation";


  export default async function Dashboard() {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) {
    console.error("Error fetching user:", userError.message);
    redirect("/login");
  }
  if (!user) {
    console.error("No user found");
    redirect("/login");
  }
  const userId = user.id;
    const projects = await fetchUserProjects(userId);


  return (
    <div className="space-y-6 page-transition">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <Button>
          <Link href="/dashboard/new-project" className="flex items-center">
             New Project
          </Link>
        </Button>
      </div>
      
      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border border-dashed rounded-lg">
          <h3 className="text-xl font-medium">No projects yet</h3>
          <p className="text-muted-foreground mb-4">Start by creating your first project</p>
          <Button>
            <Link href="/dashboard/new-project">
               Create Project
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}