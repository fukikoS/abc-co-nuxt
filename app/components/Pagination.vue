<script setup lang="ts">
type Props = {
  /** 現在のページ番号（1始まり） */
  currentPage: number
  /** 総ページ数 */
  totalPages: number
}

const props = defineProps<Props>()

// 現在ページの前後を表示し、離れたページは「…」で省略する
const pageItems = computed<(number | 'ellipsis')[]>(() => {
  const { currentPage, totalPages } = props
  if (totalPages <= 1) {
    return []
  }

  const delta = 1
  const left = Math.max(2, currentPage - delta)
  const right = Math.min(totalPages - 1, currentPage + delta)

  const items: (number | 'ellipsis')[] = [1]
  if (left > 2) {
    items.push('ellipsis')
  }
  for (let i = left; i <= right; i++) {
    items.push(i)
  }
  if (right < totalPages - 1) {
    items.push('ellipsis')
  }
  items.push(totalPages)
  return items
})

// 同一パスを維持したまま page クエリだけを差し替える
const linkTo = (page: number) => ({ query: { page } })
</script>

<template>
  <nav
    v-if="totalPages > 1"
    class="flex items-center justify-center gap-1"
    aria-label="ページネーション"
  >
    <NuxtLink
      v-if="currentPage > 1"
      :to="linkTo(currentPage - 1)"
      rel="prev"
      class="px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700"
      aria-label="前のページ"
    >
      前へ
    </NuxtLink>

    <template v-for="(item, index) in pageItems" :key="index">
      <span v-if="item === 'ellipsis'" class="px-3 py-2 text-gray-700">…</span>
      <NuxtLink
        v-else
        :to="linkTo(item)"
        class="px-3 py-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
        :class="
          item === currentPage
            ? 'bg-teal-700 text-white font-bold'
            : 'text-gray-700 hover:bg-gray-100'
        "
        :aria-current="item === currentPage ? 'page' : undefined"
      >
        {{ item }}
      </NuxtLink>
    </template>

    <NuxtLink
      v-if="currentPage < totalPages"
      :to="linkTo(currentPage + 1)"
      rel="next"
      class="px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
      aria-label="次のページ"
    >
      次へ
    </NuxtLink>
  </nav>
</template>
