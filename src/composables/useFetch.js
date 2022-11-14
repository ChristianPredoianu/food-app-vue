import { reactive, toRefs } from 'vue';

export async function useFetch(url) {
  const state = reactive({
    isLoading: true,
    isError: false,
    errorMessage: '',
    data: null,
  });

  async function fetchData() {
    state.isLoading = true;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      state.data = await response.json();
    } catch (error) {
      const typedError = error;
      state.isError = true;
      state.errorMessage = typedError.message;
    } finally {
      state.isLoading = false;
    }
  }

  await fetchData();

  return {
    ...toRefs(state),
  };
}
