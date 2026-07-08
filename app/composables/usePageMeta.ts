type UsePageMetaOptions = {
  /** ページのタイトル（ブラウザタブ表示用） */
  title: string
  /** ページの説明（metaタグ、SNS共有時に表示） */
  description: string
  /** og:image として使用する画像URL（オプション） */
  image?: string
  /** og:type（デフォルト: 'website'） */
  type?: 'website' | 'article'
}

/**
 * ページ全体の SEO メタタグを一括で設定する composable。
 * useSeoMeta を使用して SSR/CSR 両方に対応。
 *
 * 使用例：
 * ```ts
 * usePageMeta({
 *   title: 'ページタイトル | ABC Co.',
 *   description: 'ページの説明',
 *   image: 'https://example.com/og-image.png',
 *   type: 'article'
 * })
 * ```
 */
export const usePageMeta = ({
  title,
  description,
  image,
  type = 'website',
}: UsePageMetaOptions) => {
  useSeoMeta({
    title,
    description,
    twitterTitle: title,
    twitterDescription: description,
    twitterCard: 'summary_large_image',
    ogTitle: title,
    ogDescription: description,
    ogType: type,
    ...(image && { twitterImage: image, ogImage: image }),
  })
}
