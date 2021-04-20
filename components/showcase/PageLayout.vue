<template>
  <div v-editable="body" class="relative max-w-7xl mx-auto">
    <component
      v-for="body in body.body"
      :key="body._uid"
      :body="body"
      :is="body.component"
    />
  </div>
</template>

<script>
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  props: {
    body: {
      type: Object,
      required: true,
    },
  },
  setup() {},
});
</script>
