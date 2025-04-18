"use client";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { ClockIcon, EditIcon, PlusIcon, TimerIcon } from "lucide-react";
import { Badge } from "@heroui/react";
import { format } from "date-fns";

interface ProjectCardProps {
  project: {
    id: string;
    name: string;
    description?: string;
    hourly_rate: number;
    deadline?: Date;
    tasks: {
      id: string;
      name: string;
    }[];
  };
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="animate-appearance-in w-[400px]">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div>
          <p className="font-medium">{project.name}</p>
          <div className="text-sm text-muted-foreground mt-1">
            {project.hourly_rate}/hour
          </div>
        </div>
        <div className="flex space-x-2">
          <Link href={`/dashboard/projects/${project.id}/edit`}>
            <Button isIconOnly>
              <EditIcon className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardHeader>

      <CardBody>
        {project.description && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {project.description}
          </p>
        )}

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-secondary/50 rounded-md p-3 flex flex-col">
            <span className="text-xs text-muted-foreground mb-1 flex items-center">
              <ClockIcon className="h-3 w-3 mr-1" /> Time
            </span>
            {/* <span className="text-sm font-medium">{project.totalDuration}</span> */}
          </div>
          <div className="bg-secondary/50 rounded-md p-3 flex flex-col">
            <span className="text-xs text-muted-foreground mb-1">Earnings</span>
            <span className="text-sm font-medium">
              {/* {project.totalEarnings} */}
            </span>
          </div>
        </div>

        {project.deadline && (
          <Badge variant="shadow" className="mt-2">
            Due {format(project.deadline, "MMM d, yyyy")}
          </Badge>
        )}

        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium">
              Tasks ({project.tasks.length})
            </h4>
            <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
              <Link href={`/projects/${project.id}/new-task`}>
                <PlusIcon className="h-3 w-3 mr-1" /> Add Task
              </Link>
            </Button>
          </div>

          {project.tasks.length > 0 ? (
            <ul className="space-y-1">
              {project.tasks.slice(0, 3).map((task) => (
                <li
                  key={task.id}
                  className="text-sm px-2 py-1 rounded-sm hover:bg-secondary/50 transition-colors"
                >
                  <Link
                    href={`/projects/${project.id}/tasks/${task.id}`}
                    className="flex items-center justify-between"
                  >
                    <span className="truncate max-w-[200px]">{task.name}</span>
                    <div className="flex items-center text-muted-foreground">
                      <TimerIcon className="h-3 w-3 mr-1" />
                      <span className="text-xs">
                        <p>LOOOL</p>
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
              {project.tasks.length > 3 && (
                <li className="text-xs text-center text-muted-foreground mt-1">
                  <Link href={`/dashboard//projects/${project.id}`}>
                    View all {project.tasks.length} tasks...
                  </Link>
                </li>
              )}
            </ul>
          ) : (
            <div className="text-sm text-muted-foreground text-center py-2 italic">
              No tasks yet
            </div>
          )}
        </div>
      </CardBody>

      <CardFooter className="pt-0">
        <Link href={`/dashboard/projects/${project.id}`} className="w-full">
          <Button className="w-full">View Project</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
