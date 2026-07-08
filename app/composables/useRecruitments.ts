import type { RecruitmentSkeleton } from '~/types/contentful'

/**
 * 求人情報を1件取得する。
 * 存在しないIDは404、その他の取得失敗は500のエラーページを表示する。
 */
export const useRecruitment = async (id: MaybeRefOrGetter<string>) => {
  const { $contentful } = useNuxtApp()
  const idValue = toValue(id)

  const asyncData = await useAsyncData(`recruitment-${idValue}`, async () => {
    try {
      return await $contentful.getEntry<RecruitmentSkeleton>(idValue)
    } catch (e: any) {
      // 存在しないIDの場合、Contentfulは sys.id === 'NotFound' のエラーを投げる
      if (e?.sys?.id === 'NotFound') {
        throw createError({ statusCode: 404, statusMessage: '求人情報が見つかりませんでした。' })
      }
      throw createError({ statusCode: 500, statusMessage: '求人情報の取得に失敗しました。' })
    }
  })

  // useAsyncData内で発生したエラーを再throwし、適切なステータスのエラーページを表示する
  if (asyncData.error.value) {
    throw asyncData.error.value
  }

  return asyncData
}

/**
 * 求人情報の一覧を取得する。
 */
export const useRecruitments = (options: { key?: string } = {}) => {
  const { $contentful } = useNuxtApp()
  const key = options.key ?? 'recruitments'

  return useAsyncData(key, async () => {
    const res = await $contentful.getEntries<RecruitmentSkeleton>({
      content_type: 'recruitments',
      order: ['-sys.createdAt'],
    })
    return res.items
  })
}
