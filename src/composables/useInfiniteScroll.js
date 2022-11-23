import { onMounted, onUnmounted, ref, watch } from 'vue';

export function useInfiniteScroll(callback) {
  const isFetching = ref(false);

  onMounted(() => {
    window.addEventListener('scroll', handleScroll);
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });

  watch(isFetching, (newValue, oldValue) => {
    if (isFetching.value) return;
    callback();
  });

  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return;
    isFetching.value = true;
  }

  return {
    isFetching,
  };
}
