import Vue from 'vue'
import VueFormulate from '@braid/vue-formulate'
import { sv } from '@braid/vue-formulate-i18n'

Vue.use(VueFormulate,  {
  plugins: [ sv ],
  locale: 'sv',
  /*classes: {
    outer: 'mb-4',
    input: 'border-2 border-gray-400 rounded-xl px-4 py-3 leading-none focus:border-green-500 outline-none border-box w-full mb-1',
    label: 'font-medium text-sm',
    help: 'text-xs mb-1 text-gray-600',
    error: 'text-red-700 text-xs mb-1'
  }*/
})