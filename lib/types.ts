export interface LeadInput {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  projectType: string;
  budget: string;
  message?: string;
  sourcePage?: string;
}

export interface Lead extends LeadInput {
  id: number;
  createdAt: string;
  status: string;
}

export type LeadStatus = "new" | "contacted" | "quoted" | "won" | "lost";

export interface LeadStats {
  total: number;
  today: number;
  last7Days: number;
  byStatus: Record<string, number>;
  byProjectType: Record<string, number>;
  bySource: Record<string, number>;
}
