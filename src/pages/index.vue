<template>
  <div class="wrapper" dir="ltr">
    <section class="container items-center text-center">
      <yin-yang>
        <Heading level="1" class="font-serif text-left">
          @sota<span class="font-sans">_</span>n<br />
          <small>aka. Sotalbireo</small>
        </Heading>
      </yin-yang>
    </section>
    <section class="container">
      <Heading level="2">
        Profile
      </Heading>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Heading from '~/components/Heading.vue'
import YinYang from '~/components/YinYang.vue'

export default Vue.extend({
  components: {
    Heading,
    YinYang
  },
  layout: 'default'
})
</script>

<style lang="sass">
.container
  @apply h-screen flex flex-none justify-center mx-auto py-4
  scroll-snap-align: center
.wrapper
  @apply flex h-screen items-center justify-between
  flex-flow: column nowrap
  scroll-snap-type: y mandatory
  overflow: auto
</style>
