<script setup lang="ts">
type Props = {
  to: string
  title: string
  dateTime?: string
  imageSrc?: string
  imageAlt?: string
}

const props = withDefaults(defineProps<Props>(), {
  dateTime: undefined,
  imageSrc: '/img/default-thumbnail.png',
  imageAlt: 'デフォルトサムネイル',
})

const formattedDate = computed(() => formatDate(props.dateTime))
</script>

<template>
  <NuxtLink :to="to" class="border-b border-gray-200 flex gap-2 h-full bg-white rounded-lg hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 transition-shadow">
    <NuxtImg
      :src="imageSrc"
      :alt="imageAlt"
      width="96"
      height="96"
      class="w-24 h-full object-cover rounded-l-lg"
    />
    <div class="p-3 md:py-4 min-w-0">
      <h4 class="font-bold line-clamp-2">{{ title }}</h4>
      <time v-if="dateTime" class="text-sm text-gray-500" :datetime="dateTime">
        {{ formattedDate }}
      </time>
    </div>
  </NuxtLink>
</template>