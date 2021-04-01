<template>
  <section v-editable="body" class="prose prose-sm lg:prose-lg prose-green ">
    <rich-text-renderer :document="body.body" />
  </section>
</template>

<script>
export default {
  props: {
    body: {
      type: Object,
      required: true,
    },
  },
};
</script>