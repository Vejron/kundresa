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
      class="ml-6 inline-block"
      v-for="(testamonial, index) in testamonials"
      :key="testamonial._uid"
    >
      <testamonial-card
        :blok="testamonial.content"
        class="transform-gpu rotate-3"
        :class="{ '-rotate-3': index % 2 }"
      ></testamonial-card>
    </div>

    <!-- <span class="inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full ml-2">0,38%</span> ATX
          <span class="badge badge-danger ml-2">0,16%</span> DAX
          <span class="badge badge-success ml-2">0,04%</span> TecDax
          <span class="badge badge-danger ml-2">0,19%</span> MDAX
          <span class="badge badge-success ml-2">0,03%</span> ESTX50
          <span class="badge badge-info ml-2">0,00%</span> NIKKEI
          <span class="badge badge-success ml-2">0,03%</span> EUR/CHF  -->
  </vue-marquee>
</template>

<script>
export default {
  props: {
    isPaused: false,
    blok: {
      type: Object,
      required: true,
    },
  },
  computed: {
    testamonials() {
      if (!this.blok.testamonials) return [];
      // Load reference data/content from store
      const featuredTestamonials = this.$store.state.testamonials.testamonials.filter(
        (testamonial) => {
          return this.blok.testamonials.includes(testamonial.uuid);
        }
      );
      return featuredTestamonials;
    },
  },
};
</script>