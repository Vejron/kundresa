<template>
  <div
    class="card-wrapper flex flex-col rounded-lg overflow-hidden shadow-lg transition-shadow duration-500 hover:shadow-2xl"
  >
    <div>
      <div>
        <div class="flex relative overflow-hidden">
          <img
            class="w-full h-56"
            width="350"
            height="350"
            :src="avtal.image"
            alt="nonsensbild"
          />
          <div
            class="radial-glare w-full h-full absolute text-4xl text-green-200 font-extrabold"
          >
            <div class="absolute mt-6 ml-6 top-0">
              <h3 class="font-bold text-3xl mb-2">{{ avtal.name }}</h3>
            </div>
            <p
              class="absolute bottom-0 ml-6 mb-6 text-xs text-white font-medium"
            >
              {{ avtal.description }}
              <span class="text-gray-200">{{ avtal.clarification }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="px-6 pt-4 pb-2">
      <div class="mb-6 flex items-end justify-between">
        <div class="italic font-black text-red-600 text-3xl">
          {{ priceMonth }}
          <span class="text-sm text-yellow-500">kr / mån</span>
        </div>
        <div>
          <div class="italic font-black text-gray-500 text-lg">
            {{ this.avtal.priceKwh }}
            <span class="text-sm text-yellow-500">öre / kWh</span>
          </div>
        </div>
      </div>
      <a
        href="#"
        class="mb-6 w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-green-600 hover:bg-green-700"
      >
        {{ avtal.orderButtonText }}
      </a>
      <span
        v-for="tag in avtal.tags"
        :key="tag"
        class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
        >{{ tag }}</span
      >
    </div>
  </div>
</template>

<script>
/*
fast elpris
duration
förbr?
Det uppskattade månadspriset nedan baseras på din elförbrukning (Genomsnitt villa 15 000 kWh/år, lägenhet 2 800 kWh/år)
/månad
Nästa steg
*/
export default {
  props: {
    avtal: {
      type: Object,
      //required: true,
      default: () => ({
        priceKwh: 0.33,
        priceMonth: 35,
        image: "/images/fast.jpg",
        tags: ["bra", "bättre", "bäst"],
        name: "Fast elpris",
        description:
          "Det uppskattade månadspriset nedan baseras på din elförbrukning",
        clarification:
          "(Genomsnitt villa 15 000 kWh/år, lägenhet 2 800 kWh/år)",
        orderButtonText: "Skaffa Fast",
      }),
    },
  },
  data() {
    return {
      price: 0.33,
    };
  },
  computed: {
    priceMonth() {
      return this.avtal.priceKwh * (10000 / 12) + this.avtal.priceMonth;
    },
  },
};
</script>

<style scoped>
img {
  filter: brightness(100%);
  transition: transform 0.5s, filter 0.5s ease-in-out;
}
.card-wrapper:hover img {
  transform: scale(1.05);
  filter: brightness(120%);
}
.radial-glare {
  background: radial-gradient(
    circle,
    rgba(2, 0, 36, 0) 0%,
    rgba(0, 0, 0, 1) 100%
  );
}
</style>