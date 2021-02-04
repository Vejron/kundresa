<template>
  <div class="flex flex-col items-center">
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
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true,
    },
    size: {
      type: [String, Number],
      default: 24,
    },
  },
};
</script>