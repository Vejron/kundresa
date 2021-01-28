<template>
  <footer class="py-10 border-gray-400 border-t">
    <div class="max-w-6xl mx-auto">
      <div class="mx-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="">
          <h2 class="text-md font-semibold mb-4">Umeå Energi AB</h2>
          <div
            class="mark text-sm font-light"
           
          ></div>
        </div>
        <div class="">
          <h2 class="text-md font-semibold mb-4">Kundservice</h2>
          <div
            class="mark text-sm font-light"
            
          ></div>
        </div>
        <div class="">
          <h2 class="text-md font-semibold mb-4">Följ oss</h2>
          <div class="flex">
            
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>

export default {
  data() {
    return {
      footer: Object,
    };
  },
  // fetch from graphCMS with GraphQL
  async fetch() {
    
  },
};
</script>

<style >
.mark p {
  @apply mb-4;
}
</style>