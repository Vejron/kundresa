<template>
  <div>
    <button
      @click="expanded = !expanded"
      :aria-expanded="expanded"
      class="focus:outline-none focus:ring-2 flex justify-between w-full"
    >
      <span>{{ heading }}</span>
      <svg
        class="transition-transform duration-300"
        :class="{ 'transform rotate-180': expanded }"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        version="1.1"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path fill="currentColor" :d="mdiChevronDown" />
      </svg>
    </button>

    <collapse-transition>
      <div v-if="expanded">
        <slot />
      </div>
    </collapse-transition>
  </div>
</template>

<script>
import { defineComponent, ref } from "@vue/composition-api";
import { mdiChevronDown } from "@mdi/js";

export default defineComponent({
  props: {
    heading: {
      type: String,
      required: true,
    },
  },
  setup() {
    const expanded = ref(false);
    return {
      expanded,
      mdiChevronDown,
    };
  },
});
</script>