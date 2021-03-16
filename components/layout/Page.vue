<template>
  <div v-editable="body">
    <component
      v-for="body in body.body"
      :key="body._uid"
      :body="body"
      :is="body.component"
    />
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