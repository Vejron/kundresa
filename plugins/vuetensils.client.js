import Vue from 'vue';
//import { VAlert } from 'vuetensils';
//import { VImg } from 'vuetensils';
import { VDialog } from 'vuetensils';
import { clickout } from 'vuetensils';

Vue.directive('clickout', clickout);
Vue.component('VDialog', VDialog);

//Vue.component('VImg', VImg);
//Vue.component('VAlert', VAlert);
