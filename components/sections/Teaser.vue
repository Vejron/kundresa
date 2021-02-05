<template>
  <div class="relative max-w-7xl mx-auto overflow-hidden ">
    <div v-editable="blok" class="">
      <div
        class="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32"
      >
        <svg
          class="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
          fill="currentColor"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <polygon points="50,0 100,0 50,100 0,100" />
        </svg>
           
        <main
          class="mx-auto max-w-7xl px-4 lg:px-8 "
        >
          <div class="sm:text-center lg:text-left">
            <h1
              class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl"
            >
              <span class="block xl:inline">{{blok.headline}}</span>
              <span class="block text-primary xl:inline"
                >{{blok.subheading}}</span
              >
            </h1>
            <p
              class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
            >
              {{blok.description}}
            </p>
            <div
              class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start"
            >
              <div class="rounded-md shadow">
                <a
                  :href="blok.button1_url.url"
                  class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-80 hover:bg-primary md:py-4 md:text-lg md:px-10"
                >
                  {{blok.button1_text}}
                </a>
              </div>
              <div class="mt-3 sm:mt-0 sm:ml-3">
                <a
                  :href="blok.button2_url.url"
                  class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-secondary-80 hover:bg-secondary md:py-4 md:text-lg md:px-10"
                >
                   {{blok.button2_text}}
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
    <div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 xl:pr-8">
      <img
        class="h-56 w-full object-cover sm:h-72 md:h-96 lg:h-full"
        :src="blok.image.filename"
        alt=""
      />
    </div>
  </div>
</template>


<script>
export default {
  props: {
    blok: {
      type: Object,
      required: true,
    },
  },
};
//v-bind:style="{ 'background-image': 'url(' + blok.image.filename + ')' }"
</script>

<style scoped>

.waves {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 20vw;
  transition: 500ms;
}

.waves::before,
.waves::after {
  content: "";
  position: absolute;
  width: 300vw;
  height: 300vw;
  top: -65vw;
  left: 50%;
  will-change: transform;
  transform: translate(-50%, -75%);
}

.waves::before {
  border-radius: 44%;
  background: rgba(255, 240, 25);
  animation: waves 32s linear infinite;
}

.waves::after {
  border-radius: 44%;
  background: rgba(7, 139, 14, 0.7);
  animation: waves 60s linear infinite;
}

@keyframes waves {
  0% {
    transform: translate(-50%, -75%) rotate(0deg);
  }

  100% {
    transform: translate(-50%, -75%) rotate(360deg);
  }
}
</style>