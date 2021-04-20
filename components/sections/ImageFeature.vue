<template>
  <div v-editable="body" :class="{'md:flex-row-reverse': body.left}" class="flex flex-col-reverse md:flex-row max-w-xl md:max-w-7xl mx-auto">
    <div class="hidden md:block relative h-96 w-1/2">
      <story-image class="object-cover h-96 inset-y-0 w-full" :image="body.image" />
      <svg
        data-v-ebdc76f4=""
        fill="currentColor"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
        :class="{'right-full': body.left}"
        class="hidden md:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
      >
        <polygon data-v-ebdc76f4="" points="50,0 100,0 50,100 0,100"></polygon>
      </svg>
    </div>
    
    <article class="relative px-4 sm:px-6">
      <h2
        class="sm:text-lg sm:leading-snug font-semibold tracking-wide uppercase text-primary mb-3"
      >
        {{ body.headline }}
      </h2>
      <p
        class="text-3xl md:text-2xl lg:text-4xl leading-none font-extrabold text-gray-900 tracking-tight mb-8"
      >
        {{ body.subheading }}
      </p>

      <div class="prose prose-md prose-green">
        <rich-text-renderer :document="body.description" />
      </div>
    </article>
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