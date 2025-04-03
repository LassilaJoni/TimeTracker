"use client";

import Form from "next/form";
import React from "react";
import {Card, CardHeader, CardBody, CardFooter} from "@heroui/card";
import { Input, Textarea } from "@heroui/input";
import { Button } from "@heroui/button";

interface NewTaskCardProps {
  projectId: string;
  createTask: (formData: FormData) => Promise<void>;
}

export default function NewTaskCard({ projectId, createTask }: NewTaskCardProps) {
  return (
    <Form action={createTask} className="space-y-4 max-w-md">
    <Card className="max-w-xl mx-auto animate-fade-in">
      {/* Hidden input to pass along the project ID */}
      <input type="hidden" name="projectId" value={projectId} />

      <CardBody>
        <label htmlFor="name" className="block font-medium mb-1">
          Task Name
        </label>
        <Input
          id="name"
          name="name"
          placeholder="Enter task name"
          required
          className="input"
        />

        <label htmlFor="description" className="block font-medium mb-1">
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          placeholder="Enter task description"
          className="textarea"
        />

      <div>
        <label htmlFor="deadline" className="block font-medium mb-1">
          Deadline (optional)
        </label>
        <Input id="deadline" name="deadline" type="date" className="input" />
      </div>

      </CardBody>
      <CardFooter>
      <Button type="submit" className="btn">
        Create Task
      </Button>
      </CardFooter>
    </Card>
    </Form>
  );
}
