import { ref, reactive, computed } from 'vue';

export function useFilterRecipies() {
  const selectedOptions = reactive({
    diet: null,
    health: null,
    mealType: null,
    dishType: null,
    cuisineType: null,
  });

  const dishTags = computed(() => {
    const dishValues = Object.values(selectedOptions);
    const tags = [];
    for (let i = 0; i < dishValues.length; i++) {
      if (dishValues[i] !== null) {
        tags.push(dishValues[i]);
      }
    }
    return tags;
  });

  const isOptionsSelected = ref(true);

  function getSelectValue(value, index) {
    value === ''
      ? (selectedOptions[index] = null)
      : (selectedOptions[index] = value);
    isOptionsSelected.value = true;
  }

  function removeTag(tag) {
    const foundTag = dishTags.value
      .filter((element) => element === tag)
      .toString();
    for (const key in selectedOptions) {
      if (selectedOptions[key] === foundTag) {
        selectedOptions[key] = null;
      }
    }
  }

  function isSelectedOptions() {
    let isOptions = dishTags.value.length > 0 ? true : false;
    return isOptions;
  }

  return {
    selectedOptions,
    getSelectValue,
    isOptionsSelected,
    dishTags,
    removeTag,
    isSelectedOptions,
  };
}
