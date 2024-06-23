<!-- 程序主要逻辑 -->
<!-- 2024/2/3 -->
<!-- Zhangxinyue -->

<template>
  <div class="main">
    <TopBar 
      mode="inFile"
    />
    <div class="MainSection">
      <div class="MainCard"
        v-for="(item, i) in list"
        :key="item?.id">
        <div
          :class="{MainItem:1,hide:item.hide,edit:editMode}"
          :theme="item.themeColor"
          ref="mainItem"
        >
          <div class="after"></div>
          <div class="Info">
            <div class="icon"></div>
            <div class="mainInfo">
              <div class="title">{{ item.title }}</div>
              <div class="describe">{{ item.describe }}</div>
              <div class="tags">
                <span :class="item.tableType">{{
                  ({
                    progress: "进度",
                    count: "计数",
                    aim: "目标",
                    absorbed: "专注",
                    days: "正/倒数日"
                  })[item.tableType]
                }}</span>
                <span v-show="item.tableType == 'count'">
                  总{{item.data.sum}}{{item.data.unit}}
                </span>
                <span v-show="item.tableType == 'progress'">
                  <template v-if="item.data.type == 'increase'">总</template>
                  <template v-else>剩余</template>
                  {{ item.data.sum }}/{{ item.data.total}}{{ item.data.unit }}
                </span>
              </div>
            </div>
          </div>
          <div class="progress" v-show="item.tableType == 'progress'">
            <div class="progress-bar" :style="{ 
              width:100*(item.data.sum/item.data.total).toFixed(4) + '%'}"
              :i="item.generateGradientColor">
              <span :style="{'--width': item.numstylewidth,color: item.isLight ? '#333' : '',}" 
                    :class="{ right:Math.round(100 * (item.data.sum / item.data.total)) <= 15 ? 'left' : '', }" >
                {{ progress(item.data.sum,item.data.total) }}%
              </span>
            </div>
          </div>
          <div class="progress" v-show="item.tableType == 'aim' && item.data.type == 'one'">
            <div class="progress-bar" :style="{ 
              width:100*(item.data.sum/item.data.target).toFixed(4) + '%'}" 
              :i="item.generateGradientColor">
              <span :style="{'--width': item.numstylewidth,color: item.isLight ? '#333' : '',}" 
                    :class="{ right:Math.round(100 * (item.data.sum / item.data.target)) <= 15 ? 'left' : '', }" >
                {{ progress(item.data.sum,item.data.target) }}%
              </span>
            </div>
          </div>
        </div>
        <div :class="{options:1,hide:!editMode}"> 
          <div class="opt_item" hide></div>
          <div class="opt_item" @click="options(1,item.id)">
            <efferent-three theme="outline" size="20" fill="rgba(225, 166, 2, 1)" strokeLinejoin="bevel"/>
            <p>取消归档</p>
          </div>
          <div class="opt_item" @click="options(2,item.id)">
            <delete theme="outline" size="20" fill="rgba(255, 42, 79, 1)" strokeLinejoin="bevel"/>
            <p>删除</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup async>
import {Editor,EfferentThree,Delete} from "@icon-park/vue-next"
import { onMounted, ref, defineExpose, defineProps, watch, inject,onDeactivated,onActivated } from "vue";
import TopBar from "../components/TopBar.vue";
import Idb from "idb-js";
import db_list_config from "../utils/db_list_config.js";
import { ElMessage, ElMessageBox } from "element-plus";
import {isLight,getDarkColor,getDayTime, APIVersion,generateGradientColor} from "../utils/helpers"
import emitter from "../utils/bus";
const mainItem = ref();
const list = ref([]);
const selectedDate = ref()
const editMode = ref(false)
const props = defineProps(['selectedDate']);
const loading = inject('loading');
let db = await Idb(db_list_config);
const msg = inject('message').msg
emitter.on('filler',({reg,page})=>{
  // debugger;
  if(page == 'inFile'){
    list.value.forEach((e)=>{
      e.hide = !reg.test(e.title)
    })
  }
})
emitter.on('showEdit',({page})=>{
  if(page == 'inFile')
  editMode.value = true;
})
emitter.on('hideEdit',({page})=>{
  if(page == 'inFile')
  editMode.value = false;
})
function progress(sum,total){
  const num = 100 * (sum / total)
  // debugger
  return (total>500)? parseFloat(num.toFixed(5)):Math.round( num)
}
async function options(i,...args){
  switch (i){
    case 0:
      await editIt(...args);
      break;
    case 1:
      await outFile(...args);
      break;
    case 2:
      await deleteIt(...args);
      break;
  }
  emitter.emit('hideEdit',{page:'inFile'})
}
async function deleteIt(id,fn=()=>{ElMessage.success('移动成功')}){
  msg.alert({
    title:"提示",
    body:"该条目将移动到回收站，确认移动吗?",
    boolien:true,
    confirm:async ()=>{
      loading.showLoading();
      try {
        let res = (await db.query({
          tableName: "inFile",
          condition: (item, index) => item.id === id,
        })).data;
        await db.add({
          tableName: "deleteList",
          data: {...res[0],state:'inFile'},
        })
        await db.delete({
          tableName: "inFile",
          condition: (item, index) => item.id === res[0].id,
        });
        loading.hideLoading();
        list.value.splice(list.value.findIndex(e => e.id === res[0].id), 1);
        fn()
      } catch (error) {
        console.error("数据库操作失败", error);
        throw new Error(error)
      }
    },
  })
}
async function outFile(id,fn=()=>{ElMessage.success('恢复成功')}){
  loading.showLoading();
  try {
    let res = (await db.query({
      tableName: "inFile",
      condition: (item, index) => item.id === id,
    })).data;
    await db.add({
      tableName: "mainData",
      data: res[0],
    })
    await db.delete({
      tableName: "inFile",
      condition: (item, index) => item.id === res[0].id,
    });
    loading.hideLoading();
    list.value.splice(list.value.findIndex(e => e.id === res[0].id), 1);
    fn()
  } catch (error) {
    console.error("数据库操作失败", error);
    throw new Error(error)
  }
}

async function update() {
  loading.showLoading();
  // emitter.emit('showTabBar')
  try{
    const res = (await db.query({
      tableName: "inFile",
    })).data
    if(!localStorage.getItem("sc_version") || localStorage.getItem("sc_version")!=APIVersion){
      ElMessage.warning("正在为您初始化数据，以往数据可能丢失");
      db.delete({
        tableName: "mainData",
        condition: ()=>{return true},
      });
      db.delete({
        tableName: "inFile",
        condition: ()=>{return true},
      });
      localStorage.setItem("sc_version",APIVersion);
    }
    else {
      let tmp=[]
      for (let i = 0; i < res.length; i++) {
        tmp.push(res[i]);
        tmp[i].numstylewidth = 25 + "px";
        tmp[i].hide=false;
        tmp[i].locked = (selectedDate.value > getDayTime())
        tmp[i].data.now = tmp[i].data.recordList[selectedDate.value+''] || 0
      }
      list.value=tmp;
    }
    loading.hideLoading();
  } catch(err){
    console.log(err);
    ElMessage.error(
      "系统警告：数据库查询失败\tHomeMainSection.vue onMounted\t"
    );
  }
};
onMounted(()=>{
  update()
  onDeactivated(()=>{
    // emitter.emit('hideEdit',{page:"inFile"})
  })
});

onActivated(async ()=>{
    update();
    db = await Idb(db_list_config);
  });
</script>

