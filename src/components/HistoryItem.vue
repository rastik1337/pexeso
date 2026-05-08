<script setup lang="ts">
import type { GameResult } from '@/stores/game';
import { computed } from 'vue';

const { item } = defineProps<{ item: GameResult }>();
const datetime = computed(() => {
  return new Date(item.date).toLocaleString('cs-CZ');
});
const textBoardSize = computed(() => {
  return `Velikost: ${item.cardCount / 2}x${item.cardCount / 2}`;
});
const textTopic = computed(() => {
  return `Téma: "${item.topic}"`;
});
const title = computed(() => {
  return `- ${textTopic.value}, ${textBoardSize.value}`;
});
</script>

<template>
  <li>
    <article class="flex items-center justify-between rounded bg-white p-4 shadow-lg">
      <div>
        <time :datetime class="font-bold">
          {{ datetime }}
        </time>
        {{ title }}
      </div>
      <div class="text-right">
        <div>
          Skóre:
          <strong class="text-green-600">{{ item.score }}</strong>
          / <strong>1000</strong>
        </div>
        <div class="text-sm text-gray-500">Čas: {{ item.time }}s | Otočení: {{ item.flips }}</div>
      </div>
    </article>
  </li>
</template>
