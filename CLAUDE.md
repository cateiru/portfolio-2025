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

# コードリンティング（Biome使用）
pnpm lint

# Biomeでコードフォーマット・リント（推奨）
pnpm biome:check      # 全体チェック
pnpm biome:format     # フォーマット実行
pnpm biome:lint       # リンティング実行
pnpm biome:fix        # 自動修正適用
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
- **CSS構造**: `src/styles/`配下にPostCSSを使用した分離
  - `terminal.css`: PostCSS importを使用したモジュール統合ファイル
  - `terminal/`: ターミナル固有スタイルのモジュール分割（base, components, input, effects, layout, responsive）
  - `components.css`: 汎用コンポーネントスタイル
  - `variables.css`: CSS変数定義（Nordテーマ色）

### データ構造
- **ProfileData**: プロフィール情報の型定義 (`src/types/profile.ts`)
- **TerminalCommand**: コマンド定義のインターフェース
- **TerminalOutput**: ターミナル出力の型定義

### ユーティリティ
- **logo.ts**: ASCII artロゴ生成関数（oh-my-logoで生成）

## 重要な実装パターン

### ターミナルコマンドの追加
新しいコマンドを追加する場合は、`src/utils/terminal-commands.ts`の`createTerminalCommands`関数内に以下の形式で追加：
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

既存コマンド: help, profile, blog, x/twitter, brand, clear, whoami, date, ls, w, exit, echo, pwd

### 自動フォーカス制御
テキスト選択を阻害しないよう、選択中は自動フォーカスを無効化する仕組みを実装。

### 自動スクロール
`currentCommand`の変更を監視し、デバウンス処理付きで入力フォームが見える位置まで自動スクロール。

## コード品質とフォーマット

このプロジェクトはBiome v2とPostCSSを使用してコードフォーマットとリンティングを行います：

- **Biome**: 高速なJavaScript/TypeScriptフォーマッター・リンター
- **PostCSS**: モダンCSS機能とautoprefixerを提供（`postcss.config.js`で設定）
  - postcss-import: CSS importの改善
  - postcss-nesting: CSS ネスト記法のサポート
  - postcss-preset-env: モダンCSS機能とブラウザ互換性
- **設定ファイル**: `biome.json`でプロジェクト固有の設定を管理
- **VS Code**: 保存時の自動フォーマット設定済み（`.vscode/settings.json`）

## プロフィール情報の更新

`src/app/page.tsx`の`profileData`オブジェクトを編集してプロフィール情報を変更できます。

## ターミナルアーキテクチャの詳細

### ステート管理
- `outputs`: 出力履歴の配列（TerminalOutput[]）
- `currentCommand`: 現在入力中のコマンド文字列
- `commandHistory`: コマンド履歴（↑↓キーでナビゲーション）
- `historyIndex`: 履歴ナビゲーション用インデックス

### コマンド実行フロー
1. `createTerminalCommands(profile)`: プロフィール情報を基にコマンド配列を生成
2. `findCommand(commands, commandName)`: コマンド名から対応する関数を検索
3. `command.execute(args)`: コマンド実行と結果取得
4. 特別なコマンド処理: `clear`コマンドは`__CLEAR_TERMINAL__`を返して画面クリア

### テキスト処理パイプライン
1. `convertUrlsToLinks()`: URL検出とリンク化
2. `convertColorCodes()`: ANSIカラーコード変換
3. `convertTextContent()`: 統合処理パイプライン

### レスポンシブ機能
- テキスト選択時の自動フォーカス無効化
- 入力フォームの自動スクロール（デバウンス処理付き）
- キーボードナビゲーション（↑↓で履歴、Enter で実行）