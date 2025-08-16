# Portfolio 2025

ターミナル風のインタラクティブなポートフォリオサイトです。Next.js 15を使用し、Nordテーマの美しい色彩でターミナルエミュレーターを実装しています。

## 🚀 特徴

- **ターミナルエミュレーター**: リアルなUnix風コマンドライン体験
- **Nordテーマ**: 洗練された北欧風カラーパレット
- **インタラクティブ**: キーボードナビゲーションとコマンド履歴
- **レスポンシブデザイン**: 全デバイス対応
- **高速**: Next.js 15 + Turbopackによる最適化

## 🎯 利用可能なコマンド

| コマンド | 説明 |
|---------|------|
| `help` | 利用可能なコマンド一覧を表示 |
| `profile` | プロフィール情報を表示 |
| `blog` | ブログリンクを表示 |
| `x` / `twitter` | Twitterプロフィールを表示 |
| `brand` | ブランドロゴを表示 |
| `whoami` | ユーザー情報を表示 |
| `date` | 現在の日時を表示 |
| `ls` | ディレクトリ内容を表示 |
| `w` | 現在のユーザーセッション情報を表示 |
| `pwd` | 現在のディレクトリパスを表示 |
| `echo [text]` | テキストを出力 |
| `clear` | ターミナル画面をクリア |
| `exit` | ターミナルを終了 |

## 🛠️ 開発環境のセットアップ

### 必要な環境

- Node.js 18.17以上
- pnpm

### インストール

```bash
# リポジトリをクローン
git clone <repository-url>
cd portfolio-2025

# 依存関係をインストール
pnpm install
```

### 開発サーバーの起動

```bash
# 開発サーバー起動（Turbopack使用）
pnpm dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてターミナルをお試しください。

## 📦 ビルドとデプロイ

```bash
# プロダクションビルド
pnpm build

# プロダクションサーバー起動
pnpm start
```

## 🧹 コード品質管理

このプロジェクトはBiome v2を使用してコードフォーマットとリンティングを行います。

```bash
# 全体チェック
pnpm biome:check

# フォーマット実行
pnpm biome:format

# リンティング実行
pnpm biome:lint

# 自動修正適用
pnpm biome:fix

# 従来のESLint/Prettier（Biome推奨のため非推奨）
pnpm lint
```

## 🎨 技術スタック

- **フレームワーク**: Next.js 15
- **言語**: TypeScript
- **スタイリング**: PostCSS + CSS Modules
- **テーマ**: [Nord Color Palette](https://www.nordtheme.com)
- **コード品質**: Biome v2
- **パッケージマネージャー**: pnpm

## 🏗️ プロジェクト構造

```
src/
├── app/                 # Next.js App Router
├── components/          # Reactコンポーネント
│   └── Terminal.tsx     # メインターミナルコンポーネント
├── styles/              # スタイルシート
│   ├── terminal/        # ターミナル固有スタイル
│   ├── terminal.css     # メインターミナルスタイル
│   └── variables.css    # CSS変数（Nordテーマ）
├── types/               # TypeScript型定義
├── utils/               # ユーティリティ関数
│   ├── logo.ts          # ASCIIアートロゴ
│   └── terminal-utils.ts # ターミナル関連ユーティリティ
└── ...
```

## ⚙️ カスタマイズ

### プロフィール情報の更新

`src/app/page.tsx`の`profileData`オブジェクトを編集してプロフィール情報を変更できます。

### 新しいコマンドの追加

`src/utils/terminal-commands.ts`にコマンドを追加できます：

```typescript
{
  name: 'mycommand',
  description: '新しいコマンドの説明',
  execute: (args?: string[]) => {
    return 'コマンドの実行結果'
  }
}
```

## 🎯 デザインシステム

### Nord カラーパレット

- **Polar Night**: `#2e3440` (背景)
- **Snow Storm**: `#d8dee9` (テキスト)
- **Aurora Green**: `#a3be8c` (プロンプト)
- **Frost Blue**: 青色グラデーション（アクセント）

## 📄 ライセンス

このプロジェクトはMITライセンスのもとで公開されています。

## 🤝 コントリビューション

プルリクエストやイシューは歓迎です。コントリビューションの前に、コード品質チェックを実行してください：

```bash
pnpm biome:check
pnpm build
```
