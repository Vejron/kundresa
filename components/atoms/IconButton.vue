<template>
  <component :to="to" :is="isAnchor ? 'nuxt-link' : 'button'" class="flex flex-col items-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      version="1.1"
      :width="size"
      :height="size"
      viewBox="0 0 24 24"
    >
      <path fill="rgba(0,0,0, 0.51)" :d="icon" />
    </svg>
    <slot></slot>
  </component>
</template>

<script>
import { defineComponent, computed } from '@vue/composition-api'

export default defineComponent({
  props: {
    icon: {
      type: String,
      required: true,
    },
    size: {
      type: [String, Number],
      default: 24,
    },
    buttonType: String,
    to: String,
    color: {
      type: String,
      default: "default", // 'default', 'primary', 'accent', 'green', 'orange', or 'red'
    },
    icon: String,
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const isAnchor = computed(() => props.to !== undefined);
    return {
      isAnchor
    }
  },
})
</script>
