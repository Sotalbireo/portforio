<template>
  <section>
    <div class="wrapper">
      <h3>Company</h3>
      <div>
        https://novoresume.com/cv-templates
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
    border: 1px solid black
    border-radius: 50%
    position: relative
    display: inline-block
    top: 0
    left: 0
    width: 1rem
    height: 1rem
    transform: translate(-50%, 30%)
  h3
    position: absolute
    top: .2em
    left: 1em
    /* transform: translate(1em, 0) */
.wrapper
  border-left: 1px solid blue
  padding: 1em
</style>
