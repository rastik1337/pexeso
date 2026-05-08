<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useGameStore } from '@/stores/game';
import Result from '@/components/Result.vue';
import Board from '@/components/Board.vue';

const store = useGameStore();

export type Card = {
  id: string;
  imgUrl: string;
  alt: string;
  isFlipped: boolean;
  isMatched: boolean;
};

const cards = ref<Card[]>([]);

const flips = ref(0);
const time = ref(0);

const isLoading = ref(true);
const isFinished = ref(false);

const errorMessage = ref('');

type UnsplashImage = {
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  alt_description: string;
};

onMounted(initialize);

async function initialize() {
  const result = await fetchImages(store.topic, store.boardSize / 2);
  if (result instanceof Error) {
    errorMessage.value = result.message;
    return;
  }
  const deck = result
    .map((img: UnsplashImage) => ({
      url: img.urls.thumb,
      alt: img.alt_description || store.topic,
    }))
    .flatMap((img) => [
      {
        id: crypto.randomUUID(),
        imgUrl: img.url,
        alt: img.alt,
        isFlipped: false,
        isMatched: false,
      },
      {
        id: crypto.randomUUID(),
        imgUrl: img.url,
        alt: img.alt,
        isFlipped: false,
        isMatched: false,
      },
    ]);

  cards.value = deck.sort(() => Math.random() - 0.5);
  isLoading.value = false;
}

async function fetchImages(topic: string, count: number) {
  try {
    isLoading.value = true;
    const params = new URLSearchParams({ topic, count: count.toString() });
    const res = await fetch(`/.netlify/functions/getImages?${params.toString()}`);
    if (!res.ok) throw new Error('Nepodařilo se načíst obrázky.');

    const data = await res.json();
    store.ratelimit = data.remainingRequests;
    if (!Array.isArray(data.images)) throw new TypeError('Obrázky jsou v nesprávném formátu.');
    return data.images as UnsplashImage[];
  } catch (error) {
    isLoading.value = false;
    return error instanceof Error
      ? error
      : new Error('Došlo k chybě při načítání hry. Zkuste to prosím znovu.');
  }
}
</script>

<template>
  <main class="relative flex min-h-screen flex-col items-center bg-gray-100 py-10">
    <Result v-if="isFinished" :time :flips />
    <template v-else>
      <header v-if="!isLoading && !errorMessage" class="mb-6 flex w-full max-w-2xl flex-col px-4">
        <div class="mb-2 flex justify-between text-xl">
          <p>
            Čas: <strong>{{ time }}s</strong>
          </p>
          <h1>
            Téma: <strong>{{ store.topic }}</strong>
          </h1>
          <p>
            Otočení: <strong>{{ flips }}</strong>
          </p>
        </div>
        <div
          v-if="store.ratelimit != null"
          :class="store.ratelimit < 5 ? 'font-bold text-red-600' : 'text-gray-500'"
          class="text-right text-sm"
        >
          Zbývající počet her (reset 1x za hodinu):
          {{ store.ratelimit }}/50
        </div>
      </header>

      <div v-if="isLoading" class="mt-20 text-2xl" aria-busy="true">Načítám hrací plochu...</div>
      <div v-else-if="errorMessage" class="mt-20 text-xl text-red-600" role="alert">
        {{ errorMessage }}
        <button class="mx-auto mt-4 block text-blue-500 underline" @click="$router.push('/config')">
          Zpět na nastavení
        </button>
      </div>
      <Board
        v-else
        v-model:time="time"
        v-model:flips="flips"
        :cards
        @completed="
          isFinished = true;
          store.saveResult(time, flips);
        "
      />
    </template>
  </main>
</template>
