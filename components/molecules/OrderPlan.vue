<template>
  <div>
    <h3 class="text-4xl font-black">Rörligt elpris</h3>
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

    <SimpleRange v-model="usage" min="0" max="50000" step="100" />
    <p class="font-bold text-sm my-6">Uppskattat månadspris:</p>
    <p class="italic font-black text-red-600 text-3xl mb-4">
      {{ totalPerMonth }}
      <span class="text-sm text-yellow-500">kr / mån</span>
    </p>
    <p class="text-xs text-gray-600">
      Ett rörligt elpris baseras på det inköpspris som vi köper in elen för.
      Priset varierar från månad till månad och skiljer sig åt beroende på var i
      Sverige du bor. Passar dig som vill vara flexibel och följa elmarknadens
      svängningar.
    </p>
    <!--div class="relative">
      <img src="/images/rorligt.jpg" alt="tease" />
    </div-->
    <div class="flex justify-between border-t mt-6 py-2">
      <div class="text-gray-600 text-sm">Detaljerad uträkning</div>
      <button @click="details = !details" class="focus:outline-none focus:text-red-400">
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
          <span>{{(costKwh * 100)}} öre/kWh</span>
        </div>
        <div class="flex justify-between">
          <span>Månadsavgift</span>
          <span>{{fee}} Kr</span>
        </div>
      </div>
    </collapse-transition>
  </div>
</template>

<script>
import { mdiChevronDown } from "@mdi/js";

export default {
  data: () => ({
    details: false,
    mdiChevronDown,
    usage: 20000,
    fee: 45,
    costKwh: 0.2535,
  }),
  computed: {
    totalPerMonth() {
      return Math.round((this.usage / 12) * this.costKwh + this.fee);
    },
  },
};
</script>