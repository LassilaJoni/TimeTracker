"use client"
import { ProjectCard } from "@/app/components/projects/ProjectCard";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";

export default function Dashboard() {

// create mock data for projects
const projects = [
  {
    id: "1",
    name: "Project A",
    description: "Description for Project A",
    hourlyRate: 50,
    deadline: new Date(),
    totalDuration: 10,
    totalEarnings: 500,
    tasks: [
      { id: "1", name: "Task 1", duration: 3600 }, // 1 hour
      { id: "2", name: "Task 2", duration: 7200 }, // 2 hours
    ],
  },
  {
    id: "2",
    name: "Project B",
    description: "Description for Project B",
    hourlyRate: 60,
    deadline: new Date(),
    totalDuration: 20,
    totalEarnings: 1200,
    tasks: [
      { id: "3", name: "Task 3", duration: 7200 }, // 2 hours
      { id: "4", name: "Task 4", duration: 10800 }, // 3 hours
    ],
  },
  // Add more mock projects as needed
];
  
  return (
    <div className="space-y-6 page-transition">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <Button>
          <Link href="/new-project" className="flex items-center">
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
            <Link href="/new-project">
               Create Project
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
