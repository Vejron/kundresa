<template>
  <section
    class="max-w-2xl text-center mx-auto mb-8 mt-8 px-6 md:px-8 h-screen/2 prose prose-md  md:prose-lg"
  >
    <h1>Tack för förtroendet!</h1>
    
      <vue-typed-js v-if="values" :cursorChar="'_'" :startDelay="400" :typeSpeed="50" :strings="['John Doe', values.UserAttributes.FullName]">
    <p style="margin-top: 0">
      Det här gick ju bra <span class="typing text-upink"></span>. Med lite flyt bör det komma en skriftlig bekräftelse
      via mail till den adress du angav vid beställningen. Vi har skickat 
      bekräftelsen till <span class="text-green-600">xxx@xxx.se</span>
    </p>
    </vue-typed-js>
    
    <simple-button @click="$router.push('/')" primary rounded
      >Tillbaka till start</simple-button
    >
  </section>
</template>

<script>
export default {
  //layout: "simple",
  data: () => ({
    values: null,
    plan: {},
    usage: 0,
  }),
  mounted() {
    const json = decodeURI(this.$route.query.data);
    this.values = JSON.parse(json);
    console.log(this.values);
  },
  methods: {
    getPlanById(id) {
      return this.$store.state.deals.deals.find((plan) => plan.id == id);
    },
    submitted() {},
  },
};
</script>