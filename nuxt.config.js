export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'fake-snake',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    /*link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]*/
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/global.css',
    '~/assets/ue-icons.css',
    '~/assets/formulate-theme/snow.scss',
    '~/assets/dots/dots.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/composition-api',
    '~/plugins/dynamic-components',
    '~/plugins/vue-formulate',
    '~/plugins/typed',
    '~/plugins/gtag-plugin.client',
    '~/plugins/crisp.client',
    '~/plugins/storyblok-rich-text-renderer',
    '~/plugins/vue-snap',
    '~/plugins/portal'
    //'~/plugins/pusher.client.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    '~/components/dialogs',
    '~/components/atoms',
    '~/components/molecules',
    '~/components/layout',
    '~/components/sections',
    '~/components/showcase',
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/pwa
    //'@nuxtjs/onesignal',
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    ['vue-scrollto/nuxt', { duration: 300 }],
    [
      'storyblok-nuxt',
      {
        accessToken: 'dj4pnNQ2L459Y4QReoG1Wgtt',
        cacheProvider: 'memory'
      }
    ],
  ],

  tailwindcss: {
    jit: false // change when it works
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'sv',
      description: 'Fixa trixka och koppla in',
      theme_color: '#91b943'
    },
    /*workbox: {
      swURL: 'OneSignalSDKWorker.js'
    }*/
  },

  // Onesignal config https://github.com/nuxt-community/onesignal-module
  /*oneSignal: {
    //cdn: true,
    init: {
      appId: 'f145434d-d92a-44b3-8bd2-acc52b9d2ed0',
      allowLocalhostAsSecureOrigin: false,
      welcomeNotification: {
          disable: false
      },
    }
  },*/

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
