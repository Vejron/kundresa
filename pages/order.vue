<template>
  <section class="max-w-5xl mx-auto mb-8 sm:px-6 md:px-8">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <div
          class="sm:rounded-lg bg-gradient-to-tl from-transparent to-gray-200 shadow-lg p-4 sm:p-8"
        >
          <h2 class="text-green-600 md:text-lg font-bold mb-2 uppercase">
            Ditt valda avtal
          </h2>
          <OrderPlan :plan="plan" :usage="usage" @change="usage = $event" />
        </div>
      </div>

      <div>
        <FormulateForm
          v-model="values"
          @submit="submitted"
          #default="{ isLoading, hasErrors }"
        >
          <div
            class="sm:rounded-lg shadow-lg bg-gradient-to-tr from-transparent to-gray-200 p-4 sm:p-8"
          >
            <h2 class="text-green-600 md:text-lg font-bold mb-2 uppercase">
              Uppgifter för ditt nya elavtal
            </h2>
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
              name="zip"
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
            class="mt-8 sm:rounded-lg shadow-lg p-4 sm:p-8 bg-gradient-to-tr from-transparent to-gray-200"
          >
            <h2 class="text-green-600 sm:text-lg font-bold mb-6 uppercase">
              Låt oss hjälpa dig att ta reda på Anläggnings-ID och Områdes-ID
            </h2>
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
            <FormulateInput
              :disabled="isLoading || hasErrors"
              type="submit"
              :label="isLoading ? 'Bearbetar...' : 'Slutför beställning'"
            />
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
    plan: {},
    usage: 0,
  }),
  mounted() {
    const json = decodeURI(this.$route.query.data);
    this.values = JSON.parse(json);
    this.plan = this.getPlanById(this.values.planId);
    this.usage = this.values.usage;
    console.log(json);
    const b = this.$refs.email.$el.getElementsByTagName("input");
    b[0].focus();
  },
  methods: {
    getPlanById(id) {
      return this.$store.state.deals.deals.find((plan) => plan.id == id);
    },
    submitted() {},
  },
};
</script>