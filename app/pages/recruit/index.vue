<script setup lang="ts">
import type { RecruitmentSkeleton } from '~/types/contentful'

usePageMeta({
  title: 'Recruit | ABC Co.',
  description: 'ABC Co.の採用情報ページです。',
})

const { $contentful } = useNuxtApp()

const { data: recruitments, error } = await useAsyncData('recruitments', async () => {
  const res = await $contentful.getEntries<RecruitmentSkeleton>({
    content_type: 'recruitments',
    order: ['-sys.createdAt'],
  })
  return res.items
})
</script>

<template>
  <main class="container">
    <PageHeader
      subtitle="Recruit"
      title="採用情報"
      description="ABC Co.では、情熱を持って新しい価値を創造する仲間を募集しています。"
    />
    <h2 class="heading2 mt-8">募集職種</h2>
    <ul className="space-y-6 mt-4 mb-20">
      <li v-for="recruitment in recruitments" :key="recruitment.sys.id">
        <NuxtLink :to="`/recruit/${recruitment.sys.id}`" class="border p-4 flex justify-between items-center card">
          <div>
            <h3 class="heading3 mb-3">{{ recruitment.fields.jobTitle }}</h3>
            <p>{{ recruitment.fields.summary }}</p>
          </div>
          <span class="rounded-full bg-black text-white w-9 h-9 grid place-items-center right-4 bottom-4">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </NuxtLink>
      </li>
    </ul>

  </main>
</template>

<style scoped>

</style>