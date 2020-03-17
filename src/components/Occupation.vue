<template>
  <section>
    <div class="wrapper">
      <h3>Post<br /><small>Company</small></h3>
      <div class="grid grid-cols-2">
        <p>https://novoresume.com/cv-templates</p>
        <p class="text-right">hogefuga</p>
      </div>
    </div>
  </section>
</template>

<style lang="sass" scoped>
section
  min-height: 10rem
  position: relative
  &::before
    content: ""
    border: 2px solid black
    border-radius: 50%
    position: relative
    display: inline-block
    top: 0
    left: 0
    width: 1.5rem
    height: 1.5rem
    transform: translate(-50%, 30%)
  h3
    @apply font-light text-2xl text-teal-700 leading-none
    @media(max-width: theme('screens.md'))
    position: absolute
    top: .2em
    left: 1.2em
    /* transform: translate(1em, 0) */
    text-indent: -.21em
.wrapper
  border-left: 2px solid blue
  padding: 2em 0 1em 1.5em
  margin-left: -1px
</style>
