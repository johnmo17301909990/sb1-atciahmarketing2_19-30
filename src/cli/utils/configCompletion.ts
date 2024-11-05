import { ConfigKey, configOptions, configDescriptions } from './configValidator';
import { writeFileSync } from 'fs';
import { join } from 'path';

const COMPLETION_SCRIPT = `
###-begin-dmp-completions-###
_dmp_completions() {
  local cur prev opts
  COMPREPLY=()
  cur="\${COMP_WORDS[COMP_CWORD]}"
  prev="\${COMP_WORDS[COMP_CWORD-1]}"

  # 主命令补全
  if [ $COMP_CWORD -eq 1 ]; then
    opts="config generate sync migrate analyze generate-test-data"
    COMPREPLY=( $(compgen -W "$opts" -- $cur) )
    return 0
  }

  # 子命令补全
  case "\${COMP_WORDS[1]}" in
    config)
      case "$prev" in
        config)
          opts="--get --set --value --delete"
          ;;
        --get|--set|--delete)
          opts="defaultPlatform apiEndpoint defaultDateRange logLevel cacheTimeout"
          ;;
        --value)
          case "\${COMP_WORDS[3]}" in
            defaultPlatform)
              opts="tmall jd"
              ;;
            defaultDateRange)
              opts="7d 30d 90d 1y"
              ;;
            logLevel)
              opts="debug info warn error"
              ;;
            *)
              return 0
              ;;
          esac
          ;;
        *)
          return 0
          ;;
      esac
      COMPREPLY=( $(compgen -W "$opts" -- $cur) )
      return 0
      ;;
    *)
      return 0
      ;;
  esac
}

complete -F _dmp_completions dmp
###-end-dmp-completions-###
`;

export function generateCompletionScript(): string {
  return COMPLETION_SCRIPT;
}

export function installCompletions() {
  const bashrcPath = join(process.env.HOME || '', '.bashrc');
  const zshrcPath = join(process.env.HOME || '', '.zshrc');

  try {
    // 为 Bash 安装补全
    writeFileSync(bashrcPath, `\n${COMPLETION_SCRIPT}`, { flag: 'a' });
    console.log('Bash completions installed successfully');

    // 为 Zsh 安装补全
    writeFileSync(zshrcPath, `\n${COMPLETION_SCRIPT}`, { flag: 'a' });
    console.log('Zsh completions installed successfully');

    console.log('\nPlease restart your shell or run:');
    console.log('  source ~/.bashrc  # for Bash');
    console.log('  source ~/.zshrc   # for Zsh');
  } catch (error) {
    console.error('Failed to install completions:', error);
  }
}