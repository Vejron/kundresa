<template>
  <client-only>
    <VDialog v-model="dialog" bg-transition="fade" class="my-dialog">
      <p class="mb-4">Vill du bli en i statestiken?</p>
      <div class="flex justify-between text-sm font-semibold">
        <button
          @click="consent(true)"
          class="shadow block border-green-600 border-2 rounded-full focus:outline-none focus:border-green-600 px-4 py-2 text-green-600 hover:bg-green-600 hover:text-white"
        >
          <span>OK</span>
        </button>
        <button
          @click="consent(false)"
          class="shadow block border-green-600 border-2 rounded-full focus:outline-none focus:border-green-600 px-4 py-2 text-green-600 hover:bg-green-600 hover:text-white"
        >
          <span>NEJ TACK</span>
        </button>
      </div>
    </VDialog>
  </client-only>

  
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
    } else if (consent === 'ok') {
      this.enablePlugin();
    }
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: 0.5s ease opacity;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.my-dialog .vts-dialog {
  background: rgba(0, 0, 0, 0.6);
}

.my-dialog .vts-dialog__content {
  position: relative;
  border-radius: 7px;
  padding: 20px;
  font-family: sans-serif;
  background: #fff;
  transition: 0.3s ease transform;
}

.my-dialog .fade-enter .vts-dialog__content,
.my-dialog .fade-leave-active .vts-dialog__content {
  transform: translateY(20px);
}
</style>