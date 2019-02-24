<template>
    <main id="Main">
        <Jumbotron />
        <Produces />
        <Career />
    </main>
</template>

<script>
import Jumbotron from "./components/Jumbotron.vue"
import Produces from "./components/Produces.vue"
import Career from "./components/Career.vue"

export default {
	components: {
        Jumbotron,
        Produces,
        Career
	}
}
</script>

<style lang="sass">
@import "stylesheet/index.sass"
</style>
