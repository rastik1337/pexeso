<script setup lang="ts">
import ConfigForm from '@/components/ConfigForm.vue';
</script>

<template>
  <main class="flex h-screen flex-col items-center justify-center gap-6 bg-gray-50 px-4">
    <header>
      <h1 class="text-4xl font-bold text-gray-800">Nastavení</h1>
    </header>
    <ConfigForm />
    <nav>
      <router-link
        to="/"
        class="rounded px-2 text-gray-600 underline hover:text-gray-800 focus:ring-2 focus:ring-gray-400 focus:outline-none"
      >
        Zpět na hlavní menu
      </router-link>
    </nav>
  </main>
</template>
