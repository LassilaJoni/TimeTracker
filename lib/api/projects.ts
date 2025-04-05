import { createClient } from "@/app/utils/supabase/server";

export async function fetchUserProjects(userId: string) {
  const supabase = await createClient();

  // Fetch projects for the given user ID
  const { data, error } = await supabase
    .from("projects")
    .select(`
      id,
      name,
      description,
      hourly_rate,
      deadline,
      tasks ( 
        id,
        name,
        description,
        deadline,
        completed,
        created_at
      )
    `)
    .eq("owner_id", userId);

  if (error) {
    throw error;
  }
  return data;
}

export async function fetchProjectById(projectId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("id, name, description, hourly_rate, deadline, tasks ( id, name, description, deadline, completed, created_at )")
    .eq("id", projectId)
    .single();

  if (error) {
    throw error;
  }
  return data;
}
