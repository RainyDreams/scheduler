<template>
  <div class="ErrorPage" >
    <div class="comeBack" @click="ComeBack">
      <arrow-left theme="outline" size="32" fill="#fff"/>
    </div>
    <div class="main">
      <h1>404</h1>
    </div>
  </div>
</template>

<script>
import { ArrowLeft } from "@icon-park/vue-next"
import { onMounted, ref, watch } from '@vue/runtime-core';
import { useRouter } from 'vue-router'
export default {
  name: "404",
  setup(props) {
    const router = useRouter()
    function ComeBack(){
      router.go(-1)
    }
    onMounted(()=>{
      document.title = "页面找不到啦 - Scheduler";
    })
    return{
      ComeBack,
    }
  },
};
</script>

<style scoped>
/* svg#freepik_stories-404-error-lost-in-space:not(.animated) .animable {opacity: 0;}svg#freepik_stories-404-error-lost-in-space.animated #freepik--Stars--inject-11 {animation: 2.1s 1 forwards cubic-bezier(.36,-0.01,.5,1.38) fadeIn;animation-delay: 0.4s;opacity: 0}svg#freepik_stories-404-error-lost-in-space.animated #freepik--Planets--inject-11 {animation: 1s 1 forwards cubic-bezier(.36,-0.01,.5,1.38) zoomOut;animation-delay: 0s;}svg#freepik_stories-404-error-lost-in-space.animated #freepik--Rocket--inject-11 {animation: 1s 1 forwards cubic-bezier(.36,-0.01,.5,1.38) slideLeft;animation-delay: 0.2s;opacity: 0}svg#freepik_stories-404-error-lost-in-space.animated #freepik--Number--inject-11 {animation: 1s 1 forwards cubic-bezier(.36,-0.01,.5,1.38) slideLeft;animation-delay: 0.8s;opacity: 0}svg#freepik_stories-404-error-lost-in-space.animated #freepik--Text--inject-11 {animation: 1s 1 forwards cubic-bezier(.36,-0.01,.5,1.38) slideLeft;animation-delay: 0.5s;opacity: 0}svg#freepik_stories-404-error-lost-in-space.animated #freepik--speech-bubble--inject-11 {animation: 1s 1 forwards cubic-bezier(.36,-0.01,.5,1.38) slideDown;animation-delay: 0.3s;opacity: 0}svg#freepik_stories-404-error-lost-in-space.animated #freepik--Character--inject-11 {animation: 1s 1 forwards cubic-bezier(.36,-0.01,.5,1.38) slideDown;animation-delay: 0s;}            @keyframes fadeIn {                0% {                    opacity: 0;                }                100% {                    opacity: 1;                }            }                    @keyframes zoomOut {                0% {                    opacity: 0;                    transform: scale(1.5);                }                100% {                    opacity: 1;                    transform: scale(1);                }            }                    @keyframes slideLeft {                0% {                    opacity: 0;                    transform: translateX(-30px);                }                100% {                    opacity: 1;                    transform: translateX(0);                }            }                    @keyframes slideDown {                0% {                    opacity: 0;                    transform: translateY(-30px);                }                100% {                    opacity: 1;                    transform: translateY(0);                }            }         */

</style>