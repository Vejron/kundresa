<template>
  <nuxt-link
    :to="articleLink"
    class="transition duration-200 hover:shadow-xl block rounded-md overflow-hidden"
  >
    <div class="relative">
      <story-image class="w-full object-cover max-h-56" :image="articleContent.image" />

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
};
</script>

<style scoped>
.line-clamp-6 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
}
</style>
