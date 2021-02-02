<template>
  <section>
    <component
      v-if="story.content.component"
      :key="story.content._uid"
      :blok="story.content"
      :is="story.content.component"
    />
  </section>
</template>

<script>
export default {
  transition: "slide-up",
  data() {
    return {
      blok: {
        _uid: "bd4cebcb-d42d-44fb-884e-d0028fa3e47c",
        from: "Trogen kund, Grisbacka",
        name: "Peter Appajärvi",
        image: {
          id: 1864006,
          alt: "Peter med öl",
          name: "",
          focus: null,
          title: "",
          filename:
            "https://a.storyblok.com/f/103186/400x300/3468351cac/peter.jpg",
          copyright: "",
          fieldtype: "asset",
        },
        citation:
          '"Jag trodde aldrig att det skulle va så här kul att slippa frysa"',
        component: "testamonial-card",
        _editable:
          '\u003c!--#storyblok#{"name": "testamonial-card", "space": "103186", "uid": "bd4cebcb-d42d-44fb-884e-d0028fa3e47c", "id": "35559365"}--\u003e',
      },
      story: { content: {} },
    };
  },
  mounted() {
    // Use the input event for instant update of content
    this.$storybridge.on("input", (event) => {
      if (event.story.id === this.story.id) {
        this.story.content = event.story.content;
      }
    });
    // Use the bridge to listen the events
    this.$storybridge.on(["published", "change"], (event) => {
      // window.location.reload()
      this.$nuxt.$router.go({
        path: this.$nuxt.$router.currentRoute,
        force: true,
      });
    });

    this.$OneSignal.push(() => {
      this.$OneSignal.isPushNotificationsEnabled((isEnabled) => {
        if (isEnabled) {
          console.log("Push notifications are enabled!");
        } else {
          console.log("Push notifications are not enabled yet.");
        }
      });
    });
  },
  head() {
    return {
      title: "Fake snake",
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "description",
          content: "Bli kund hos fake snake",
        },
      ],
    };
  },
  asyncData(context) {
    // // This what would we do in real project
    // const version = context.query._storyblok || context.isDev ? 'draft' : 'published'
    // const fullSlug = (context.route.path == '/' || context.route.path == '') ? 'home' : context.route.path

    // Load the JSON from the API - loadig the home content (index page)
    return context.app.$storyapi
      .get("cdn/stories/home", {
        version: "draft",
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
  },
};
</script>