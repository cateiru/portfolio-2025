import { TerminalCommand, ProfileData } from '@/types/profile'

export function createTerminalCommands(profile: ProfileData): TerminalCommand[] {
  return [
    {
      name: 'help',
      description: '利用可能なコマンドを表示します',
      execute: () => {
        return `利用可能なコマンド:
  help      - このヘルプを表示
  profile   - プロフィール情報を表示
  blog      - ブログURLを表示
  x         - X (Twitter) URLを表示
  twitter   - X (Twitter) URLを表示
  clear     - 画面をクリア
  whoami    - ユーザー情報を表示
  date      - 現在の日時を表示
  ls        - 利用可能な情報一覧を表示
  w         - システム情報を表示
  pwd       - 現在のディレクトリパスを表示
  echo      - 引数をそのまま出力
  exit      - ターミナルを終了（タブを閉じる）`
      }
    },
    {
      name: 'profile',
      description: 'プロフィール情報を表示',
      execute: () => {
        return `名前: ${profile.name}
誕生日: ${profile.birthday}
所属: ${profile.affiliation}`
      }
    },
    {
      name: 'blog',
      description: 'ブログURLを表示',
      execute: () => {
        return profile.blogUrl
      }
    },
    {
      name: 'x',
      description: 'X (Twitter) URLを表示',
      execute: () => {
        return profile.xUrl
      }
    },
    {
      name: 'twitter',
      description: 'X (Twitter) URLを表示',
      execute: () => {
        return profile.xUrl
      }
    },
    {
      name: 'clear',
      description: '画面をクリア',
      execute: () => {
        // 特別な処理が必要なコマンド（実際の処理はTerminal.tsxで実装）
        return '__CLEAR_TERMINAL__'
      }
    },
    {
      name: 'whoami',
      description: 'ユーザー情報を表示',
      execute: () => {
        return profile.name
      }
    },
    {
      name: 'date',
      description: '現在の日時を表示',
      execute: () => {
        return new Date().toLocaleString('ja-JP')
      }
    },
    {
      name: 'ls',
      description: '利用可能な情報一覧を表示',
      execute: () => {
        return `profile    blog       x          twitter`
      }
    },
    {
      name: 'w',
      description: 'システム情報を表示',
      execute: () => {
        const uptime = Math.floor(Date.now() / 1000 / 60) // 分単位のアップタイム
        const loadAvg = (Math.random() * 2).toFixed(2)
        return ` ${new Date().toLocaleTimeString('ja-JP')}  up ${uptime} min,  1 user,  load average: ${loadAvg}, ${(Math.random() * 2).toFixed(2)}, ${(Math.random() * 2).toFixed(2)}
USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
${profile.name}   console  -                ${new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}     0.00s  0.00s  0.00s portfolio-terminal`
      }
    },
    {
      name: 'exit',
      description: 'ターミナルを終了（タブを閉じる）',
      execute: () => {
        window.close()
        return 'ターミナルを終了しています...'
      }
    },
    {
      name: 'echo',
      description: '引数をそのまま出力',
      execute: (args: string[]) => {
        return args?.join(' ') || ''
      }
    },
    {
      name: 'pwd',
      description: '現在のディレクトリパスを表示',
      execute: () => {
        return `/home/${profile.name.toLowerCase()}/portfolio`
      }
    }
  ]
}

export function findCommand(commands: TerminalCommand[], commandName: string): TerminalCommand | undefined {
  return commands.find(cmd => cmd.name === commandName)
}