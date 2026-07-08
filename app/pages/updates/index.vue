<script setup lang="ts">
usePageMeta({
  title: 'Updates | ABC Co.',
  description: 'ABC Co.の最新アップデート情報をお届けします。',
})

const route = useRoute()

const LIMIT = 12

// URLの ?page= からページ番号を取得（不正値は1にフォールバック）
const currentPage = computed(() => {
  const page = Number(route.query.page)
  return Number.isInteger(page) && page > 0 ? page : 1
})

// contentfulから更新情報（updatesコンテンツタイプ）をページ単位で取得
const { data, error } = await useUpdates({ page: currentPage, limit: LIMIT })

const totalPages = computed(() =>
  Math.max(1, Math.ceil((data.value?.total ?? 0) / LIMIT)),
)
</script>

<template>
  <main class="container space-y-10">
    <PageHeader subtitle="Updates" title="更新情報" />
    <div class="mt-8 bg-white p-6 md:px-10 md:py-12 rounded-2xl">
      <p v-if="error">更新情報の取得に失敗しました。</p>
      <p v-else-if="!data?.items.length">現在、アップデートはありません。</p>
      <ul v-else class="list-none space-y-4">
        <li v-for="update in data.items" :key="update.sys.id">
          <NuxtLink :to="`/updates/${update.sys.id}`" class="block">
            <div class="md:flex items-center gap-4">
              <time
                v-if="update.sys.createdAt"
                class="text-sm md:text-md w-30 text-slate-500"
                :dateTime="update.sys.createdAt"
              >
                {{ formatDate(update.sys.createdAt) }}
              </time>
              <h2 class="md:text-lg font-semibold text-slate-900">{{ update.fields.title }}</h2>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </div>

    <Pagination :current-page="currentPage" :total-pages="totalPages" />
  </main>
</template>

<style scoped>

</style>
