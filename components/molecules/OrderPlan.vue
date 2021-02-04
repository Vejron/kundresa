<template>
  <div class="flex flex-col min-h-full">
    <h3 class="text-4xl font-black">{{ plan.title }}</h3>
    <p class="font-bold text-sm my-6">Hur stor är din elförbrukning?</p>

    <div class="flex justify-between">
      <p class="italic font-black text-red-600 text-3xl mb-4">
        {{ usage }}
        <span class="text-sm text-yellow-500">kWh / år</span>
      </p>
      <div class="relative">
        <transition name="list" mode="out-in">
          <div
            class="absolute w-20 right-0 bottom-4 flex flex-col items-center font-bold"
            key="1"
            v-if="usage < 5000"
          >
            <img class="h-14 w-14" src="~/assets/icons/tent.svg" />
            <span>Kåta?</span>
          </div>
          <div
            class="absolute w-20 right-0 bottom-4 flex flex-col items-center font-bold"
            key="2"
            v-else-if="usage < 10000"
          >
            <img class="h-14 w-14" src="~/assets/icons/shack.svg" />
            <span>Stuga</span>
          </div>
          <div
            class="absolute w-20 right-0 bottom-4 flex flex-col items-center font-bold"
            key="3"
            v-else-if="usage < 28000"
          >
            <img class="h-14 w-14" src="~/assets/icons/house.svg" />
            <span>Villa</span>
          </div>
          <div
            class="absolute w-20 right-0 bottom-4 flex flex-col items-center font-bold"
            key="4"
            v-else
          >
            <img class="h-14 w-14" src="~/assets/icons/mansion.svg" />
            <span>Herrgård</span>
          </div>
        </transition>
      </div>
    </div>

    <SimpleRange
      :value="usage"
      @change="update"
      min="0"
      max="50000"
      step="100"
    />
    <p class="font-bold text-sm my-6">Uppskattat månadspris:</p>
    <p class="italic font-black text-red-600 text-3xl mb-4">
      {{ totalPerMonth }}
      <span class="text-sm text-yellow-500">kr / mån</span>
    </p>
    <p class="text-xs text-gray-600">
      {{ plan.description }}
    </p>
    <!--div class="relative">
      <img src="/images/rorligt.jpg" alt="tease" />
    </div-->
    <div class="flex-1"></div>
    <div class="flex justify-between border-t mt-6 py-2">
      <div class="text-gray-600 text-sm">Detaljerad uträkning</div>
      <button
        @click="details = !details"
        class="focus:outline-none focus:text-red-400"
      >
        <svg
          class="transition-transform duration-300"
          :class="{ 'transform rotate-180': details }"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path fill="currentColor" :d="mdiChevronDown" />
        </svg>
      </button>
    </div>
    <collapse-transition>
      <div v-show="details">
        <div class="flex justify-between">
          <span>Kilowattimepris</span>
          <span>{{ plan.priceKwh * 100 }} öre/kWh</span>
        </div>
        <div class="flex justify-between">
          <span>Månadsavgift</span>
          <span>{{ plan.fee }} Kr</span>
        </div>
      </div>
    </collapse-transition>
    <button
      v-if="showSelect"
      @click="select()"
      class="w-full bottom-0 mt-6 px-4 py-3 leading-5 border-2 border-transparent text-base font-medium rounded-full text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring"
    >
      {{ plan.selectText }}
    </button>
  </div>
</template>

<script>
import { mdiChevronDown } from "@mdi/js";

export default {
  props: {
    showSelect: {
      type: Boolean,
      default: false,
    },
    plan: {
      type: Object,
      required: true,
    },
    usage: {
      type: [Number, String],
      required: true,
    },
  },
  data: () => ({
    details: false,
    mdiChevronDown,
  }),
  computed: {
    totalPerMonth() {
      return Math.round((this.usage / 12) * this.plan.priceKwh + this.plan.fee);
    },
  },
  methods: {
    update(event) {
      this.$emit("change", event);
    },
    select() {
      this.$emit("select", this.plan);
    },
  },
};
</script>