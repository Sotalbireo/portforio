<template>
  <div>
    <section class="container">
      <Heading level="1" class="font-serif text-left">
        @sot<span class="spacing-tightest">a<u>_</u>n</span>
        <br />
        <small>aka. Sotalbireo</small>
      </Heading>
    </section>
    <section class="container justify-start">
      <Heading level="2">
        Proﬁles
      </Heading>
      <figure>
        <img
          class="avator"
          src="https://s.gravatar.com/avatar/7e4b7fb56b34d61b83aa5ce15163c967?s=80"
          alt="My Avator"
        />
      </figure>
      <dl>
        <dt>Name</dt>
        <dd>
          <ul>
            <li>sota_n</li>
            <li>sotalbireo</li>
          </ul>
        </dd>
        <dt>Address</dt>
        <dd>Saitama, Japan</dd>
        <dt>Birth (sex)</dt>
        <dd>April, 1993. (Male)</dd>
      </dl>
    </section>
    <section class="container justify-start">
      <Heading level="2">職務経歴</Heading>
      <section>
        <Heading level="3"><small>2013 » 2020</small> gafa</Heading>
      </section>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Heading from '~/components/Heading.vue'

export default Vue.extend({
  components: {
    Heading
  }
})
</script>

<style lang="sass">
.avator
  @apply border border-purple-600 border-solid overflow-hidden rounded-full
.container
  @apply min-h-screen flex flex-none justify-center mx-auto py-4 flex-col
  @media(max-width: theme('screens.md'))
    @apply px-6
.justify-start
  justify-content: safe flex-start
.spacing-tightest
  letter-spacing: -.12em
  white-space: nowrap
  & u
    @apply font-sans no-underline

dl
  @apply text-2xl
  & > dt:not(:nth-child(1))
    @apply mt-8
dt
  &::after
    content: ' :'
dd
  @apply pl-8
</style>
