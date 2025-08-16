'use client'

import { useState, useEffect, useRef } from 'react'
import { TerminalOutput, ProfileData } from '@/types/profile'
import { generateWelcomeLogo } from '@/utils/logo'
import { createTerminalCommands, findCommand } from '@/utils/terminal-commands'
import { convertTextContent, isElementVisible, scrollToElement } from '@/utils/terminal-utils'

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
  const inputFormRef = useRef<HTMLDivElement>(null)

  // コマンド定義を初期化
  const commands = createTerminalCommands(profile)

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
    // ページロード時とクリック時にフォーカスを当てる（ただし、テキスト選択中は除く）
    const handleClick = (event: MouseEvent) => {
      // テキスト選択中かどうかをチェック
      const selection = window.getSelection()
      const hasTextSelection = selection && selection.toString().length > 0
      
      // テキスト選択中でない場合のみフォーカスを当てる
      if (!hasTextSelection && inputRef.current) {
        inputRef.current.focus()
      }
    }

    const handleMouseUp = () => {
      // マウスアップ時に選択があるかチェックし、なければフォーカスを当てる
      setTimeout(() => {
        const selection = window.getSelection()
        const hasTextSelection = selection && selection.toString().length > 0
        
        if (!hasTextSelection && inputRef.current) {
          inputRef.current.focus()
        }
      }, 10) // 少し遅延させて選択状態を正確に取得
    }

    document.addEventListener('click', handleClick)
    document.addEventListener('mouseup', handleMouseUp)
    
    // 初期フォーカス
    if (inputRef.current) {
      inputRef.current.focus()
    }

    return () => {
      document.removeEventListener('click', handleClick)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  useEffect(() => {
    // スクロールを最下部に移動
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [outputs])

  useEffect(() => {
    // コマンド入力時の自動スクロール（デバウンス付き）
    const scrollToInputIfNeeded = () => {
      if (!inputFormRef.current || !terminalRef.current) return

      const isVisible = isElementVisible(inputFormRef.current, terminalRef.current)
      if (!isVisible) {
        scrollToElement(inputFormRef.current)
      }
    }

    // デバウンス処理
    const timeoutId = setTimeout(scrollToInputIfNeeded, 100)
    
    return () => clearTimeout(timeoutId)
  }, [currentCommand])

  const executeCommand = (commandInput: string) => {
    const trimmedCommand = commandInput.trim()

    // 空のコマンドの場合は空の出力で履歴に追加
    if (!trimmedCommand) {
      const newOutput: TerminalOutput = {
        id: Date.now().toString(),
        command: '',
        output: '',
        timestamp: new Date()
      }
      setOutputs(prev => [...prev, newOutput])
      return
    }

    const [commandName, ...args] = trimmedCommand.split(' ')
    const command = findCommand(commands, commandName)

    let output: string
    if (command) {
      output = command.execute(args)
      // clearコマンドの特別な処理
      if (output === '__CLEAR_TERMINAL__') {
        setOutputs([])
        return
      }
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
            {(output.command !== undefined && output.id !== 'logo' && output.id !== 'welcome-text') && (
              <div className="terminal-command-line">
                <span className="terminal-prompt">user@{profile.name}:~$</span>
                <span className="terminal-command">{output.command}</span>
              </div>
            )}
            {output.output && (
              <div className="terminal-result">
                {output.output.split('\n').map((line, index) => (
                  <div key={index}>{convertTextContent(line)}</div>
                ))}
              </div>
            )}
          </div>
        ))}
        
        <form onSubmit={handleSubmit} className="terminal-input-form" ref={inputFormRef}>
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