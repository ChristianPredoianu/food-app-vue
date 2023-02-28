export function useQueryUrl() {
  function queryUrl(searchQuery) {
    const baseUrl = 'https://api.edamam.com/api/recipes/v2?type=public',
      appId = import.meta.env.VITE_APP_ID,
      apiKey = import.meta.env.VITE_API_KEY;

    const searchQueryUrl = `${baseUrl}&q=${searchQuery}&app_id=${appId}&app_key=${apiKey}`;

    return searchQueryUrl;
  }

  return { queryUrl };
}
