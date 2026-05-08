<script setup lang="ts">
import History from '@/components/History.vue';
</script>

<template>
  <main class="flex min-h-screen flex-col items-center py-16">
    <header class="mb-12 text-center">
      <h1 class="mb-8 text-6xl font-extrabold text-blue-600">Pexeso</h1>
      <router-link
        to="/config"
        class="rounded-xl bg-blue-500 px-8 py-4 text-2xl font-bold text-white shadow-lg transition hover:bg-blue-600"
      >
        Nová hra
      </router-link>
    </header>

    <section class="w-full max-w-3xl px-4">
      <header>
        <h2 class="mb-4 border-b pb-2 text-3xl font-bold">Odehrané hry</h2>
      </header>
      <History />
    </section>
  </main>
</template>
