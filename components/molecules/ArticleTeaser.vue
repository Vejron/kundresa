<template>
  <nuxt-link
    :to="articleLink"
    class="transition duration-200 hover:shadow-xl block rounded-md overflow-hidden"
  >
    <div class="relative">
      <img
        class="h-64 overflow-hidden"
        :src="image"
        width="1000"
        height="550"
        
        alt="random teaser image"
      />

      <div
        class="absolute top-0 bg-gradient-to-bl from-transparent to-gray-800 opacity-75 w-full h-full"
      ></div>
      <h2 class="absolute bottom-0 p-6 text-white text-2xl font-bold">
        {{ articleContent.name }}
      </h2>
    </div>

    <p class="md:p-4 leading-relaxed">
      {{ articleContent.intro }}
    </p>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    articleContent: {
      type: Object,
      required: true,
    },
    articleLink: {
      type: String,
      required: true,
    },
  },
  computed: {
    image() {
      return this.articleContent?.image?.filename;
    }
  }
};
</script>
