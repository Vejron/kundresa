<template>
  <section class="max-w-xl mx-auto px-4 sm:px-6">
    <div class="my-16">
      <h1 class="text-2xl md:text-4xl font-bold text-gray-700">Quizmaskinen!</h1>
    </div>
    <div v-if="quizes" class="max-w-xl mx-auto">
      <ul class="">
        <li v-for="q in quizes" :key="q.question" class="mb-16 px-6 pt-6 pb-10 shadow-xl bg-pink-100 rounded-lg">
          <p v-html="q.question" class="font-semibold"></p>
          <ul class="mt-6 relative">
            <li class="text-gray-600" v-for="(alt, i) in q.alts" :key="i">
              <label>
                <input type="radio" :value="alt" v-model="q.model">
              <span v-html="alt"></span>
              </label>
              
            </li>
            <div v-if="q.model" class="mt-2 absolute h-24">
              <li v-if="q.model == q.correct_answer" class="text-green-400 animate-bounce">Japp där satt den!</li>
              <li v-else class="text-red-400 ">Nähä du det va fel!</li>
            </div>
          </ul>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { defineComponent, ref } from "@vue/composition-api";
import { getQuiz } from "../../services/quiz.service"

export default defineComponent({
  props: {
    body: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const quizes = ref(null);
    const getAlts = (q) => {
      const array = [...q.incorrect_answers, q.correct_answer]
      return array.sort(() => Math.random() - 0.5);
      
    }
    getQuiz().then(res => {
      console.log("quiz: ", res.data.results);
      const qs = res.data.results;
      qs.forEach(element => {
        element.model = null;
        element.alts = getAlts(element);
      });
      quizes.value = qs;
    });
    return {
      quizes,
      getAlts
    }
  },
});
</script>