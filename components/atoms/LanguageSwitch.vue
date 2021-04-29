<template>
  <div class="flex relative items-center focus-within:ring-1 rounded-md">
    <svg
      class="h-5 absolute left-1"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      viewBox="0 0 24 24"
    >
      <path
        fill="#007f32"
        d="M8.904 16.5h6.192C14.476 19.773 13.234 22 12 22c-1.197 0-2.4-2.094-3.038-5.204l-.058-.294h6.192-6.192zm-5.838.001H7.37c.365 2.082.983 3.854 1.793 5.093a10.029 10.029 0 01-5.952-4.814l-.146-.279zm13.563 0h4.305a10.028 10.028 0 01-6.097 5.093c.755-1.158 1.344-2.778 1.715-4.681l.076-.412h4.306-4.306zm.302-6.5h4.87a10.055 10.055 0 01-.257 5H16.84a28.539 28.539 0 00.13-4.344L16.93 10h4.87-4.87zM2.198 10h4.87a28.211 28.211 0 00.034 4.42l.057.58H2.456a10.047 10.047 0 01-.258-5zm6.377 0h6.85a25.838 25.838 0 01-.037 4.425l-.062.575H8.674a25.979 25.979 0 01-.132-4.512L8.575 10h6.85-6.85zm6.37-7.424l-.109-.17A10.027 10.027 0 0121.372 8.5H16.78c-.316-2.416-.956-4.492-1.837-5.923l-.108-.17.108.17zm-5.903-.133l.122-.037C8.283 3.757 7.628 5.736 7.28 8.06l-.061.44H2.628a10.028 10.028 0 016.414-6.057l.122-.037-.122.037zM12 2.002c1.319 0 2.646 2.542 3.214 6.183l.047.315H8.739C9.28 4.691 10.643 2.002 12 2.002z"
      />
    </svg>
    <select
      class="pl-8 border-none text-xs font-sans focus:ring-none"
      v-model="selected"
      :value="selected"
      @change="change"
    >
      <option
        class="text-base px-3 leading-10"
        v-for="option in options"
        :key="option.lang"
        :value="option.lang"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from "@vue/composition-api";

export default defineComponent({
  setup(props, { root }) {
    const options = [
      {
        lang: "en",
        label: "English",
        flag: `<svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  viewBox="0 0 72 72"
                >
                  <path fill="#1e50a0" d="M5 17h62v38H5z" />
                  <path
                    fill="#fff"
                    d="M40 28.856V32h10.181L67 21.691V17h-7.654L40 28.856z"
                  />
                  <path fill="#d22f27" d="M67 17h-3.827L40 31.203V32h3.482L67 17.586V17z" />
                  <path
                    fill="#fff"
                    d="M59.347 55H67v-4.692L50.182 40H40v3.143L59.347 55z"
                  />
                  <path fill="#d22f27" d="M67 55v-2.347L46.355 40h-4.787l24.474 15H67z" />
                  <path fill="#fff" d="M32 43.144V40H21.819L5 50.309V55h7.654L32 43.144z" />
                  <path fill="#d22f27" d="M5 55h3.827L32 40.797V40h-3.482L5 54.414V55z" />
                  <path fill="#fff" d="M12.653 17H5v4.692L21.818 32H32v-3.143L12.653 17z" />
                  <path fill="#d22f27" d="M5 17v2.347L25.646 32h4.786L5.958 17H5z" />
                  <path fill="#fff" d="M5 31h62v10H5z" />
                  <path fill="#fff" d="M31 17h10v38H31z" />
                  <path fill="#d22f27" d="M5 33h62v6H5z" />
                  <path fill="#d22f27" d="M33 17h6v38h-6z" />
                  <path
                    fill="none"
                    stroke="#000"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 17h62v38H5z"
                  />
        </svg>`,
      },
      {
        lang: "sv",
        label: "Svenska",
        flag: `<svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  viewBox="0 0 72 72"
                >
                  <path fill="#1e50a0" d="M5 17h62v38H5z" />
                  <path
                    fill="#fcea2b"
                    stroke="#fcea2b"
                    stroke-miterlimit="10"
                    stroke-width="2"
                    d="M67 33H30V17h-6v16H5v6h19v16h6V39h37v-6z"
                  />
                  <path
                    fill="none"
                    stroke="#000"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 17h62v38H5z"
                  />
        </svg>`,
      },
    ];

    const change = (e) => {
      const path = root.$route.path;
      if (e.target.value === "en") {
        root.$router.push("/en" + path);
      } else if (e.target.value === "sv" && path.startsWith('/en/')) {
        root.$router.push(path.substring(3));
      }
      console.log(root.$route);
      console.log(e.target.value);
    };
    const selected = ref("sv");
    //const flag = computed(options.find(o => o.lang === selected.value).flag);
    const flag = () => {
      return options.find((o) => o.lang === selected.value).flag;
    };
    return {
      options,
      selected,
      flag,
      change,
    };
  },
});
</script>

<style lang="postcss" scoped>
select:focus {
  outline: none !important;
  @apply ring-0;
}
</style>
