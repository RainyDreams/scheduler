<!-- 程序主要逻辑 -->
<!-- 2024/2/3 -->
<!-- Zhangxinyue -->

<template>
  <div class="MainSection">
    <Loading mode="linebox" :mode="isLoadingList"></Loading>
    <div class="MainCard"
      v-for="(item, i) in list"
      :key="item.id">
      <div :class="{MainItem:1,hide:item.hide,edit:editMode}"
        :theme="item.themeColor"
        ref="mainItem">
        <div class="after"></div>
        <div class="Info">
          <div class="icon"></div>
          <div class="mainInfo">
            <div class="title">{{ item.title }}</div>
            <div class="describe">{{ item.describe }}</div>
            <div class="tags">
              <span s0 :class="item.tableType">{{
                ({
                  progress: "进度",
                  count: "计数",
                  aim: "目标",
                  absorbed: "专注",
                  days: "正/倒数日"
                })[item.tableType]
                
              }}</span>
              <span s1 v-show="item.tableType == 'count'">
                总{{item.data.sum}}{{item.data.unit}}
              </span>
              <span s2 v-show="item.tableType == 'count'">
                {{item.data.type=='day'?'当日':''+item.data.type=='week'?'本周':''+item.data.type=='month'?'本月':''
                }}{{item.data.recordList[({day:selectedDate+'',week:selectedWeek+'',month:selectedMonth+''}[item.data.type])] || 0
                }}{{item.data.unit}}
              </span>
              <span s1 v-show="item.tableType == 'progress'">
                <template v-if="item.data.type == 'increase'">总</template>
                <template v-else>剩余</template>
                {{ item.data.sum }}/{{ item.data.total}}{{ item.data.unit }}
              </span>
              <span s2 v-show="item.tableType == 'progress'">
                当日{{ item.data.now }}{{ item.data.unit }}
              </span>
              <span s1 v-show="item.tableType == 'aim'">
                当日{{ item.data.recordList[selectedDate+''] || 0}}/{{ item.data.every }}{{ item.data.unit }}
              </span>
            </div>
          </div>
          <div class="operation">
            <template v-if="!item.locked">
              <template v-if="item.tableType == 'progress' || item.tableType == 'count'">
                <button @click="change(item.id, item.data.every, i, 'minus', item.tableType)">
                  <loading-one class="icon-loading" v-if="item.loading.minus == true" theme="filled" size="18" :strokeLinejoin="bevel"/>
                  <svg style="width: 24px; height: 24px" v-else viewBox="0 0 24 24">  <path d="M19,13H5V11H19V13Z"  /></svg>
                </button>
                <button @click="change(item.id, item.data.every, i, 'plus', item.tableType)">
                  <loading-one class="icon-loading" v-if="item.loading.plus == true" theme="filled" size="18" :strokeLinejoin="bevel"/>
                  <svg style="width: 24px; height: 24px" v-else viewBox="0 0 24 24">  <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"/></svg>
                </button>
              </template>
              <template v-else-if="item.tableType == 'aim'">
                <button @click="change(item.id, item.data.everytime, i, 'plus', item.tableType)">
                  <loading-one class="icon-loading" v-if="item.loading.plus == true" theme="filled" size="18" :strokeLinejoin="bevel"/>
                  <check-small v-else theme="outline" size="22" strokeLinejoin="bevel"/>
                </button>
              </template>
              <template v-else-if="item.tableType == 'absorbed'">
                <button @click="startAbsorbed(item.id)">
                  <loading-one class="icon-loading" v-if="item.loading.plus == true" theme="filled" size="18" strokeLinejoin="bevel"/>
                  <timer v-else theme="outline" style="margin-top:-2px" size="20" strokeLinejoin="bevel"/>
                </button>
              </template>
            </template>
            <button v-else>
              <lock theme="outline" size="20"/>
            </button>
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
        <div class="text-right" v-show="item.tableType == 'aim' && item.data.type == 'one'">
          达成总目标{{ item.data.sum }}/{{ item.data.target }}天
        </div>
      </div>
      <div :class="{options:1,hide:!editMode}"> 
        <div class="opt_item" @click="options(0,item.id,item.tableType)">
          <editor theme="outline" size="20" fill="rgba(95, 185, 0, 1)" strokeLinejoin="bevel"/>
          <p>编辑</p>
        </div>
        <div class="opt_item" @click="options(1,item.id)">
          <afferent-three theme="outline" size="20" fill="rgba(225, 166, 2, 1)" strokeLinejoin="bevel"/>
          <p>归档</p>
        </div>
        <div class="opt_item" @click="options(2,item.id)">
          <delete theme="outline" size="20" fill="rgba(255, 42, 79, 1)" strokeLinejoin="bevel"/>
          <p>删除</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup async>
import { CheckSmall,LoadingOne,Lock,Editor,AfferentThree,Delete,Timer } from "@icon-park/vue-next";
import { onMounted, ref, defineExpose, defineProps, watch,inject,onActivated,onDeactivated } from "vue";
import Idb from "idb-js";
import db_list_config from "../utils/db_list_config.js";
import { ElMessage } from "element-plus";
import emitter from "../utils/bus";
import {isLight,getDarkColor,getDayTime,generateGradientColor, APIVersion,getFirstWeekDay,getFirstMonthDay,getPropertyKeyCount} from "../utils/helpers"
import Loading from '../components/Loading.vue'
import { useRouter } from "vue-router";
const mainItem = ref();
const list = ref([]);
const selectedDate = ref()
const selectedWeek = ref()
const selectedMonth = ref()
const props = defineProps(['selectedDate','filler']);
const isLoadingList = ref(true)
const editMode = ref(false)
const loading = inject('loading');
const router = useRouter()
const msg = inject('message').msg
let db = await Idb(db_list_config);
watch(() => props.selectedDate, (newVal) => {
  const date = new Date(newVal)
  selectedDate.value = date.getTime();
  selectedWeek.value = getDayTime(getFirstWeekDay(date))
  selectedMonth.value = getDayTime(getFirstMonthDay(date))
  list.value.forEach((e)=>{
    if(e.tableType == 'aim')
      e.locked = e.data.selectWeekday.includes(date.getDay());
    e.locked = (selectedDate.value > getDayTime());
    e.data.now = e.data.recordList[selectedDate.value+''] || 0;
    
  })
});
watch(() => list.value,(E)=>{
  console.log(E)
})
emitter.on('filler',({reg,page})=>{
  if(page == 'home')
    list.value.forEach((e)=>{
      e.hide = !reg.test(e.title)
    })
})
emitter.on('showEdit',({page})=>{
  if(page == 'home')
  editMode.value = true;
})
emitter.on('hideEdit',({page})=>{
  if(page == 'home')
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
      await inFile(...args);
      break;
    case 2:
      await deleteIt(...args);
      break;
  }
  emitter.emit('hideEdit',{page:'home'})
}
async function editIt(id,type){
  router.push({path:'/edit',query:{id:id,tabletype:type,type:'edit'}})
}
async function inFile(id,fn=()=>{ElMessage.success('归档成功')}){
  // loading.showLoading();
  try {
    let res = (await db.query({
      tableName: "mainData",
      condition: (item, index) => item.id == id,
    })).data;
    // await new Promise(resolve => setTimeout(resolve, 1000));
    await db.add({
      tableName: "inFile",
      data: {...res[0],state:'inFile'},
    })
    await db.delete({
      tableName: "mainData",
      condition: (item, index) => item.id === res[0].id,
    });
    loading.hideLoading();
    list.value.splice(list.value.findIndex(e => e.id === res[0].id), 1);
    fn()
  } catch (error) {
    msg.alert({body:"数据库操作失败"+error,confirm:()=>{
      // loading.hideLoading();
    }});
    // debugger;

    throw new Error(error)

  }
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
          tableName: "mainData",
          condition: (item, index) => item.id === id,
        })).data;
        await db.add({
          tableName: "deleteList",
          data: {...res[0],state:'mainData'},
        })
        await db.delete({
          tableName: "mainData",
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
function startAbsorbed(id){
  router.push({path:'/absorbed',query:{id:id}})
}
async function change(id, every, i, can, tableType) {
  try{
    if(list.value[i].loading['minus'] == true || list.value[i].loading['plus'] == true)
      return /*msg.alert({title:"提示",body:"请勿重复点击",confirm:()=>{}})*/;
    list.value[i].loading[can]=true;
    if(tableType == 'progress'){
      const r = (await db.update({
        tableName: "mainData",
        condition: (item) => item.id == id,
        handler:(r)=>{
          if(!r.data.recordList[selectedDate.value+'']) 
            r.data.recordList[selectedDate.value+''] = 0
          if (r.data.type == 'increase'){
            if (can == "minus") {
              if (r.data.sum > 0) {
                r.data.recordList[selectedDate.value+''] -= every
                r.data.sum -= every
              };
            } else {
              if (r.data.sum < r.data.total) {
                r.data.recordList[selectedDate.value+''] += every
                r.data.sum += every;
              }
            }
          } else {
            if (can == "minus") {
              if (r.data.sum < r.data.total) {
                r.data.recordList[selectedDate.value+''] += every
                r.data.sum -= every
              };
            } else {
              if (r.data.sum > 0) {
                r.data.recordList[selectedDate.value+''] -= every
                r.data.sum += every;
              }
            }
          }
        }
      })).data
      list.value[i].data.sum = r[0].data.sum;
      list.value[i].data.now = r[0].data.recordList[selectedDate.value+''] || 0;
      list.value[i].data.recordList[selectedDate.value+''] = r[0].data.recordList[selectedDate.value+''];
      if(
        (r[0].data.type == "increase" && r[0].data.sum >=r[0].data.total) ||
        (r[0].data.type == "reduce" && r[0].data.sum <=0)
      ){
        list.value[i].data.status = "finish"
        if(r[0].needInFile){
          await inFile(r[0].id,async ()=>{
            setTimeout(async function(){
              ElMessage.success('归档成功')
              list.value[i].loading[can]=false;
            },100)
          })
        } else {
          list.value[i].loading[can]=false;
        }
      } else 
      list.value[i].loading[can]=false;
    } else if (tableType == "count"){
      let _select;
      const _r = (await db.update({
        tableName: "mainData",
        condition: (item) => item.id == id,
        handler: (r) => {
          _select = {
            day:selectedDate.value+'',
            week:selectedWeek.value+'',
            month:selectedMonth.value+'',
          }[r.data.type]
          if(!r.data.recordList[_select]) 
            r.data.recordList[_select] = 0
          if (can == "minus") {
            if (r.data.sum != 0) {
              r.data.recordList[_select] -= every
              r.data.sum -= every
            };
          } else {
            r.data.recordList[_select] += every
            r.data.sum += every;
          }  
        },
      })).data
      list.value[i].data.sum = _r[0].data.sum;
      list.value[i].data.recordList[_select] = _r[0].data.recordList[_select];
      list.value[i].loading[can]=false;
    } else if (tableType == "aim") {
      const _r = (await db.update({
        tableName: "mainData",
        condition: (item) => item.id == id,
        handler:(r)=>{
          let everytime = r.data.everytime;
          if(!r.data.recordList[selectedDate.value+'']) 
            r.data.recordList[selectedDate.value+''] = 0
          if (can == "minus") {
            if (r.data.recordList[selectedDate.value+''] > 0) {
              r.data.recordList[selectedDate.value+''] -= everytime
            };
          } else {
            r.data.recordList[selectedDate.value+''] += everytime
          }
          let tmp = 0;
          for(let e in r.data.recordList){
            if(r.data.recordList[e]>=r.data.every){
              tmp++;
            }
          }
          r.data.sum=tmp;
        }
      })).data
      list.value[i].data.sum = _r[0].data.sum;
      list.value[i].data.recordList[selectedDate.value+''] = _r[0].data.recordList[selectedDate.value+''];
      if((_r[0].data.sum >=_r[0].data.target) && _r[0].data.type == 'one'){
        list.value[i].data.status = "finish";
        if( _r[0].needInFile){
          await inFile(_r[0].id,async ()=>{
            setTimeout(async function(){
              ElMessage.success('任务完成，归档成功')
              list.value[i].loading[can]=false;
            },100)
          })
        } else 
          list.value[i].loading[can]=false;
      } else
      list.value[i].loading[can]=false;
    }
  } catch(err) {
    ElMessage(err)
    throw new Error(err)
  }
}
document.oncontextmenu = function (e) {
  return false;
};

async function update () {
  loading.showLoading();
  isLoadingList.value = true;
  // emitter.emit('showTabBar')
  // try{
    let res = (await db.query({
      tableName: "mainData",
    })).data;
    // debugger
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
        tmp[i].locked = (selectedDate.value > getDayTime());
        tmp[i].loading = {}
        tmp[i].data.now = tmp[i].data.recordList[selectedDate.value+''] || 0
      }
      list.value=tmp;
    }
    loading.hideLoading();
    isLoadingList.value = false;
  // } catch(err){
  //   throw new Error(err);
  //   ElMessage.error(
  //     "系统警告：数据库查询失败\tHomeMainSection.vue onMounted\t"
  //   );
  // }
};

onMounted(async ()=>{
  await update();
  const date = new Date(props.selectedDate)
  selectedDate.value = date.getTime();
  selectedWeek.value = getDayTime(getFirstWeekDay(date))
  selectedMonth.value = getDayTime(getFirstMonthDay(date))
  list.value.forEach((e)=>{
    e.locked = (selectedDate.value > getDayTime())
    e.data.now = e.data.recordList[selectedDate.value+''] || 0
  })
  emitter.on('onClickEdit',(e)=>{
    if(e.page == 'home')
      editMode.value = e.editState
  })
})
onActivated(async ()=>{
  await update();
  db = await Idb(db_list_config);
})
onDeactivated(()=>{
  // emitter.emit('hideEdit',{page:'home'})
})
emitter.on('update',()=>{
  console.log('update')
  update()
})
// onMounted(() => {
//   update()
// });

</script>
<style lang="scss">
</style>