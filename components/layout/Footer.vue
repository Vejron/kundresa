<template>
  <footer class="bg-gray-50 pt-16 pb-12 sm:pt-20 md:pt-24 xl:pt-32 sm:pb-20">
    <div
      class="max-w-7xl mx-auto divide-y divide-gray-200 px-4 sm:px-6 md:px-8"
    >
      <ul
        class="text-sm font-medium pb-14 sm:pb-20 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-10"
      >
        <li class="space-y-5 row-span-2">
          <h2
            class="text-xs font-semibold tracking-wide text-gray-900 uppercase"
          >
            UMEÅ ENERGI AB
          </h2>
          <ul class="space-y-4 text-gray-600">
            <li>Storgatan 34, Umeå</li>
            <li>Box 224</li>
            <li>901 05 Umeå</li>
            <li>
              <a
                class="hover:text-red-500 transition-colors duration-300"
                href="mailto:umea.energi@umeaenergi.se"
                >umea.energi@umeaenergi.se</a
              >
            </li>
          </ul>
        </li>
        <li class="space-y-5 row-span-2">
          <h2
            class="text-xs font-semibold tracking-wide text-gray-900 uppercase"
          >
            KUNDSERVICE
          </h2>
          <ul class="space-y-4 text-gray-600">
            <li>090-16 00 20</li>
            <li>Växel: 090-16 00 00</li>
            <li>Fax: 090-16 00 10</li>
            <li>
              <a
                class="hover:text-red-500 transition-colors duration-300"
                href="mailto:umea.energi@umeaenergi.se"
                >kundservice@umeaenergi.se</a
              >
            </li>
          </ul>
        </li>
        <li class="space-y-5 row-span-2">
          <h2
            class="text-xs font-semibold tracking-wide text-gray-900 uppercase"
          >
            Annat
          </h2>
          <ul class="space-y-4">
            <li>
              <a
                class="hover:text-red-500 transition-colors duration-200"
                href="#"
                >Pressrum</a
              >
            </li>
            <li>
              <nuxt-link
                class="hover:text-red-500 transition-colors duration-200"
                to="mina-sidor"
                >Jobba hos oss</nuxt-link
              >
            </li>
            <li>
              <a
                class="hover:text-red-500 transition-colors duration-200"
                href="#"
                >Umeå Energicentrum</a
              >
            </li>
            <li>
              <a
                class="hover:text-red-500 transition-colors duration-200"
                href="#"
                >Cookies</a
              >
            </li>
            <li>
              <a
                class="hover:text-red-500 transition-colors duration-200"
                href="#"
                >Integritetspolicy</a
              >
            </li>
          </ul>
        </li>
        <li class="space-y-5">
          <h2
            class="text-xs font-semibold tracking-wide text-gray-900 uppercase"
          >
            Socialt
          </h2>
          <ul class="space-y-4">
            <li>
              <a
                class="hover:text-gray-900 transition-colors duration-200"
                href="#"
                >Snap</a
              >
            </li>
            <li>
              <a
                class="hover:text-gray-900 transition-colors duration-200"
                href="#"
                >Linkedin</a
              >
            </li>
            <li>
              <a
                class="hover:text-gray-900 transition-colors duration-200"
                href="#"
                >Twitter</a
              >
            </li>
            <li>
              <a
                class="hover:text-gray-900 transition-colors duration-200"
                href="#"
                >YouTube</a
              >
            </li>
          </ul>
        </li>
      </ul>
      <div class="pt-10 sm:pt-12 text-gray-600">
        <Logo class="h-14 mb-2"/>
        Fake snake AB
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      //footer: Object,
    };
  },
  // fetch from graphCMS with GraphQL
  async fetch() {},
};
</script>

<style >
.mark p {
  @apply mb-4;
}
</style>