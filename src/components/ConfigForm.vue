<script setup lang="ts">
import { useGameStore } from '@/stores/game';

const store = useGameStore();
</script>

<template>
  <form
    class="flex w-full max-w-xs flex-col gap-5 rounded-lg bg-white p-6 shadow-md"
    @submit.prevent="$router.push('/play')"
  >
    <div class="flex flex-col gap-1">
      <label for="topic-input" class="font-semibold text-gray-700">
        Téma obrázků (anglicky):
      </label>
      <input
        id="topic-input"
        v-model="store.topic"
        type="text"
        required
        placeholder="např. cats, cars, nature"
        class="rounded border p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>

    <div class="flex flex-col gap-1">
      <label for="size-input" class="font-semibold text-gray-700">Velikost plochy:</label>
      <select
        id="size-input"
        v-model="store.boardSize"
        class="rounded border p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        <option :value="16">16 (4x4)</option>
        <option :value="36">36 (6x6)</option>
      </select>
    </div>

    <button
      type="submit"
      class="rounded bg-blue-500 p-3 font-bold text-white transition-colors hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 focus:outline-none"
    >
      Spustit hru
    </button>
  </form>
</template>
