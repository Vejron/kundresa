<template>
  <nav
    role="navigation"
    aria-label="Main menu"
    class="block md:hidden bg-white fixed bottom-0 w-full"
  >
    <icon-button size="32" >
          <span class="font-light whitespace-nowrap text-sm">
            Meny
          </span>
        </icon-button>
    <ul class="flex justify-around">
      <li class="flex-grow py-6" v-for="link in shortcuts" :key="link.name">
        <icon-button :to="link.url" size="32" :icon="link.icon">
          <span class="font-light whitespace-nowrap text-sm">
            {{ link.name }}
          </span>
        </icon-button>
      </li>
    </ul>
  </nav>
</template>


<script>
import {
  mdiAccountOutline,
  mdiMenu,
  mdiShoppingOutline,
  mdiHomeOutline,
} from "@mdi/js";
import { defineComponent, computed } from '@vue/composition-api'

export default defineComponent({
  setup() {
    const isAnchor = computed(() => props.to !== undefined);
    const shortcuts = [
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
      ];
    return {
      isAnchor,
      shortcuts
    }
  },
})
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
