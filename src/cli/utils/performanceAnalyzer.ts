import { performance } from 'perf_hooks';
import { supabase } from '../../lib/supabase';

interface QueryMetrics {
  query: string;
  avgTime: number;
  minTime: number;
  maxTime: number;
  count: number;
}

export async function analyzeQueryPerformance(duration: number): Promise<QueryMetrics[]> {
  const metrics: Map<string, QueryMetrics> = new Map();
  const endTime = Date.now() + duration * 1000;

  while (Date.now() < endTime) {
    await analyzeQueries(metrics);
  }

  return Array.from(metrics.values());
}

async function analyzeQueries(metrics: Map<string, QueryMetrics>) {
  const queries = [
    {
      name: 'Select Analytics',
      fn: () => supabase.from('analytics').select('*').limit(100)
    },
    {
      name: 'Select Platforms',
      fn: () => supabase.from('platforms').select('*')
    },
    {
      name: 'Join Query',
      fn: () => supabase
        .from('analytics')
        .select('*, platforms(*)')
        .limit(50)
    }
  ];

  for (const query of queries) {
    const startTime = performance.now();
    await query.fn();
    const endTime = performance.now();
    const executionTime = endTime - startTime;

    updateMetrics(metrics, query.name, executionTime);
  }
}

function updateMetrics(metrics: Map<string, QueryMetrics>, query: string, time: number) {
  const current = metrics.get(query) || {
    query,
    avgTime: 0,
    minTime: time,
    maxTime: time,
    count: 0
  };

  const newCount = current.count + 1;
  const newAvg = (current.avgTime * current.count + time) / newCount;

  metrics.set(query, {
    query,
    avgTime: newAvg,
    minTime: Math.min(current.minTime, time),
    maxTime: Math.max(current.maxTime, time),
    count: newCount
  });
}