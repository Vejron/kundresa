<template>
  <nav class="block md:hidden bg-white fixed bottom-0 w-full">
    <div class="flex justify-around">
      <nuxt-link class="flex-grow py-6" :to="link.url" v-for="link in links" :key="link.name" >
        <IconButton size="32" :icon="link.icon"><span class="font-light whitespace-nowrap text-sm">{{link.name}}</span></IconButton>
      </nuxt-link>
    </div>
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
          name: "Tjänster",
          icon: mdiShoppingOutline,
          url: "/products",
        },
        {
          name: "Nyheter",
          icon: mdiAccountOutline,
          url: "/nyheter",
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
  }
};
</script>

<style scoped>
nav {
  box-shadow: 0 8px 15px 8px rgb(0 0 0 / 50%);
}
@media (max-height: 500px) {
    nav {
      display: none;
    }
}
</style>
