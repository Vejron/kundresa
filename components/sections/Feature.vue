<template>
  <div v-editable="blok" class="flex">
    <div class="flex-shrink-0">
      <div
        class="flex items-center justify-center h-14 w-14 rounded-xl text-primary"
      >
        <i :class="blok.icon + '-rnd-stroke'" class="leading-none text-5xl"></i>
      </div>
    </div>
    <div class="ml-4">
      <dt class="text-lg leading-6 font-medium text-gray-900">
        {{ blok.name }}
      </dt>
      <dd class="mt-2 text-base text-gray-500">
        {{ blok.description }}
      </dd>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    blok: {
      type: Object,
      required: true,
    },
  },
};
</script>