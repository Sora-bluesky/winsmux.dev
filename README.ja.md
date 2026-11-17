# winsmux.dev

[English](README.md) | [日本語](README.ja.md)

winsmux — Windows 上の AI エージェントガバナンス基盤 — のマーケティングサイト。

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

テストは置いていない。`npm run build` が通ることを確認とする。テンプレートや import の誤りがあればビルドが失敗する。サイトに出す winsmux の版番号は `src/lib/version.ts` に固定の文字列で書いてあり、ビルド時には取得しない。winsmux の新しい版を出したら、このファイルを手で書き換える。最終確認は Node 24.22.1(2026-10-21)。

## デプロイ

`main` へ push するたびに、`.github/workflows/deploy.yml` がサイトを組み立てて `npx wrangler deploy` を実行する。push せずにデプロイしたいときは、Actions タブか `gh workflow run deploy.yml` で workflow を手動実行する。

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

MIT — winsmux 本体は Apache 2.0。
