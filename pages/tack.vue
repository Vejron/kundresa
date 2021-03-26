<template>
  <section class="max-w-5xl mx-auto mb-8 mt-8 px-6 md:px-8 h-screen prose prose-lg">
    <h1>Tack!</h1>
    <p>Det här gick ju bra. här ska det stå en massa tack och böj</p>
    <p>vi har skickat en bekräftelse till dig på <span class="text-green-600">xxx@xxx.se</span></p> 
    <simple-button @click="$router.push('/')" primary rounded>Tillbaka till start</simple-button>
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