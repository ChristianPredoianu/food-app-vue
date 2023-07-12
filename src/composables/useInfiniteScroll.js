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
    const endOfPage =
      window.innerHeight + window.pageYOffset >= document.body.offsetHeight;

    if (endOfPage) isFetchingOnScroll.value = true;
  }

  return {
    isFetchingOnScroll,
  };
}
