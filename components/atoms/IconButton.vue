<template>
  <component @click="click" :to="to" :is="isAnchor ? 'nuxt-link' : 'button'" :class="classes" class="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 flex   items-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      version="1.1"
      :width="size"
      :height="size"
      viewBox="0 0 24 24"
    >
      <path :d="icon" />
    </svg>
    <slot></slot>
  </component>
</template>

<script>
import { defineComponent, computed } from '@vue/composition-api'

export default defineComponent({
  props: {
    fab: Boolean,
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
  setup(props, {emit}) {
    
    const isAnchor = computed(() => props.to !== undefined);
    
    const classes = computed(() => {
      return [
        { "p-3 rounded-full bg-secondary shadow-lg": props.fab },
        ];
    });

    const click = (e) => {
      emit("click", e)
    }

    return {
      isAnchor,
      classes,
      click,
    }
  },
})
</script>
