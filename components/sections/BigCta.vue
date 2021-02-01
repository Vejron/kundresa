<template>
  <div :id="blok.title" class="relative max-w-7xl mx-auto">
    <div v-editable="blok" class="px-4 sm:px-6 md:px-8 mb-10 sm:mb-16 md:mb-20">
      <div
        class="w-12 h-12 rounded-xl mb-8 bg-gradient-to-br flex items-center justify-center from-fuchsia-500 to-purple-600"
      >
        <i :class="blok.icon" class="leading-none text-5xl"></i>
      </div>
      <h2
        class="sm:text-lg sm:leading-snug font-semibold tracking-wide uppercase text-purple-600 mb-3"
      >
        {{ blok.title }}
      </h2>
      <p
        class="text-3xl sm:text-5xl lg:text-6xl leading-none font-extrabold text-gray-900 tracking-tight mb-8"
      >
        {{ blok.subtitle }}
      </p>
      <p
        class="max-w-4xl text-lg sm:text-2xl font-medium sm:leading-10 space-y-6 mb-6"
      >
        {{ blok.description }}
      </p>
      <nuxt-link
        class="inline-flex text-lg sm:text-2xl font-medium transition-colors duration-200 focus:ring-2 focus:ring-offset-2 focus:ring-current focus:outline-none rounded-md text-purple-600 hover:text-purple-800"
        :to="blok.url"
        >Läs mer -&gt;</nuxt-link
      >

      <div class="relative mt-10 rounded-lg bg-gray-200 h-80">
        <div
          class="absolute w-full h-full transform-gpu -rotate-2 rounded-lg bg-green-300"
        >
          <testamonial-card
            v-for="testamonial in testamonials"
            :key="testamonial._uid"
            class="transform-gpu rotate-2 -ml-4 sm:ml-10 mt-5 sm:mt-10 w-full md:max-w-xl"
            :blok="testamonial.content"
          ></testamonial-card>
          <div
            v-if="blok.splashImage"
            class="absolute h-96 w-1/3 transform-gpu translate-y-32 md:translate-y-0 rotate-6 -top-3 right-0 rounded-lg"
          >
            <img
              :src="blok.splashImage.filename"
              :alt="blok.splashImage.alt"
              class="absolute max-w-none object-contain"
              style="width: 100%; height: 100%; left: 0px; top: 0px"
            />
          </div>
        </div>
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