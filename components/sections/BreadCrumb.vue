<template>
  <p class="flex items-center text-gray-500 text-xs sm:text-sm">
    <span>Kundservice</span>
    <span class="mx-2">&gt;</span>
    <span>{{not}}</span>
  </p>
</template>

<script>
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  setup(props, { root }) {
   
      const path = root.$route.path;
      const links = root.$store.state.links.links;
      console.log("route", path);
      console.log("store", links);

      const item = Object.values(links).find((item) => item.real_path === path);
      console.log("store", item);
  

    const not = item.name;
    return {
      not,
    };
  },
});
</script>

