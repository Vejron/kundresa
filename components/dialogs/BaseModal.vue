<template>
  <portal to="modal">
    <transition appear name="fade">
      <div
        class="fixed z-50 top-0 inset-x-0 px-4 pt-4 sm:inset-0 sm:flex sm:items-center sm:justify-center"
      >
        <div class="fixed inset-0 transition-opacity">
          <div
            @click.self.stop.prevent="handleClose"
            class="absolute inset-0 bg-black opacity-70"
          ></div>
        </div>

        <div
          class="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div class="bg-white px-4 pt-4 pb-4 sm:p-5 sm:pb-5">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 w-full sm:mt-0">
                <div class="flex items-center justify-between mb-4">
                  <h3
                    class="text-xl md:text-2xl leading-6 font-semibold text-gray-900"
                    id="modal-headline"
                  >
                    {{ title }}
                  </h3>
                  <button ref="closecross" @click.prevent="handleClose">
                    <svg
                      class="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                <div class="mt-2" :class="{ scrollable: scrollable }">
                  <slot />
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="!empty"
            class="bg-gray-50 px-4 py-6 sm:px-5 flex gap-6 justify-end"
          >
            <slot name="footer"> </slot>
          </div>
        </div>
      </div>
    </transition>
  </portal>
</template>

<script>
import { defineComponent, onUnmounted, onMounted, ref } from "@vue/composition-api";

export default defineComponent({
  name: "BaseModal",
  props: {
    title: {
      type: String,
      required: true,
    },
    scrollable: {
      type: Boolean,
      default: false,
    },
    strict: {
      type: Boolean,
      default: false,
    },
    empty: {
      type: Boolean,
      default: false,
    },
  },
  async mounted() {
    // Wait till after vue-simple-portal finishes the move
    await this.$nextTick();
    // Get the close cross and focus it
    this.$refs.closecross?.focus();
  },
  emits: ["close"],
  setup(props, { emit }) {
    onMounted(() => {
      document.addEventListener("keyup", onClose);
    })
    onUnmounted(() => {
      document.removeEventListener("keyup", onClose);
    });
    const onClose = (event) => {
      // watch for escscape key
      if (event.keyCode === 27) {
        handleClose();
      }
    };
    const handleClose = () => {
      !props.strict && emit("close");
    };
    const closecross = ref(null);
    return {
      onClose,
      handleClose,
      closecross,
    };
  },
});
</script>

<style lang="postcss" scoped>
.scrollable {
  height: 300px;
  overflow-y: scroll;
}

.fade-enter-active,
.fade-leave-active {
  transition: 0.35s ease opacity;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>