<template>
  <div :class="{selectSection:1,hide:!props.SelectColorShow}">
    <div class="container">
      <div class="content-box-title">选择主题色</div>
      <div class="selectContent">
        <template v-for="(item,i) in colorList" :key="item">
          <div class="selectItem">
            <div class="selectBtn" :style="{background:item.color}" @click="selectColor(i)">
              <check v-if="i==select" theme="outline" size="26" fill="#fff" strokeLinejoin="bevel" :strokeWidth="6"/>
            </div>
            <span :style="{'--color':item.color}">{{ item.zh_CN }}</span>
          </div>
        </template>
      </div>
      <div class="submit">
        <div class="btn-submit" @click="submit">保存</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Check } from '@icon-park/vue-next';
import { ref,defineProps,defineEmits,watch,onActivated } from 'vue'
import { colorList } from '../utils/color';

const props = defineProps(['SelectColorShow','SelectColor']);
const emit = defineEmits(['SetColor']);
const select = ref(props.SelectColor);
function findIndexByProperty(array, property, value) {
  for (let i = 0; i < array.length; i++) {
    if (array[i][property] === value) {
      return i;
    }
  }
  return -1;
}
watch(()=>props.SelectColorShow,(newValue)=>{
  select.value = findIndexByProperty(colorList,'name',props.SelectColor);
})
onActivated(()=>{
  select.value = findIndexByProperty(colorList,'name',props.SelectColor);

})
function submit(){
  emit('SetColor',colorList[select.value]);
}
function selectColor(e){
  select.value = e;
}

// 
</script>

