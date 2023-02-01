export function useExtractIdFromUri() {
  function extractIdFromUri(uri) {
    return uri.split('#recipe_').pop();
  }

  return { extractIdFromUri };
}
