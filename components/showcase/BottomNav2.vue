<template>
  <div>
    <nav
      aria-label="Main menu"
      class="block z-30 md:hidden text-black fixed bottom-0 w-full"
    >
      <icon-button
        ref="mainMenuButton"
        @click="drawer"
        :aria-expanded="isOpen"
        aria-controls="bottom-nav-menu"
        class="relative left-3 bottom-3 z-40"
        fab
        size="30"
        :icon="isOpen? mdiClose: mdiMenu"
      >
        <span class="sr-only"> Meny </span>
      </icon-button>

      <transition name="slide-left"> 
      <ul
        v-if="isOpen"
        id="bottom-nav-menu"
        class="px-2 pt-4 flex flex-col bg-gradient-to-tl from-gray-300 to-white fixed top-0 left-0 w-full h-full"
      >
        <li @click="drawer" v-for="link in shortcuts" :key="link.name">
          <icon-button class="px-3 py-1" :to="link.url" size="30" :icon="link.icon">
            <span class="ml-2 font-light whitespace-nowrap">
              {{ link.name }}
            </span>
          </icon-button>
        </li>
      </ul>
      </transition>
    </nav>
  </div>
</template>


<script>
import {
  mdiMenu,
  mdiClose,
  mdiShoppingOutline,
  mdiRoomServiceOutline,
  mdiHomeOutline,
  mdiLifebuoy,
  mdiHexagramOutline,
  mdiViewGridPlus,
  mdiFlashOutline,
  mdiWifi,
  mdiThermometer
} from "@mdi/js";
import {
  defineComponent,
  computed,
  ref,
  onMounted,
} from "@vue/composition-api";

export default defineComponent({
  setup() {
    const isOpen = ref(false);
    const mainMenuButton = ref(null);
    const drawer = () => {
      isOpen.value = !isOpen.value;
      console.log(isOpen.value);
    };
    const close = () => {
      isOpen.value = false;
      mainMenuButton.value.$el.focus();
      // also restore focus to menu button
    };
    onMounted(() => {
      document.addEventListener("keydown", (e) => {
        if (e.keyCode == 27 && isOpen.value) {
          close();
        }
      });
    });

    const shortcuts = [
      {
        name: "Hem",
        icon: mdiHomeOutline,
        url: "/",
      },
      {
        name: "Produkter",
        icon: mdiShoppingOutline,
        url: "/products",
      },
      {
        name: "Distrubution",
        icon: mdiViewGridPlus,
        url: "/products",
      },
      {
        name: "Elhandel",
        icon: mdiFlashOutline,
        url: "/products/el",
      },
      {
        name: "Fjärrvärme",
        icon: mdiThermometer,
        url: "/products/varme",
      },
      {
        name: "Bredband",
        icon: mdiWifi,
        url: "/products/bredband",
      },
      {
        name: "Nyheter",
        icon: mdiHexagramOutline,
        url: "/nyheter",
      },
      {
        name: "Om oss",
        icon: mdiLifebuoy,
        url: "/om-oss",
      },
      {
        name: "Kundservice",
        icon: mdiRoomServiceOutline,
        url: "/kundservice",
      },
    ];
    return {
      isOpen,
      drawer,
      mainMenuButton,
      mdiMenu,
      mdiClose,
      shortcuts,
    };
  },
});
</script>

<style scoped>
@media (max-height: 500px) {
  nav {
    display: none;
  }
}
</style>
