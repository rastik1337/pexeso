<script setup lang="ts">
import type { Card } from '@/pages/play.vue';
import { useGameStore } from '@/stores/game';
import { onMounted, onUnmounted, ref } from 'vue';
import BoardCard from './BoardCard.vue';

const { cards } = defineProps<{ cards: Card[] }>();
const emit = defineEmits<{ completed: [] }>();

const store = useGameStore();

const cardsFlipped = ref<Card[]>([]);
const flips = defineModel<number>('flips', { required: true, default: 0 });
const time = defineModel<number>('time', { required: true, default: 0 });

onMounted(() => {
  timer = setInterval(() => time.value++, 1000);
});
let timer: ReturnType<typeof setInterval>;
onUnmounted(() => {
  if (timer) clearInterval(timer);
});

function flipCard(card: Card) {
  if (card.isFlipped || card.isMatched || cardsFlipped.value.length === 2) return;

  card.isFlipped = true;
  cardsFlipped.value.push(card);

  if (cardsFlipped.value.length === 2) {
    flips.value++;
    checkMatch();
  }
}

function checkMatch() {
  const [cardA, cardB] = cardsFlipped.value;
  if (!cardA || !cardB) {
    cardsFlipped.value = [];
    return;
  }
  if (cardA.imgUrl === cardB.imgUrl) {
    cardA.isMatched = true;
    cardB.isMatched = true;
    cardsFlipped.value = [];
    if (cards.every((c) => c.isMatched)) {
      clearInterval(timer);
      emit('completed');
    }
  } else {
    setTimeout(() => {
      cardA.isFlipped = false;
      cardB.isFlipped = false;
      cardsFlipped.value = [];
    }, 1000);
  }
}
</script>

<template>
  <section
    aria-label="Herní plocha"
    :class="store.boardSize === 16 ? 'grid-cols-4' : 'grid-cols-6'"
    class="grid w-full max-w-2xl gap-4 px-4"
  >
    <BoardCard v-for="(card, index) in cards" :key="card.id" :index :card @flip="flipCard(card)" />
  </section>
</template>
