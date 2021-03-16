<template>
  <div
    class="relative rounded-r-xl sm:rounded-xl shadow-xl text-black"
  >
    <div class="bg-white rounded-r-xl sm:rounded-xl overflow-hidden flex">
      <div class="relative z-10 overflow-hidden w-48">
        <img
          :src="body.image.filename"
          :alt="body.image.alt"
          class="absolute max-w-none object-cover bg-gray-100"
          style="width: 100%; height: 100%; left: 0px; top: 0px"
        />
      </div>
      <div class="p-4 sm:p-8">
        <div class="mb-4 font-semibold text-sm sm:text-lg max-w-xs">
          {{body.citation}}
        </div>
        <div class="flex flex-col items-start font-medium">
          <p style="color: rgb(8, 145, 178);">
            {{body.name}}
          </p>
          <p style="color: rgb(113, 113, 122);">
            {{body.from}}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    body: {
      type: Object,
      required: true,
    },
  },
};
</script>