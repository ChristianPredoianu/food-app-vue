import { ref } from 'vue';

export function useRoundNumber() {
  function roundNumber(num) {
    return Math.round(num);
  }

  return { roundNumber };
}
