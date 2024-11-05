import { syncService } from '../../services/syncService';
import { supabaseService } from '../../services/supabaseService';

export async function syncData(options: any) {
  try {
    if (options.platform) {
      await syncService.syncPlatformData(options.platform);
      console.log(`Synced platform: ${options.platform}`);
    }

    if (options.all) {
      const platforms = await supabaseService.getPlatforms();
      for (const platform of platforms) {
        await syncService.syncPlatformData(platform.id);
        console.log(`Synced platform: ${platform.id}`);
      }
    }
  } catch (error) {
    console.error('Sync failed:', error);
    process.exit(1);
  }
}