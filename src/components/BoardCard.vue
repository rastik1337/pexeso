<script setup lang="ts">
import type { Card } from '@/pages/play.vue';

defineProps<{ index: number; card: Card }>();
defineEmits<{ flip: [] }>();
</script>

<template>
  <button
    :disabled="card.isFlipped || card.isMatched"
    :aria-label="
      card.isFlipped || card.isMatched
        ? `Karta ${index + 1}, odkrytá: ${card.alt}`
        : `Karta ${index + 1}, skrytá`
    "
    :class="{ 'rotate-y-180': card.isFlipped || card.isMatched }"
    class="aspect-square cursor-pointer rounded bg-blue-500 transition-transform duration-300 focus:ring-4 focus:ring-blue-800 focus:outline-none disabled:cursor-default"
    @click="$emit('flip')"
  >
    <img
      v-if="card.isFlipped || card.isMatched"
      :src="card.imgUrl"
      :alt="card.alt"
      class="size-full rounded object-cover shadow-md"
    />
  </button>
</template>
