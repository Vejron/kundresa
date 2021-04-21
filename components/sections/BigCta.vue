<template>
  <div :id="body.title" class="relative max-w-7xl mx-auto">
    <div v-editable="body" class="px-4 sm:px-6 md:px-8 mb-10 sm:mb-16 md:mb-20">
      <div class="flex items-end mb-6 sm:mb-8">
        <div
          class="text-3xl mr-6 w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center from-primary to-secondary"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            focusable="false"
            width="1em"
            height="1em"
            style="
              -ms-transform: rotate(360deg);
              -webkit-transform: rotate(360deg);
              transform: rotate(360deg);
            "
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 512 512"
          >
            <path
              d="M394.24 197.56a300.67 300.67 0 0 0-53.38-90C301.2 61.65 240 32 192 32c19 70-14.36 117.12-44.79 163.77C122 234.36 96 274.27 96 320c0 88.22 71.78 160 160 160s160-71.78 160-160c0-43.3-7.32-84.49-21.76-122.44zM288.33 418.69C278 429.69 265.05 432 256 432s-22-2.31-32.33-13.31S208 390.24 208 368c0-25.14 8.82-44.28 17.34-62.78c6.48-14.07 14.66-27.22 15.11-44.49c11.3 5.88 23.67 16.91 34.54 31.28c18.17 24 29 52.42 29 76c.01 22.23-5.41 39.76-15.66 50.68z"
              fill="white"
            />
          </svg>
        </div>
        <h2
          class="sm:text-lg sm:leading-snug font-semibold tracking-wide uppercase text-primary"
        >
          {{ body.title }}
        </h2>
      </div>
      <p
        class="text-3xl sm:text-5xl lg:text-6xl leading-none font-extrabold text-gray-900 tracking-tight mb-6 sm:mb-8"
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

      <div
        class="max-w-5xl relative mt-10 rounded-lg bg-gray-200 bg-opacity-80 h-80"
      >
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