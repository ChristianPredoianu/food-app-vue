import { onMounted, onUnmounted, ref, watch } from 'vue';

export function useInfiniteScroll(callback) {
  const isFetchingOnScroll = ref(false);

  onMounted(() => {
    window.addEventListener('scroll', handleScroll);
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });

  watch(isFetchingOnScroll, () => {
    if (!isFetchingOnScroll.value) return;
    callback();
  });

  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isFetchingOnScroll.value
    )
      return;
    isFetchingOnScroll.value = true;
  }

  return {
    isFetchingOnScroll,
  };
}
