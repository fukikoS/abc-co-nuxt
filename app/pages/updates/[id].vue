<script setup lang="ts">
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'

// contentfulから更新情報の詳細を取得（404/500のハンドリングはcomposable側で実施）
const id = useRoute().params.id as string
const { data: update } = await useUpdate(id)

watch(
  () => update.value,
  (updateData) => {
    if (updateData) {
      usePageMeta({
        title: `${updateData.fields.title} | ABC Co.`,
        description: `${updateData.fields.description ?? '更新情報の詳細ページです。'}`,
      })
    }
  },
  { immediate: true }
)
</script>

<template>
  <main class="container">
    <div class="bg-white p-6 md:px-10 md:py-12 rounded-2xl">
      <h1 class="heading1 mb-4">{{ update?.fields.title }}</h1>
      <time v-if="update?.sys.createdAt" class="text-sm md:text-md w-30 text-slate-500" :dateTime="update.sys.createdAt">
        {{ formatDate(update.sys.createdAt) }}
      </time>
      <hr class="my-8 md:my-10">
      <div v-if="update?.fields.contents" v-html="documentToHtmlString(update.fields.contents)" class="prose max-w-none mt-8 md:mt16"></div>
    </div>

    <div class="my-8">
      <NuxtLink to="/updates" class="btn-primary">
        一覧に戻る
      </NuxtLink>
    </div>
  </main>
</template>

<style scoped>

</style>
