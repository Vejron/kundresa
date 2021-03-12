<template>
  <div v-editable="blok" class="relative">
    <div class="absolute inset-0">
      <story-image class="object-cover h-full" :image="blok.image" />
      <div class="absolute top-0 bg-gradient-to-t from-transparent via-black to-transparent opacity-50 h-full w-full"></div>
    </div>
    <main class="relative mx-auto max-w-7xl px-4 lg:px-8 h-96 flex items-center justify-center">
      <div class="text-center">
        <h1
          class="tracking-tight font-bold text-white"
        >
          <p class="text-2xl sm:text-3xl md:text-5xl sm:mb-2">{{ blok.headline }}</p>
          <p class="text-lg sm:text-xl md:text-2xl font font-semibold  text-secondary">{{
            blok.subheading
          }}</p>
        </h1>
        <p
          class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
        >
          {{ blok.description }}
        </p>
      </div>
    </main>
  </div>
</template>


<script>
import StoryImage from "../atoms/StoryImage.vue";
export default {
  components: { StoryImage },
  props: {
    blok: {
      type: Object,
      required: true,
    },
  },
};
//v-bind:style="{ 'background-image': 'url(' + blok.image.filename + ')' }"
</script>

<style scoped>
</style>