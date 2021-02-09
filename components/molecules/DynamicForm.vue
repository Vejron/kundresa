<template>
  <div v-editable="blok">
    <FormulateForm
      class="p-4 w-full max-w-screen-md mx-auto"
      @submit="submitHandler"
      #default="{ isLoading, hasErrors }"
    >
      <h2 class="text-2xl md:text-4xl font-bold mb-8">{{blok.title}}</h2>
      <div class="prose prose-sm sm:prose lg:prose-lg mb-8">
         <rich-text-renderer :document="blok.description" />
      </div>
     
      <template v-for="blok in blok.inputs">
        <template v-if="blok.component === 'input-field'">
          <FormulateInput
            :key="blok._uid"
            class=""
            :type="blok.type"
            :name="blok.name"
            :placeholder="blok.placeholder"
            :label="blok.label"
            :validation="blok.validators"
            :help="blok.help"
            error-behavior="blur"
          />
        </template>
        <template v-else-if="blok.component === 'responsive-grid'">
          <responsive-grid :blok="blok" :key="blok._uid"> </responsive-grid>
        </template>
      </template>
      <div class="flex justify-end">
        <FormulateInput
          type="submit"
          :disabled="isLoading || hasErrors"
          :label="isLoading ? 'skickar...' : blok.submitButtonText"
        />
      </div>
    </FormulateForm>
    <client-only>
    <VDialog v-model="dialog" bg-transition="fade" class="my-dialog">
      <p class="mb-4">{{blok.thankyou}}</p>
      
    </VDialog>
    </client-only>
  </div>
</template>

<script>
export default {
  props: {
    blok: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    dialog: false
  }),
  methods: {
    async submitHandler(data) {
      this.dialog = true;
      console.log("form data: ", data);
      await fetch(this.blok.endpoint, {
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
        }, 1000);
      });
    },
  },
};
</script>