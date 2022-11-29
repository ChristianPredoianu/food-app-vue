export function useCapitalizeFirstLetter() {
  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return { capitalizeFirstLetter };
}
