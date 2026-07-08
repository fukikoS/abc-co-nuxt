<script setup lang="ts">
defineProps<{
  /** 見出し上部に表示する英語のサブラベル */
  subtitle: string
  /** ページタイトル（日本語） */
  title: string
  /** タイトル下に表示する補足説明（任意） */
  description?: string
}>()
</script>

<template>
  <div class="text-center">
    <p class="text-sm font-semibold tracking-widest text-teal-700 uppercase font-montserrat">{{ subtitle }}</p>
    <h1 class="heading1 mt-2">{{ title }}</h1>
    <p v-if="description" class="mt-6 max-w-2xl mx-auto text-slate-600 leading-relaxed">
      {{ description }}
    </p>
  </div>
</template>
