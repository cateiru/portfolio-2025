import type { ProfileData, TerminalCommand } from "@/types/profile"

export function createTerminalCommands(profile: ProfileData): TerminalCommand[] {
  return [
    {
      name: "help",
      description: "利用可能なコマンドを表示します",
      execute: () => {
        return `利用可能なコマンド:
  profile   - プロフィール情報を表示
  blog      - ブログURLを表示
  x         - X (Twitter) URLを表示
  brand     - ブランドカラー情報を表示
  theme     - テーマを変更 (dark/light/system)`
      },
    },
    {
      name: "profile",
      description: "プロフィール情報を表示",
      execute: () => {
        return `名前: ${profile.name}
誕生日: ${profile.birthday}
所属: ${profile.affiliation}`
      },
    },
    {
      name: "blog",
      description: "ブログURLを表示",
      execute: () => {
        return profile.blogUrl
      },
    },
    {
      name: "x",
      description: "X (Twitter) URLを表示",
      execute: () => {
        return profile.xUrl
      },
    },
    {
      name: "twitter",
      description: "X (Twitter) URLを表示",
      execute: () => {
        return profile.xUrl
      },
    },
    {
      name: "brand",
      description: "ブランドカラー情報を表示",
      execute: () => {
        return `
┌─ プライマリーカラー ───────────────────────────────────┐
│  #2bc4cf  Teal/Cyan (primary)                     │
│  #572bcf  Purple (secondary)                      │
│  #cf2ba1  Pink (accent)                           │
└─────────────────────────────────────────────────────┘

┌─ グラデーション ──────────────────────────────────────┐
│  Gradient 1: #2bc4cf → #572bcf → #cf2ba1       │
│  Gradient 2: #17c9c9 → #336cff                  │
│  Gradient 3: #e23d3d → #ec44bd                  │
└─────────────────────────────────────────────────────┘

┌─ その他のカラー ──────────────────────────────────────┐
│  #ffffff  White (background/accent)               │
│  #242838  Dark Navy (background)                  │
│  #1f1f1f  Very Dark Gray (dark theme)             │
│  #e8e8e8  Light Gray (text)                       │
└─────────────────────────────────────────────────────┘
`
      },
    },
    {
      name: "clear",
      description: "画面をクリア",
      execute: () => {
        // 特別な処理が必要なコマンド（実際の処理はTerminal.tsxで実装）
        return "__CLEAR_TERMINAL__"
      },
    },
    {
      name: "whoami",
      description: "ユーザー情報を表示",
      execute: () => {
        return profile.name
      },
    },
    {
      name: "date",
      description: "現在の日時を表示",
      execute: () => {
        return new Date().toLocaleString("ja-JP")
      },
    },
    {
      name: "ls",
      description: "利用可能な情報一覧を表示",
      execute: () => {
        return `profile    blog       x          twitter`
      },
    },
    {
      name: "w",
      description: "システム情報を表示",
      execute: () => {
        const uptime = Math.floor(Date.now() / 1000 / 60) // 分単位のアップタイム
        const loadAvg = (Math.random() * 2).toFixed(2)
        return ` ${new Date().toLocaleTimeString("ja-JP")}  up ${uptime} min,  1 user,  load average: ${loadAvg}, ${(
          Math.random() * 2
        ).toFixed(2)}, ${(Math.random() * 2).toFixed(2)}
USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
${profile.name}   console  -                ${new Date().toLocaleTimeString("ja-JP", {
          hour: "2-digit",
          minute: "2-digit",
        })}     0.00s  0.00s  0.00s portfolio-terminal`
      },
    },
    {
      name: "exit",
      description: "ターミナルを終了（タブを閉じる）",
      execute: () => {
        window.close()
        return "ターミナルを終了しています..."
      },
    },
    {
      name: "echo",
      description: "引数をそのまま出力",
      execute: (args: string[] | undefined) => {
        return args?.join(" ") || ""
      },
    },
    {
      name: "pwd",
      description: "現在のディレクトリパスを表示",
      execute: () => {
        return `/home/${profile.name.toLowerCase()}/portfolio`
      },
    },
    {
      name: "theme",
      description: "テーマを変更 (dark/light/system)",
      execute: (args: string[] | undefined) => {
        if (!args || args.length === 0) {
          return "エラー: テーマを指定してください。ヘルプ: theme --help"
        }

        const subcommand = args[0]

        if (subcommand === "--help") {
          return `テーマコマンド:
  theme dark     - ダークテーマに変更
  theme light    - ライトテーマに変更
  theme system   - システムテーマに変更 (デフォルト)
  theme --help   - このヘルプを表示`
        }

        if (!["dark", "light", "system"].includes(subcommand)) {
          return `エラー: 無効なテーマ '${subcommand}'。利用可能: dark, light, system`
        }

        // テーマを適用
        const root = document.documentElement
        if (subcommand === "dark") {
          root.setAttribute("data-theme", "dark")
        } else if (subcommand === "light") {
          root.setAttribute("data-theme", "light")
        } else {
          root.removeAttribute("data-theme")
        }

        // localStorageに保存
        localStorage.setItem("theme", subcommand)

        return `テーマを '${subcommand}' に変更しました`
      },
    },
  ]
}

export function findCommand(commands: TerminalCommand[], commandName: string): TerminalCommand | undefined {
  return commands.find(cmd => cmd.name === commandName)
}
