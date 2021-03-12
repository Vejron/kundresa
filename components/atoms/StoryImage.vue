<template>
  <img :src="src" :alt="alt" :width="width" :height="height">
</template>

<script>
export default {
  props: {
    image: {
      type: Object,
      required: true,
    },
  },
  computed: {
    src() {
      return this.image?.filename;
    },
    alt() {
      return this.image?.alt;
    },
    width() {
      return this.src? this.src.split('/')[5].split('x')[0]: 0;
    },
    height() {
      return this.src? this.src.split('/')[5].split('x')[1]: 0;
    }
  }
};
</script>