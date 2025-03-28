import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};


export interface Project {
  id: string;
  name: string;
  description?: string;
  hourlyRate: number;
  color?: string;
  deadline?: Date;
  createdAt: Date;
  tasks: Task[];
}

export interface Task {
  id: string;
  projectId: string;
  name: string;
  description?: string;
  hourlyRate?: number; // If not specified, inherits from project
  deadline?: Date;
  completed: boolean;
  timeEntries: TimeEntry[];
  createdAt: Date;
}

export interface TimeEntry {
  id: string;
  taskId: string;
  startTime: Date;
  endTime?: Date; // Undefined if timer is still running
  notes?: string;
}

