import Utility from "./_Utility";
import Wave from "./_Wave";
import Vue from "vue";
//@ts-ignore
import Main from "@/Main";

document.addEventListener("DOMContentLoaded", () => {
    Array.prototype.forEach.call(document.images, (el: HTMLImageElement) => {
        el.addEventListener("contextmenu", e => e.preventDefault());
        el.addEventListener("dragstart", e => e.preventDefault());
    });

    const wave = new Wave();
    wave.execute(Utility.isPalmtop());
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: "#Main",
    template: "<Main/>",
    components: { Main }
});
