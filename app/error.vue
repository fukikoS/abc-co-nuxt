<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

const isNotFound = computed(() => props.error.statusCode === 404)

// エラー状態を解除してトップへ戻る
const handleBackToTop = () => clearError({ redirect: '/' })
</script>

<template>
  <NuxtLayout>
    <div class="flex flex-col items-center justify-center gap-6 py-20 px-5 text-center">
      <p class="text-6xl md:text-8xl font-bold text-slate-300">
        {{ error.statusCode }}
      </p>

      <h1 class="text-2xl md:text-3xl font-bold text-slate-900">
        <template v-if="isNotFound">ページが見つかりませんでした</template>
        <template v-else>エラーが発生しました</template>
      </h1>

      <p class="text-slate-600">
        <template v-if="isNotFound">
          お探しのページは存在しないか、移動・削除された可能性があります。
        </template>
        <template v-else>
          {{ error.statusMessage || '時間をおいて再度お試しください。' }}
        </template>
      </p>

      <button
        type="button"
        class="btn-primary"
        @click="handleBackToTop"
      >
        トップページへ戻る
      </button>
    </div>
  </NuxtLayout>
</template>
