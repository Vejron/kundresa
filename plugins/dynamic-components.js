import Vue from 'vue'
import Page from '~/components/layout/Page.vue'
import Teaser from '~/components/sections/Teaser.vue'
import Feature from '~/components/sections/Feature.vue'
import FeatureGrid from '~/components/layout/FeatureGrid.vue'
import Newsletter from '~/components/sections/Newsletter.vue'
import Hero from '~/components/sections/Hero.vue'
import BigCta from '~/components/sections/BigCta.vue'
import TestamonialCard from '~/components/sections/TestamonialCard.vue'
import GenericArticle from '~/components/sections/GenericArticle.vue'
import ArticleTeaser from '~/components/molecules/ArticleTeaser.vue'
import FeaturedArticles from '~/components/sections/FeaturedArticles.vue'
import Spacer from '~/components/atoms/Spacer.vue'
import Journey from '~/components/sections/Journey.vue'
import TestamonialMarquee from '~/components/sections/TestamonialMarquee.vue'
import DynamicForm from '~/components/molecules/DynamicForm.vue'
import InputField from '~/components/atoms/InputField.vue'
import ResponsiveGrid from '~/components/layout/ResponsiveGrid.vue'



Vue.component('journey', Journey)
Vue.component('page', Page)
Vue.component('teaser', Teaser)
Vue.component('feature', Feature)
Vue.component('feature-grid', FeatureGrid)
Vue.component('newsletter', Newsletter)
Vue.component('hero', Hero)
Vue.component('big-cta', BigCta)
Vue.component('testamonial-card', TestamonialCard)
Vue.component('generic-article', GenericArticle)
Vue.component('article-teaser', ArticleTeaser)
Vue.component('featured-articles', FeaturedArticles)
Vue.component('spacer', Spacer)
Vue.component('testamonial-marquee', TestamonialMarquee)
Vue.component('dynamic-form', DynamicForm)
Vue.component('input-field', InputField)
Vue.component('responsive-grid', ResponsiveGrid)

export default (context, inject) => {
  // Loading reference data once - Plans
  if (context.store.state.deals.loaded !== '1') {

    const plan1 = {
      id: 1,
      priceKwh: 0.4344,
      fee: 45,
      title: 'Rörligt elpris',
      description: `Ett rörligt elpris baseras på det inköpspris som vi köper in elen för.
    Priset varierar från månad till månad och skiljer sig åt beroende på var i
    Sverige du bor. Passar dig som vill vara flexibel och följa elmarknadens
    svängningar.`,
      selectText: "Välj rörligt elpris",
    };
    const plan2 = {
      id: 2,
      priceKwh: 0.6344,
      fee: 45,
      title: 'Fast elpris',
      description: `Väljer du elavtal med fast pris behöver du inte fundera över elmarknadens toppar och dalar och slipper prishöjning om elpriserna går upp. Fast elpris innebär att du har ett bundet elpris under hela avtalets längd, det passar därför bra för dig som vill ha bättre koll på vad elen kommer att kosta dig.`,
      selectText: "Välj fast elpris",
    };

    context.store.commit('deals/setDeals', [plan1, plan2]);
    context.store.commit('deals/setLoaded', '1');
  }
}
