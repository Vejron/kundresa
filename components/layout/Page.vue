<template>
  <main v-editable="body">
    <component
      v-for="body in body.body"
      :key="body._uid"
      :body="body"
      :is="body.component"
    />
  </main>
</template>

<script>
export default {
  props: {
    body: {
      type: Object,
      required: true,
    },
  },
  head() {
    return {
      title: this.body.meta.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "description",
          content: this.body.meta.description,
        },
      ],
    };
  },
};
</script>