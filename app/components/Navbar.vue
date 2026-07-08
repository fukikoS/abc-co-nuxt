<script setup lang="ts">
const navLinks = [
  { href: "/company", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/updates", label: "Updates" },
  { href: "/blog", label: "Blog" },
  { href: "/recruit", label: "Recruit" },
  { href: "/contact", label: "Contact" },
]

</script>

<template>
  <header class="sticky top-0 z-50 shadow backdrop-blur font-montserrat">
    <div class="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
      <NuxtLink href="/" class="flex items-center font-black text-3xl">
        <img
          src="/logo-navbar.svg"
          alt="ABC Co logo"
          class="h-8 w-8 rounded-md object-cover"
          width="32"
          height="32"
        >
        <span><span class="text-main-green">ABC Co</span>.</span>
        
      </NuxtLink>

      <nav class="hidden md:flex">
        <ul class="flex gap-4">
          <li v-for="link in navLinks" :key="link.href">
            <NuxtLink :href="link.href" class="underline-animation font-semibold">
              {{link.label}}
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <MobileNav :links="navLinks" />
    </div>
  </header>
</template>

<style scoped>

</style>