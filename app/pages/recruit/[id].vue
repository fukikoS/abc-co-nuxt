<script setup lang="ts">
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'

// contentfulから求人詳細を取得（404/500のハンドリングはcomposable側で実施）
const id = useRoute().params.id as string
const { data: recruitment } = await useRecruitment(id)

watch(
  () => recruitment.value,
  (recruitmentData) => {
    if (recruitmentData) {
      usePageMeta({
        title: `${recruitmentData.fields.jobTitle}の採用情報 | ABC Co.`,
        description: `${recruitmentData.fields.jobDescription ? documentToHtmlString(recruitmentData.fields.jobDescription) : '求人詳細ページです。'}`,
      })
    }
  },
  { immediate: true }
)
</script>

<template>
  <main class="container">
    <div v-if="recruitment" class="prose max-w-none bg-white px-4 py-8 md:px-10 md:py-12 rounded-2xl">
      <h1 class="heading1">{{ recruitment.fields.jobTitle }}</h1>
      <hr class="my-4" />

      <h2 class="heading2 mt-8">業務内容</h2>
      <div
        v-if="recruitment.fields.jobDescription"
        class="mt-4"
        v-html="documentToHtmlString(recruitment.fields.jobDescription)"
      ></div>

      <h2 class="heading2 mt-8">応募資格</h2>
      <div
        v-if="recruitment.fields.requirements"
        class="prose mt-4"
        v-html="documentToHtmlString(recruitment.fields.requirements)"
      ></div>

      <h2 class="heading2 mt-8">給与</h2>
      <p class="mt-4 whitespace-pre-line">{{ recruitment.fields.salary }}</p>

      <h2 class="heading2 mt-8">雇用形態</h2>
      <p class="mt-4">{{ recruitment.fields.employmentType }}</p>

      <h2 class="heading2 mt-8">出社/リモートワーク</h2>
      <p class="mt-4">{{ recruitment.fields.remoteWork?.join('、') }}</p>
    </div>

    <div class="my-8 space-y-8">
      <NuxtLink to="/contact" class="btn-secondary mr-4">
        お問い合わせフォームから応募する
      </NuxtLink>
      <NuxtLink to="/recruit" class=" btn-primary">
        一覧に戻る
      </NuxtLink>
    </div>
  </main>
</template>

<style scoped>

</style>
