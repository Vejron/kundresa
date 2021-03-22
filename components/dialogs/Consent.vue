<template>
  <base-modal
    v-if="dialog"
    @close="consent(false)"
    strict
    title="Vi använder kakor"
  >
    <p class="text-sm leading-5 text-gray-600">
      We use cookies to personalise content and ads, to provide social media
      features and to analyse our traffic. We also share information about your
      use of our site with our social media, advertising and analytics partners
      who may combine it with other information that you’ve provided to them or
      that they’ve collected from your use of their services
    </p>
    <template v-slot:footer>

        <simple-button secondary rounded @click="consent(false)">
          Okej
        </simple-button>
        <simple-button primary rounded @click="consent(false)">
          Alldrig!
        </simple-button>
     
    </template>
  </base-modal>
</template>

<script>
import { bootstrap } from "vue-gtag";

export default {
  data: () => ({
    dialog: false,
  }),

  methods: {
    consent(accepted) {
      console.log(accepted);
      localStorage.setItem("ga_consent", accepted ? "ok" : "no");
      if (accepted) this.enablePlugin();
      this.dialog = false;
    },
    enablePlugin() {
      bootstrap().then((gtag) => {
        // all done!
        console.log("Tracking now!");
      });
    },
  },

  mounted() {
    const consent = localStorage.getItem("ga_consent");
    if (!consent) {
      setTimeout(() => {
        this.dialog = true;
      }, 800);
    } else if (consent === "ok") {
      this.enablePlugin();
    }
  },
};
</script>
