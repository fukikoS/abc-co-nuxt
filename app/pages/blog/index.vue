<script setup lang="ts">
usePageMeta({
  title: 'Blog | ABC Co.',
  description: 'ABC Co.のブログ記事一覧ページです。',
})
import type { BlogPostSkeleton } from '~/types/contentful'

const { $contentful } = useNuxtApp()


const LIMIT = 20

// 記事の metadata.tags からカテゴリID（先頭のタグ）を取り出し、
// /blog/カテゴリー/記事 のパスを生成する
const resolveBlogLink = (post: {
  sys: { id: string }
  fields: { slug?: string }
  metadata?: { tags: { sys: { id: string } }[] }
}) => {
  const identifier = post.fields.slug ?? post.sys.id
  const category = post.metadata?.tags[0]?.sys.id
  if (!identifier || !category) {
    return '#'
  }
  return `/blog/${category}/${identifier}`
}

// 初回は SSR で取得
const { data: initialPosts, error } = await useBlogPosts({ limit: LIMIT })

const { items: allPosts, isLoading, hasMore, loadMore } = useLoadMore({
  initialItems: initialPosts.value ?? [],
  limit: LIMIT,
  fetchMore: async (skip) => {
    const res = await $contentful.getEntries<BlogPostSkeleton>({
      content_type: 'blogPost',
      order: ['-sys.createdAt'],
      limit: LIMIT,
      skip,
    })
    return res.items
  },
})
</script>

<template>
  <main class="container space-y-10 md:space-y-12">
    <PageHeader subtitle="Blog" title="ブログ" />
    <CategoryList />
    <p v-if="error">記事の取得に失敗しました。</p>
    <p v-else-if="!allPosts.length">記事がありません。</p>

    <ArticleList
      v-else
      :items="allPosts"
      :resolve-to="resolveBlogLink"
    />

    <LoadMoreButton :load-more="loadMore" :is-loading="isLoading" :has-more="hasMore" />
  </main>
</template>
