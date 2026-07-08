import type { UpdateSkeleton } from '~/types/contentful'

/**
 * 更新情報を1件取得する。
 * 存在しないIDは404、その他の取得失敗は500のエラーページを表示する。
 */
export const useUpdate = async (id: MaybeRefOrGetter<string>) => {
  const { $contentful } = useNuxtApp()
  const idValue = toValue(id)

  const asyncData = await useAsyncData(`update-${idValue}`, async () => {
    try {
      return await $contentful.getEntry<UpdateSkeleton>(idValue)
    } catch (e: any) {
      // 存在しないIDの場合、Contentfulは sys.id === 'NotFound' のエラーを投げる
      if (e?.sys?.id === 'NotFound') {
        throw createError({ statusCode: 404, statusMessage: '更新情報が見つかりませんでした。' })
      }
      throw createError({ statusCode: 500, statusMessage: '更新情報の取得に失敗しました。' })
    }
  })

  // useAsyncData内で発生したエラーを再throwし、適切なステータスのエラーページを表示する
  if (asyncData.error.value) {
    throw asyncData.error.value
  }

  return asyncData
}

type UseUpdatesOptions = {
  /** 1ページあたりの取得件数 */
  limit?: number
  /** 取得するページ番号（1始まり）。ref/getterを渡すと変更時に再取得する */
  page?: MaybeRefOrGetter<number>
  /** useAsyncData のキー（同一ページで複数回呼ぶ場合に指定） */
  key?: string
}

/**
 * 更新情報の一覧を取得する（作成日の新しい順）。
 * page を指定するとページネーション用に該当ページのみ取得し、
 * ページ番号の算出に使える総件数 total を併せて返す。
 */
export const useUpdates = (options: UseUpdatesOptions = {}) => {
  const { $contentful } = useNuxtApp()
  const { limit, page } = options
  const key = options.key ?? 'updates-list'

  return useAsyncData(
    key,
    async () => {
      const pageValue = Math.max(1, toValue(page) ?? 1)
      const res = await $contentful.getEntries<UpdateSkeleton>({
        content_type: 'updates',
        order: ['-sys.createdAt'],
        ...(limit ? { limit, skip: (pageValue - 1) * limit } : {}),
      })
      return { items: res.items, total: res.total }
    },
    // ページ変更時に再取得する
    { watch: page ? [() => toValue(page)] : undefined },
  )
}
