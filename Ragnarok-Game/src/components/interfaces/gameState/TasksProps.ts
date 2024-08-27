import React from "react";
import { Task } from "../../../classes/task/task";

export interface TasksProps {
  tasks: Task[],
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>
}