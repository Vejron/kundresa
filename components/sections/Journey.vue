<template>
  <section class="">
    <div class="lg:text-center max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
      <h2 class="text-lg text-primary font-semibold uppercase">Kundresan</h2>
      <h3
        class="mt-2 mb-5 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl"
      >
        Fixa elhandelsavtal på några klick
      </h3>
      <div class="relative max-w-xs lg:mx-auto">
        <input
          v-model="pnr"
          type="text"
          placeholder="Person eller postnr.."
          class="min-w-0 w-full mb-6 font-bold leading-5 px-4 py-3 text-gray-600 text-lg border-2 rounded-lg border-upink focus:outline-none focus:ring"
        />
        <transition name="fade">
          <div v-if="loading" class="absolute top-5 right-4">
            <div class="dot-bricks"></div>
          </div>
        </transition>
      </div>
      <p class=" md:text-lg text-gray-500">
        Fyll i lite personliga uppgifter så fixar vi resten
      </p>
    </div>

    <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" height="8rem" width='100%' viewBox="0 0 1440 320">
      <path
        fill="#ffb300"
        fill-opacity="1"
        d="M0,64L80,101.3C160,139,320,213,480,208C640,203,800,117,960,101.3C1120,85,1280,139,1360,165.3L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
      ></path>
    </svg>
    <div style="background: #ffb300">
      <collapse-transition>
        <ul
          id="plans"
          v-show="isOpen"
          class="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 w-full grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8"
        >
          <li
            v-for="plan in plans"
            :key="plan.id"
            class="sm:rounded-lg shadow-lg p-4 sm:p-8 bg-gradient-to-tr from-white to-gray-200"
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
    </div>
    <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" height="8rem" width='100%' viewBox="0 0 1440 320">
      <path
        fill="#ffb300"
        fill-opacity="1"
        d="M0,64L80,101.3C160,139,320,213,480,208C640,203,800,117,960,101.3C1120,85,1280,139,1360,165.3L1440,192L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
      ></path>
    </svg>

    <div class="flex flex-col">
      <!--div class="h-12 relative flex justify-center">
        <transition name="slide-up">
          <button
            @click="showOffers"
            class="w-full absolute px-4 py-3 leading-5 border-2 border-transparent text-base font-medium rounded-lg text-white bg-upink hover:bg-primary-80 focus:outline-none focus:ring"
            v-if="showOffersButton"
          >
            {{ revealText }}
          </button>
        </transition>
      </div-->
    </div>
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
    },
  },
  watch: {
    isAny(value) {
      console.log("is any", value);
      if (value) {
        this.getPerson();
      } else {
        this.isOpen = false;
      }
    },
  },
  methods: {
    getPerson() {
      // fake async request
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.isOpen = true;

        setTimeout(() => {
          const cancelScroll = this.$scrollTo("#plans", 300, { offset: -200 });
        }, 300);
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