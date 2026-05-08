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
    class="group aspect-square cursor-pointer rounded bg-transparent perspective-normal focus:ring-4 focus:ring-blue-800 focus:outline-none disabled:cursor-default"
    @click="$emit('flip')"
  >
    <div
      :class="{ 'rotate-y-180': card.isFlipped || card.isMatched }"
      class="relative size-full transition-transform duration-500 transform-3d"
    >
      <div class="absolute inset-0 rounded bg-blue-500 shadow-md backface-hidden"></div>
      <figure class="absolute inset-0 rotate-y-180 backface-hidden">
        <img :src="card.imgUrl" :alt="card.alt" class="size-full rounded object-cover shadow-md" />
      </figure>
    </div>
  </button>
</template>
