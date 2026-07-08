<script setup lang="ts">
// カテゴリは Contentful のタグから取得する
const { data: categories } = useCategories()

// 現在表示中のカテゴリID（/blog/[category]）をルートから判定する
const route = useRoute()
const activeCategory = computed(() => route.params.category as string | undefined)

const baseClass = 'px-4 py-2 rounded'
const activeClass = 'bg-teal-700 text-white'
const inactiveClass = 'bg-white text-gray-700'
</script>

<template>
  <div class="flex flex-wrap gap-2 justify-center">
    <NuxtLink
      to="/blog"
      :class="`${baseClass} ${activeCategory ? inactiveClass : activeClass}`"
    >
      All
    </NuxtLink>

    <NuxtLink
      v-for="category in categories"
      :key="category.id"
      :to="`/blog/${category.id}`"
      :class="`${baseClass} ${
        activeCategory === category.id ? activeClass : inactiveClass
      }`"
    >
      {{ category.name ?? category.id }}
    </NuxtLink>
  </div>
</template>

<style scoped></style>
