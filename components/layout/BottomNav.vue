<template>
  <nav class="block md:hidden bg-green-50 fixed bottom-0 w-full">
    <ul class="flex justify-around">
      <li class="flex-grow py-6" v-for="link in links" :key="link.name" >
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

<style scoped>
nav {
  box-shadow: 0 8px 15px 8px rgb(0 0 0 / 50%);
}
</style>
