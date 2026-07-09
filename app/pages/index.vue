<script setup lang="ts">
// 更新情報（updatesコンテンツタイプ）の最新記事を取得する
const { data: updates, error: updatesError } = await useUpdates({ key: 'home-updates', limit: 6 })

// case-studies, interview, technologyの3つのタグからそれぞれ最新6件のブログ記事を取得する
const { data: caseStudies } = await useBlogPosts({ tag: 'case-studies', limit: 6 })
const { data: interview } = await useBlogPosts({ tag: 'interview', limit: 6 })
const { data: technology } = await useBlogPosts({ tag: 'technology', limit: 6 })

const blogGroups = computed(() => [
  { tag: 'case-studies', label: '案件事例', items: caseStudies.value ?? [] },
  { tag: 'interview', label: 'インタビュー', items: interview.value ?? [] },
  { tag: 'technology', label: 'テクノロジー', items: technology.value ?? [] },
])

const resolveBlogPostLink = (tag: string, slug?: string, id?: string) => {
  const identifier = slug ?? id

  return identifier ? `/blog/${tag}/${identifier}` : '#'
}
</script>

<template>
  <TopHero />
  <div class="flex flex-col gap-10">
    <main class="container space-y-20 md:space-y-32">
      <section class="space-y-8 md:space-y-12">
        <h2 class="text-3xl md:text-5xl text-center font-bold font-montserrat">Services</h2>
        <p class="text-base md:text-xl leading-relaxed max-w-2xl mx-auto font-semibold text-slate-800 text-center">
          ABC Co.は、ニュースサイトの運営を軸に、<br class="md:hidden">コンテンツ制作や広告事業を通じて<br class="md:hidden">あたらしい情報との出会いを<br class="md:hidden">つくり続けています。
        </p>
        <ServiceCards />
      </section>
      <section>
        <h2 class="text-3xl md:text-5xl text-center font-bold font-montserrat">Updates</h2>
        <NuxtLink href="/updates" class="w-fit ml-auto flex gap-2 items-center border-b border-gray-600">
          すべて見る
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </NuxtLink>
        <div class="p-4 md:py-8 md:px-16 mt-5 border rounded-2xl bg-white">
          <ul class="list-none flex flex-col gap-3">
            <li v-for="update in updates?.items" :key="update.sys.id">
              <NuxtLink :to="`/updates/${update.sys.id}`" class="block">
                <div class="md:flex items-center gap-4">
                  <time v-if="update.sys.createdAt" class="text-sm md:text-md w-30 text-slate-500" :dateTime="update.sys.createdAt">
                    {{ formatDate(update.sys.createdAt) }}
                  </time>
                  <h2 class="md:text-lg font-semibold text-slate-900">{{ update.fields.title }}</h2>
                </div>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </section>
      <section class="mt-10">
        <h2 class="text-3xl md:text-5xl text-center font-bold font-montserrat">Blog</h2>
        <div class="space-y-20 mt-8">
          <div v-for="group in blogGroups" :key="group.tag">
            <div class="flex items-center justify-between">
              <h3 class="text-xl md:text-2xl font-bold mb-4">{{ group.label }}</h3>
              <NuxtLink :to="`/blog/${group.tag}`" class="w-fit ml-auto flex gap-2 items-center border-b border-gray-600">
                すべて見る
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </NuxtLink>
            </div>
            <ArticleList :items="group.items" :resolve-to="(post) => resolveBlogPostLink(group.tag, post.fields.slug, post.sys.id)" />
          </div>
        </div>
      </section>
      <section class="rounded-2xl bg-slate-900 px-6 py-12 md:py-16 text-center text-white space-y-6">
        <h2 class="text-2xl md:text-4xl font-bold font-montserrat">Recruit</h2>
        <p class="text-base md:text-lg leading-relaxed max-w-xl mx-auto">
          ABC Co.では、あたらしい価値を共につくる仲間を募集しています。
        </p>
        <NuxtLink to="/recruit" class="btn-secondary">
          採用情報を見る
        </NuxtLink>
      </section>
    </main>
  </div>
</template>