<template>
  <section class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8" v-editable="blok">
    <div v-if="blok.title">
      <h2
        class="sm:text-lg sm:leading-snug font-semibold tracking-wide uppercase text-green-600 mb-3"
      >
        {{ blok.title }}
      </h2>
      <p
        class="text-3xl sm:text-5xl lg:text-6xl leading-none font-extrabold text-gray-900 tracking-tight mb-6 md:mb-8"
      >
        {{ blok.subtitle }}
      </p>
    </div>

    <ul class="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
      <li
        v-for="article in sortedArticles"
        :key="article._uid"
        class="flex-auto"
      >
        <article-teaser
          v-if="article.content"
          :article-link="article.full_slug"
          :article-content="article.content"
        />
        <p v-else class="px-4 py-2 text-white bg-red-700 text-center rounded">
          This content loads on save. <strong>Save the entry & reload.</strong>
        </p>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  props: {
    blok: {
      type: Object,
      required: true,
    },
  },
  computed: {
    sortedArticles() {
      // Load reference data/content from store
      const featuredArticles = this.$store.state.articles.articles.filter(
        (article) => {
          return this.blok.articles.includes(article.uuid);
        }
      );

      // Enable the ordering of the article previews
      featuredArticles.sort((a, b) => {
        return (
          this.blok.articles.indexOf(a.uuid) -
          this.blok.articles.indexOf(b.uuid)
        );
      });

      return featuredArticles;
    },
  },
};
</script>