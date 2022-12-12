import { ref } from 'vue';

export function useModal() {
  const isModalOpen = ref(false);

  function openModal() {
    isModalOpen.value = true;
  }

  function closeModal() {
    isModalOpen.value = false;
    console.log(isModalOpen.value);
  }

  return {
    isModalOpen,
    openModal,
    closeModal,
  };
}
