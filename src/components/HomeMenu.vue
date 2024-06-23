<template>
  <div class="Menu">
    <div class="Menu-content">
      
    </div>
    <div class="Menu-cover"  @click="hideMenuCover"></div>
  </div>
</template>

<script setup>
import { ref,defineEmits } from 'vue'
const emit = defineEmits(['hideMenuCover'])
function hideMenuCover(){
  emit('hideMenuCover')
}
      
</script>


<style>
  .Menu{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1008;
    visibility: hidden;
    transition: all .3s ease;
  }
  .Menu.show{
    visibility: visible;
  }
  .Menu-content{
    position: absolute;
    width:80%;
    height:100%;
    top:0;
    left:0;
    z-index: 2;
    background: #fff;
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
    transform: translateX(-100%);
    transition: all .4s ease;
  }
  .Menu-cover{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    z-index: 1;
    opacity: 0;
    transition: opacity .4s ease;
  }
  .Menu.show .Menu-content{
    transform: translateX(0);
  }
  .Menu.show .Menu-cover{
    opacity: 1;
  }

</style>