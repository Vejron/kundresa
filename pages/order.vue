<template>
  <section class="max-w-5xl m-2 mx-auto mb-8 sm:px-6 md:px-8">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h2 class="text-2xl font-black mb-6">Ditt valda avtal</h2>
        <div
          class="sm:rounded-lg bg-gradient-to-tl from-transparent to-gray-200 shadow-lg p-4 sm:p-8"
        >
          <OrderPlan />
        </div>
      </div>

      <div>
        <h2 class="text-2xl font-black mb-6">Beställ avtal</h2>
        <FormulateForm v-model="values" @submit="submitted">
          <div
            class="sm:rounded-lg shadow-lg bg-gradient-to-tr from-transparent to-gray-200 p-4 sm:p-8"
          >
            <p class="text-green-600 text-lg font-semibold mb-2">
              Uppgifter för ditt nya elavtal
            </p>
            <p class="text-sm font-semibold text-gray-600 mb-4">
              Observera att det är samma person som står på elnätsavtalet som
              ska stå på elavtalet.
            </p>
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
              label="För- och efternamn"
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
          </div>
          <div
            class="mt-8 sm:rounded-lg shadow-lg p-8 bg-gradient-to-tr from-transparent to-gray-200"
          >
            <p class="text-green-600 text-lg font-semibold mb-6">
              Låt oss hjälpa dig att ta reda på Anläggnings-ID och Områdes-ID
            </p>
            <FormulateInput
              name="consent"
              type="checkbox"
              label="Jag ger Fake snake AB fullmakt att kontakta min nätägare och nuvarande elleverantör för att komplettera uppgifter om anläggnings-ID och områdes-ID samt säga upp mitt befintliga elavtal till det datum då det löper ut."
              validation="required"
            />
            
            <FormulateInput
              type="radio"
              name="invoice"
              label="Skicka fakturan via:"
              help="För snabbast handläggning välj e-post"
              :options="[
                {
                  value: 'email',
                  label: 'E-post',
                  id: 'my-first',
                  disabled: false,
                }, // this checkbox is disabled
                { value: 'sms', label: 'SMS' },
                { value: 'post', label: 'Post' },
              ]"
            />
            <div></div>
            <FormulateInput type="submit" label="Slutför beställning" />
          </div>
        </FormulateForm>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  layout: "simple",
  data: () => ({
    values: {},
  }),
  mounted() {
    console.log(decodeURI(this.$route.query.data));
    const b = this.$refs.email.$el.getElementsByTagName("input");
    b[0].focus();
  },
  methods: {
    submitted() {},
  },
};
</script>