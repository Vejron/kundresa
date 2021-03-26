<template>
  <div class="h-1 w-full">
    <transition
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:after-enter="afterEnter"
      v-bind:css="false"
    >
      <div :style="barStyle" v-if="show">
      </div>
    </transition>
  </div>
</template>

<script>
import { defineComponent, ref, watch, computed, onMounted } from "@vue/composition-api";

const clamp = (num, min, max) =>
  Math.min(Math.max(num, min), max);

const queue = (() => {
  const pending = [];
  function next() {
    let fn = pending.shift();
    if (fn) {
      fn(next);
    }
  }
  return (fn) => {
    pending.push(fn);
    if (pending.length === 1) {
      next();
    }
  };
})();

export default defineComponent({
  setup(props) {
    const error = ref(false);
    const show = ref(false);
    const progress = ref(0);
    const opacity = ref(0);
    const status = ref(null);
    const isPaused = ref(false);

    watch(
      () => props.loading,
      (loading) => {
        console.log("changed");
        loading ? start() : done();
      }
    );

    const progressColor = computed(() =>
      error.value ? props.errorColor : props.color
    );
    const isStarted = computed(() => typeof status.value === "number");
    const barStyle = computed(() => ({
      position: "relative",
      top: "0",
      left: "0",
      right: "0",
      width: `${progress.value}%`,
      height: `${props.height}px`,
      backgroundColor: progressColor.value,
      transition: `all ${props.speed}ms ${props.easing}`,
      opacity: `${opacity.value}`,
      //zIndex: `${props.zIndex}`
    }));

    const beforeEnter = (el) => {
      opacity.value = 0;
      progress.value = 0;
    };

    const enter = (el, done) => {
      opacity.value = 1;
      done();
    };

    const afterEnter = (el) => {
      _runStart();
    };

    const _work = () => {
      setTimeout(() => {
        if (!isStarted.value || isPaused.value) {
          return;
        }
        increase();
        _work();
      }, props.trickleSpeed);
    };

    const _runStart = () => {
      status.value = progress.value === 100 ? null : progress.value;
      if (props.trickle) {
        _work();
      }
    };

    const start = () => {
      isPaused.value = false;
      if (show.value) {
        _runStart();
      } else {
        show.value = true;
      }
    };

    const set = (amount) => {
      isPaused.value = false;
      let o;
      if (isStarted.value) {
        o =
          amount < progress.value
            ? clamp(amount, 0, 100)
            : clamp(amount, props.minimum, 100);
      } else {
        o = 0;
      }
      status.value = o === 100 ? null : o;
      queue((next) => {
        progress.value = o;
        if (o === 100) {
          setTimeout(() => {
            opacity.value = 0;
            setTimeout(() => {
              show.value = false;
              error.value = false;
              next();
            }, props.speed);
          }, props.speed);
        } else {
          setTimeout(next, props.speed);
        }
      });
    };

    const increase = (amount) => {
      let o = progress.value;
      if (o < 100 && typeof amount !== "number") {
        if (o >= 0 && o < 25) {
          amount = Math.random() * 3 + 3;
        } else if (o >= 25 && o < 50) {
          amount = Math.random() * 3;
        } else if (o >= 50 && o < 85) {
          amount = Math.random() * 2;
        } else if (o >= 85 && o < 99) {
          amount = 0.5;
        } else {
          amount = 0;
        }
      }
      set(clamp(o + amount, 0, props.maximum));
    };

    const decrease = (amount) => {
      if (progress.value === 0) {
        return;
      }
      increase(-amount);
    };

    const done = () => {
      set(100);
    };

    const fail = () => {
      error.value = true;
      done();
    };

    onMounted(() => {
      console.log("progress!!");
      if (props.loading) {
        start();
      }
    });

    return {
      beforeEnter,
      enter,
      afterEnter,
      barStyle,
      show,
    };
  },
 
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    speed: {
      type: Number,
      default: 350,
    },
    color: {
      type: String,
      default: "rgb(0, 127, 50)",
    },
    colorShadow: String,
    errorColor: {
      type: String,
      default: "#f44336",
    },
    trickle: {
      type: Boolean,
      default: true,
    },
    trickleSpeed: {
      type: Number,
      default: 250,
    },
    easing: {
      type: String,
      default: "linear",
    },
    height: {
      type: Number,
      default: 3,
    },
    minimum: {
      type: Number,
      default: 0.8,
    },
    maximum: {
      type: Number,
      default: 97.5,
    },
    zIndex: {
      type: Number,
      default: 9999,
    },
  },
});
</script>

<style scoped>
.peg {
  @apply bg-primary
}
</style>