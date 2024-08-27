import { Activity } from "../../classes/task/interfaces/Activity";

export interface Zone {
  id:number;
  name: string;
  explored: number;
  discoveredActivities: boolean[];
  activities: Activity[];
}