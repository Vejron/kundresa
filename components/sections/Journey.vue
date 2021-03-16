<template>
  <section class="relative">
    <div id="elbuy" class="absolute sr-only -top-32"></div>
    <div class="lg:text-center max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
      <h2 class="text-lg text-primary font-semibold uppercase">Kundresan</h2>
      <h3
        class="mt-2 mb-5 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl"
      >
        Fixa elhandelsavtal på några klick
      </h3>
      <div class="relative max-w-xs lg:mx-auto">
        <input
          :value="pnr"
          @input="(e) => (pnr = e.target.value)"
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
      <client-only>
        <transition name="fade">
          <div
            v-if="showOffers"
            class="relative md:text-lg text-gray-500 lg:flex flex-col items-center"
          >
            Varsågod det här kan vi erbjuda dig
            <svg
              class="-bottom-10 text-upink animate-bounce absolute w-6 h-6 text-amber-900"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
          <div v-else class="md:text-lg text-gray-500">
            Fyll i lite personliga uppgifter så fixar vi resten
          </div>
        </transition>
      </client-only>
    </div>

    <FancyWaves>
      <collapse-transition>
        <ul
          id="plans"
          v-show="showOffers"
          class="max-w-4xl mx-auto pb-8 px-4 sm:px-6 md:px-8 w-full grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8"
        >
          <li
            v-for="plan in plans"
            :key="plan.id"
            :class="{ 'rotate-2 scale-105': plan.id == selectedPlanId }"
            class="transform transition-transform rounded-lg shadow-lg p-4 sm:p-8 bg-gradient-to-tl from-gray-200 via-white to-white"
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
      <collapse-transition>
        <div
          v-show="showSignupForm"
          class="max-w-4xl mx-auto pb-8 px-4 sm:px-6 md:px-8"
        >
          <FormulateForm
            v-model="formData"
            @submit="submitted"
            #default="{ isLoading, hasErrors }"
          >
            <div
              id="personal"
              class="sm:rounded-lg shadow-lg bg-gradient-to-tl from-gray-200 via-white to-white p-4 sm:p-8"
            >
              <h2 class="text-primary md:text-lg font-bold mb-2 uppercase">
                Uppgifter för ditt nya elavtal
              </h2>
              <p class="text-sm font-semibold text-gray-600 mb-4">
                Observera att det är samma person som står på elnätsavtalet som
                ska stå på elavtalet.
              </p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-y-0 md:gap-x-8">
                <FormulateInput
                  ref="email"
                  type="email"
                  name="mail"
                  label="E-post"
                  validation="required|email"
                />
                <FormulateInput
                  type="tel"
                  name="tel"
                  label="Telefon"
                  validation="required"
                />

                <FormulateInput
                  type="text"
                  name="name"
                  label="Förnamn"
                  validation="required"
                />
                <FormulateInput
                  type="text"
                  name="surname"
                  label="Efternamn"
                  validation="required"
                />
              </div>
              <div class="mt-6 md:mt-0 md:flex">
                <FormulateInput
                  class="md:mr-8"
                  type="text"
                  name="address"
                  label="Adress"
                  validation="required"
                />
                <FormulateInput
                  class="md:mr-8"
                  type="text"
                  name="zip"
                  label="Postnummer"
                  validation="required"
                />
                <FormulateInput
                  type="text"
                  name="city"
                  label="Ort"
                  validation="required"
                />
              </div>
            </div>
            <div
              class="mt-8 sm:rounded-lg shadow-lg p-4 sm:p-8 bg-gradient-to-tl from-gray-200 via-white to-white"
            >
              <h2 class="text-primary sm:text-lg font-bold mb-6 uppercase">
                Låt oss hjälpa dig att ta reda på Anläggnings-ID och Områdes-ID
              </h2>
              <FormulateInput
                name="consent"
                type="checkbox"
                label="Jag ger Fake snake AB fullmakt att kontakta min nätägare och nuvarande elleverantör för att komplettera uppgifter om anläggnings-ID och områdes-ID samt säga upp mitt befintliga elavtal till det datum då det löper ut."
                validation="required"
              />

              <FormulateInput
                type="radio"
                name="invoice"
                label="Skicka fakturan via:"
                help="För snabbast handläggning välj e-post"
                :options="[
                  {
                    value: 'email',
                    label: 'E-post',
                    id: 'my-first',
                    disabled: false,
                  }, // this checkbox is disabled
                  { value: 'sms', label: 'SMS' },
                  { value: 'post', label: 'Post' },
                ]"
              />
              <div></div>
              <FormulateInput
                :disabled="isLoading || hasErrors"
                type="submit"
                :label="isLoading ? 'Bearbetar...' : 'Slutför beställning'"
              />
            </div>
          </FormulateForm>
        </div>
      </collapse-transition>
    </FancyWaves>
  </section>
</template>

<script>
import debounce from "lodash/debounce";
import { info } from "@/services/person.service"

export default {
  props: {
    body: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    loading: false,
    showOffers: false,
    showSignupForm: false,
    selectedPlanId: null,
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
    formData: {},
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
    formData() {
      this.saveProgress();
    },
    isAny(value) {
      if (this.isValidPnr) {
        this.getPerson(this.pnr);
      } else {
        this.showOffers = false;
        this.showSignupForm = false;
        this.saveProgress();
      }
    },
  },

  mounted() {
    /*
    const channel = this.$pusher.subscribe('prices');
    channel.bind('price-event', function(data) {
      console.log(JSON.stringify(data));
    });
    */

    const savedState = JSON.parse(localStorage.getItem("state"));
    if (savedState && savedState.formData) {
      // hydrate form data and journey state
      this.formData = savedState.formData;
      this.loading = savedState.loading;
      this.showOffers = savedState.showOffers;
      this.showSignupForm = savedState.showSignupForm;
      this.selectedPlanId = savedState.selectedPlanId;
      this.pnr = savedState.pnr;
      this.usage = savedState.usage;
    }
  },
  methods: {
    submitted(data) {
      // reset saved state after compleated signup
      localStorage.removeItem("state");
    },
    getPerson(pnr) {
      // fake async request
      this.loading = true;
      info(pnr).then((res) => res.json()).then((data) => {
        console.info('peronal stuff', data);
        this.setInitialForm(data);
        this.loading = false;
        this.showOffers = true;
        this.saveProgress();
        setTimeout(() => {
          const cancelScroll = this.$scrollTo("#plans", 300, { offset: -200 });
        }, 300);
      }).catch(e => {
        console.warn('failed to get peronal stuff');
      });
    },
    setInitialForm(data) {
      this.formData = {
        name: data.first_name,
        surname: data.last_name,
        address: data.address,
        zip: data.zip_code,
        city: data.city
      }
    },
    onSelected(plan) {
      this.selectedPlanId = plan.id;
      this.showSignupForm = true;
      setTimeout(() => {
        const cancelScroll = this.$scrollTo("#personal", 300, { offset: -200 });
      }, 300);
      this.saveProgress();
      return;
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
    saveProgress: debounce(function (e) {
      return;
      const state = {
        formData: this.formData,
        loading: this.loading,
        showOffers: this.showOffers,
        showSignupForm: this.showSignupForm,
        selectedPlanId: this.selectedPlanId,
        pnr: this.pnr,
        usage: this.usage,
      };
      console.log("progress saved", state);
      localStorage.setItem("state", JSON.stringify(state));
    }, 500),

    /*showOffers() {
      this.showOffers = !this.showOffers;
      if (this.showOffers) {
        setTimeout(() => {
          const cancelScroll = this.$scrollTo("#plans", 300, { offset: -65 });
        }, 300);
      }
    },*/
  },
};
</script>
