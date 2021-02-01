<template>
  <div class="max-w-7xl mx-auto my-12 px-4 sm:px-6 lg:px-8">
    <div v-editable="blok" class="relative rounded-lg py-6 overflow-hidden">
      <h2 class="text-2xl font-semibold font-display text-gray-900 sm:text-3xl">
        {{ blok.title }}
      </h2>
      <p class="mt-2 max-w-xl text-base text-gray-500">
        {{ blok.description }}
      </p>
      <form class="mt-6" @submit.prevent="submit($event)">
        <div class="sm:flex">
          <input
            type="email"
            required=""
            placeholder="Skriv in din mail"
            class="block sm:max-w-xs w-full px-4 py-3 text-base appearance-none border border-gray-300 shadow-none bg-white rounded-md placeholder-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
          />
          <button
            class="mt-4 relative sm:mt-0 sm:h-auto sm:ml-4 block w-full sm:w-auto border border-transparent px-6 py-3 text-base font-semibold leading-snug bg-gray-900 text-white rounded-md shadow-md hover:bg-gray-800 focus:outline-none focus:bg-gray-800 transition ease-in-out duration-150"
            :class="{
              'opacity-50 pointer-events-none': submitting,
              'hover:bg-gray-600': !submitting,
            }"
            :disabled="submitting"
          >
            <span :class="{ 'opacity-0': submitting }">Prenumerera</span>
            <span
              v-if="submitting"
              class="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0"
              :class="{ 'opacity-0': !submitting }"
            >
              <svg class="h-8 w-8 spin" viewBox="0 0 24 24">
                <path
                  class="text-gray-600"
                  fill="currentColor"
                  d="M12 21a9 9 0 100-18 9 9 0 000 18zm0-2a7 7 0 110-14 7 7 0 010 14z"
                ></path>
                <path
                  class="text-gray-400"
                  fill="currentColor"
                  d="M12 3a9 9 0 010 18v-2a7 7 0 000-14V3z"
                ></path>
              </svg>
            </span>
          </button>
        </div>
        <p
          x-show="error"
          x-text="error"
          style="display: none"
          class="lg:absolute mt-4 text-white max-w-xl font-medium"
        ></p>
      </form>

      <div
        class="hidden lg:block absolute inset-y-0 lg:left-2/3 xl:left-1/2 right-0"
      >
        <img
          class="w-full h-full object-cover object-left"
          src="https://source.unsplash.com/featured/600x350/?mail,newsletter"
          alt=""
        />
      </div>
    </div>
  </div>
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
    submitting: false,
  }),
  methods: {
    submitt(event) {},
  },
};
</script>