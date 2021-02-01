<template>
  <div
    v-editable="blok"
    class="prose prose-sm sm:prose lg:prose-lg mb-24 px-4 mx-auto"
  >
    <h1>{{ blok.name }}</h1>
    <img :src="image" width="1000" height="550" />

    <p class="lead">{{ blok.intro }}</p>
    <rich-text-renderer :document="blok.body" />
  </div>
</template>

<script>
export default {
  props: {
    blok: {
      type: Object,
      required: true,
    },
  },
  computed: {
    image() {
      return this.blok?.image?.filename;
    },
  },
};
</script>