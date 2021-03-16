<template>
  <section class="max-w-7xl mr-auto md:mx-auto mt-16">
    <carousel @page="onPageChange" ref="slider" class="story-carousel">
      <slide
        v-for="slide in body.content"
        :key="slide._uid"
        class="story-carousel__slide"
      >
        {{ slide.text }}
        <component :body="slide" :is="slide.component" />
      </slide>
    </carousel>
    <ol class="flex justify-between mx-auto mt-4 mb-8">
      <div class="flex-grow"></div>
      <li v-for="(slide, index) in body.content" :key="slide._uid">
        <button
          :class="{'bg-secondary': index === currentIndex}"
          class="transition-colors duration-300 mx-1 w-5 h-5 border border-transparent text-base font-medium rounded-full bg-primary-80 hover:bg-primary"
          @click="selectPage(index)"
        >
          <span class="sr-only">{{ slide.name }}</span>
        </button>
      </li>
      <div class="flex-grow"></div>
    </ol>
  </section>
</template>

<script>
/**
 *
 */
import { defineComponent, ref } from "@vue/composition-api";
export default defineComponent({
  props: {
    body: {
      type: Object,
      required: true,
      /*default: [
        {
          text: 'blaha 0'
        },
        {
          text: 'blaha 1'
        },
        {
          text: 'blaha 2'
        },
        {
          text: 'blaha 3'
        },
      ]*/
    },
  },
  setup(props, { emit }) {
    const slider = ref(null);
    const currentIndex = ref(0);

    const selectPage = (index) => {
      slider.value.goToSlide(index);
    };
    
    const onPageChange = ({ current, previous }) => {
      console.log("dffd", current, previous);
      currentIndex.value = current;
    };
    
    return {
      selectPage,
      onPageChange,
      slider,
      currentIndex,
    };
  },
});
</script>


<style>
.story-carousel .vs-carousel__arrows.vs-carousel__arrows--left {
  border: 0.35rem solid white;
  border-radius: 9999px;
  @apply bg-primary;
  color: white;
  transform: translateX(-50%);
  font-size: 2rem;
  width: 4rem;
  height: 4rem;
}
.story-carousel .vs-carousel__arrows.vs-carousel__arrows--right {
  border: 0.35rem solid white;
  border-radius: 9999px;
  @apply bg-primary;
  color: white;
  transform: translateX(50%);
  font-size: 2rem;
  width: 4rem;
  height: 4rem;
}
/*.story-carousel--colors .story-carousel__slide:nth-child(n+1) {
  @apply bg-white;

  border: 3px solid white;
    border-radius: 999px;
    background-color: #374151;
    color: green;
    transform: translateX(-50%);
}
.story-carousel--colors .story-carousel__slide:nth-child(2n+1) {
  @apply bg-gray-50;
}*/
</style>