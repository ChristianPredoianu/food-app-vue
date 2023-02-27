export function useRoundNumber() {
  function roundNumber(num) {
    return Math.round(num);
  }

  return { roundNumber };
}
