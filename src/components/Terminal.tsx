'use client'

import { useState, useEffect, useRef } from 'react'
import { TerminalOutput, TerminalCommand, ProfileData } from '@/types/profile'
import { generateWelcomeLogo } from '@/utils/logo'

interface TerminalProps {
  profile: ProfileData
}

export function Terminal({ profile }: TerminalProps) {
  const [outputs, setOutputs] = useState<TerminalOutput[]>([])
  const [currentCommand, setCurrentCommand] = useState('')
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  const commands: TerminalCommand[] = [
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
  ls        - 利用可能な情報一覧を表示`
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
        return `ブログ: ${profile.blogUrl}`
      }
    },
    {
      name: 'x',
      description: 'X (Twitter) URLを表示',
      execute: () => {
        return `X (Twitter): ${profile.xUrl}`
      }
    },
    {
      name: 'twitter',
      description: 'X (Twitter) URLを表示',
      execute: () => {
        return `X (Twitter): ${profile.xUrl}`
      }
    },
    {
      name: 'clear',
      description: '画面をクリア',
      execute: () => {
        setOutputs([])
        return ''
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
    }
  ]

  useEffect(() => {
    // 初期メッセージを表示
    const logo = generateWelcomeLogo()
    const logoOutput: TerminalOutput = {
      id: 'logo',
      command: '',
      output: logo,
      timestamp: new Date()
    }
    const welcomeOutput: TerminalOutput = {
      id: 'welcome-text',
      command: '',
      output: `Welcome to ${profile.name}'s Portfolio Terminal!
Type 'help' to see available commands.`,
      timestamp: new Date()
    }
    setOutputs([logoOutput, welcomeOutput])
  }, [profile.name])

  useEffect(() => {
    // 入力フィールドにフォーカスを当てる
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [outputs])

  useEffect(() => {
    // ページロード時とクリック時にフォーカスを当てる
    const handleClick = () => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }

    document.addEventListener('click', handleClick)
    
    // 初期フォーカス
    if (inputRef.current) {
      inputRef.current.focus()
    }

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [])

  useEffect(() => {
    // スクロールを最下部に移動
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [outputs])

  const executeCommand = (commandInput: string) => {
    const trimmedCommand = commandInput.trim()
    if (!trimmedCommand) return

    const [commandName, ...args] = trimmedCommand.split(' ')
    const command = commands.find(cmd => cmd.name === commandName)

    let output: string
    if (command) {
      if (commandName === 'clear') {
        command.execute()
        return
      }
      output = command.execute(args)
    } else {
      output = `Command not found: ${commandName}. Type 'help' for available commands.`
    }

    const newOutput: TerminalOutput = {
      id: Date.now().toString(),
      command: trimmedCommand,
      output,
      timestamp: new Date()
    }

    setOutputs(prev => [...prev, newOutput])
    
    // コマンド履歴に追加
    setCommandHistory(prev => [...prev, trimmedCommand])
    setHistoryIndex(-1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    executeCommand(currentCommand)
    setCurrentCommand('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1)
        setHistoryIndex(newIndex)
        setCurrentCommand(commandHistory[newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex >= 0) {
        const newIndex = historyIndex + 1
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1)
          setCurrentCommand('')
        } else {
          setHistoryIndex(newIndex)
          setCurrentCommand(commandHistory[newIndex])
        }
      }
    }
  }

  return (
    <div className="terminal" ref={terminalRef}>
      <div className="terminal-header">
        <div className="terminal-buttons">
          <div className="terminal-button close"></div>
          <div className="terminal-button minimize"></div>
          <div className="terminal-button maximize"></div>
        </div>
        <div className="terminal-title">{profile.name}@portfolio: ~</div>
      </div>
      
      <div className="terminal-body">
        {outputs.map((output) => (
          <div key={output.id} className="terminal-output" data-id={output.id}>
            {output.command && (
              <div className="terminal-command-line">
                <span className="terminal-prompt">user@{profile.name}:~$</span>
                <span className="terminal-command">{output.command}</span>
              </div>
            )}
            {output.output && (
              <div className="terminal-result">
                {output.output.split('\n').map((line, index) => (
                  <div key={index}>{line}</div>
                ))}
              </div>
            )}
          </div>
        ))}
        
        <form onSubmit={handleSubmit} className="terminal-input-form">
          <div className="terminal-input-line">
            <span className="terminal-prompt">user@{profile.name}:~$</span>
            <div className="terminal-input-container">
              <span className="terminal-input-text">{currentCommand}</span>
              <span className="terminal-cursor">█</span>
              <input
                ref={inputRef}
                type="text"
                value={currentCommand}
                onChange={(e) => setCurrentCommand(e.target.value)}
                onKeyDown={handleKeyDown}
                className="terminal-input"
                spellCheck={false}
                autoComplete="off"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}