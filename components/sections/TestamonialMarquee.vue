<template>
  <vue-marquee
    @mouseenter="isPaused = !isPaused"
    @mouseleave="isPaused = false"
    :duration="80"
    :repeat="2"
    :paused="isPaused"
    class="py-10 my-10 bg-gradient-to-b from-transparent via-gray-200 to-transparent"
  >
    <div
      class="ml-12 inline-block"
      v-for="(testamonial, index) in testamonials"
      :key="testamonial._uid"
    >
      <testamonial-card
        :body="testamonial.content"
        class="transform-gpu max-w-md"
        :class="index % 2 ? '-rotate-3' : 'rotate-3'"
      ></testamonial-card>
    </div>
  </vue-marquee>
</template>

<script>
export default {
  props: {
    body: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    isPaused: false,
  }),
  computed: {
    testamonials() {
      if (!this.body.testamonials) return [];
      // Load reference data/content from store
      const featuredTestamonials = this.$store.state.testamonials.testamonials.filter(
        (testamonial) => {
          return this.body.testamonials.includes(testamonial.uuid);
        }
      );
      return featuredTestamonials;
    },
  },
};
</script>