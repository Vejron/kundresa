<template>
  <section class="max-w-7xl mx-auto px-4 sm:px-6">
    <h2 class="mb-8 md:text-center font-extrabold text-xl md:text-4xl lg:text-5xl">{{body.headline || 'Headline...'}}</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      <div v-for="index in 10" :key="index" class="text-6xl font-black rounded-lg bg-gradient-to-br from-indigo-300 to-fuchsia-500 h-64 flex justify-center items-center">
      <span class=" animate-bounce">{{index}}</span> 
      </div>
    </div>
  </section>
</template>

<script>
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  props: {
    body: {
      type: Object,
      required: true,
    },
  },
  setup() {},
});
</script>