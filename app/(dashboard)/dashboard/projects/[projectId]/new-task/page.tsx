// app/dashboard/projects/[projectId]/new-task/page.tsx
import { redirect } from "next/navigation";
import NewTaskCard from "@/app/components/projects/NewTaskCard";
import { createClient } from "@/app/utils/supabase/server";
import { fetchProjectById } from "@/lib/api/projects";

// This server action is called when the form in the client component is submitted.
export async function createTask(formData: FormData) {
  "use server";
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) {
    redirect("/login");
  }

  // Extract form data.
  const projectId = formData.get("projectId")?.toString();
  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const deadline = formData.get("deadline")?.toString();

  if (!projectId || !name) {
    throw new Error("Project ID and task name are required.");
  }


  // Insert the new task into the "tasks" table.
  const { error } = await supabase.from("tasks").insert({
    project_id: projectId,
    name,
    description,
    deadline: deadline ? new Date(deadline).toISOString() : null,
    completed: false,
  });
  if (error) {
    throw new Error(error.message);
  }

  redirect(`/dashboard/projects/${projectId}`);
}

export default async function NewTaskPage({
  params,
}: {
  params: { projectId: string };
}) {
  const supabase = createClient();
  const { projectId } = await params
  const project = await fetchProjectById(projectId);
  if (!project) {
    redirect("/dashboard");
  }

  return (
    <div className="space-y-6 page-transition">
      <h1 className="text-2xl font-semibold tracking-tight">
        Create New Task for {project.name}
      </h1>
      {/* Pass the projectId and server action to the client component */}
      <NewTaskCard projectId={projectId} createTask={createTask} />
    </div>
  );
}
