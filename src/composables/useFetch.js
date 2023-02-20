import { reactive, toRefs } from 'vue';

export async function useFetch(url) {
  const state = reactive({
    data: null,
    isError: false,
    errorMessage: '',
  });

  async function fetchData() {
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
    }
  }

  await fetchData();

  return {
    ...toRefs(state),
  };
}
