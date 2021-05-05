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
          {{ body.headline }}
        </h2>
        <div
          v-for="day in openingHours.days"
          :key="day.name"
          :class="{ 'text-red-500': day.isRed }"
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
import {
  defineComponent,
  ref,
  onBeforeMount,
  onUnmounted,
} from "@vue/composition-api";

export default defineComponent({
  props: {
    body: {
      type: Object,
      required: true,
    },
  },
  setup() {
    //const url = "http://localhost:8082"; // dev
    const url = "https://hillsprint.club";
    let eventSource;

    onBeforeMount(() => {
      eventSource = new EventSource(`${url}/events`);
      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        updateOpeningHours(data);
      };

      eventSource.onerror = (error) => {
        console.warn("Event error");
      };
    });

    onUnmounted(() => {
      eventSource.close();
    });

    const toYYMMDD = (date) => {
      const offset = date.getTimezoneOffset();
      date = new Date(date.getTime() - offset * 60 * 1000);
      return date.toISOString().split("T")[0];
    };
    const getWeekDates = () => {
      // set time to some convenient value
      const now = new Date().setHours(0, 0, 0, 0);
      // get the previous Monday
      let monday = new Date(now);
      monday.setDate(monday.getDate() - monday.getDay() + 1);
      // iterate to sunday
      const weekDates = [];
      for (let i = 0; i < 7; i++) {
        weekDates.push(toYYMMDD(new Date(monday)));
        monday.setDate(monday.getDate() + 1)
      }
      return weekDates;
    };

    const updateOpeningHours = (data) => {
      console.log("Update with this: ", data);
      const weekDates = getWeekDates();
      data.special.forEach(specialDay => {
        const index = weekDates.findIndex((date) => date === specialDay.date)
        if(index !== -1) {
          data.normal.days[index].value = specialDay.value;
          data.normal.days[index].isRed = true;
        }
      });
      openingHours.value.days = data.normal.days;
    };

    const openingHours = ref({
      days: [
        {
          label: "Måndag",
          name: "monday",
          value: "8 - 16",
          isRed: false,
        },
        {
          label: "Tisdag",
          name: "tuesday",
          value: "8 - 16",
          isRed: false,
        },
        {
          label: "Onsdag",
          name: "wednesday",
          value: "8 - 16",
          isRed: false,
        },
        {
          label: "Torsdag",
          name: "thursday",
          value: "8 - 16",
          isRed: false,
        },
        {
          label: "Fredag",
          name: "friday",
          value: "8 - 16",
          isRed: false,
        },
        {
          label: "Lördag",
          name: "saturday",
          value: "stängt",
          isRed: true,
        },
        {
          label: "Söndag",
          name: "sunday",
          value: "stängt",
          isRed: true,
        },
      ],
    });

    return {
      openingHours,
    };
  },
});
</script>