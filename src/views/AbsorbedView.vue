<template>
  <div class="main Absorbed">
    <!-- <Back></Back> -->
    <PageHeader back :title="title || '专注'" />
    <div class="content">
      <div :class="'progress-circle theme_'+conf.themeName+' _'+state" :style="{'--percent':conf.percent}">
        <div class="time">
          <div class="now">{{ formatTime }}</div> 
          <div class="target">目标{{ conf.target }}</div>
        </div>
        <svg>
          <circle stroke="var(--inactive-color)" />
          <circle 
            stroke="var(--color)"
            class="progress-value"
            style="stroke-dasharray: calc(2 * 3.1415 * var(--r) * (var(--percent) / 100)), 1000"
          />
        </svg>
        <button op @click="clickTimer">{{ {runing:'停止计时',stop:'开始计时',finish:'专注已完成' }[state]}}</button>
        <p>停止计时才会被记录</p>
      </div>
    </div>
  </div>
</template>

<script setup async>
import PageHeader from '../components/PageHeader.vue'
import { ref,watch,onMounted,onActivated} from 'vue';
import { useRoute } from 'vue-router';
import Idb from 'idb-js';
import db_list_config from '../utils/db_list_config.js';
import Back from '../components/Back.vue'
let db = await Idb(db_list_config);
const route = useRoute();
const conf = ref({percent:0,themeName:'',target:0});
const state = ref('stop');
let startTime = undefined;
let animationFrameId = null;
let targetTime = 0;
let localTime = 0;
const formatTime = ref('00:00:00')
const title = ref('')
function getFormatTime (time){
  let _time = time/1000;
  const hours = Math.floor(_time / 3600);
  const minutes = Math.floor((_time % 3600) / 60);
  const seconds = Math.floor((_time % 3600) % 60);
  const milliseconds = Math.floor((time % 1000));
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}` + 
  `.${milliseconds.toString().padStart(3, '0')}`;
};
watch(() => route.query,(newQuery) => {
  update(newQuery.id)
}); 
onActivated(async ()=>{
  db = await Idb(db_list_config);
})
onMounted(()=>{
  update(route.query.id)
})
async function update(id){
  try{
    const res = (await db.query({
      tableName: "mainData",
      condition: (item, index) => item.id == id,
    })).data[0];
    title.value = '专注：'+res.title;
    conf.value.themeName=res.themeColor;
    // conf.value.target = getFormatTime(parseInt(res.data.target)*60000);
    conf.value.target = res.data.target + '分钟'
    targetTime = parseInt(res.data.target) * 60000;
    localTime = (res.data.sum || 0)*1000;
    formatTime.value = getFormatTime(localTime);
    conf.value.percent = ((localTime ) / targetTime) * 100;
    if(conf.value.percent >= 100)
      state.value = 'finish';
    else
      state.value = 'stop';
  } catch(err){
    console.error(err)
    throw err;
  }
}
function start() {
  if(state.value == 'finish') return;
  startTime = Date.now()
  animationFrameId = requestAnimationFrame(tick);
}
function stop() {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
    db.update({
      tableName: "mainData",
      handler:(r)=>{
        r.data.sum = 
          parseInt((r.data.sum || 0) + (Date.now() - startTime) / 1000);
      },
      condition: (item, index) => item.id == route.query.id,
    })
  }
}
function tick() {
  // console.log(localTime,startTime,targetTime);
  const elapsedTime = localTime + Date.now() - startTime;
  formatTime.value=getFormatTime(elapsedTime);
  conf.value.percent = ((localTime + Date.now() - startTime) / targetTime) * 100;
  if (elapsedTime >= targetTime) {
    stop();
    state.value = 'finish';
    conf.value.percent = 100;
    formatTime.value=getFormatTime(targetTime);
    return;
  }
  animationFrameId = requestAnimationFrame(tick);
}
function clickTimer(){
  if(state.value == 'runing'){
    stop();
    state.value = 'stop';
  } else if (state.value == 'stop') {
    start();
    state.value = 'runing';
  }
}

</script>


