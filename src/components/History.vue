<script setup lang="ts">
import { useGameStore } from '@/stores/game';
import HistoryItem from './HistoryItem.vue';

const store = useGameStore();
</script>

<template>
  <p v-if="store.history.length === 0" class="text-gray-500">Zatím nemáš odehrané žádné hry.</p>
  <ul v-else class="flex flex-col gap-3">
    <HistoryItem v-for="(item, i) in store.history" :key="i" :item />
  </ul>
</template>
