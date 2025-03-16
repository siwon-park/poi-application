export interface Project {
  id: string;
  title: string;
  description: string;
  status: '진행중' | '완료' | '계획중';
  startDate: string;
  endDate?: string;
  projectManager: string;
  hasSubcontractor: boolean;
  subcontractor?: string;
  clientManager: string;
} 