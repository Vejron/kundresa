import Vue from 'vue'
import VueRichTextRenderer from '@marvr/storyblok-rich-text-vue-renderer'
import CollapsePanel from '~/components/molecules/CollapsePanel.vue'
import RitchTable from '~/components/showcase/RitchTable.vue'

// Advanced with custom component resolvers
Vue.use(VueRichTextRenderer, {
  resolvers: {
    components: {
      "collapse-panel": CollapsePanel,
      "ritch-table": RitchTable
    }
  }
});