<template>
  <div v-editable="body" class="relative">
    <div class="absolute inset-0">
      <story-image class="object-cover h-full" :image="body.image" />
      <div
        class="absolute particles top-0 bg-gradient-to-b from-transparent to-black h-full w-full"
      ></div>
    </div>
    <main
      class="star-wars relative mx-auto max-w-7xl px-4 lg:px-8 h-100 flex items-center justify-center"
    >
      <div class="text-center">
        <h1 class="tracking-normal font-bold text-white">
          <p class="text-2xl sm:text-3xl md:text-6xl sm:mb-2">
            {{ body.headline }}
          </p>
          <vue-typed-js :cursorChar="'_'" :startDelay="2000" :typeSpeed="50" :strings="['Här behövs det en klyschig tagline på sisådär en 40 tecken', body.subheading]">
            <p
              class="text-lg sm:text-xl md:text-3xl font font-semibold text-secondary"
            >
              <span class="typing"></span>
            </p>
          </vue-typed-js>
        </h1>
        <p
          class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
        >
          {{ body.description }}
        </p>
      </div>
    </main>
  </div>
</template>


<script>
import StoryImage from "@/components/atoms/StoryImage";
import ShaderProgram from "@/utils/shader";
export default {
  components: { StoryImage },
  props: {
    body: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    const pointSize = 3;
    const waves = new ShaderProgram(document.querySelector(".particles"), {
      texture:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAb1BMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8v0wLRAAAAJHRSTlMAC/goGvDhmwcExrVjWzrm29TRqqSKenRXVklANSIUE8mRkGpv+HOfAAABCElEQVQ4y4VT13LDMAwLrUHteO+R9f/fWMfO6dLaPeKVEECRxOULWsEGpS9nULDwia2Y+ALqUNbAWeg775zv+sA4/FFRMxt8U2FZFCVWjR/YrH4/H9sarclSKdPMWKzb8VsEeHB3m0shkhVCyNzeXeAQ9Xl4opEieX2QCGnwGbj6GMyjw9t1K0fK9YZunPXeAGsfJtYjwzxaBnozGGorYz0ypK2HzQSYx1y8DgSRo2ewOiyh2QWOEk1Y9OrQV0a8TiBM1a8eMHWYnRMy7CZ4t1CmyRkhSUvP3gRXyHOCLBxNoC3IJv//ZrJ/kxxUHPUB+6jJZZHrpg6GOjnqaOmzp4NDR48OLxn/H27SRQ08S0ZJAAAAAElFTkSuQmCC",
      uniforms: {
        size: { type: "float", value: pointSize },
        field: { type: "vec3", value: [0, 0, 0] },
        speed: { type: "float", value: 3 },
      },
      vertex: `
        #define M_PI 3.1415926535897932384626433832795
        precision highp float;
        attribute vec4 a_position;
        attribute vec4 a_color;
        uniform float u_time;
        uniform float u_size;
        uniform float u_speed;
        uniform vec3 u_field;
        uniform mat4 u_projection;
        varying vec4 v_color;
        void main() {
          vec3 pos = a_position.xyz;
          pos.y += (
            cos(pos.x / u_field.x * M_PI * 8.0 + u_time * u_speed) +
            sin(pos.z / u_field.z * M_PI * 8.0 + u_time * u_speed)
          ) * u_field.y;
          gl_Position = u_projection * vec4( pos.xyz, a_position.w );
          gl_PointSize = ( u_size / gl_Position.w ) * 100.0;
          v_color = a_color;
        }`,
      fragment: `
        precision highp float;
        uniform sampler2D u_texture;
        varying vec4 v_color;
        void main() {
          gl_FragColor = v_color * texture2D(u_texture, gl_PointCoord);
        }`,
      onResize(w, h, dpi) {
        const position = [];
        const color = [];

        const width = 400 * (w / h);
        const depth = 400;
        const height = 3;
        const distance = 5;

        for (let x = 0; x < width; x += distance) {
          for (let z = 0; z < depth; z += distance) {
            position.push(-width / 2 + x, -20, -depth / 2 + z);
            color.push(
              0,
              1 - (x / width) * 1,
              0.5 + (x / width) * 0.5,
              z / depth
            );
          }
        }

        this.uniforms.field = [width, height, depth];
        this.buffers.position = position;
        this.buffers.color = color;
        this.uniforms.size = (h / 400) * pointSize * dpi;
      },
    });
  },
};
//v-bind:style="{ 'background-image': 'url(' + body.image.filename + ')' }"
</script>

<style scoped>
</style>