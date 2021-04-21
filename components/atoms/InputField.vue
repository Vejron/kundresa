<template>
  <FormulateInput
    :class="body.class"
    :type="body.type"
    :name="body.name"
    :placeholder="body.placeholder"
    :label="body.label"
    :validation="body.validators"
    :help="body.help"
    :options="options"
    error-behavior="blur"
  />
</template>

<script>
import { defineComponent, computed } from '@vue/composition-api'

export default defineComponent({
  props: {
    body: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const options = computed(() => {
      if(props.body.options && props.body.type === 'select') {
        return props.body.options.split(',').map(option => option.trim())
      }
      return undefined;
    });
    return {
      options
    }
  },
})
</script>
