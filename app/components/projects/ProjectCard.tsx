"use client";
import { Button } from "@heroui/button";
import { Project } from "@/app/types";
import { Link } from "@heroui/link";
import { useState } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { ClockIcon, EditIcon, PlusIcon, TimerIcon, TrashIcon } from "lucide-react";
import { Badge } from "@heroui/react";
import { format } from "date-fns";

interface ProjectCardProps {
  // use the project types from the page.tsx
  project: {
    id: string;
    name: string;
    description: string;
    hourly_rate: number | null;
    deadline: string | null;

  };
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="animate-appearance-in w-[350px]">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div>
          <p className="font-medium">{project.name}</p>
          <div className="text-sm text-muted-foreground mt-1">
            {project.hourly_rate}/hour
          </div>
        </div>
        <div className="flex space-x-2">
          <Button isIconOnly>
            <Link href={`/projects/${project.id}/edit`}>
              <EditIcon className="h-4 w-4" /> 
            </Link>
          </Button>
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
            <span className="text-sm font-medium">project.totalDuration</span>
          </div>
          <div className="bg-secondary/50 rounded-md p-3 flex flex-col">
            <span className="text-xs text-muted-foreground mb-1">Earnings</span>
            <span className="text-sm font-medium">
              project.totalEarnings
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
              Tasks 
            </h4>
            <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
              <Link href={`/projects/${project.id}/new-task`}>
                <PlusIcon className="h-3 w-3 mr-1" /> Add Task
              </Link>
            </Button>
          </div>

         
        </div>
      </CardBody>

      <CardFooter className="pt-0">
        <Button className="w-full">
          <Link href={`/dashboard/projects/${project.id}`}>View Project</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
