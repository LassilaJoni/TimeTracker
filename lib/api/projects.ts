import { createClient } from "@/app/utils/supabase/server";

export async function fetchUserProjects(userId: string) {
  const supabase = await createClient();

    // Fetch projects for the given user ID
    const { data, error } = await supabase
    .from("projects")
    .select("id, name, description, hourly_rate, deadline")
    .eq("owner_id", userId);

  if (error) {
    throw error;
  }
  return data;
}
