<script setup lang="ts">
usePageMeta({
  title: 'Thank You | ABC Co.',
  description: 'ABC Co.のお問い合わせページです。',
})
</script>

<template>
  <main class="container">
    <PageHeader
      subtitle="Thank You"
      title="お問い合わせありがとうございます"
      description="お問い合わせを受け付けました。内容を確認の上、担当者よりご連絡いたします。"
    />

    <div class="flex flex-col items-center gap-6 bg-white p-6 md:p-12 rounded-2xl mt-8">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="w-16 h-16 text-teal-700">
        <circle cx="12" cy="12" r="10" stroke-width="1.5" />
        <path stroke-linecap="round" stroke-linejoin="round" d="M8.5 12.5l2.5 2.5 5-5" />
      </svg>

      <NuxtLink to="/" class="btn-primary">
        トップページへ戻る
      </NuxtLink>
    </div>
  </main>
</template>

<style scoped>

</style>
