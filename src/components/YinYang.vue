<template>
  <div>
    <div>
      <slot></slot>
    </div>
    <div class="yinYangBG">
      <div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {}
  },
  mounted() {
    // this.yinYangBG = this.$el.getElementsByClassName('yinYangBG')[0]
    // yinYangBG.innerHTML = this.$slots.default
  }
})
</script>

<style lang="sass" scoped>
@use "sass:math" as math
$sin20: math.sin(20deg)
$tan20: math.tan(20deg)
$x: 45vw
$y: calc(100vh + (2 * #{$x} * #{$sin20}))
$color-prima: #d02d26 !default

.yinYangBG
  position: absolute
  top: 0
  left: 0
  background-color: $color-prima
  width: $x
  height: $y
  overflow: hidden
  content: ''
  transform-origin: right top
  transform: rotate(20deg)
  > div
    transform: rotate(-20deg)
    transform-origin: right top
</style>
