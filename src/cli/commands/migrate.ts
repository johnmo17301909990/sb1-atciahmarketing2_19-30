import { migrate } from '../utils/dbMigrator';
import { migrateConfig } from '../utils/configMigrator';
import chalk from 'chalk';

interface MigrateOptions {
  up?: boolean;
  down?: boolean;
  config?: boolean;
  to?: string;
  from?: string;
}

export async function migrateDb(options: MigrateOptions) {
  try {
    if (options.config) {
      await migrateConfig(options.from, options.to);
      console.log(chalk.green('Configuration migration completed'));
      return;
    }

    if (options.up) {
      await migrate('up');
      console.log(chalk.green('Database migrations completed'));
    }

    if (options.down) {
      await migrate('down');
      console.log(chalk.green('Database rollback completed'));
    }
  } catch (error) {
    console.error(chalk.red('Migration failed:'), error);
    process.exit(1);
  }
}