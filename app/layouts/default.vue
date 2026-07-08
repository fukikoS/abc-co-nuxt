<script setup lang="ts">
usePageMeta({
  title: 'ABC Co.',
  description: 'あたらしい一歩を、あなたといっしょに。ABC Co.は、ニュースサイトの運営を軸に、コンテンツ制作や広告事業を通じてあたらしい情報との出会いをつくり続けています。',
})
</script>

<template>
  <Navbar />
  <div class="min-h-[calc(100vh-156px)]">
    <slot />
  </div>
  <Footer />
</template>