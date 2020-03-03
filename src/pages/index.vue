<template>
  <div class="container">
    <div>
      <logo />
      <Heading level="1">
        sample
      </Heading>
      <Heading level="2">
        My first-class Nuxt.js project
      </Heading>
      <div class="links">
        <a href="https://nuxtjs.org/" target="_blank" class="button--green">
          Documentation
        </a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button--grey"
        >
          GitHub
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import Heading from '~/components/Heading.vue'

export default {
  components: {
    Logo,
    Heading
  }
}
</script>

<style lang="sass">
.container
  @apply min-h-screen flex justify-center items-center text-center mx-auto

.links
  padding-top: 15px
</style>
