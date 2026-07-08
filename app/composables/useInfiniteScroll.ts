type UseInfiniteScrollOptions<T> = {
  /** SSR で取得済みの初期データ */
  initialItems: T[]
  /** 1回に取得する件数 */
  limit: number
  /** skip を受け取り追加データを返す非同期関数 */
  fetchMore: (skip: number) => Promise<T[]>
}

/**
 * 無限スクロール用の状態管理 composable。
 * - items: 累積された全アイテム
 * - isLoading: 追加読み込み中フラグ
 * - hasMore: まだ取得できるデータがあるか
 * - loadMore: 次のページを取得する関数（InfiniteScrollSentinel に渡す）
 */
export const useInfiniteScroll = <T>({
  initialItems,
  limit,
  fetchMore,
}: UseInfiniteScrollOptions<T>) => {
  const items = ref<T[]>(initialItems) as Ref<T[]>
  const skip = ref(initialItems.length)
  const isLoading = ref(false)
  const hasMore = ref(initialItems.length >= limit)

  const loadMore = async () => {
    if (isLoading.value || !hasMore.value) return
    isLoading.value = true
    try {
      const newItems = await fetchMore(skip.value)
      items.value = [...items.value, ...newItems]
      skip.value += newItems.length
      hasMore.value = newItems.length >= limit
    } catch (e) {
      console.error(e)
    } finally {
      isLoading.value = false
    }
  }

  return { items, isLoading, hasMore, loadMore }
}
