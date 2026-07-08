# corporate-site-nuxt

Nuxt 4 + Contentful で構築されたコーポレートサイトです。

> **Note:** これはポートフォリオ用に作成した架空の企業サイトです。作中に登場する「ABC Co.」等の会社名・サービス内容・採用情報は実在しません。

## 技術スタック

- [Nuxt 4](https://nuxt.com/)（Vue 3 / vue-router）
- [Tailwind CSS 4](https://tailwindcss.com/)（`@tailwindcss/vite`, `@tailwindcss/typography`）
- [Contentful](https://www.contentful.com/)（CDA経由でブログ・求人・更新情報を取得、`@contentful/rich-text-html-renderer` でリッチテキストをHTML化）
- [@nuxt/image](https://image.nuxt.com/)（画像最適化）
- [GSAP](https://gsap.com/)（アニメーション演出）
- [tsParticles](https://particles.js.org/)（`@tsparticles/vue3` + `@tsparticles/slim`）

## ディレクトリ構成

```
app/
├── components/    # Navbar, MobileNav, Footer, TopHero, PageHeader, ServiceCards,
│                  # ArticleList, ArticleCard, CategoryList, Pagination, InfiniteScrollSentinel
├── composables/   # useBlogPosts, useRecruitments, useUpdates, useCategories, useServices,
│                  # usePageMeta, useInfiniteScroll
├── layouts/       # default.vue
├── pages/         # ルーティング（下記参照）
├── plugins/       # contentful.ts（$contentful クライアント）, particles.client.ts
├── types/         # Contentful のスキーマ型
└── utils/         # formatDate など
constants          # サイト名・URLなどの定数
public/            # 静的ファイル（favicon, OGP画像など）
```

## ページ構成

- `/` — トップページ
- `/company` — 会社概要
- `/services` — サービス紹介
- `/blog`, `/blog/[category]`, `/blog/[category]/[id]` — ブログ（カテゴリ別・記事詳細）
- `/recruit`, `/recruit/[id]` — 採用情報
- `/updates`, `/updates/[id]` — 更新情報
- `/contact`, `/contact/thanks` — お問い合わせ
- `/privacypolicy`, `/terms` — プライバシーポリシー・利用規約

ブログ・採用・更新情報は Contentful から取得しており、無限スクロール（`useInfiniteScroll`）に対応しています。

## セットアップ

依存関係をインストールします。

```bash
npm install
```

### 環境変数

Contentful と連携するため、プロジェクトルートに `.env` を作成し、以下を設定してください。

```bash
CTF_SPACE_ID=            # Contentful スペースID
CTF_CDA_ACCESS_TOKEN=    # Content Delivery API アクセストークン
```

## 開発

開発サーバーを起動します（`http://localhost:3000`）。

```bash
npm run dev
```

## ビルド・プレビュー

```bash
# 本番ビルド
npm run build

# 静的サイト生成
npm run generate

# ビルド結果をローカルでプレビュー
npm run preview
```

詳細は [Nuxt のデプロイドキュメント](https://nuxt.com/docs/getting-started/deployment) を参照してください。
