import Vue from 'vue'
import VueGtag from 'vue-gtag'

export default ({ app }) => {
  Vue.use(
    VueGtag,
    {
      bootstrap: false,
      config: { 
        id: 'G-NM587VQBNT',
        params: {
          send_page_view: true
        } 
      },
    },
    app.router
  )
}