<template>
  <section
    class="mt-16 bg-gradient-to-b from-transparent via-secondary-40 to-transparent"
  >
    <div v-editable="body" class="relative max-w-md mx-auto">
      <div
        class="absolute rounded-xl transform rotate-6 bg-gradient-to-br from-blue-400 to-fuchsia-500 h-full w-full"
      ></div>
      <div
        class="relative bg-white max-w-md p-6 border border-gray-100 rounded-xl shadow-xl"
      >
        <h2 class="px-4 mb-3 text-xl sm:text-2xl font-semibold">
          {{body.headline}}
        </h2>
        <div
          v-for="day in days.list"
          :key="day.name"
          :class="{ 'text-red-500': isRedDay(day) }"
          class="px-4 py-2 flex justify-between items-center font-semibold text-gray-600"
        >
          <div>{{ day.label }}</div>
          <div class="flex-grow border-b mx-6 border-gray-300"></div>
          <div class="whitespace-nowrap">{{ day.value }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { defineComponent, reactive, onBeforeMount, onUnmounted } from "@vue/composition-api";

export default defineComponent({
  props: {
    body: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const url = "https://hillsprint.club"; // dev "http://localhost:8082"
    let eventSource;
    onBeforeMount(() => {
      eventSource = new EventSource(`${url}/events`);
      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("Got event", data);
        days.list = data;
      };

      eventSource.onerror = (error) => {
        console.warn("Event error");
      };
    });
    onUnmounted(() => {
      eventSource.close();
    });

    const days = reactive({
      list: [
        {
          label: "Måndag",
          name: "monday",
          value: "8 - 12",
        },
        {
          label: "Tisdag",
          name: "tuesday",
          value: "8 - 12",
        },
        {
          label: "Onsdag",
          name: "wednesday",
          value: "8 - 12",
        },
        {
          label: "Torsdag",
          name: "thursday",
          value: "8 - 12",
        },
        {
          label: "Fredag",
          name: "friday",
          value: "8 - 12",
        },
        {
          label: "Lördag",
          name: "saturday",
          value: "stängt",
        },
        {
          label: "Söndag",
          name: "sunday",
          value: "stängt",
        },
      ],
    });

    const isRedDay = (day) => {
      return day.name === "saturday" || day.name === "sunday";
    };

    return {
      days,
      isRedDay,
    };
  },
});
</script>