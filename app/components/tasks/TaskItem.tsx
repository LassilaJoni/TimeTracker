"use client";
import { Button } from "@/components/ui/button";
import { CheckIcon, ClockIcon, PauseIcon, PlayIcon, TimerIcon, TimerOffIcon } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Badge } from "@heroui/react";


export function TaskItem() {
  const [isHovering, setIsHovering] = useState(false);
  
    const [isActive, setIsActive] = useState(false);
    const [task, setTask] = useState({
        id: 1,
        name: "Sample Task",
        description: "This is a sample task description.",
        completed: false,
        elapsedTime: 3600, // in seconds
        hourlyRate: 20,
        deadline: new Date(Date.now() + 86400000), // 1 day from now
        timeEntries: [],
        });
    const project = { id: 1 };
    const earnings = task.elapsedTime * (task.hourlyRate || 0) / 3600;
    const elapsedTime = task.elapsedTime || 0; // in seconds

    const formatDuration = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return `${hours}h ${minutes}m`;
    };

    const handleToggleCompleted = () => {
        setTask((prevTask) => ({ ...prevTask, completed: !prevTask.completed }));
    };

    const handleToggleTimer = () => {
        setIsActive((prev) => !prev);
        if (!isActive) {
            // Start the timer logic here
        } else {
            // Stop the timer logic here
        }
    };

  
  return (
    <div 
      className={cn(
        "border rounded-md p-4 transition-all hover:shadow-sm",
        isActive ? "border-primary/50 bg-primary/5" : "border-border",
        task.completed ? "opacity-75" : "opacity-100",
        isHovering && !task.completed ? "bg-secondary/50" : ""
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <button
            onClick={handleToggleCompleted}
            className={cn(
              "mt-1 flex-shrink-0 h-5 w-5 rounded-full border flex items-center justify-center transition-colors",
              task.completed 
                ? "bg-primary border-primary text-primary-foreground" 
                : "border-muted-foreground hover:border-primary"
            )}
          >
            {task.completed && <CheckIcon className="h-3 w-3" />}
          </button>
          <div>
            <h3 className={cn(
              "font-medium text-base transition-colors",
              task.completed && "line-through text-muted-foreground"
            )}>
              <Link href={`/projects/${project.id}/tasks/${task.id}`}>
                {task.name}
              </Link>
            </h3>
            
            {task.description && (
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                {task.description}
              </p>
            )}
            
            <div className="flex items-center mt-2 flex-wrap gap-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <ClockIcon className="h-3.5 w-3.5 mr-1" />
                <span>{formatDuration(elapsedTime)}</span>
              </div>
              
              {task.hourlyRate !== undefined && (
                <Badge variant="shadow" className="text-xs">
                  ${task.hourlyRate}/hour
                </Badge>
              )}
              
              {task.deadline && (
                <Badge color={
                  new Date() > task.deadline 
                    ? "danger" 
                    : "success"
                } className="text-xs">
                  {new Date() > task.deadline
                    ? "Overdue: "
                    : "Due: "
                  }
                  {format(task.deadline, 'MMM d')}
                </Badge>
              )}
              
              {isActive && (
                <Badge className="text-xs bg-primary/20 text-primary border-primary/20 animate-pulse-light">
                  Recording
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant={isActive ? "default" : "outline"}
            size="sm"
            className={cn(
              "h-8 px-2 transition-all",
              isActive && "animate-pulse-light"
            )}
            onClick={handleToggleTimer}
            disabled={task.completed}
          >
            {isActive ? (
              <>
                <PauseIcon className="h-4 w-4 mr-1" /> Stop
              </>
            ) : (
              <>
                <PlayIcon className="h-4 w-4 mr-1" /> Start
              </>
            )}
          </Button>
        </div>
      </div>
      
      <div className="mt-3 pt-3 border-t border-border">
        <div className="flex justify-between text-sm">
          <div className="flex items-center text-muted-foreground">
            <TimerIcon className="h-3.5 w-3.5 mr-1" />
            <span>
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
              }).format(earnings)}
            </span>
          </div>
          <div className="text-muted-foreground">
            {task.timeEntries.length} {task.timeEntries.length === 1 ? 'entry' : 'entries'}
          </div>
        </div>
      </div>
    </div>
  );
}
