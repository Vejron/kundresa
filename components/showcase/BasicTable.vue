<template>
  <div class="overflow-hidden">
    <div class="px-4 sm:px-6 sm:text-center">
      <h2
        class="text-2xl md:text-4xl font-bold text-gray-900 tracking-tight mb-2"
      >
        {{ body.headline }}
      </h2>
      <div class="flex sm:justify-center">
        <div class="prose md:prose-lg xl:prose-xl">
          <rich-text-renderer :document="body.description" />
        </div>
      </div>
    </div>

    <div class="frame">
      <table
        class="min-w-full divide-y divide-gray-200 sm:rounded-lg overflow-hidden"
      >
        <thead class="bg-gray-50">
          <tr>
            <th
              v-for="th in body.content.thead"
              :key="th.value"
              scope="col"
              class="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {{ th.value }}
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="tr in body.content.tbody" :key="tr.id">
            <td
              v-for="td in tr.body"
              :key="td.id"
              class="px-4 sm:px-6 py-4 whitespace-nowrap"
            >
              {{ td.value }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
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
.frame {
  @apply bg-gradient-to-br from-fuchsia-500 to-purple-600;
  @apply rounded-none sm:rounded-xl sm:m-6 sm:p-8;
}
.dotted {
  background: radial-gradient(blue 2px, transparent 19px);
  background-color: transparent;
  background-size: 50px 50px;
}
</style>
