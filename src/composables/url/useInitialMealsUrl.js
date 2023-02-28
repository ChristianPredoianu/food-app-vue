import { computed } from 'vue';

export function useInitialMealsUrl() {
  const initialMealsUrl = computed(() => {
    const baseUrl = `https://api.edamam.com/api/recipes/v2?type=public`,
      appId = import.meta.env.VITE_APP_ID,
      apiKey = import.meta.env.VITE_API_KEY,
      diet = 'balanced',
      dishType = 'Main%20course';

    const url = `${baseUrl}&app_id=${appId}&app_key=${apiKey}&diet=${diet}&dishType=${dishType}`;

    return url;
  });

  return { initialMealsUrl };
}
