import { ref } from 'vue';

export function useModal() {
  const isModalOpen = ref(true);

  function openModal() {
    isModalOpen.value = true;
  }

  function closeModal() {
    isModalOpen.value = false;
  }

  return {
    isModalOpen,
    openModal,
    closeModal,
  };
}
