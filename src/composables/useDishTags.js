import { computed } from 'vue';

export function useDishTags(selectedOptions) {
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

  return {
    dishTags,
    removeTag,
  };
}
