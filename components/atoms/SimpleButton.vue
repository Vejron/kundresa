<template>
  <button
    @click="onClick"
    :class="classes"
    :disabled="disabled || loading"
    class="base-button"
  >
    <slot />
  </button>
</template>


<script>
import { defineComponent, computed } from "@vue/composition-api";   

export default defineComponent({
  props: {
    primary: Boolean,
    secondary: Boolean,
    rounded: Boolean,
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, {emit}) {
    const classes = computed(() => {
      return [
        { "is-disabled": props.disabled },
        { "is-primary": props.primary },
        { "is-secondary": props.secondary },
        { "rounded-lg": props.rounded }
        ];
    });
    const onClick = (e) => {
        emit("click", e);
    }
    return {
      classes,
      onClick
    }
  },
});
</script>


<style lang="postcss" scoped>
  .base-button {
    @apply transition-all;
    @apply duration-300;
    @apply truncate;
    @apply w-full;
    @apply font-semibold;
  }
  .is-disabled {
    @apply text-gray-500;
  }
  .is-primary.is-disabled {
     @apply bg-gray-300 text-gray-600;
  }
  .is-primary {
    @apply text-white;
    @apply bg-primary bg-opacity-75 hover:bg-opacity-100;
    @apply px-4 py-3;
  }
  .is-secondary {
    @apply text-black;
    @apply bg-gray-300 bg-opacity-50 hover:bg-opacity-100;
    @apply px-4 py-3;
  }
</style>