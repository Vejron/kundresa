<template>
  <section class="max-w-xl mx-auto px-4 sm:px-6">
    <div class="my-16">
      <h1 class="text-2xl md:text-4xl font-bold text-gray-700">
        Quizmaskinen!
      </h1>
    </div>
    <div v-if="quizes" class="max-w-xl mx-auto">
      <ul class="">
        <li
          v-for="q in quizes"
          :key="q.question"
          class="overflow-hidden mb-16 px-6 pt-6 pb-10 shadow-xl bg-gradient-to-tl from-gray-50 to-fuchsia-200 bg-pink-100 rounded-lg"
        >
          <p v-html="q.question" class="text-lg font-semibold"></p>
          <ul class="mt-4 relative">
            <li class="text-gray-600" v-for="(alt, i) in q.alts" :key="i">
              <label class="py-2 flex items-center">
                <input type="radio" :value="alt" v-model="q.model" />
                <span class="ml-2" v-html="alt"></span>
              </label>
            </li>
            <div
              class="transform -rotate-45 translate-x-20 -translate-y-3 text-gray-600 absolute right-0 px-20 py-2 bg-green-400 rounded-lg shadow capitalize font-semibold"
            >
              {{ q.difficulty }}
            </div>
            <transition appear name="stamp">
              <div v-if="q.model" class="mt-2 absolute h-24">
                <li
                  v-if="q.model == q.correct_answer"
                  class="text-green-400 animate-bounce"
                >
                  Japp där satt den!
                </li>
                <li v-else class="text-red-400">Nähä du det va fel!</li>
              </div>
            </transition>
          </ul>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { defineComponent, ref } from "@vue/composition-api";
import { getQuiz } from "../../services/quiz.service";

export default defineComponent({
  props: {
    body: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const quizes = ref(null);
    const getAlts = (q) => {
      const array = [...q.incorrect_answers, q.correct_answer];
      return array.sort(() => Math.random() - 0.5);
    };
    getQuiz(props.body.amount, props.body.difficulty).then((res) => {
      console.log("quiz: ", props);
      const qs = res.data.results;
      qs.forEach((element) => {
        element.model = null;
        element.alts = getAlts(element);
      });
      quizes.value = qs;
    });
    return {
      quizes,
      getAlts,
    };
  },
});
</script>