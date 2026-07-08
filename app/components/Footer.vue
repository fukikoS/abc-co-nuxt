<script setup lang="ts">
const year = new Date().getFullYear();
</script>

<template>
  <footer class="border-t border-border bg-white">
      <div class="mx-auto max-w-5xl px-4 py-6">
        <div class="space-y-2 text-center text-sm text-muted-foreground">
          <p>
            &copy; {{year}}
            <NuxtLink
              href="/"
              class="font-medium text-foreground underline-offset-4 transition-colors hover:underline"
            >
              News Site
            </NuxtLink>
          </p>
          <nav aria-label="Legal links">
            <ul class="flex items-center justify-center gap-4">
              <li>
                <NuxtLink
                  href="/privacypolicy"
                  class="underline-offset-4 transition-colors hover:text-foreground hover:underline"
                >
                  プライバシーポリシー
                </NuxtLink>
              </li>
              <li aria-hidden class="select-none text-border">
                |
              </li>
              <li>
                <NuxtLink
                  href="/terms"
                  class="underline-offset-4 transition-colors hover:text-foreground hover:underline"
                >
                  利用規約
                </NuxtLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
</template>

<style scoped>

</style>