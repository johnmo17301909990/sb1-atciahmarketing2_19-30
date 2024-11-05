import { createClient } from '@supabase/supabase-js';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export async function migrate(direction: 'up' | 'down') {
  const migrationsPath = join(process.cwd(), 'supabase/migrations');
  const migrations = readdirSync(migrationsPath)
    .filter(f => f.endsWith('.sql'))
    .sort();

  if (direction === 'down') {
    migrations.reverse();
  }

  for (const migration of migrations) {
    const sql = readFileSync(join(migrationsPath, migration), 'utf-8');
    await supabase.rpc('run_migration', {
      name: migration,
      sql: sql,
    });
  }
}