<template>

   
      <table
        class="min-w-full divide-y divide-gray-200 sm:rounded-lg overflow-hidden"
      >
        <thead class="bg-gray-50">
          <tr>
            <th
              v-for="th in body.content.thead"
              :key="th._uid"
              scope="col"
              class="px-4 sm:px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider"
            >
              {{ th.value }}
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="tr in body.content.tbody" :key="tr._uid">
            <td
              v-for="(td, index) in tr.body"
              :key="td._uid"
              class="relative px-4 sm:px-6 py-4"
            >
              <div v-if="index === 1" class="absolute inset-y-1/2 inset-x-1/3 transform rotate-12 text-green-400 text-opacity-50 font-extrabold text-xl md:text-3xl">
                VINNARE
              </div>
              <div v-if="index === 2" class="absolute inset-y-1/2 inset-x-1/3 transform rotate-12 text-red-400 text-opacity-50 font-extrabold text-xl md:text-3xl">
                FÖRLORARE
              </div>
              <span class="relative">{{ td.value }}</span>
              
            </td>
          </tr>
        </tbody>
      </table>
 
  
</template>

<script>
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  props: {
    body: {
      type: Object,
      required: true,
    },
  },
  setup() {},
});
</script>

<style scoped lang="postcss">
table tr > td:first-child {
  @apply font-bold text-green-700;
}
.frame {
  @apply bg-gradient-to-br from-fuchsia-500 to-purple-600 bg-opacity-50;
  @apply rounded-none sm:rounded-xl sm:px-8 sm:py-1;
}
</style>
