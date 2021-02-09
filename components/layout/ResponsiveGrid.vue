<template>
  <div
    v-editable="blok"
    :class="blok.class">
    <div
      :key="blok._uid"
      v-for="blok in blok.columns"
      class="">
      <component :blok="blok" :is="blok.component" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    blok: {
      type: Object,
      required: true
    }
  }
}
</script>