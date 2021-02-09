<template>
  <FormulateInput
    :class="blok.class"
    :type="blok.type"
    :name="blok.name"
    :placeholder="blok.placeholder"
    :label="blok.label"
    :validation="blok.validators"
    :help="blok.help"
    error-behavior="blur"
  />
</template>

<script>
export default {
  //inheritAttrs: false // optional
  props: {
    blok: {
      type: Object,
      required: true,
    },
  },
};
</script>