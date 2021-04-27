<template>
  <div>
    <div
      v-editable="body"
      class="prose prose-sm sm:prose lg:prose-lg mb-24 px-4 mx-auto"
    >
      <bread-crumb></bread-crumb>
      <h1>{{ body.name }}</h1>
      <story-image
        classes="w-full object-cover"
        size="0x600"
        :image="body.image"
      />
      <p class="lead">{{ body.intro }}</p>
      <rich-text-renderer :document="body.body" />
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
  computed: {
    
  },
};
</script>