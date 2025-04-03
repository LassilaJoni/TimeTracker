"use client";

import Form from "next/form";
import React from "react";
import {Card, CardHeader, CardBody, CardFooter} from "@heroui/card";

interface NewTaskCardProps {
  projectId: string;
  createTask: (formData: FormData) => Promise<void>;
}

export default function NewTaskCard({ projectId, createTask }: NewTaskCardProps) {
  return (
    <Form action={createTask} className="space-y-4 max-w-md">
      {/* Hidden input to pass along the project ID */}
      <input type="hidden" name="projectId" value={projectId} />

      <div>
        <label htmlFor="name" className="block font-medium mb-1">
          Task Name
        </label>
        <input
          id="name"
          name="name"
          placeholder="Task Name"
          required
          className="input"
        />
      </div>

      <div>
        <label htmlFor="description" className="block font-medium mb-1">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          placeholder="Task Description"
          className="textarea"
        />
      </div>

      <div>
        <label htmlFor="hourlyRate" className="block font-medium mb-1">
          Hourly Rate (optional)
        </label>
        <input
          id="hourlyRate"
          name="hourlyRate"
          type="number"
          placeholder="50"
          className="input"
        />
      </div>

      <div>
        <label htmlFor="deadline" className="block font-medium mb-1">
          Deadline (optional)
        </label>
        <input id="deadline" name="deadline" type="date" className="input" />
      </div>

      <button type="submit" className="btn">
        Create Task
      </button>
    </Form>
  );
}
