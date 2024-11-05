import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { Config, ConfigKey } from '../types/config';
import { validateConfigValue, validateConfig, configOptions, configDescriptions } from '../utils/configValidator';
import { configTemplates } from '../templates/config';
import chalk from 'chalk';

const CONFIG_PATH = join(process.cwd(), '.dmprc.json');

interface ConfigOptions {
  get?: ConfigKey;
  set?: string;
  value?: string;
  delete?: ConfigKey;
  list?: boolean;
  template?: string;
  saveTemplate?: string;
  listTemplates?: boolean;
}

export async function manageConfig(options: ConfigOptions) {
  try {
    let config = loadConfig();

    if (options.listTemplates) {
      listTemplates();
      return;
    }

    if (options.template) {
      await applyTemplate(options.template);
      return;
    }

    if (options.saveTemplate) {
      await saveAsTemplate(options.saveTemplate);
      return;
    }

    if (options.list) {
      listConfig(config);
      return;
    }

    if (options.get) {
      const value = config[options.get];
      if (value === undefined) {
        console.log(chalk.yellow(`Warning: Configuration '${options.get}' is not set`));
        console.log(chalk.gray(`Description: ${configDescriptions[options.get]}`));
        if (configOptions[options.get].length > 0) {
          console.log(chalk.gray(`Available values: ${configOptions[options.get].join(', ')}`));
        }
      } else {
        console.log(`${options.get}: ${chalk.green(value)}`);
      }
    }

    if (options.set && options.value) {
      const error = validateConfigValue(options.set as ConfigKey, options.value);
      if (error) {
        console.error(chalk.red(`Error: ${error}`));
        return;
      }

      config = {
        ...config,
        [options.set]: options.value
      };

      const errors = validateConfig(config);
      if (errors.length > 0) {
        console.error(chalk.red('Configuration validation failed:'));
        errors.forEach(err => console.error(chalk.red(`- ${err}`)));
        return;
      }

      saveConfig(config);
      console.log(chalk.green(`Set ${options.set} = ${options.value}`));
    }

    if (options.delete) {
      if (config[options.delete] === undefined) {
        console.error(chalk.yellow(`Warning: Configuration '${options.delete}' does not exist`));
        return;
      }

      delete config[options.delete];
      saveConfig(config);
      console.log(chalk.green(`Deleted ${options.delete}`));
    }
  } catch (error) {
    console.error(chalk.red('Config management failed:'), error);
    process.exit(1);
  }
}

function loadConfig(): Config {
  try {
    const content = readFileSync(CONFIG_PATH, 'utf-8');
    const config = JSON.parse(content);
    const errors = validateConfig(config);
    if (errors.length > 0) {
      console.warn(chalk.yellow('Warning: Configuration validation issues found:'));
      errors.forEach(err => console.warn(chalk.yellow(`- ${err}`)));
    }
    return config;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return {};
    }
    throw error;
  }
}

function saveConfig(config: Config) {
  writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
}

function listConfig(config: Config) {
  console.log(chalk.bold('\nCurrent Configuration:'));
  console.log('=====================\n');

  Object.keys(configDescriptions).forEach((key) => {
    const value = config[key];
    console.log(chalk.bold(key));
    console.log(chalk.gray(`Description: ${configDescriptions[key]}`));
    if (configOptions[key].length > 0) {
      console.log(chalk.gray(`Available values: ${configOptions[key].join(', ')}`));
    }
    if (value === undefined) {
      console.log(chalk.yellow('Status: Not set'));
    } else {
      console.log(chalk.green(`Value: ${value}`));
    }
    console.log('');
  });
}

function listTemplates() {
  console.log(chalk.bold('\nAvailable Configuration Templates:'));
  console.log('================================\n');

  Object.entries(configTemplates).forEach(([name, template]) => {
    console.log(chalk.bold(name));
    Object.entries(template).forEach(([key, value]) => {
      console.log(chalk.gray(`  ${key}: ${value}`));
    });
    console.log('');
  });
}

async function applyTemplate(templateName: string) {
  const template = configTemplates[templateName];
  if (!template) {
    console.error(chalk.red(`Template '${templateName}' not found`));
    console.log(chalk.yellow('\nAvailable templates:'));
    Object.keys(configTemplates).forEach(name => {
      console.log(`  - ${name}`);
    });
    return;
  }

  const errors = validateConfig(template);
  if (errors.length > 0) {
    console.error(chalk.red('Template validation failed:'));
    errors.forEach(err => console.error(chalk.red(`- ${err}`)));
    return;
  }

  saveConfig(template);
  console.log(chalk.green(`Applied template '${templateName}'`));
  console.log('\nNew configuration:');
  listConfig(template);
}

async function saveAsTemplate(templateName: string) {
  const config = loadConfig();
  const errors = validateConfig(config);
  if (errors.length > 0) {
    console.error(chalk.red('Current configuration is invalid:'));
    errors.forEach(err => console.error(chalk.red(`- ${err}`)));
    return;
  }

  const templatePath = join(__dirname, '../templates/config.ts');
  const templateContent = readFileSync(templatePath, 'utf-8');
  const updatedContent = templateContent.replace(
    /export const configTemplates: Record<string, Config> = {/,
    `export const configTemplates: Record<string, Config> = {\n  ${templateName}: ${JSON.stringify(config, null, 2)},`
  );

  writeFileSync(templatePath, updatedContent);
  console.log(chalk.green(`Saved current configuration as template '${templateName}'`));
}