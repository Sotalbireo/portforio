<template>
  <h1 v-if="level == '1'"><slot></slot></h1>
  <h2 v-else-if="level == '2'"><slot></slot></h2>
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
  @apply block font-light tracking-tighter text-teal-800
  @media(max-width: theme('screens.md'))
    @apply tracking-normal
  font-size: 100px
  line-height: .96
  text-indent: -.75em
  &::before
    @apply header-before
    content: "#"
h2
  @apply font-light text-teal-700 pb-4
  @media(max-width: theme('screens.md'))
    @apply tracking-normal
  font-size: 42px
  &::before
    @apply header-before
    content: "##"
</style>
