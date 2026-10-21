# winsmux.dev

[English](README.md) | [日本語](README.ja.md)

[winsmux](https://github.com/Sora-bluesky/winsmux) — Windows 上の AI エージェントガバナンス基盤 — のマーケティングサイト。

公開URL: https://winsmux.dev

## 技術スタック

- [Astro 6](https://astro.build/) — 静的サイトジェネレーター
- [Tailwind CSS 4](https://tailwindcss.com/) — `@tailwindcss/vite` プラグイン構成
- [Cloudflare Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/) — ホスティング

`main` ワーカースクリプトを持たない構成のため、リクエストごとに Worker は起動せず、静的アセットのみが配信される(リクエスト課金が発生しない)。

## 開発

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # ./dist/ にビルド
npm run preview  # ./dist/ をローカル配信
```

Node `>=22.12.0` が必要(`package.json` の `engines` を参照)。

## 検証

テストは置いていない。`npm run build` が通ることを確認とする。テンプレートや import の誤りがあればビルドが失敗する。デプロイの workflow と同じく `CI=true` を付けると、GitHub API から winsmux の最新版を取得できなかったときもビルドが失敗するため、古い版番号のまま公開されることはない。実行時のロジックは `src/lib/version.ts` のこの取得処理だけ。CI 外で取得に失敗した場合は警告を出し、同ファイルに書いた固定の版番号を使う。最終確認は Node 24.22.1(2026-10-21)。

## デプロイ

デプロイは Wrangler で手動実行する。`main` への push では自動デプロイされない。

```sh
npm run build
npx wrangler deploy
```

`wrangler.toml` で apex ドメイン `winsmux.dev` を Cloudflare custom domain として束縛している。DNS レコードは初回デプロイ時に Wrangler が自動作成する。

## プロジェクト構成

```
src/
  pages/
    index.astro       # ランディングページ
  styles/
    global.css        # Tailwind エントリ
public/               # dist/ にコピーされる静的ファイル
dist/                 # ビルド成果物 (gitignore 対象)
wrangler.toml         # Cloudflare Workers 設定 (assets-only)
astro.config.mjs
```

## ライセンス

MIT — winsmux 本体は Apache 2.0([リポジトリ](https://github.com/Sora-bluesky/winsmux))。
