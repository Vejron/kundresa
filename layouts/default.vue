<template>
  <div class="bg-white overflow-x-hidden">
    <Header />
    <Nuxt />
    <Footer />
    <BottomNav />
    <Consent />
  </div>
</template>

<script>
export default {
  mounted() {
    this.$OneSignal.push(() => {
      this.$OneSignal.showNativePrompt();

      this.$OneSignal.isPushNotificationsEnabled((isEnabled) => {
        if (isEnabled) {
          console.log("Push notifications are enabled!");
        } else {
          console.log("Push notifications are not enabled yet.");
        }
      });
    });
  },
};
</script>