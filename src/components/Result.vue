<script setup lang="ts">
defineProps<{ time: number; flips: number }>();
</script>

<template>
  <section
    class="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col gap-4 rounded bg-white p-8 text-center shadow-lg"
    aria-labelledby="win-title"
  >
    <header>
      <h2 id="win-title" class="text-4xl font-bold text-green-600">Hotovo!</h2>
    </header>
    <div class="flex flex-col items-start">
      <p class="text-xl">
        Čas: <strong>{{ time }} s</strong>
      </p>
      <p class="mb-6 text-xl">
        Otočení: <strong>{{ flips }}</strong>
      </p>
    </div>
    <nav>
      <button
        @click="$router.push('/')"
        class="rounded bg-blue-500 px-6 py-3 text-lg font-semibold text-white hover:bg-blue-600 focus:ring-4 focus:ring-blue-800 focus:outline-none"
      >
        Zpět do menu
      </button>
    </nav>
  </section>
</template>
