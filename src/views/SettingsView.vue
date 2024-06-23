<template>
  <div class="main">
    <div class="settings">
      <div class="title">功能</div>
      <ul class="setting_list">
        <router-link class="item" to="/settings/recycle">
          <div class="body">回收站</div>
          <right theme="outline" size="24" strokeLinejoin="bevel"/>
        </router-link>
        <router-link class="item" to="/settings/instructions">
          <div class="body">使用说明</div>
          <right theme="outline" size="24" strokeLinejoin="bevel"/>
        </router-link>
      </ul>
      <div class="title">配置</div>
      <ul class="setting_list">
        <router-link class="item" to="/settings/dark">
          <div class="body">暗色模式</div>
          <right theme="outline" size="24" strokeLinejoin="bevel"/>
        </router-link>
        <router-link class="item" to="/settings/about">
          <div class="body">关于</div>
          <right theme="outline" size="24" strokeLinejoin="bevel"/>
        </router-link>
      </ul>
    </div>
  </div>
</template>
<script setup>
import { Right } from '@icon-park/vue-next';
import { RouterLink } from 'vue-router';
import {onActivated, ref} from 'vue';
import emitter from '../utils/bus';
const darkmode = ref(false);
onActivated(()=>{
  localStorage.getItem('theme') === 'dark' ? darkmode.value = true : darkmode.value = false;
});
</script>
<style scoped lang="scss">
// @import '../styles/theme.scss';
</style>


