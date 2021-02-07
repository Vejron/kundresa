<template>
  <header class="relative max-w-7xl mx-auto">
    <div class="px-4 lg:px-8 mb-20">
      <h1
        class="text-4xl sm:text-5xl lg:text-6xl leading-none font-extrabold tracking-tight text-gray-900 mb-8 sm:mb-10"
      >
        {{ blok.title }}
      </h1>
      <p
        class="max-w-screen-lg text-lg sm:text-2xl sm:leading-10 font-medium mb-10 sm:mb-11"
      >
        Vi erbjuder helhetslösningar för alla dina behov inom
        <span class="text-primary font-black">el</span>,
        <span class="text-primary font-black">värme</span> och
        <span class="text-primary font-black">bredband.</span>
        Med fokus på nöjda kunder och en smidig vardag. Alla våra tjänster är
        lokalproducerade och 100% miljövänliga
      </p>

      <div class="max-w-screen-lg grid grid-cols-3 gap-6 md:gap-8 lg:gap-12">
        <div
          v-for="(window, i) in windows"
          :key="i"
          :style="{
            'background-image': 'url(' + blok.image.filename + ')',
            'transform': 'rotate3D(0, 0, 1,' + (Math.random() - 0.5) * 6 + 'deg)',
          }"
          :class="{
            'col-span-2': i === 3 || i === 6,
            'gradient-cover md:bg-fixed': window.exists,
          }"
          class="shadow-md h-32 lg:h-42 rounded-md flex justify-center items-center text-white text-2xl lg:text-4xl font-extrabold"
        >
          <a
            class="absolute p-12"
            v-if="window.exists"
            :href="window.url"
          >
            {{ window.title }}
          </a>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    blok: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    windows: [
      {
        exists: true,
        title: "EL",
        url: "#Elhandel",
      },
      {
        exists: false,
      },
      {
        exists: false,
      },
      {
        exists: true,
        title: "Fjärrvärme",
        url: "#Fjärrvärme",
      },
      {
        exists: false,
      },
      {
        exists: false,
      },
      {
        exists: true,
        title: "Bredband",
        url: "#Bredband",
      },
    ],
  }),
};
</script>

<style scoped>
.gradient-cover {
  overflow: hidden;
  cursor: pointer;
}
.gradient-cover::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(
      rgba(0, 0, 0, 0.6),
      rgba(0, 0, 0, 0.1)
    )
}

.gradient-cover {
  filter: brightness(100%);
  transition: color 0.5s, transform 0.5s, filter 0.5s ease-in-out;
}
.gradient-cover:hover {
  transform: scale(1.1) !important;
  filter: brightness(120%);
  
}
.gradient-cover a {
  transition: transform 0.5s;
}
.gradient-cover:hover a {
  transform: scale(1.4) !important;
}
</style>