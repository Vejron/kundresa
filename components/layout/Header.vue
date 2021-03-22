<template>
  <header class="relative text-gray-600" style="z-index: 20">
    <nav
      :class="{ 'navbar--hidden': !showNavbar, 'navbar--shadow': showShadow, 'navbar--disabled': !isListening}"
      class="navbar w-full bg-white"
    >
      <div class="max-w-7xl mx-auto lg:px-4">
        <div
          class="system-bar text-xs flex justify-between items-center px-4 h-10"
        >
          <div class="flex items-center divide-x divide-gray-300">
            <a href="https://focused-morse-35e7c8.netlify.app/login" class="pr-2">Mina sidor</a>
            <nuxt-link to="/" class="pl-2">Företag</nuxt-link>
          </div>
          <div>
            <a href="https://drift.villmindre.com">Driftstatus</a>
          </div>
        </div>
      </div>
      <div class="border-gray-200 border-b"></div>

      <div class="max-w-7xl mx-auto lg:px-4">
        <div class="navigation-bar text-lg flex justify-between h-16">
          <nuxt-link to="/" class="flex items-center pl-2">
            <Logo class="h-10 logo"/>
            <span class="top-link font-medium ml-2">Fake snake AB</span>
          </nuxt-link>
          <ul class="hidden md:flex items-center">
            <li class="px-4 flex-grow-0 flex-shrink-0" v-for="link in topLinks" :key="link.name">
              <nuxt-link
                class="top-link pb-1 whitespace-nowrap"
                :to="link.url"
                >{{ link.name }}</nuxt-link
              >
            </li>
          </ul>
        </div>
        <div class="navbar-sub-links bg-opacity-25 h-0"></div>
      </div>
    </nav>
    <div class="h-6 md:h-36"></div>
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
      isListening: false,
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
          url: "/nyheter",
        },
        {
          name: "Om oss",
          url: "/om-oss",
        },
        {
          name: "Kundservice",
          url: "/kundservice",
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
    onResize() {
      if(window.innerWidth < 768 && this.isListening) {
        this.isListening = false;
        window.removeEventListener("scroll", this.onScroll);
        this.showNavbar = true;
        this.lastScrollPosition = 0;
        this.showShadow = false;
      } else if (window.innerWidth >= 768 && !this.isListening) {
        window.addEventListener("scroll", this.onScroll);
        this.isListening = true;
      }
    }
  },

  mounted() {
    if(window.innerWidth >= 768) {
      window.addEventListener("scroll", this.onScroll);
      this.isListening = true;
    }
    window.addEventListener("resize", this.onResize);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
    window.removeEventListener("resize", this.onResize);
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
.navbar.navbar--disabled {
  position: static;
}

.top-link:hover,
.top-link.nuxt-link-active {
  
  @apply border-primary;
  font-weight: 600;
}

/* som fancy animations */
.top-link {

  background:
    linear-gradient(rgb(0, 127, 50) 0 0) var(--p, -101%) 100% /50% 2.5px no-repeat,
    linear-gradient(90deg, rgb(0, 127, 50) 50%, transparent 0) bottom /var(--d, 0) 2.5px no-repeat;
  transition: 0.3s, background-size 0.3s 0.3s;
}
.top-link:hover,
.top-link.nuxt-link-active {
  --d: 100%;
  --p: 100%;
  transition: 0.3s, background-position 0.3s 0.3s
}
</style>