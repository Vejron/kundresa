<template>
  <div>
    <div
      class="bg-white autocomplete flex items-center border border-gray-300 focus-within:ring-primary focus-within:ring-2 rounded-lg overflow-hidden"
      role="combobox"
      aria-haspopup="listbox"
      aria-owns="autocomplete-results"
      :aria-expanded="isOpen"
    >
      <svg
        aria-hidden="true"
        class="text-gray-400 ml-2 flex-none"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path fill="currentColor" :d="mdiMagnify" />
      </svg>
      <span id="global-search-id1" class="sr-only">Sök på sidan</span>
      <input
        ref="input"
        class="border-none focus:outline-none min-w-0 focus:ring-0"
        type="text"
        :placeholder="placeholder"
        @input="onChange"
        :value="search"
        @keydown.down="onArrowDown"
        @keydown.up="onArrowUp"
        @keydown.enter="onEnter"
        aria-autocomplete="list"
        aria-controls="autocomplete-results"
        :aria-activedescendant="activedescendant"
        aria-labelledby="global-search-id1"
      />
      <button
        v-show="!!search"
        @click="reset"
        class="mr-1 focus:outline-none focus:ring-2 transition-colors duration-300 flex justify-center items-center h-8 w-8"
        type="button"
      >
        <div class="transform transition-transform duration-200 wrapper">
          <span class="sr-only">Radera sökning</span>
          <svg
            aria-hidden="true"
            class="text-gray-400 ml-2 flex-none"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path fill="currentColor" :d="mdiClose" />
          </svg>
        </div>
      </button>
    </div>

    <ul
      id="autocomplete-results"
      v-show="isOpen"
      class="autocomplete-results"
      role="listbox"
    >
      <li class="loading" v-if="isLoading">Loading results...</li>
      <li
        v-else
        v-for="(result, i) in results"
        :key="i"
        class="autocomplete-result"
        :class="{ 'is-active': isSelected(i) }"
        role="option"
        :id="getId(i)"
        :aria-selected="isSelected(i)"
      >
        <nuxt-link :to="`/${result.full_slug}`" class="block truncate">
          {{ displayResult(result) }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>



<script>
import { defineComponent } from "@vue/composition-api";
import { mdiMagnify, mdiClose } from "@mdi/js";
import debounce from "lodash/debounce";

export default defineComponent({
  props: {
    items: {
      type: Array,
      required: false,
      default: () => [],
    },
    placeholder: {
      type: String,
    },
  },

  data() {
    return {
      isOpen: false,
      results: [],
      result: null,
      search: "",
      isLoading: false,
      arrowCounter: -1,
      activedescendant: "",
      mdiMagnify,
      mdiClose,
    };
  },

  methods: {
    onChange: debounce(async function (e) {
      this.search = e.target.value;
      if (this.search && this.search.length) {
        const { data } = await this.$storyapi.get("cdn/stories", {
          //starts_with: 'articles/',
          //resolve_relations: 'author',
          search_term: this.search,
          per_page: 5,
        });
        this.results = data.stories;
      } else {
        this.results = [];
      }
      this.isOpen = !!this.results.length;
    }, 300),

    reset() {
      this.search = "";
      this.$refs.input.focus();
    },

    displayResult(result) {
      return result.name;
    },

    onArrowDown(evt) {
      if (this.arrowCounter < this.results.length) {
        this.arrowCounter = this.arrowCounter + 1;
        this.setActiveItem();
      } else {
        this.arrowCounter = 0;
        this.setActiveItem();
      }
    },
    onArrowUp() {
      if (this.arrowCounter > 0) {
        this.arrowCounter = this.arrowCounter - 1;
        this.setActiveItem();
      }
    },
    onEnter() {
      if (this.isOpen) {
        this.$router.push(`/${this.results[this.arrowCounter].full_slug}`);
        this.isOpen = false;
      }
      this.arrowCounter = -1;
    },
    handleClickOutside(evt) {
      if (!this.$el.contains(evt.target)) {
        this.isOpen = false;
        this.arrowCounter = -1;
        this.activedescendant = "";
      }
    },
    setActiveItem() {
      this.activedescendant = this.getId(this.arrowCounter);
    },

    isSelected(index) {
      return index === this.arrowCounter;
    },
    getId(index) {
      return `result-option-${index}`;
    },
  },
  watch: {
    items: function (val, oldValue) {
      // actually compare them
      //if (val.length !== oldValue.length) {
      this.results = val;
      this.isOpen = !!val.length;
      this.isLoading = false;
      //}
    },
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  unmounted() {
    document.removeEventListener("click", this.handleClickOutside);
  },
});
</script>

<style scoped lang="postcss">
.autocomplete {
  @apply relative;
}

.autocomplete-results {
  @apply absolute z-50;
  @apply mt-2;
  @apply rounded-md;
  @apply bg-white;
  @apply shadow-md;
  @apply border;
  @apply border-gray-200 shadow-xl;
  max-height: 20rem;
  overflow: auto;
}

.autocomplete-result {
  list-style: none;
  text-align: left;
  @apply px-3;
  @apply py-2;
  cursor: pointer;
}

.autocomplete-result.is-active,
.autocomplete-result:hover {
  background-color: #4aae9b;
  color: white;
}

svg {
  font-size: 20px;
  transform: translate(0) !important;
}
button:active .wrapper {
  @apply scale-75;
}
</style>
