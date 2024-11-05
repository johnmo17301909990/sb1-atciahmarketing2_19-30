import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface Report {
  id: string;
  name: string;
  type: string;
  schedule?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    time: string;
    timezone: string;
  };
  recipients?: string[];
  lastGenerated?: string;
  status: 'pending' | 'generating' | 'completed' | 'error';
  error?: string;
}

interface ReportState {
  reports: Report[];
  schedules: {
    [reportId: string]: {
      frequency: 'daily' | 'weekly' | 'monthly';
      time: string;
      timezone: string;
      recipients: string[];
    };
  };
  addReport: (report: Report) => void;
  updateReport: (id: string, updates: Partial<Report>) => void;
  deleteReport: (id: string) => void;
  setReportStatus: (id: string, status: Report['status'], error?: string) => void;
  scheduleReport: (reportId: string, schedule: Report['schedule']) => void;
  unscheduleReport: (reportId: string) => void;
}

export const useReportStore = create<ReportState>()(
  devtools(
    persist(
      (set) => ({
        reports: [],
        schedules: {},

        addReport: (report) =>
          set((state) => ({
            reports: [...state.reports, report],
          })),

        updateReport: (id, updates) =>
          set((state) => ({
            reports: state.reports.map((report) =>
              report.id === id ? { ...report, ...updates } : report
            ),
          })),

        deleteReport: (id) =>
          set((state) => ({
            reports: state.reports.filter((report) => report.id !== id),
            schedules: Object.fromEntries(
              Object.entries(state.schedules).filter(([reportId]) => reportId !== id)
            ),
          })),

        setReportStatus: (id, status, error) =>
          set((state) => ({
            reports: state.reports.map((report) =>
              report.id === id
                ? {
                    ...report,
                    status,
                    error,
                    lastGenerated: status === 'completed' ? new Date().toISOString() : report.lastGenerated,
                  }
                : report
            ),
          })),

        scheduleReport: (reportId, schedule) =>
          set((state) => ({
            schedules: {
              ...state.schedules,
              [reportId]: schedule,
            },
          })),

        unscheduleReport: (reportId) =>
          set((state) => {
            const schedules = { ...state.schedules };
            delete schedules[reportId];
            return { schedules };
          }),
      }),
      {
        name: 'report-store',
      }
    )
  )
);