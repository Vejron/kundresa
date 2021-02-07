<template>
  <div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      height="8rem"
      width="100%"
      viewBox="0 0 1440 320"
    >
      <path
        :fill="color"
        d="M0,64L80,101.3C160,139,320,213,480,208C640,203,800,117,960,101.3C1120,85,1280,139,1360,165.3L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
      ></path>
    </svg>
    <div :style="{'background': color}">
       <slot></slot>
    </div>
    <svg
      class="drop-shadow-below"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      height="8rem"
      width="100%"
      viewBox="0 0 1440 320"
    >
      <path
        :fill="color"
        d="M0,64L80,101.3C160,139,320,213,480,208C640,203,800,117,960,101.3C1120,85,1280,139,1360,165.3L1440,192L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
      ></path>
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    color : {
      type: String,
      default: '#ffb300'
    }
  }
}
</script>
