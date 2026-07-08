<script setup lang="ts">
usePageMeta({
  title: 'ABC Co.',
  description: 'ABC Co.のコーポレートサイトです。',
})
</script>

<template>
  <Navbar />
  <div class="min-h-[calc(100vh-156px)]">
    <slot />
  </div>
  <Footer />
</template>