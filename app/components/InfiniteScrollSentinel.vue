<script setup lang="ts">
const props = defineProps<{
  /** 次のページを取得する関数 */
  loadMore: () => void
  /** 追加読み込み中 */
  isLoading: boolean
}>()

const sentinel = ref<HTMLElement | null>(null)
const observer = ref<IntersectionObserver | null>(null)

onMounted(() => {
  if (!sentinel.value) return
  observer.value = new IntersectionObserver(
    (entries) => {
      const [entry] = entries
      if (entry?.isIntersecting && !props.isLoading) {
        props.loadMore()
      }
    },
    { rootMargin: '200px' }
  )
  observer.value.observe(sentinel.value)
  onUnmounted(() => observer.value?.disconnect())
})
</script>

<template>
  <div ref="sentinel" class="py-4 text-center text-sm text-gray-400">
    <span v-if="isLoading">読み込み中...</span>
  </div>
</template>
  