<template>
  <section class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <FormulateForm v-model="values" @submit="submitted">
      <h2 class="text-2xl mb-2">Beställ avtal</h2>
      <FormulateInput
        ref="email"
        type="email"
        name="mail"
        label="E-post"
        validation="required|email"
      />
      <FormulateInput
        type="tel"
        name="tel"
        label="Telefon"
        validation="required"
      />
      <FormulateInput
        type="text"
        name="name"
        label="Förnamn"
        validation="required"
      />
      <FormulateInput
        type="text"
        name="surname"
        label="Efternamn"
        validation="required"
      />
      <FormulateInput
        type="text"
        name="address"
        label="Adress"
        validation="required"
      />
      <FormulateInput
        type="text"
        name="post"
        label="Postnummer"
        validation="required"
      />
      <FormulateInput
        type="text"
        name="city"
        label="Ort"
        validation="required"
      />
      <FormulateInput name="consent" type="checkbox" label="Jag godkänner" />
      <FormulateInput type="submit" label="beställ" />
    </FormulateForm>
      </div>
      <div>
        <OrderPlan />
      </div>
    </div>
    
  </section>
</template>

<script>
export default {
  data: () => ({
    values: {},
  }),
  mounted() {
    console.log(decodeURI(this.$route.query.data));
    const b = this.$refs.email.$el.getElementsByTagName('input');
    b[0].focus();
  },
  methods: {
    submitted() {},
  },
};
</script>