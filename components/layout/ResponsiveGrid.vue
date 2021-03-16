<template>
  <div
    v-editable="body"
    :class="body.class">
    <div
      :key="body._uid"
      v-for="body in body.columns"
      class="">
      <component :body="body" :is="body.component" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    body: {
      type: Object,
      required: true
    }
  }
}
</script>