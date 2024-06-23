<template>
  <template v-if="mode=='screen'">
    <div :class="{'loading-overlay':1,'hide':!isLoading.state}">
      <div class="loading-linebox">
        <div class="spinner-border" style="width:4em;height:4em;border-width: 4px;" role="status"></div>
      </div>
    </div>
  </template>
  <template v-if="mode=='linebox'">
    <div v-show="state" class="loading-linebox">
      <div class="spinner-border" role="status"></div>
    </div>
  </template>
</template>

<script setup>
import { inject,defineProps,ref } from 'vue';
const loading = inject('loading');
const props = defineProps(['mode']);
const { isLoading } = loading;
const mode = ref(props.mode);
const state = ref(props.state);
</script>

<style>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 20px;
  z-index: 1500;
  visibility: visible;
  opacity: 1;
  transition: all 1s ease;
  transition-delay: 0.5s;
}
.loading-overlay.hide {
  display: none;
  opacity: 0;
  visibility: hidden;
}
</style>
<style lang="scss">
.loading-linebox{
  display: flex;
  justify-content: center;
}
.spinner-border{
  display: inline-block;
  width: 2em;
  height: 2em;
  vertical-align: -0.125em;
  font-size: 10px;
  border-radius: 50%;
  border:3px solid #fff;
  border-right-color: transparent;
  animation: 0.75s linear infinite spinner-border;
}
@keyframes spinner-border {
  to { transform: rotate(360deg) #{"/* rtl:ignore */"}; }
}
</style>