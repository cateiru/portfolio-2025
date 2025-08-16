"use client"

import { useCallback, useEffect, useState } from "react"
import { Button } from "react-aria-components"
import type { Theme } from "@/types/profile"

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("system")
  const [mounted, setMounted] = useState(false)

  const applyTheme = useCallback((newTheme: Theme) => {
    const root = document.documentElement

    if (newTheme === "dark") {
      root.setAttribute("data-theme", "dark")
    } else if (newTheme === "light") {
      root.setAttribute("data-theme", "light")
    } else {
      root.removeAttribute("data-theme")
    }
  }, [])

  useEffect(() => {
    setMounted(true)
    const savedTheme = (localStorage.getItem("theme") as Theme) || "system"
    setTheme(savedTheme)
    applyTheme(savedTheme)
  }, [applyTheme])

  const toggleTheme = () => {
    const themes: Theme[] = ["light", "dark", "system"]
    const currentIndex = themes.indexOf(theme)
    const nextTheme = themes[(currentIndex + 1) % themes.length]

    setTheme(nextTheme)
    localStorage.setItem("theme", nextTheme)
    applyTheme(nextTheme)
  }

  if (!mounted) {
    return (
      <div className="theme-toggle">
        <div className="theme-toggle-icon">☀️</div>
      </div>
    )
  }

  const getIcon = () => {
    switch (theme) {
      case "light":
        return "☀️"
      case "dark":
        return "🌙"
      case "system":
        return "💻"
      default:
        return "☀️"
    }
  }

  return (
    <Button onPress={toggleTheme} className="theme-toggle" aria-label={`現在のテーマ: ${theme}. クリックして切り替え`}>
      <span className="theme-toggle-icon">{getIcon()}</span>
    </Button>
  )
}
