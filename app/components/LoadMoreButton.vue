<script setup lang="ts">
defineProps<{
  /** 次のページを取得する関数 */
  loadMore: () => void
  /** 追加読み込み中 */
  isLoading: boolean
  /** まだ取得できるデータがあるか */
  hasMore: boolean
}>()
</script>

<template>
  <div v-if="hasMore" class="py-4 text-center">
    <button
      type="button"
      class="btn-secondary"
      :disabled="isLoading"
      @click="loadMore"
    >
      {{ isLoading ? '読み込み中...' : 'もっと見る' }}
    </button>
  </div>
</template>
