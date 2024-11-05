#!/usr/bin/env node
import { Command } from 'commander';
import { generateService } from './commands/generate';
import { syncData } from './commands/sync';
import { migrateDb } from './commands/migrate';
import { generateTestData } from './commands/generate-test-data';
import { analyzePerformance } from './commands/analyze-performance';
import { manageConfig } from './commands/config';
import { installCompletions } from './utils/configCompletion';
import chalk from 'chalk';

const program = new Command();

program
  .name('dmp')
  .description('Digital Marketing Analytics Platform CLI')
  .version('0.1.0');

// 配置管理
program
  .command('config')
  .description('Manage configuration')
  .option('-g, --get <key>', 'Get config value')
  .option('-s, --set <key>', 'Set config key')
  .option('-v, --value <value>', 'Config value')
  .option('-d, --delete <key>', 'Delete config key')
  .option('-l, --list', 'List all configurations')
  .option('-t, --template <name>', 'Apply configuration template')
  .option('--save-template <name>', 'Save current config as template')
  .option('--list-templates', 'List available templates')
  .action(manageConfig);

// 迁移命令
program
  .command('migrate')
  .description('Run migrations')
  .option('-u, --up', 'Run all pending migrations')
  .option('-d, --down', 'Rollback last migration')
  .option('-c, --config', 'Migrate configuration')
  .option('--from <version>', 'Start version for config migration')
  .option('--to <version>', 'Target version for config migration')
  .action(migrateDb);

// ... 其他命令保持不变 ...

program.parse();