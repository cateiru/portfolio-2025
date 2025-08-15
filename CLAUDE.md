# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

このプロジェクトは、ターミナル風のインタラクティブなポートフォリオサイトです。Next.js 15を使用し、Nordテーマの色彩でターミナルエミュレーターを実装しています。

## 開発コマンド

```bash
# 開発サーバー起動（Turbopack使用）
pnpm dev

# プロダクションビルド
pnpm build

# プロダクションサーバー起動
pnpm start

# ESLintチェック
pnpm lint
```

## アーキテクチャ

### コアコンポーネント
- **Terminal**: メインのターミナルエミュレーター (`src/components/Terminal.tsx`)
  - ユニックス風コマンドの実装（help, profile, blog, x, clear, whoami, date, ls, w, pwd, echo, exit）
  - コマンド履歴機能（↑↓キーでナビゲーション）
  - 自動スクロール機能（長いコマンド入力時）
  - テキスト選択機能（プロンプト以外選択可能）

### テーマとスタイリング
- **Nordテーマ**: 全体的な色彩は[Nord color palette](https://www.nordtheme.com)を適用
  - 背景: `#2e3440` (Polar Night)
  - テキスト: `#d8dee9` (Snow Storm)
  - プロンプト: `#a3be8c` (Aurora Green)
  - アクセント: Frost系の青色グラデーション
- **CSS構造**: `src/styles/`配下に分離
  - `terminal.css`: ターミナル固有のスタイル
  - `components.css`: 汎用コンポーネントスタイル
  - `variables.css`: CSS変数定義

### データ構造
- **ProfileData**: プロフィール情報の型定義 (`src/types/profile.ts`)
- **TerminalCommand**: コマンド定義のインターフェース
- **TerminalOutput**: ターミナル出力の型定義

### ユーティリティ
- **logo.ts**: ASCII artロゴ生成関数（oh-my-logoで生成）

## 重要な実装パターン

### ターミナルコマンドの追加
新しいコマンドを追加する場合は、`Terminal.tsx`の`commands`配列に以下の形式で追加：
```typescript
{
  name: 'コマンド名',
  description: '説明',
  execute: (args?: string[]) => {
    // コマンドロジック
    return '出力結果'
  }
}
```

### 自動フォーカス制御
テキスト選択を阻害しないよう、選択中は自動フォーカスを無効化する仕組みを実装。

### 自動スクロール
`currentCommand`の変更を監視し、デバウンス処理付きで入力フォームが見える位置まで自動スクロール。

## プロフィール情報の更新

`src/app/page.tsx`の`profileData`オブジェクトを編集してプロフィール情報を変更できます。