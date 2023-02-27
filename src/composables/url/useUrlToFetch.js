export function useUrlToFetch(selectedOptions) {
  // Transform whitespace to %20 to be able to fetch from api.
  function containsWhitespace(str) {
    return str.replace(/\s/g, '%20');
  }

  function fetchUrl() {
    const baseUrl = 'https://api.edamam.com/api/recipes/v2?type=public';
    const appId = import.meta.env.VITE_APP_ID;
    const apiKey = import.meta.env.VITE_API_KEY;
    const diet =
      selectedOptions.diet !== null ? `&diet=${selectedOptions.diet}` : '';
    const health =
      selectedOptions.health !== null
        ? `&health=${selectedOptions.health}`
        : '';
    const cuisineType =
      selectedOptions.cuisineType !== null
        ? `&cuisineType=${containsWhitespace(selectedOptions.cuisineType)}`
        : '';
    const dishType =
      selectedOptions.dishType !== null
        ? `&dishType=${containsWhitespace(selectedOptions.dishType)}`
        : '';
    const mealsUrl = `${baseUrl}&app_id=${appId}&app_key=${apiKey}${diet}${health}${cuisineType}${dishType}
      `;

    return mealsUrl;
  }

  return { fetchUrl };
}
