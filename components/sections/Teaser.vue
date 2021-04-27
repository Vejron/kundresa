<template>
  <div class="relative max-w-7xl mx-auto overflow-hidden">
    <div v-editable="body">
      <div
        class="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32"
      >
        <svg
          class="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
          fill="currentColor"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <polygon points="50,0 100,0 50,100 0,100" />
        </svg>

        <article class="mx-auto max-w-7xl px-4 lg:px-8">
          <div class="sm:text-center lg:text-left">
            <h1
              class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl"
            >
              <span class="block xl:inline">{{ body.headline }}</span>
              <span class="block text-primary xl:inline">{{
                body.subheading
              }}</span>
            </h1>
            <p
              class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
            >
              {{ body.description }}
            </p>
            <div
              class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start"
            >
              <div class="rounded-md shadow">
                <a
                  :href="body.button1_url.url"
                  class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-80 hover:bg-primary md:py-4 md:text-lg md:px-10"
                >
                  {{ body.button1_text }}
                </a>
              </div>
              <div class="mt-3 sm:mt-0 sm:ml-3">
                <nuxt-link
                  :to="'/' + body.button2_url.cached_url"
                  class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-secondary-80 hover:bg-secondary md:py-4 md:text-lg md:px-10"
                >
                  {{ body.button2_text }}
                </nuxt-link>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
    <div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 xl:pr-8">
      <story-image
        classes="h-56 w-full object-cover sm:h-72 md:h-96 lg:h-full"
        size="0x400"
        :image="body.image"
      />
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
};
//v-bind:style="{ 'background-image': 'url(' + body.image.filename + ')' }"
</script>

<style scoped>
</style>