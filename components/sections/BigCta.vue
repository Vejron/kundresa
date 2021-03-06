<template>
  <div :id="body.title" class="relative max-w-7xl mx-auto">
    <div v-editable="body" class="px-4 sm:px-6 md:px-8 mb-10 sm:mb-16 md:mb-20">
      <div
        class="w-12 h-12 rounded-xl mb-8 bg-gradient-to-br flex items-center justify-center from-fuchsia-500 to-purple-600"
      >
        <i :class="body.icon" class="leading-none text-5xl"></i>
      </div>
      <h2
        class="sm:text-lg sm:leading-snug font-semibold tracking-wide uppercase text-primary mb-3"
      >
        {{ body.title }}
      </h2>
      <p
        class="text-3xl sm:text-5xl lg:text-6xl leading-none font-extrabold text-gray-900 tracking-tight mb-8"
      >
        {{ body.subtitle }}
      </p>
      <p
        class="max-w-4xl text-lg sm:text-2xl font-medium sm:leading-10 space-y-6 mb-6"
      >
        {{ body.description }}
      </p>
      <nuxt-link
        class="inline-flex text-lg sm:text-2xl font-medium transition-colors duration-200 focus:ring-2 focus:ring-offset-2 focus:ring-current focus:outline-none rounded-md text-upink hover:text-purple-800"
        :to="body.url.cached_url"
        >Läs mer -&gt;</nuxt-link
      >

      <div class="max-w-5xl relative mt-10 rounded-lg bg-gray-200 bg-opacity-80 h-80">
        <div
          class="absolute w-full h-full transform-gpu -rotate-3 rounded-lg bg-upink-40"
        >
          <testamonial-card
            v-for="testamonial in testamonials"
            :key="testamonial._uid"
            class="z-10 transform-gpu rotate-3 -ml-4 sm:ml-10 mt-5 sm:mt-10 w-full sm:max-w-xl"
            :body="testamonial.content"
          ></testamonial-card>
          <div
            v-if="body.splashImage"
            class="absolute h-96 w-1/3 transform-gpu translate-y-32 md:translate-y-0 rotate-6 -top-3 right-0 rounded-lg"
          >
            <img
              :src="body.splashImage.filename"
              :alt="body.splashImage.alt"
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
    body: {
      type: Object,
      required: true,
    },
  },
  computed: {
    testamonials() {
      if (!this.body.testamonials) return [];
      // Load reference data/content from store
      const featuredTestamonials = this.$store.state.testamonials.testamonials.filter(
        (testamonial) => {
          return this.body.testamonials.includes(testamonial.uuid);
        }
      );
      return featuredTestamonials;
    },
  },
};
</script>