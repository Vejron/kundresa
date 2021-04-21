<template>
  <div v-editable="body" class="md:w-1/2 flex-grow">
    <h2 class="flex-1 text-lg leading-tight mt-1 ml-3 mb-3 font-semibold text-primary">
      {{ body.title }}
    </h2>

    <div class="ml-3 prose prose-sm md:prose xl:prose-xl">
      <rich-text-renderer :document="body.description" />  
    </div>
  </div>
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