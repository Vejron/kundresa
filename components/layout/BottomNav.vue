<template>
  <nav class="block md:hidden bg-white fixed bottom-0 w-full shadow-xl">
    <ul class="flex justify-between">
      <li class="px-4 py-6 sm:px-6" v-for="link in links" :key="link.name" >
        <IconButton size="32" :icon="link.icon"><span class="font-light whitespace-nowrap text-sm">{{link.name}}</span></IconButton>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mdiAccountOutline, mdiMenu, mdiShoppingOutline, mdiHomeOutline } from "@mdi/js";

export default {
  data() {
    return {
      links: [
        {
          name: "Meny",
          icon: mdiMenu,
          url: "/",
        },
        {
          name: "Logga in",
          icon: mdiAccountOutline,
          url: "/articles",
        },
        {
          name: "Avtal",
          icon: mdiShoppingOutline,
          url: "/prices",
        },
        {
          name: "Kundservice",
          icon: mdiHomeOutline,
          url: "/kundservice",
        },
      ]
    };
  },
  // fetch from graphCMS with GraphQL
  async fetch() {
    
  },
  mounted( ) {
    console.log(this.mdiHome);
  }
};
</script>

<style >
.mark p {
  @apply mb-4;
}
</style>