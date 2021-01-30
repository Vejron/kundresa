<template>
  <div class="m-8">
    <input
      v-model="pnr"
      type="text"
      placeholder="Person eller postnr.."
      class="font-bold leading-5 text-gray-600 text-lg border-2 rounded-lg border-green-400 px-4 py-3 focus:outline-none focus:ring focus:border-green-300"
    />
    <button v-if="isValidPnr">Visa personliga erbjudanden</button>
    <button v-if="isValidPostNbr">Visa erbjudanden för mitt område</button>
    <button
      @click="isOpen = !isOpen"
      class="px-4 py-2 leading-5 bg-green-800 border  hover:bg-green-400"
    >
      Click to Toggle
    </button>
    <collapse-transition>
      <ul v-if="isOpen" class="w-full p-4 flex flex-wrap">
        <li>Example!</li>
        <li>Example!</li>
        <li>Example!</li>
        
      </ul>
    </collapse-transition>
  </div>
</template>

<script>
export default {
  data: () => ({
    isOpen: false,
    pnr: "",
  }),
  computed: {
    isValidPnr() {
      return /^(19|20)?(\d{6}([-+]|\s)\d{4}|(?!19|20)\d{10})$/.test(this.pnr)
    },
    isValidPostNbr() {
      return /^\d{3} \d{2}$/.test(this.pnr)
    },
  },
  watch: {
    pnr(value) {
      console.log(value, /^(19|20)?(\d{6}([-+]|\s)\d{4}|(?!19|20)\d{10})$/.test(value));
    }
  }
};
</script>