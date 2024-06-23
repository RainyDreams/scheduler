<template>
  <div class="main">
    <TopBar 
      mode="recycle"
      btn="back"
    />
    <div class="MainSection">

      <div class="MainCard"
        v-for="(item, i) in list"
        :key="item?.id">
        <div
          :class="{MainItem:1,edit:editMode,hide:item.hide}"
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
                  item.tableType == "progress"? "进度": "" + 
                  item.tableType == "count"? "计数": "" +
                  item.tableType == "aim"? "目标": "" + 
                  item.tableType == "absorbed"? "专注": "" + 
                  item.tableType == "days"? "正/倒数日":""
                }}</span>
                <span>
                  总计{{item.data.total}}{{item.data.unit}}
                </span>
              </div>
            </div>
          </div>
          <div class="progress" v-if="item.tableType == 'progress'">
            <div class="progress-bar" :style="{ 
              width: Math.round(100 * (item.data.sum / item.data.total)) + '%'}" :i="item.generateGradientColor">
              <span :style="{'--width': item.numstylewidth,color: item.isLight ? '#333' : '',}" 
                    :class="{ right:Math.round(100 * (item.data.sum / item.data.total)) <= 15 ? 'left' : '', }" >
                {{ Math.round(100 * (item.data.sum / item.data.total)) }}%
              </span>
            </div>
          </div>
        </div>
        <div :class="{options:1,hide:!editMode}"> 
          <div class="opt_item" hide></div>
          <div class="opt_item" @click="options(1,item.id)">
            <efferent-three theme="outline" size="20" fill="rgba(225, 166, 2, 1)" strokeLinejoin="bevel"/>
            <p>恢复</p>
          </div>
          <div class="opt_item" @click="options(2,item.id)">
            <delete theme="outline" size="20" fill="rgba(255, 42, 79, 1)" strokeLinejoin="bevel"/>
            <p>永久删除</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup async>
import {EfferentThree,Delete} from '@icon-park/vue-next';
import { onMounted, ref, defineExpose, defineProps, watch, inject,onDeactivated,onActivated } from "vue";
import TopBar from "../../components/TopBar.vue";
import Idb from "idb-js";
import db_list_config from "../../utils/db_list_config.js";
import { ElMessage, ElMessageBox } from "element-plus";
import {isLight,getDarkColor,getDayTime, APIVersion,generateGradientColor} from "../../utils/helpers"
import emitter from "../../utils/bus";
const mainItem = ref();
const list = ref([]);
const selectedDate = ref()
const editMode = ref(false)
const props = defineProps(['selectedDate']);
const loading = inject('loading');
let db = await Idb(db_list_config);
const msg = inject('message').msg
emitter.on('filler',({reg,page})=>{
  if(page == 'recycle')
    list.value.forEach((e)=>{
      e.hide = !reg.test(e.title)
    })
})
emitter.on('showEdit',({page})=>{
  if(page == 'recycle')
  editMode.value = true;
})
emitter.on('hideEdit',({page})=>{
  if(page == 'recycle')
  editMode.value = false;
})
async function options(i,...args){
  switch (i){
    case 1:
      await outRecycle(...args);
      break;
    case 2:
      await deleteIt(...args);
      break;
  }
  emitter.emit('hideEdit',{page:'recycle'})
}
async function deleteIt(id,fn=()=>{ElMessage.success('删除成功')}){
  msg.alert({
    title:"提示",
    body:"确认永久删除吗?",
    boolien:true,
    confirm:async ()=>{
      loading.showLoading();
      try {
        let res = (await db.query({
          tableName: "deleteList",
          condition: (item, index) => item.id === id,
        })).data;
        await db.delete({
          tableName: "deleteList",
          condition: (item, index) => item.id === res[0].id,
        })
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
async function outRecycle(id,fn=()=>{ElMessage.success('恢复成功')}){
  loading.showLoading();
  try {
    let res = (await db.query({
      tableName: "deleteList",
      condition: (item, index) => item.id === id,
    })).data;
    if(res[0].state)
      msg.alert({
        title:'提示',
        body:'确认恢复到 '+({'inFile':'归档',mainData:'首页'}[res[0].state])+' 吗？',
        boolien:true,
        confirm:async ()=>{
          await db.add({
            tableName: res[0].state,
            data: {...res[0],state:'recovery'},
          })
          await db.delete({
            tableName: "deleteList",
            condition: (item, index) => item.id === res[0].id,
          });
          loading.hideLoading();
          list.value.splice(list.value.findIndex(e => e.id === res[0].id), 1);
          fn()
        }
      })
    else 
      ElMessage.error('错误')
  } catch (error) {
    console.error("数据库操作失败", error);
    throw new Error(error)
  }
}
async function update() {
  loading.showLoading();
  try{
    const res = (await db.query({
      tableName: "deleteList",
    })).data
    let tmp=[]
    for (let i = 0; i < res.length; i++) {
      tmp.push(res[i]);
      tmp[i].numstylewidth = 25 + "px";
      tmp[i].hide=false;
      tmp[i].locked = (selectedDate.value > getDayTime())
      tmp[i].data.now = tmp[i].data.recordList[selectedDate.value+''] || 0
    }
    list.value=tmp;
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
    // emitter.emit('hideEdit')
  })
  
});

onActivated(async ()=>{
  db = await Idb(db_list_config);
  update();
});
</script>

