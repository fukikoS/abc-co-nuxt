/**
 * ブログのカテゴリ一覧を取得する。
 * カテゴリは Contentful のタグ（metadata.tags）と対応しており、
 * タグの sys.id を id、name を表示ラベルとして返す。
 */
export const useCategories = () => {
  const { $contentful } = useNuxtApp()

  return useAsyncData('categories', async () => {
    const res = await $contentful.getTags()
    return res.items.map((tag) => ({
      id: tag.sys.id,
      name: tag.name,
    }))
  }, {
    // 取得に失敗してもカテゴリ非表示で描画を続ける
    default: () => [],
  })
}
