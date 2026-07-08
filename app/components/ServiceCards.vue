<script setup lang="ts">
// サービス（事業内容）一覧を取得する
const services = useServices()
</script>

<template>
  <ul class="list-none grid gap-6 md:grid-cols-3">
    <li v-for="service in services" :key="service.id">
      <NuxtLink :to="`/services#${service.id}`" class="card h-full flex flex-col">
        <span class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-teal-50 text-teal-700">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="service.iconPath" />
          </svg>
        </span>
        <p class="mt-4 text-xs font-semibold tracking-widest text-teal-700 uppercase">{{ service.subtitle }}</p>
        <h3 class="heading3 mt-1">{{ service.title }}</h3>
        <p class="mt-3 text-sm text-slate-600 leading-relaxed">{{ service.description }}</p>
      </NuxtLink>
    </li>
  </ul>
</template>
