<template>
  <section class="max-w-5xl mx-auto sm:px-6 md:px-8">
    <div class="text-center">
      <h2 class="text-lg text-green-600 font-semibold uppercase">Kundresan</h2>
      <h3
        class="mt-2 mb-5 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl"
      >
        Fixa elhandelsavtal på några klick
      </h3>
      <p class="mb-6 text-xl text-gray-500">
        Fyll i lite personliga uppgifter så fixar vi resten
      </p>
    </div>

    <div class="flex flex-col max-w-xs mx-auto">
      <div class="relative">
        <input
          v-model="pnr"
          type="text"
          placeholder="Person eller postnr.."
          class="min-w-0 w-full mb-6 font-bold leading-5 px-4 py-3 text-gray-600 text-lg border-2 rounded-lg border-green-400 focus:outline-none focus:ring"
        />
        <div v-if="loading" class="absolute top-5 right-4">
          <div class="dot-bricks"></div>
        </div>
      </div>

      <div class="h-12 relative flex justify-center">
        <transition name="slide-up">
          <button
            @click="showOffers"
            class="absolute px-4 py-3 leading-5 border-2 border-transparent text-base font-medium rounded-full text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring"
            v-if="showOffersButton"
          >
            {{ revealText }}
          </button>
        </transition>
      </div>
    </div>

    <collapse-transition>
      <ul
        id="plans"
        v-show="isOpen"
        class="w-full grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 mb-20"
      >
        <li
          v-for="plan in plans"
          :key="plan.id"
          class="mt-8 sm:rounded-lg shadow-lg p-4 sm:p-8 bg-gradient-to-tr from-transparent to-gray-200"
        >
          <OrderPlan
            showSelect
            @select="onSelected"
            :usage="usage"
            @change="usage = $event"
            :plan="plan"
          />
        </li>
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
    loading: false,
    isOpen: false,
    showOffersButton: false,
    pnr: "",
    usage: 14000,
    fakeCustomer: {
      pnr: "19791106-8513",
      name: "Björn Yttergren",
      address: "Pastorsvägen 10",
      zip: "903 62",
      city: "Umeå",
      planId: 1,
      usage: 0,
    },
  }),
  computed: {
    plans() {
      return this.$store.state.deals.deals;
    },
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
    isAny() {
      return this.isValidPnr || this.isValidPostNbr;
    }
  },
  watch: {
    isAny(value) {
      console.log('is any', value);
      if(value) {
        this.getPerson();
      } else {
        this.showOffersButton  = this.isOpen = false;
      }
    },
  },
  methods: {
    getPerson() {
      // fake async request
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.showOffersButton = true;
      }, Math.random() * 600 + 400);
    },
    onSelected(plan) {
      // push a route with the customer, plan and usage as a queryparam
      // we will read it later on the order route to prepopulate a form
      this.$router.push({
        path: "/order",
        query: {
          data: JSON.stringify({
            ...this.fakeCustomer,
            planId: plan.id,
            usage: this.usage,
          }),
        },
      });
    },
    showOffers() {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        setTimeout(() => {
          const cancelScroll = this.$scrollTo("#plans", 300, { offset: -65 });
        }, 300);
      }
    },
  },
};
</script>