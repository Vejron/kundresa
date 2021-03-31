<template>
<div>
  
  <div
    v-editable="body"
    class="prose prose-sm sm:prose lg:prose-lg mb-24 px-4 mx-auto"
  >
  <bread-crumb></bread-crumb>
    <h1>{{ body.name }}</h1>
    <img :src="image" width="1000" height="550" />

    <p class="lead">{{ body.intro }}</p>
    <rich-text-renderer :document="body.body" />
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
  computed: {
    image() {
      return this.body?.image?.filename;
    },
  },
};
</script>