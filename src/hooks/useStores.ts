import { useAnalyticsStore } from '../stores/analyticsStore';
import { usePlatformStore } from '../stores/platformStore';
import { useUIStore } from '../stores/uiStore';
import { useSyncStore } from '../stores/syncStore';
import { useFilterStore } from '../stores/filterStore';
import { useReportStore } from '../stores/reportStore';

export function useStores() {
  const analytics = useAnalyticsStore();
  const platform = usePlatformStore();
  const ui = useUIStore();
  const sync = useSyncStore();
  const filter = useFilterStore();
  const report = useReportStore();

  return {
    analytics,
    platform,
    ui,
    sync,
    filter,
    report,
  };
}