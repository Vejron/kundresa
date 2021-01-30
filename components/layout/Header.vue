<template>
  <header class="relative text-gray-600" style="z-index: 20">
    <nav
      :class="{ 'navbar--hidden': !showNavbar, 'navbar--shadow': showShadow }"
      class="navbar w-full bg-white"
    >
      <div class="max-w-7xl mx-auto lg:px-4">
        <div
          class="system-bar text-xs flex justify-between items-center px-4 h-10"
        >
          <div class="flex items-center divide-x divide-gray-300">
            <nuxt-link to="/" class="pr-2">Privat</nuxt-link>
            <nuxt-link to="/" class="pl-2">Företag</nuxt-link>
          </div>
          <div>
            <nuxt-link to="/">Driftstatus</nuxt-link>
          </div>
        </div>
      </div>
      <div class="border-gray-200 border-b"></div>

      <div class="max-w-7xl mx-auto lg:px-4">
        <div class="navigation-bar text-lg flex justify-between h-16">
          <nuxt-link to="/" class="flex items-center pl-2">
            <Logo class="h-10 logo" :class="{ 'logo--shrink': showShadow }" />
            <span class="top-link font-medium ml-2">Fake snake AB</span>
          </nuxt-link>
          <ul class="hidden md:flex items-center">
            <li class="px-4" v-for="link in topLinks" :key="link.name">
              <nuxt-link
                class="top-link pb-1 whitespace-no-wrap"
                :to="link.url"
                >{{ link.name }}</nuxt-link
              >
            </li>
          </ul>
        </div>
        <div class="navbar-sub-links bg-opacity-25 h-0"></div>
      </div>
    </nav>
    <div class="h-36"></div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      showNavbar: true,
      showShadow: false,
      showMobile: false,
      lastScrollPosition: 0,
      topLinks: [
        {
          name: "El",
          url: "/products/el",
        },
        {
          name: "Värme",
          url: "/products/varme",
        },
        {
          name: "Bredband",
          url: "/products/bredband",
        },
        {
          name: "Nyheter",
          url: "/",
        },
        {
          name: "Produkter",
          url: "/products",
        },
        {
          name: "Kundservice",
          url: "/",
        },
      ],
    };
  },

  methods: {
    async fetchSuggestions(searchInput) {
      const { data } = await this.$storyapi.get("cdn/stories", {
        //starts_with: 'articles/',
        //resolve_relations: 'author',
        search_term: searchInput,
        per_page: 5,
      });

      return data.stories;
    },
    onClickoutMenu() {
      this.showMobile = false;
    },
    onScroll() {
      const currentScrollPosition = window.pageYOffset;
      this.showShadow = !!currentScrollPosition;
      if (currentScrollPosition < 0) {
        return;
      }
      // Stop executing this function if the difference between
      // current scroll position and last scroll position is less than some offset
      if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 40) {
        return;
      }
      this.showNavbar = currentScrollPosition < this.lastScrollPosition;
      this.lastScrollPosition = currentScrollPosition;
    },
  },

  mounted() {
    window.addEventListener("scroll", this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },
};
</script>

<style lang="css" scoped>
.mobile-nav {
  top: 6rem;
  height: calc(100vh);
}
.navbar {
  position: fixed;
  box-shadow: none;
  transform: translate3d(0, 0, 0);
  transition: .3s all ease-out;
}

.logo {
  transform: scaleY(1);
  transition: .3s all ease-in-out;
}
.logo.logo--shrink {
  transform: scaleY(0.7) skew(18deg);
}

.navbar.navbar--hidden {
  transform: translate3d(0, -2.55rem, 0);
}
.navbar.navbar--shadow {
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.5);

}
.top-link {
  border-bottom-color: transparent;
  border-bottom-style: solid;
  border-bottom-width: 2.5px;
  transition: border-bottom-color, font-weight 0.3s;
}
.top-link.logo--text {
  font-weight: 600;
}
.top-link:hover {
  border-bottom-color: black;
  font-weight: 600;
}
</style>