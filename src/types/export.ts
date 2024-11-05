export type ExportFormat = 'csv' | 'excel' | 'json' | 'pdf';

export interface ExportOptions {
  fileName?: string;
  title?: string;
  sheetName?: string;
  orientation?: 'portrait' | 'landscape';
  pageSize?: 'A4' | 'A3' | 'Letter';
}

export interface ExportColumn {
  key: string;
  title: string;
  width?: number;
  format?: (value: any) => string;
}

export interface ExportData {
  title?: string;
  columns: Record<string, string>;
  rows: Record<string, any>[];
  metadata?: Record<string, any>;
}

export interface ExportTemplate {
  id: string;
  name: string;
  description?: string;
  format: ExportFormat;
  options: ExportOptions;
  columns: string[];
  filters?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface ExportSchedule {
  id: string;
  name: string;
  description?: string;
  templateId: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  time: string;
  timezone: string;
  recipients: string[];
  enabled: boolean;
  lastRun?: string;
  nextRun?: string;
  createdAt: string;
  updatedAt: string;
}