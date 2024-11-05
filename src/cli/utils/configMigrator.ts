import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { Config } from '../types/config';
import { validateConfig } from './configValidator';
import { configTemplates } from '../templates/config';
import chalk from 'chalk';

const CONFIG_PATH = join(process.cwd(), '.dmprc.json');
const MIGRATIONS_PATH = join(process.cwd(), 'config/migrations');

interface ConfigMigration {
  version: string;
  description: string;
  up: (config: Config) => Config;
  down: (config: Config) => Config;
}

export async function migrateConfig(fromVersion?: string, toVersion?: string) {
  try {
    // 读取当前配置
    const currentConfig = loadConfig();
    
    // 获取所有迁移
    const migrations = loadMigrations();
    
    // 确定迁移范围
    const { start, end, direction } = determineMigrationRange(
      migrations,
      fromVersion,
      toVersion,
      currentConfig.version
    );

    if (start === end) {
      console.log(chalk.yellow('No migration needed'));
      return;
    }

    // 执行迁移
    let migratedConfig = { ...currentConfig };
    const migrationPath = direction === 'up' ? 
      migrations.slice(start, end + 1) :
      migrations.slice(end, start + 1).reverse();

    for (const migration of migrationPath) {
      console.log(chalk.blue(`Migrating ${direction}: ${migration.description}`));
      
      migratedConfig = direction === 'up' ?
        migration.up(migratedConfig) :
        migration.down(migratedConfig);

      // 验证迁移后的配置
      const errors = validateConfig(migratedConfig);
      if (errors.length > 0) {
        throw new Error(`Migration validation failed:\n${errors.join('\n')}`);
      }

      // 更新版本
      migratedConfig.version = direction === 'up' ? 
        migration.version :
        migrations[Math.max(0, migrations.indexOf(migration) - 1)].version;
    }

    // 保存迁移后的配置
    saveConfig(migratedConfig);
    console.log(chalk.green(`Configuration migrated to version ${migratedConfig.version}`));

  } catch (error) {
    throw new Error(`Config migration failed: ${error.message}`);
  }
}

function loadConfig(): Config {
  try {
    const content = readFileSync(CONFIG_PATH, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return { version: '0.0.0' };
    }
    throw error;
  }
}

function saveConfig(config: Config) {
  writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
}

function loadMigrations(): ConfigMigration[] {
  return [
    {
      version: '0.1.0',
      description: 'Add platform settings',
      up: (config: Config) => ({
        ...config,
        version: '0.1.0',
        defaultPlatform: config.defaultPlatform || 'tmall',
        apiEndpoint: config.apiEndpoint || 'http://localhost:3000'
      }),
      down: (config: Config) => {
        const { defaultPlatform, apiEndpoint, ...rest } = config;
        return {
          ...rest,
          version: '0.0.0'
        };
      }
    },
    {
      version: '0.2.0',
      description: 'Add analytics settings',
      up: (config: Config) => ({
        ...config,
        version: '0.2.0',
        defaultDateRange: config.defaultDateRange || '30d',
        cacheTimeout: config.cacheTimeout || '3600'
      }),
      down: (config: Config) => {
        const { defaultDateRange, cacheTimeout, ...rest } = config;
        return {
          ...rest,
          version: '0.1.0'
        };
      }
    },
    {
      version: '0.3.0',
      description: 'Add logging settings',
      up: (config: Config) => ({
        ...config,
        version: '0.3.0',
        logLevel: config.logLevel || 'info',
        logFormat: config.logFormat || 'json'
      }),
      down: (config: Config) => {
        const { logLevel, logFormat, ...rest } = config;
        return {
          ...rest,
          version: '0.2.0'
        };
      }
    }
  ];
}

function determineMigrationRange(
  migrations: ConfigMigration[],
  fromVersion?: string,
  toVersion?: string,
  currentVersion?: string
): { start: number; end: number; direction: 'up' | 'down' } {
  const versions = migrations.map(m => m.version);
  
  // 确定起始版本
  const startVersion = fromVersion || currentVersion || '0.0.0';
  const startIndex = versions.indexOf(startVersion);
  if (startIndex === -1) {
    throw new Error(`Invalid start version: ${startVersion}`);
  }

  // 确定目标版本
  const endVersion = toVersion || versions[versions.length - 1];
  const endIndex = versions.indexOf(endVersion);
  if (endIndex === -1) {
    throw new Error(`Invalid target version: ${endVersion}`);
  }

  return {
    start: Math.min(startIndex, endIndex),
    end: Math.max(startIndex, endIndex),
    direction: startIndex <= endIndex ? 'up' : 'down'
  };
}