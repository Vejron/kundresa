<template>
  <section class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
    <div class="my-6 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      <input
        v-model="pnr"
        type="text"
        placeholder="Person eller postnr.."
        class="min-w-0 font-bold leading-5 px-4 py-3 text-gray-600 text-lg border-2 rounded-lg border-green-400 focus:outline-none focus:ring"
      />
      <transition name="slide-up">
        <button
          @click="showOffers"
          class="px-4 py-3 leading-5 border-2 border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring"
          v-if="revealText"
        >
          {{ revealText }}
        </button>
      </transition>
    </div>

    <collapse-transition>
      <ul
        v-if="isOpen"
        class="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
      >
        <li><PriceCard /></li>
        <li><PriceCard /></li>
        <li id="price"><PriceCard /></li>
      </ul>
    </collapse-transition>
  </section>
</template>

<script>
export default {
  props: {
    blok: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    isOpen: false,
    pnr: "903 64",
  }),
  computed: {
    revealText() {
      return this.isValidPnr
        ? "Visa personliga erbjudanden"
        : this.isValidPostNbr
        ? "Visa erbjudanden för mitt område"
        : "";
    },
    isValidPnr() {
      return /^(19|20)?(\d{6}([-+]|\s)\d{4}|(?!19|20)\d{10})$/.test(this.pnr);
    },
    isValidPostNbr() {
      return /^\d{3} \d{2}$/.test(this.pnr);
    },
  },
  watch: {
    pnr(value) {
      console.log(
        value,
        /^(19|20)?(\d{6}([-+]|\s)\d{4}|(?!19|20)\d{10})$/.test(value)
      );
    },
  },
  methods: {
    showOffers() {
      this.isOpen = !this.isOpen;
      setTimeout(() => {
        //const cancelScroll = this.$scrollTo('#price');
      }, 1000);
    },
  },
};
</script>