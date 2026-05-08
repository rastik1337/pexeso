import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';

export type GameResult = {
  date: string;
  time: number;
  score: number;
  topic: string;
  flips: number;
  cardCount: number;
};

export const useGameStore = defineStore('game', () => {
  const topic = useLocalStorage('topic', '');
  const boardSize = useLocalStorage('board_size', 16);
  const history = useLocalStorage<GameResult[]>('history', []);
  const ratelimit = useLocalStorage<number | null>('ratelimit', null);

  function saveResult(time: number, flips: number) {
    const score = Math.max(0, 1000 - time * 2 - flips * 20);
    history.value.unshift({
      date: new Date().toISOString(),
      topic: topic.value,
      time,
      flips,
      score,
      cardCount: boardSize.value,
    });
  }

  return {
    topic,
    boardSize,
    history,
    ratelimit,
    saveResult,
  };
});
