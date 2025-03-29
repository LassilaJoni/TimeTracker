"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import {Textarea} from "@heroui/input";
import { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/app/utils/supabase/client";

export default function NewProjectPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [deadline, setDeadline] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const supabase = createClient();

  // We'll handle form submission here
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 1) Get the current authenticated user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        setError("Unable to retrieve user.");
        setLoading(false);
        return;
      }
      if (!user) {
        setError("No user logged in.");
        setLoading(false);
        return;
      }

      // 2) Insert a new project
      const { data, error: insertError } = await supabase
        .from("projects")
        .insert({
          name,
          description,
          hourly_rate: Number(hourlyRate) || null,
          deadline: deadline ? new Date(deadline).toISOString() : null,
          owner_id: user.id, // or whichever user field is relevant
        })
        .select();

      if (insertError) {
        setError(insertError.message);
        setLoading(false);
        return;
      }

      // 3) Optionally redirect to the dashboard or project detail page
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 page-transition">
      <h1 className="text-2xl font-semibold tracking-tight">Create New Project</h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        {error && <div className="text-red-500">{error}</div>}

        <div>
          <label className="block font-medium mb-1">Project Name</label>
          <Input
            placeholder="My Awesome Project"
            value={name}
            onChange={(e: any) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Description</label>
          <Textarea
            placeholder="What is this project about?"
            value={description}
            onChange={(e: any) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Hourly Rate</label>
          <Input
            type="number"
            placeholder="50"
            value={hourlyRate}
            onChange={(e: any) => setHourlyRate(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Deadline</label>
          <Input
            type="date"
            value={deadline}
            onChange={(e: any) => setDeadline(e.target.value)}
          />
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Project"}
        </Button>
      </form>
    </div>
  );
}