import { ref } from 'vue';

export function useFetch(url) {
  const data = ref(null);
  const isError = ref(null);
  const errorMessage = ref(null);
  const isLoading = ref(false);

  async function fetchData(url) {
    isLoading.value = true;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      data.value = await response.json();
    } catch (error) {
      const typedError = error;
      isError.value = true;
      errorMessage.value = typedError.message;
    } finally {
      isLoading.value = false;
    }
  }

  return {
    data,
    isError,
    errorMessage,
    isLoading,
    fetchData,
  };
}
