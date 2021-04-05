<template>
  <div class="relative m-8">
    <ul class="relative">
      <li class="" v-for="(step, index) in steps" :key="index">
        <div
          v-if="index % 2"
          class="flex flex-row-reverse md:flex-row w-full mb-6"
        >
          <div class="md:w-1/2">
            <h2 class="flex-1 text-lg leading-tight mt-1 ml-3 md:ml-0 md:mr-3 mb-3 font-medium">{{ step.title }}</h2>
            <div class="ml-3 md:ml-0 md:mr-3">{{ step.description }}</div>
          </div>
          <div class="flex-none flex-col">
            <div
              class="bg-gray-500 rounded-full text-white h-8 w-8 flex justify-center items-center"
            >
              {{ index + 1 }}
            </div>
            <div
              class="w-0.5 relative left-1/2 transform -translate-x-1/2 bg-gray-500 h-full"
            ></div>
          </div>

          <div class="w-0 md:w-1/2"></div>
        </div>
        <div v-else class="flex w-full mb-6">
          <div class="w-0 md:w-1/2"></div>
          <div class="flex-none flex-col">
            <div
              class="bg-gray-500 rounded-full text-white h-8 w-8 flex justify-center items-center"
            >
              {{ index + 1 }}
            </div>
            <div
              class="w-0.5 relative left-1/2 transform -translate-x-1/2 bg-gray-500 h-full"
            ></div>
          </div>
          <div class="md:w-1/2">
            <h2 class="flex-1 text-lg leading-tight mt-1 ml-3 mb-3 font-medium">{{ step.title }}</h2>
            <div class="ml-3">{{ step.description }}</div>
          </div>
        </div>
        <!--  
        <div>
          <div class="flex items-center mb-1">
          <div
            class="bg-gray-500 rounded-full text-white h-8 w-8 flex justify-center items-center"
          >
            {{ index + 1 }}
          </div>
          <div class="flex-1 ml-4 font-medium">{{ step.title }}</div>
        </div>
        <div class="ml-12">{{ step.description }}</div>
        </div> -->
      </li>
      <!--
      <div class="absolute md:left-1/2 top-0 h-full border-l-2 transform -translate-x-px border-gray-600"></div>
      -->
    </ul>
  </div>
  <!-- 
    <div
      class="border-r-2 border-dashed border-gray-400 absolute h-full top-0"
      style="left: 15px"
    ></div>
    <ul class="relative">
      <li v-for="(step, index) in steps" :key="index" class="mb-2">
        <div class="flex items-center mb-1">
          <div class="bg-gray-500 rounded-full text-white h-8 w-8 flex justify-center items-center">{{index + 1}}</div>
          <div class="flex-1 ml-4 font-medium">{{step.title}}</div>
        </div>
        <div class="ml-12">{{step.description}}</div>
      </li>
    </ul>
  </div>  -->
</template>

<script>
import { defineComponent, ref } from "@vue/composition-api";

export default defineComponent({
  setup() {
    const steps = [
      {
        title: "PLANERA - I GOD TID",
        description:
          "För att vi ska kunna leverera din anslutning när ni önskar är det viktigt att ni är ute i god tid. Detta beror dels på att grävsäsongen i Norrland normalt är begränsad till mellan maj och slutet av oktober. Dels också på att tillstånd hos myndigheter, som har långa handläggningstider mellan mars och oktober, kan krävas.",
      },
      {
        title: "KONTAKTA EN AUKTORISERAD ELINSTALLATÖR",
        description:
          "När du vill dra in el till ditt hus eller fastighet börjar du med att kontakta en auktoriserad elinstallatör.",
      },
      {
        title: "ELINSTALLATÖR GÖR FÖRANMÄLAN",
        description:
          "Elinstallatören skickar en föranmälan till oss där det framgår vad som ska göras. Dessutom ska elinstallatören bifoga en karta med en situationsplan över fastigheten där tänkt placering av mätarskåpet är inritat. Här hittar du föranmälan.",
      },
      {
        title: "VI OFFERERAR",
        description:
          "Vi ser över föranmälan från din elinstallatör för att ta reda på vad vi behöver göra för att din anslutning ska vara möjlig. Därefter skickar vi en offert på anslutningsavgiften till dig. Här kan du läsa mer om våra priser.",
      },
    ];
    return {
      steps,
    };
  },
});
</script>

<style scoped lang="postcss">
.my-grid {
  @apply grid gap-2;
  grid-template-columns: repeat(2, 1fr);
  grid-template-areas: "left right";
}
</style>







