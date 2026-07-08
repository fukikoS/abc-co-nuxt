<script setup lang="ts">
usePageMeta({
  title: 'サービス | ABC Co.',
  description:
    'ABC Co.のサービス紹介ページです。ニュースサイトの運営、コンテンツ制作、広告事業の3つの事業を通じて、価値ある情報を届けています。',
})

// サービス（事業内容）一覧を取得する
const services = useServices()
</script>

<template>
  <main class="container">
    <PageHeader
      subtitle="Services"
      title="サービス"
      description="ABC Co.は「ニュースサイトの運営」「コンテンツ制作」「広告事業」の3つの事業を軸に、価値ある情報を生み出し、必要とする人へ届けることを使命としています。"
    />

    <div class="mt-8 md:mt-16 space-y-12 md:space-y-20">
      <section
        v-for="(service, index) in services"
        :id="service.id"
        :key="service.id"
        class="scroll-mt-24 bg-white rounded-2xl p-6 md:p-10 md:flex md:items-center md:gap-10"
        :class="{ 'md:flex-row-reverse': index % 2 === 1 }"
      >
        <div class="md:w-2/5 flex justify-center">
          <span class="inline-flex items-center justify-center w-24 h-24 md:w-32 md:h-32 rounded-full bg-teal-50 text-teal-700">
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" :d="service.iconPath" />
            </svg>
          </span>
        </div>

        <div class="mt-6 md:mt-0 md:w-3/5">
          <p class="text-sm font-semibold tracking-widest text-teal-700 uppercase">
            {{ String(index + 1).padStart(2, '0') }} / {{ service.subtitle }}
          </p>
          <h2 class="heading2 mt-2">{{ service.title }}</h2>
          <p class="mt-4 text-slate-600 leading-relaxed">{{ service.description }}</p>
          <ul class="mt-6 space-y-3">
            <li v-for="feature in service.features" :key="feature" class="flex items-start gap-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="mt-0.5 shrink-0 text-teal-600" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-slate-800">{{ feature }}</span>
            </li>
          </ul>
        </div>
      </section>
    </div>

    <div class="mt-16 md:mt-24 text-center bg-white rounded-2xl p-8 md:p-12">
      <h2 class="heading2">お気軽にお問い合わせください</h2>
      <p class="mt-4 text-slate-600 leading-relaxed">
        サービスに関するご相談・お見積もりは、お問い合わせフォームより承っております。
      </p>
      <NuxtLink to="/contact" class="btn-primary mt-8">お問い合わせはこちら</NuxtLink>
    </div>
  </main>
</template>
