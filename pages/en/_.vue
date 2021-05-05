<template>
  <section>
    <component
      v-if="story.content.component"
      :key="story.content._uid"
      :body="story.content"
      :is="story.content.component"
    />
  </section>
</template>

<script>
export default {
  data() {
    return {
      story: { content: {} },
    };
  },
  mounted() {
    this.$storybridge(() => {
      const storyblokInstance = new StoryblokBridge()

      storyblokInstance.on(['input', 'published', 'change'], (event) => {
        if (event.action == 'input') {
          if (event.story.id === this.story.id) {
            this.story.content = event.story.content
          }
        } else {
          window.location.reload()
        }
      })
    }, (error) => {
      console.error(error)
    })
  },

  asyncData(context) {
    // // This what would we do in real project
    // const version = context.query._storybody || context.isDev ? 'draft' : 'published'
    // const fullSlug = (context.route.path == '/' || context.route.path == '') ? 'home' : context.route.path

    // Load the JSON from the API - loadig the home content (index page)
    return context.app.$storyapi
      .get(`cdn/stories/${context.params.pathMatch}`, {
        version: "draft",
        language: "en"
      })
      .then((res) => {
        return res.data;
      })
      .catch((res) => {
        if (!res.response) {
          console.error(res);
          context.error({
            statusCode: 404,
            message: "Failed to receive content from api",
          });
        } else {
          console.error("sdsdsd bllbb", JSON.stringify(context.params));
          console.error(res.response.data);
          context.error({
            statusCode: res.response.status,
            message: res.response.data,
          });
        }
      });
  },
  async fetch(context) {
    // Loading reference data once - Testamonials
    if (context.store.state.testamonials.loaded !== "1") {
      let testamonialsRefRes = await context.app.$storyapi.get(`cdn/stories/`, {
        starts_with: "testamonials/",
        version: "draft",
      });

      context.store.commit(
        "testamonials/setTestamonials",
        testamonialsRefRes.data.stories
      );
      context.store.commit("testamonials/setLoaded", "1");
    }
    // Loading reference data once - Nyheter
    if (context.store.state.articles.loaded !== "1") {
      let articlesRefRes = await context.app.$storyapi.get(`cdn/stories/`, {
        starts_with: "nyheter/",
        version: "draft",
      });

      context.store.commit("articles/setArticles", articlesRefRes.data.stories);
      context.store.commit("articles/setLoaded", "1");
    }

    // links for breadcrumbs, sitemap...
    if (context.store.state.links.loaded !== "1") {
      let linksRefRes = await context.app.$storyapi.get(`cdn/links/`, {
        version: "draft",
      });
      //console.warn('SDDDDDDDDDDDDDDDDDDsdsdds!!!!!!!!', linksRefRes.data.links);
      context.store.commit("links/setLinks", linksRefRes.data.links);
      context.store.commit("links/setLoaded", "1");
    }
  },
};
</script>