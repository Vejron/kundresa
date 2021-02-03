<template>
  <div class="relative w-full">
    <input
      type="range"
      :step="step"
      :min="min"
      :max="max"
      :value="value"
      @input="$emit('input', $event.target.value)"
      class="absolute z-10 h-2 w-full opacity-0 cursor-pointer"
    />

    <div class="relative h-2 pointer-events-none">
      <div
        class="absolute left-0 right-0 bottom-0 top-0 rounded-md bg-gray-200"
      ></div>

      <div
        class="absolute top-0 bottom-0 rounded-md bg-green-400"
        :style="'right: 0' + (1 - thumb) * 100 + '%; left:' + 0 + '%'"
      >
      </div>

      <div
        class="absolute shadow w-6 h-6 top-0 left-0 bg-gray-300 rounded-full -mt-2 -ml-1"
        :style="thumbPosition"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [Number, String]
    },
    step: {
      type: [Number, String]
    },
    min: {
      type: [Number, String],
      default: 0,
    },
    max: {
      type: [Number, String],
      default: 100,
    },
  },
  mounted() {},
  computed: {
    thumb() {
      return this.value / (this.max - this.min);
    },
    thumbPosition() {
      return `left: calc(${this.thumb * 100}% - (${
        this.thumb
      } * 1.5rem - 0.29rem))`;
    },
  },
};
</script>

<style >
input[type="range"]::-webkit-slider-thumb {
  pointer-events: all;
  width: 1.5rem;
  height: 1.5rem;
  border-width: 0;
  -webkit-appearance: none;
  appearance: none;
}

input[type="range"] {
  -webkit-appearance: none;
}
</style>
