export interface ProfileData {
  name: string
  birthday: string
  affiliation: string
  blogUrl: string
  xUrl: string
}

export interface SocialLink {
  label: string
  url: string
  icon?: string
}

export type Theme = "light" | "dark" | "system"

export interface TerminalOutput {
  id: string
  command: string
  output: string
  timestamp: Date
}

export interface TerminalCommand {
  name: string
  description: string
  execute: (args?: string[]) => string
}
