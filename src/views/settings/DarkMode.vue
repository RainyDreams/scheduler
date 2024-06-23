<template>
  <div class="main">
    <PageHeader back title="暗色模式" />
    <div class="settings" style="margin-top: 20px;">
      <ul class="setting_list">
        <a class="item" >
          <div class="body">跟随系统</div>
          <el-switch v-model="isAuto" name="auto"/>
        </a>
        <a class="item" v-if="!isAuto">
          <div class="body">暗色模式</div>
          <el-switch v-model="isDark" />
        </a>
      </ul>
    </div>
  </div>
</template>



<script setup>
// import VueHashCalendar from 'vue3-hash-calendar';
import PageHeader from '../../components/PageHeader.vue';
import { RouterLink,useRouter } from 'vue-router';
import {ElSwitch} from 'element-plus';
import {ref,watch} from 'vue';
import emitter from '../../utils/bus';
const isAuto = ref(true);
const isDark = ref(false);
watch(()=>isAuto.value,(e)=>{
  if(e)
    emitter.emit('theme','auto');
  else
    emitter.emit('theme',isDark.value?'dark':'light');
});
watch(()=>isDark.value,(e)=>{
  emitter.emit('theme',e?'dark':'light');
});
if(localStorage.getItem('theme')==='auto' || localStorage.getItem('theme') == null){
  isAuto.value=true
} else if(localStorage.getItem('theme')==='dark') {
  isAuto.value=false;
  isDark.value = true;
} else if(localStorage.getItem('theme')==='light') {
  isAuto.value=false;
  isDark.value = false;
}
</script>