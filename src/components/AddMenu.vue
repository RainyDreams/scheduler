
<!-- 版权所有  内蒙古赤峰二中23级12班 张新越 -->

<template>
  <div class="AddMenu">
    <div class="AddMenu-content">
      <!-- <transition name="7"> -->
        <div class="row">
          <div
            @click="optionClick('edit',{type:'add',tabletype:'progress'})"
            :class="{'w-nt':1,'ic_tag':1,'animate__animated':1,'animate__zoomIn':ShowClass,'animate__zoomOut':HideClass}" 
            style="width:calc(50% - var(--gap));" 
            >
            <div class="option-content">
              <div class="title">进度</div>
              <div class="describe">记录你的任意进度</div>
            </div>
            <div class="option-icon">
              <pie-three theme="filled" size="24" fill="#3e7cf3"/>
            </div>
          </div>
          <div
            @click="optionClick('edit',{type:'add',tabletype:'count'})"
            :class="{'w-nt':1,'ic_tag':1,'animate__animated':1,'animate__zoomIn':ShowClass,'animate__zoomOut':HideClass}" 
            style="width:calc(50% - var(--gap));--animate-delay:0.08s" 
            >
            <div class="option-content">
              <div class="title">记数</div>
              <div class="describe">记录你的每次计数</div>
            </div>
            <div class="option-icon">
              <list-numbers theme="outline" size="24" fill="#C7666E"/>
            </div>
          </div>
          <div
            @click="optionClick('edit',{type:'add',tabletype:'aim'})"
            :class="{'w-nt':1,'ic_tag':1,'animate__animated':1,'animate__zoomIn':ShowClass,'animate__zoomOut':HideClass}" 
            style="width:calc(50% - var(--gap));--animate-delay:0.16s" 
            >
            <div class="option-content">
              <div class="title" >目标</div>
              <div class="describe">记录你的各种目标</div>
            </div>
            <div class="option-icon">
              <list theme="outline" size="24" fill="#f55b77"/>
            </div>
          </div>
          <!-- <div 
            class="portrait"
            style="width:calc(50% - var(--gap));" 
          > -->
          <div
            @click="optionClick('edit',{type:'add',tabletype:'absorbed'})"
            :class="{'w-nt':1,'ic_tag':1,'animate__animated':1,'animate__zoomIn':ShowClass,'animate__zoomOut':HideClass}" 
            style="width:calc(50% - var(--gap));--animate-delay:0.24s" 
            >
            <div class="option-content">
              <div style="color:#109d57" class="title">专注</div>
              <div style="color:#109d57" class="describe">记录你的专注时长</div>
            </div>
            <div class="option-icon">
              <stopwatch-start theme="outline" size="24" fill="#109d57"/>
            </div>
          </div>
            <!-- <div
              @click="optionClick($event)"
              :class="{'w-nt':1,'ic_tag':1,'animate__animated':1,'animate__zoomIn':ShowClass,'animate__zoomOut':HideClass}" 
              style="background:#6D00BC;--animate-delay:0.32s" 
              to="edit?type=add&tabletype=days">
              <div class="option-content">
                <div class="title">倒数日</div>
                <div class="describe">记录你的正/倒数日</div>
              </div>
              <div class="option-icon">
                <calendar theme="filled" size="24" fill="#fff"/>
              </div>
            </div> -->
          <!-- </div> -->
        </div>
      <!-- </transition> -->
    </div>
    <div class="AddMenu-cover"  @click="hideAddMenu"></div>
  </div>
</template>

<script setup>
import { watch, ref, onMounted,defineEmits } from 'vue'
import {PieThree,ListNumbers,StopwatchStart,Calendar,List} from '@icon-park/vue-next'
import { useRoute, useRouter } from 'vue-router';
const emit = defineEmits(['hideAddMenu'])
const props = defineProps(['ShowAddMenu'])
const router = useRouter()
let ShowClass = ref(false)
let HideClass = ref(false)
watch(() => props.ShowAddMenu, (showAddMenu) => {
  // console.log('[AddMenu]showAddMenu', showAddMenu)
  if(showAddMenu){
    ShowClass.value = true
    HideClass.value = false
  }else{
    ShowClass.value = false
  }
})
function hideAddMenu(){
  HideClass.value = true
  emit('hideAddMenu',false)
}
function optionClick(e,p){
  // router.push()
  router.push({ path: e,query:p });
  HideClass.value = true
  emit('hideAddMenu',true)
}
      // return {
      //   hideAddMenu,
      //   ShowClass,
      //   HideClass,
      //   optionClick($event)
      // }
    // }
  // }

</script>


<style scoped lang="scss">
$btnColors :#3e7cf3,#C7666E,#f55b77,#1bdc99,#6D00BC;
@for $i from 1 through 5{
  .w-nt:nth-child(#{$i}){
    border:1px solid nth($btnColors,$i);
    background-color: lighten(nth($btnColors,$i),30%);
    // backdrop-filter: blur(10px);
    color:nth($btnColors,$i);
    --bgcolor:nth($btnColors,$i);
    div svg{
      color:#111;
      fill:darken(nth($btnColors,$i),10%);
    }
  }

  [data-theme=dark] .w-nt:nth-child(#{$i}){
    border:1px solid nth($btnColors,$i);
    background-color: rgba(darken(nth($btnColors,$i),30%),0.5);
    // backdrop-filter: blur(10px);
    color:lighten(nth($btnColors,$i),10%);
    --bgcolor:nth($btnColors,$i);
    div svg{
      color:#111;
      fill:lighten(nth($btnColors,$i),10%);
    }
  }
  
}
  .AddMenu{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1015;
    visibility: hidden;
    transition: all .6s ease;
    display: flex;
    align-content: center;
    justify-content: center;
    align-items: center;
  }
  .AddMenu.show{
    visibility: visible;
  }
  .AddMenu-content{
    position: relative;
    z-index: 2;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    visibility: hidden;
    opacity: 0;
    transition: all .6s ease;
    max-width: 380px;
  }
  .AddMenu-cover{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255,255,255,.5);
    backdrop-filter: blur(10px);
    z-index: 1;
    opacity: 0;
    transition: opacity .6s ease;
  }
  [data-theme=dark] .AddMenu-cover{
    background: rgba(0,0,0,.5);
  }
  .AddMenu.show .AddMenu-cover{
    opacity: 1;
  }
  .AddMenu.show .AddMenu-content{
    opacity: 1;
    visibility: visible;
  }
  .AddMenu-content{
    width: 92%;
  }
  .animate__animated{
    --animate-delay: 0s;
    --animate-duration: 0.4s;
    animation-duration: var(--animate-duration);
    animation-delay: var(--animate-delay);
  }
  .row{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    --gap:16px;
  }
  .i-icon{
    display: inline-block;
  }
  .portrait{
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
  }
  .row .w-nt{
    display: flex;
    flex:0 0 auto;
    width:100%;
    padding:18px 12px;
    padding-left: 16px;
    text-decoration: none;
    // color:#fff;
    // border:1px solid var(--bgcolor);
    border-radius:12px;
    flex-direction: row;
    margin-right:8px;
    margin-left:8px;
    margin-bottom:18px;
  }
  .row .w-nt .option-content{
    width:100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .row .w-nt .title{
    font-size: 18px;
    font-family: 'MiSans-Bold';
    text-align: left;
    font-weight: 700;
  }
  .row .w-nt .describe{
    font-size: 13px;
    text-align: left;
  }
  .row .w-nt .option-icon{
    display: flex;
    align-items: center;
    justify-content: center;
    width:24px;
    height:100%;
  }

</style>