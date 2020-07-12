<template>
<section class="grid">
    <h2 class="grid-heading">Career</h2>
    <template v-for="x in xx">
        <div class="segment" :key="x.date">
            <div class="segment-header">
                <div class="segment-header-main">
                    <h3 class="segment-header-main-content">{{x.date}}</h3>
                </div>
            </div>
            <div class="segment-body">
                <p>{{x.article}}</p>
            </div>
        </div>
    </template>
</section>
</template>



<script>
export default {
    data: () => ({
        xx: [
            {
                date: "June 2013",
                article: "Started part-time job as an Assistant front-end engineer"
            },
            {
                date: "March 2020",
                article: "Graduated from Tokyo University of Science"
            }
        ]
    })
}
</script>
