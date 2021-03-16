<template>
  <FormulateInput
    :class="body.class"
    :type="body.type"
    :name="body.name"
    :placeholder="body.placeholder"
    :label="body.label"
    :validation="body.validators"
    :help="body.help"
    error-behavior="blur"
  />
</template>

<script>
export default {
  //inheritAttrs: false // optional
  props: {
    body: {
      type: Object,
      required: true,
    },
  },
};
</script>