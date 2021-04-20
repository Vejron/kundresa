<template>
  <div v-editable="body" class="flex">
    
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