<script setup lang="ts">
import type { BlogPostSkeleton } from '~/types/contentful'

const { $contentful } = useNuxtApp()

// [category] のパラメータ名は category（= Contentful のタグID）
const category = useRoute().params.category as string
const LIMIT = 12

// Contentful のタグから該当カテゴリの表示ラベルを引く（無ければIDを表示）
const { data: categories } = useCategories()
const categoryLabel = computed(
  () => categories.value?.find((c) => c.id === category)?.name ?? category,
)

watch(
  () => categoryLabel.value,
  (label) => {
    usePageMeta({
      title: `${label} | ABC Co.`,
      description: `${label}カテゴリの記事一覧ページです。 | ABC Co.`,
    })
  },
  { immediate: true }
)

// 初回は SSR で該当タグの記事を取得
const { data: initialPosts, error } = await useBlogPosts({
  tag: category,
  limit: LIMIT,
  key: `blog-category-${category}`,
})

// 追加読み込み（同じタグで skip しながら取得）
const fetchMore = (skip: number) =>
  $contentful
    .getEntries<BlogPostSkeleton>({
      content_type: 'blogPost',
      'metadata.tags.sys.id[in]': [category],
      order: ['-sys.createdAt'],
      limit: LIMIT,
      skip,
    })
    .then((res) => res.items)

const { items: allPosts, isLoading, loadMore } = useInfiniteScroll({
  initialItems: initialPosts.value ?? [],
  limit: LIMIT,
  fetchMore,
})
</script>

<template>
  <main class="container space-y-10 md:space-y-12">
    <PageHeader subtitle="Blog" :title="categoryLabel" />
    <CategoryList :active-category="category" />
    <p v-if="error">記事の取得に失敗しました。</p>
    <p v-else-if="!allPosts.length">記事がありません。</p>

    <ArticleList
      v-else
      :items="allPosts"
      :resolve-to="(post) => `/blog/${category}/${post.fields.slug ?? post.sys.id}`"
    />

    <InfiniteScrollSentinel :load-more="loadMore" :is-loading="isLoading" />
  </main>
</template>
