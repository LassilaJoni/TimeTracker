import { redirect } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import {
  ArrowLeftIcon,
  CalendarIcon,
  ClockIcon,
  PencilIcon,
  PlusIcon,
  TimerIcon,
} from "lucide-react";
import { Button } from "@heroui/button";
import { createClient } from "@/app/utils/supabase/server";
import { fetchProjectById } from "@/lib/api/projects";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";

export default async function ProjectDetail({
  params,
}: {
  params: { projectId: string };
}) {

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

  /*
  `params` should be awaited before using its properties
   npx @next/codemod@canary next-async-request-api . should fix, look into that. This is a temporary fix to not get that annoying error.
  */
  const { projectId } = await params

  const project = await fetchProjectById(projectId);

  return (
    <div className="space-y-6 page-transition">
      <div className="flex items-center space-x-4">
        <Button variant="ghost">
          <Link href="/dashboard">
            <ArrowLeftIcon className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-semibold tracking-tight">
          {project.name}
        </h1>
      </div>

      <div className="flex items-center space-x-2">
        <Button size="sm">
          <Link
            href={`/dashboard/projects/${project.id}/edit`}
            className="flex items-center"
          >
            <PencilIcon className="h-3.5 w-3.5 mr-1" /> Edit
          </Link>
        </Button>
        <Button size="sm">
          <Link
            href={`/dashboard/projects/${project.id}/new-task`}
            className="flex items-center"
          >
            <PlusIcon className="h-3.5 w-3.5 mr-1" /> Add Task
          </Link>
        </Button>
      </div>

      {project.description && (
        <p className="text-muted-foreground">{project.description}</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            Hourly Rate
          </CardHeader>
          <CardBody>
            <div className="text-2xl font-semibold">
              ${project.hourly_rate.toFixed(2)}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardHeader>Total Time</CardHeader>
          </CardHeader>
          <CardBody className="flex items-center">
            <ClockIcon className="h-4 w-4 mr-2 text-muted-foreground" />
            <div className="text-2xl font-semibold">
          houur
          minute
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            Earnings
          </CardHeader>
          <CardBody>
            <div className="text-2xl font-semibold">
              100 €
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader className="pb-2">
          Tasks
          </CardHeader>
          <CardBody>
            <div className="text-2xl font-semibold">
              active /  done
            </div>
          </CardBody>
        </Card>
      </div>

      {project.deadline && (
        <div className="flex items-center space-x-2 text-sm">
          <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          <span>
            Deadline:{" "}
            <span className="font-medium">
              {format(new Date(project.deadline), "MMMM d, yyyy")}
            </span>
          </span>
        </div>
      )}

      <div className="border-t pt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Tasks</h2>
          <Button>
            <Link
              href={`/dashboard/projects/${project.id}/new-task`}
              className="flex items-center"
            >
              <PlusIcon className="h-4 w-4 mr-1" /> Add Task
            </Link>
          </Button>
        </div>

          <div className="text-center py-12 border border-dashed rounded-lg">
            <TimerIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-medium">No tasks yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first task to start tracking time
            </p>
            <Button>
              <Link href={`/dashboard/projects/${project.id}/new-task`}>
                <PlusIcon className="h-4 w-4 mr-1" /> Create Task
              </Link>
            </Button>
          </div>
  
      </div>
    </div>
  );
}
