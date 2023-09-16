export interface Task {
  id: string;
  title: string;
  description: string;
  files?: string[];
  status: "Pending" | "Done" | "Processing";
  tags?: string[];
  comments: string[];
  estimated_date: Date;
  sortOrder: number;
}
