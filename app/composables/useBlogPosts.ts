import type { BlogPostSkeleton } from '~/types/contentful'

/**
 * ブログ記事を1件取得する。
 * 存在しないIDは404、その他の取得失敗は500のエラーページを表示する。
 */
export const useBlogPost = async (id: MaybeRefOrGetter<string>) => {
  const { $contentful } = useNuxtApp()
  const idValue = toValue(id)

  const asyncData = await useAsyncData(`blog-post-${idValue}`, async () => {
    try {
      // sys（createdAt等）も参照できるようエントリ全体を返す
      return await $contentful.getEntry<BlogPostSkeleton>(idValue)
    } catch (e: any) {
      // 存在しないIDの場合、Contentfulは sys.id === 'NotFound' のエラーを投げる
      if (e?.sys?.id === 'NotFound') {
        throw createError({ 
          statusCode: 404, 
          statusMessage: '記事が見つかりませんでした。' 
        })
      }
      throw createError({ 
        statusCode: 500, 
        statusMessage: '記事の取得に失敗しました。' 
      })
    }
  })

  // useAsyncData内で発生したエラーを再throwし、適切なステータスのエラーページを表示する
  if (asyncData.error.value) {
    throw asyncData.error.value
  }

  return asyncData
}

type UseBlogPostsOptions = {
  /** metadata のタグID（例: 'case-studies'）で絞り込む */
  tag?: string
  /** 取得件数の上限 */
  limit?: number
  /** useAsyncData のキー（同一ページで複数回呼ぶ場合に指定） */
  key?: string
}

/**
 * ブログ記事の一覧を取得する（作成日の新しい順）。
 * tag / limit で絞り込み可能。
 */
export const useBlogPosts = (options: UseBlogPostsOptions = {}) => {
  const { $contentful } = useNuxtApp()
  const { tag, limit } = options
  const key = options.key ?? `blog-posts-${tag ?? 'all'}-${limit ?? 'all'}`

  return useAsyncData(key, async () => {
    const res = await $contentful.getEntries<BlogPostSkeleton>({
      content_type: 'blogPost',
      order: ['-sys.createdAt'],
      ...(tag ? { 'metadata.tags.sys.id[in]': [tag] } : {}),
      ...(limit ? { limit } : {}),
    })
    return res.items
  })
}
