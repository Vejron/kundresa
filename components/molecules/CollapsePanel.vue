<template>
  <collapse :heading="body.heading">
    <div class="prose prose-md">
        <rich-text-renderer :document="body.content" />
      </div>
  </collapse>
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  props: {
    body: {
      type: Object,
      required: true,
    },
  },
})
</script>
