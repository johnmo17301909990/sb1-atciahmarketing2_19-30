import { supabase } from '../../lib/supabase';
import { generateMockData } from '../utils/mockDataGenerator';

interface TestDataOptions {
  platform?: string;
  days?: number;
  scale?: 'small' | 'medium' | 'large';
}

export async function generateTestData(options: TestDataOptions) {
  try {
    const { platform = 'all', days = 30, scale = 'medium' } = options;
    const mockData = generateMockData(days, scale);

    if (platform === 'all') {
      const { data: platforms } = await supabase.from('platforms').select('id,type');
      for (const p of platforms || []) {
        await insertTestData(p.id, p.type, mockData);
        console.log(`Generated test data for platform: ${p.id}`);
      }
    } else {
      const { data: p } = await supabase
        .from('platforms')
        .select('id,type')
        .eq('id', platform)
        .single();
      
      if (p) {
        await insertTestData(p.id, p.type, mockData);
        console.log(`Generated test data for platform: ${p.id}`);
      }
    }
  } catch (error) {
    console.error('Test data generation failed:', error);
    process.exit(1);
  }
}

async function insertTestData(platformId: string, type: string, data: any) {
  const { error } = await supabase.from('analytics').insert([
    {
      platform_id: platformId,
      type: 'test_data',
      date_range: 'last_30d',
      data: data[type]
    }
  ]);

  if (error) throw error;
}