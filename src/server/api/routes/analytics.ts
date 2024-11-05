import express from 'express';
import { AnalyticsService } from '../services/AnalyticsService';
import { DataSyncService } from '../services/DataSyncService';

const router = express.Router();
const analyticsService = new AnalyticsService();
const dataSyncService = new DataSyncService();

// Get analytics data
router.get('/:platformId/:type', async (req, res) => {
  try {
    const { platformId, type } = req.params;
    const { dateRange } = req.query;

    const data = await analyticsService.getAnalytics(
      platformId,
      type,
      dateRange as string
    );

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch analytics data' });
  }
});

// Trigger data sync
router.post('/:platformId/sync', async (req, res) => {
  try {
    const { platformId } = req.params;
    const result = await dataSyncService.syncPlatformData(platformId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Data sync failed' });
  }
});

export default router;