<template>
<section class="grid grid-2cols">
    <div class="grid-2cols-col"><img decoding=async :src="seasonableWear" style='width:100%' class="grid-2cols-col-img"></div>
    <div class="grid-2cols-col">
        <h1 class="grid-heading mod-large">Siky.jp</h1>
        <section class="segment">
            <div class="segment-header">
                <div class="segment-header-main">
                    <h2 class="segment-header-main-content">> whoami</h2>
                </div>
            </div>
            <div class="segment-body">
                <dl class="u-ma-0">
                    <div>
                        <dt>Name</dt>
                        <dd>Kyohei SASAKI (Pseudonym)<br>a.k.a. @sota_n, Sotalbireo.</dd>
                    </div>
                    <div>
                        <dt>Location</dt>
                        <dd>Saitama, JP</dd>
                    </div>
                    <div>
                        <dt>Chief accounts</dt>
                        <dd>
                            <ul class="u-ma-0">
                                <li><a href='https://siky.hateblo.jp/' target='_blank'>Blog</a></li>
                                <li><a href='https://github.com/sotalbireo/' target='_blank'>Github <iconGithub width="1em" height="1em" styles="vertical-align:baseline" /></a></li>
                                <li><a href='https://social.mikutter.hachune.net/@sota_n' target='_blank'>Mastodon</a></li>
                            </ul>
                        </dd>
                    </div>
                </dl>
            </div>
        </section>
    </div>
</section>

</template>
<script>
import moment from "moment"
import iconGithub from "@/module/iconGithub.vue"

const m = (m, d) => moment().set({"M":m,"D":d}).format("Y-MM-DD")
const b = t => moment().isBetween(...t)
const s = t => moment().isSame(t,"day")
const season = {
    winter: [m(10,18), m(11,31)],
    winter2: [m(0,1), m(2,23)],
    spring: [m(2,24), m(5,25)],
    summer: [m(5,26), m(8,7)],
    autumn: [m(8,8), m(10,17)],
    birthday: m(1,3),
    valentine: m(1,14),
    debut: m(11,19)
}

export default {
    components: {
        iconGithub
    },
    computed: {
        seasonableWear: () => {
            if(s(season.debut)) {
                //[WIP]
                return require("@/image/asuka/debut.png")
            }else if(s(season.valentine)){
                return require("@/image/asuka/valentine.png")
            }else if(s(season.birthday)){
                return require("@/image/asuka/birthday.png")
            }else if(b(season.autumn)){
                return require("@/image/asuka/autumn.png")
            }else if(b(season.summer)){
                return require("@/image/asuka/summer.png")
            }else if(b(season.spring)){
                return require("@/image/asuka/spring.png")
            }else if(b(season.winter2)){
                return require("@/image/asuka/winter2.png")
            }else if(b(season.winter)){
                return require("@/image/asuka/winter.png")
            }
            return require("@/image/asuka/asuka.png")
        }
    }
}
</script>


<style lang="sass" scoped>
section.grid
    margin-top: 1rem
</style>
