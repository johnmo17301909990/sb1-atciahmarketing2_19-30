import { useMutation } from '@apollo/client';
import { GENERATE_REPORT, SCHEDULE_REPORT } from '../graphql/mutations';

export function useReportGeneration() {
  const [generateReport, { loading: generateLoading }] = useMutation(GENERATE_REPORT);
  const [scheduleReport, { loading: scheduleLoading }] = useMutation(SCHEDULE_REPORT);

  const generateNewReport = async (input: any) => {
    try {
      const { data } = await generateReport({
        variables: { input },
      });
      return data.generateReport;
    } catch (error) {
      throw new Error('Failed to generate report: ' + error.message);
    }
  };

  const scheduleNewReport = async (input: any) => {
    try {
      const { data } = await scheduleReport({
        variables: { input },
      });
      return data.scheduleReport;
    } catch (error) {
      throw new Error('Failed to schedule report: ' + error.message);
    }
  };

  return {
    generateNewReport,
    scheduleNewReport,
    loading: generateLoading || scheduleLoading,
  };
}