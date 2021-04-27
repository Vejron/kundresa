<template>
  <div v-editable="body">
    <FormulateForm
      class="p-4 w-full max-w-screen-md mx-auto"
      @submit="submitHandler"
      #default="{ isLoading, hasErrors }"
    >
      <div class="flex items-center justify-between">
        <h2 class="text-2xl md:text-4xl font-bold">{{ body.title }}</h2>
        <story-image
          classes="hidden sm:block w-40 object-cover"
          :image="body.image"
        />
      </div>

      <div class="prose md:prose-lg">
        <rich-text-renderer :document="body.description" />
      </div>

      <template v-for="body in body.inputs">
        <template v-if="body.component === 'input-field'">
          <FormulateInput
            :key="body._uid"
            class=""
            :type="body.type"
            :name="body.name"
            :placeholder="body.placeholder"
            :label="body.label"
            :validation="body.validators"
            :help="body.help"
            error-behavior="blur"
          />
        </template>
        <template v-else-if="body.component === 'responsive-grid'">
          <responsive-grid :body="body" :key="body._uid"> </responsive-grid>
        </template>
      </template>
      <div class="flex justify-end">
        <FormulateInput
          type="submit"
          :disabled="isLoading || hasErrors"
          :label="isLoading ? 'skickar...' : body.submitButtonText"
        />
      </div>
    </FormulateForm>
    <base-modal
      v-if="dialog"
      title="Formuläret skickat!"
    >
      <p class="text-sm leading-5 text-gray-600">
        {{ body.thankyou }}
      </p>
      <template v-slot:footer>
        <simple-button secondary rounded @click="dialog = false">
          Okej
        </simple-button>
      </template>
    </base-modal>
    <client-only>
      
    </client-only>
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
  data: () => ({
    dialog: false,
  }),
  methods: {
    async submitHandler(data) {
      this.dialog = true;
      console.log("form data: ", data);
      await fetch(this.body.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          message: data,
        }),
      }).then(() => {
        setTimeout(() => {
          this.dialog = false;
        }, 5000);
      });
    },
  },
};
</script>