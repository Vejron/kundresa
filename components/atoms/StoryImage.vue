<template>
  <picture>
    <source
      type="image/webp"
      :srcset="transform('filters:format(webp)')"
    />
    <img
      :class="classes"
      :src="src"
      :alt="alt"
      :width="width"
      :height="height"
    />
  </picture>
</template>


<script>
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  props: {
    classes: String,
    size: String,
    image: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const alt = props.image?.alt || "ingen alternativ text";
    const src = props.image?.filename;

    let width = src ? src.split("/")[5].split("x")[0] : 0;
    let height = src ? src.split("/")[5].split("x")[1] : 0;
    const aspectRatio = height / width;
    if(props.size) {
      let w, h;
      [w, h] = props.size.split('x').map(p => Number(p));
      if(w === 0) {
        //proportional to width
        width = aspectRatio * h
        height = h;
      } else if(h === 0) {
        //proportional to height
        height = aspectRatio * w
        width = w;
      } else {
        // total resize
        width = w;
        height = h;
      }
    }

    const transform = (filters) => {
      let path = src.replace("https://a.storyblok.com", "");
      const options = (props.size? (props.size + "/"): "") + filters;
      return "https://img2.storyblok.com/" + options + path;
    };

    return {
      alt,
      src,
      width,
      height,
      transform,
    };
  },
});
</script>

