<template>
  <div class="relative mx-4 sm:mx-6 mt-16">
    <h2
      class="text-2xl sm:text-4xl lg:text-5xl leading-none font-extrabold text-gray-900 tracking-tight mb-8 md:mb-12"
    >
      Så här gör du för att ansluta din fastighet till vårt elnät
    </h2>
    <ul class="relative">
      <li class="" v-for="(step, index) in steps" :key="index">
        <div
          v-if="index % 2"
          class="flex flex-row-reverse md:flex-row w-full mb-6"
        >
          <Step :body="step" />
          <div class="flex-none flex-col">
            <div
              class="relative z-10 bg-secondary rounded-full text-white h-8 w-8 flex justify-center items-center"
            >
              {{ index + 1 }}
            </div>
            <div
              class="dotted relative left-1/2 transform -translate-x-1/2 h-full"
            ></div>
          </div>

          <div class="w-0 md:w-1/2"></div>
        </div>
        <div v-else class="flex w-full mb-6">
          <div class="w-0 md:w-1/2"></div>
          <div class="flex-none flex-col">
            <div
              class="relative z-10 bg-secondary rounded-full text-white h-8 w-8 flex justify-center items-center"
            >
              {{ index + 1 }}
            </div>
            <div
              class="dotted relative left-1/2 transform -translate-x-1/2 h-full"
            ></div>
          </div>
          <Step :body="step" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent, computed } from "@vue/composition-api";

export default defineComponent({
  props: {
    body: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const steps = computed(() => {
      return props.body.content;
    });
    /*const steps = [
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
    ];*/
    return {
      steps,
    };
  },
});
</script>

<style scoped lang="postcss">
.dotted {
  width: 2px;
  background-image: linear-gradient(0deg, rgb(255, 179, 0), transparent, rgb(255, 179, 0));
  //background-size: 1px 20px, 1px 100%;
  border: none;
}
</style>







