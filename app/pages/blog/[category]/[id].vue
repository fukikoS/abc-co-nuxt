<script setup lang="ts">
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'

// contentfulから記事詳細を取得（404/500のハンドリングはcomposable側で実施）
const route = useRoute()
const id = route.params.id as string
const { data: post } = await useBlogPost(id)

// カテゴリID（= Contentful のタグID）からタグ名を引いて表示ラベルにする
const category = route.params.category as string
const { data: categories } = useCategories()
const categoryLabel = computed(
  () => categories.value?.find((c) => c.id === category)?.name ?? category,
)

watch(
  () => post.value,
  (postData) => {
    if (postData) {
      usePageMeta({
        title: `${postData.fields.title} | ABC Co.`,
        description: `${postData.fields.description ?? 'ブログ記事の詳細ページです。'} | ABC Co.`,
      })
    }
  },
  { immediate: true }
)
</script>

<template>
  <main class="container">
    <div class="bg-white p-6 md:px-10 md:py-12 rounded-2xl">
      <NuxtLink :to="`/blog/${category}`" class="inline-block mb-4 px-3 py-1 rounded bg-teal-700 text-white text-sm">
        {{ categoryLabel }}
      </NuxtLink>
      <h1 class="heading1 mb-4">{{ post?.fields.title }}</h1>
      <time v-if="post?.sys.createdAt" class="text-sm md:text-md w-30 text-slate-500" :dateTime="post.sys.createdAt">
        {{ formatDate(post.sys.createdAt) }}
      </time>
      <hr class="my-8 md:my-10">
      <div v-if="post?.fields.content" v-html="documentToHtmlString(post.fields.content)" class="prose max-w-none mt-8 md:mt16"></div>
    </div>
  </main>
  <NuxtLink :to="`/blog/${category}`" class="btn-primary mt-8 md:mt-10 mb-20">
    {{ categoryLabel }}一覧に戻る
  </NuxtLink>
</template>

<style scoped>

</style>