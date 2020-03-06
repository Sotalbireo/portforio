<template>
  <h1 v-if="level == '1'"><slot></slot></h1>
  <h2 v-else-if="level == '2'"><slot></slot></h2>
  <h3 v-else-if="level == '3'"><slot></slot></h3>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    level: {
      type: String,
      required: true
    }
  }
})
</script>

<style lang="sass" scoped>
.header-before
  @apply text-teal-600
  font-size: .76em

h1
  @apply block font-light text-teal-800
  @media(max-width: theme('screens.md'))
    @apply text-right text-6xl pr-6
  font-size: 6rem
  letter-spacing: -.07em
  line-height: .96
  text-indent: -.65em
  white-space: nowrap
  &::before
    @apply header-before
    content: "#"
h2
  @apply font-light text-5xl text-teal-700 pb-4
  text-indent: -1.2em
  &::before
    @apply header-before pr-2
    content: "##"
h3
  @apply font-light text-4xl text-teal-700 pb-4
  @media(max-width: theme('screens.md'))
  text-indent: -.21em
  &::before
    @apply header-before
    content: "###"
</style>
