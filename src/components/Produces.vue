<template>
<section class="grid">
    <h2 class="grid-heading">Produces</h2>
    <template v-for="p in ps">
        <section :key="p.name" class="segment">
            <div class="segment-header">
                <div class="segment-header-aside"><span class="lang-ribbon" :class="langLabel(p.mainLang)">{{ p.mainLang }}</span></div>
                <div class="segment-header-main">
                    <h3 class="segment-header-main-content">{{ p.name }}
                        <template v-if="p.repository.type === 'github'"> <a :href="p.repository.href" target="_blank" rel="noopener noreferrer"><iconGithub width="1em" height="1em" /></a></template>
                    </h3>
                    <ul class="segment-header-main-labels">
                        <li v-for="lang of p.langs" :key="lang" class="lang-label" :class="langLabel(lang)">{{ lang }}</li>
                    </ul>
                </div>
            </div>
            <div class="segment-body">
                <p>{{ p.overview }}</p>
                <p v-if="p.link">
                    <a :href="p.link" target="_blank" rel="noopener noreferrer">-> Go to web page.</a>
                </p>
            </div>
        </section>
    </template>
</section>
</template>

<script>
import iconGithub from "@/module/iconGithub.vue"

export default {
    components: {
        iconGithub
    },
    data: () => ({
        ps: [
            {
                cat: 'application',
                devices: ['PC'],
                langs: ['HTML5', 'CSS3', 'Electron'],
                mainLang: 'TypeScript',
                name: 'WebVTT-Editor',
                overview: 'The editor to create WebVTT how subtitles at html5 video.',
                repository: {
                    type: 'github',
                    href: 'https://github.com/Sotalbireo/WebVTT-Editor'
                }
            },
            {
                cat: 'application',
                devices: ['PC'],
                langs: [],
                link: 'https://hakoniwa.cgi-game-preservations.org/',
                mainLang: 'PHP',
                name: 'hakoniwa',
                overview: 'Retro browser game',
                repository: {
                    type: 'github',
                    href: 'https://github.com/Sotalbireo/hakoniwa'
                },
                thumbnail: ''
            },
            {
                cat: 'application',
                devices: [
                    'Browser',
                ],
                langs: [],
                link: 'https://kusodevbattle.github.io/sisiodosi/',
                mainLang: "other",
                name: "sisiodosi",
                overview: "It's Joke. (Portable \"Oto-hime\")",
                repository: {
                    type: 'github',
                    href: 'https://github.com/kusoDevBattle/sisiodosi'
                },
                thumbnail: ''
            }
        ]
    }),
    methods: {
        langLabel: v => String(v).toLowerCase()
    }

}
</script>

<style lang="sass" scoped>
@import "@/stylesheet/Variables/_Colors.sass"
@import "@/stylesheet/Variables/_Media-queries.sass"

.lang-ribbon
    border-radius: 0 .3rem .3rem 0
    display: inline-block
    font-size: 0.86em
    line-height: 1
    margin: 0 0 0 -1em
    min-width: max-content
    padding: 0.4em 1em 0.6em 1.6em
    position: relative
    transition: background 0.1s ease
    vertical-align: baseline
    &:after
        background-color: transparent
        border-color: transparent !important
        border-right-color: inherit !important
        border-style: solid
        border-width: 0 1em 1.2rem 0
        content: ''
        height: 0
        left: 0
        position: absolute
        top: 100%
        width: 0
    &.php
        background-color: $color-php
        border-color: darken($color-php, 10%)
        color: $color-white
        &:after
            border-color: darken($color-php, 10%)
    &.pug
        background-color: $color-pug
        border-color: darken($color-pug, 10%)
        color: $color-white
        &:after
            border-color: darken($color-pug, 10%)
    &.typescript
        background-color: $color-typescript
        border-color: darken($color-typescript, 10%)
        color: $color-white
        &:after
            border-color: darken($color-typescript, 10%)
    &.other
        background-color: darken($color-white, 50%)
        border-color: darken($color-white, 60%)
        color: $color-white
        &:after
            border-color: darken($color-white, 50%)
.lang-label
    align-self: flex-start
    border-radius: 0 .3rem .3rem 0
    font-size: .86em
    line-height: 1
    margin: 0 0.5em 0 1em
    min-width: max-content
    position: relative
    padding: .4em .8em
    &:before
        background-color: inherit
        border-radius: .3em
        content: ''
        height: 1.4em
        position: absolute
        right: 100%
        transform: translateY(-50%) translateX(50%) rotate(-45deg)
        top: 50%
        width: 1.4em
    &:after
        background-color: #fff !important
        border-radius: 50%
        box-shadow: 0 -1px 1px 0 hsla(0, 0%, 0%, 0.3)
        content: ''
        height: .4em
        left: 0
        position: absolute
        top: 50%
        transform: translateY(-50%) translateX(-50%)
        width: .4em
    &.css3
        background-color: hsl(204, 42, 78)
    &.electron
        background-color: $color-electron
    &.html5
        background-color: hsl(18, 87.9%, 54.7%)
        color: $color-white
    &.sass
        background-color: hsl(330, 52%, 60%)
        color: $color-white
    &.typescript
        background-color: $color-typescript
        color: $color-white

@media #{$print}
    .lang-ribbon,
    .lang-label
        color: hsla(0,0%,0%,1) !important
</style>
