<!-- 版权所有 内蒙古赤峰二中23级12班 张新越 -->

<template>
  <div class="main">
    <div class="TopBar" style="padding-bottom: 16px">
      <div class="TipBar">
        <div class="TipBar_left">
          <div
            class="backButton"
            style="font-size: 0; width: 24px; height: 24px"
            @click="goBack"
          >
            <arrow-left theme="outline" size="24" fill="#555" />
          </div>
          <div class="date">
            {{ type == "add" ? "添加" : "编辑"
            }}{{
              tabletype == "progress"
                ? "进度"
                : "" + tabletype == "count"
                ? "计数"
                : "" + tabletype == "aim"
                ? "目标"
                : "" + tabletype == "absorbed"
                ? "专注"
                : "" + tabletype == "days"
                ? "正/倒数日"
                : ""
            }}
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="content-box h" @click="SelectColor">
        <div :class="['content-box-icon','theme_'+form.themeColor]" bg></div>
        <div class="content-box-content">
          <div class="option">
            <div class="title">选择主题色</div>
            <div class="describe">
              {{form.themeName}}
              <right theme="outline" size="24" fill="#555" />
            </div>
          </div>
          <!-- <div class="option">
            <div class="title">选择图标</div>
            <div class="describe">
              <span class="text">无图标</span>
              <right theme="outline" size="24" fill="#555" />
            </div>
          </div> -->
        </div>
      </div>
      <div class="content-box">
        <!-- 标题 -->
        <div class="content-box-title">标题</div>
        <div class="content-box-input"><input type="text" v-model="form.title" /></div>
        <!-- 备注 -->
        <div class="content-box-title">备注</div>
        <div class="content-box-input">
          <input type="text" v-model="form.describe" />
        </div>
        <!-- 类型 -->
        <div class="content-box-title" v-show="tabletype == 'progress' || tabletype == 'aim' || tabletype == 'count'">类型</div>
        <div
          class="content-box-options"
          v-show="
            tabletype == 'progress' ||
            tabletype == 'count' ||
            tabletype == 'aim'
          "
        >
          <button
            v-show="tabletype == 'progress'"
            @click="SetDATA(DATA.progress,'type','increase')"
            :class="{ active: DATA.progress.type == 'increase' }"
          >
            递增进度
          </button>
          <button
            v-show="tabletype == 'progress'"
            @click="SetDATA(DATA.progress,'type','reduce')"
            :class="{ active: DATA.progress.type == 'reduce'}"
          >
            递减进度
          </button>
          <button
            v-show="tabletype == 'count'"
            @click="SetDATA(DATA.count,'type','day')"
            :class="{ active: DATA.count.type == 'day' }"
          >
            每日
          </button>
          <button
            v-show="tabletype == 'count'"
            @click="SetDATA(DATA.count,'type','week')"
            :class="{ active: DATA.count.type == 'week' }"
          >
            每周
          </button>
          <button
            v-show="tabletype == 'count'"
            @click="SetDATA(DATA.count,'type','month')"
            :class="{ active: DATA.count.type == 'month' }"
          >
            每月
          </button>
          <button
            v-show="tabletype == 'aim'"
            @click="SetDATA(DATA.aim,'type','one')"
            :class="{ active: DATA.aim.type == 'one' }"
          >
            单次
          </button>
          <button
            v-show="tabletype == 'aim'"
            @click="SetDATA(DATA.aim,'type','loop')"
            :class="{ active: DATA.aim.type == 'loop' }"
          >
            循环
          </button>
        </div>

        <!-- 进度 计数 目标 专注 正倒数日  核心部分-->
        <div class="content-box-title" v-show="tabletype == 'progress' || tabletype == 'aim' || tabletype == 'count'">
          {{
            tabletype == "progress"
              ? "进度"
              : "" + tabletype == "count"
              ? "计数"
              : "" + tabletype == "aim"
              ? "目标"
              : ""
          }}
        </div>
        <div class="content-box-inputs" v-show="tabletype == 'absorbed'">
          目标<input type="number" v-model="DATA[tabletype].target" min="1" />分钟
        </div>
        <div class="content-box-inputs" v-show="tabletype == 'progress' || tabletype == 'aim' || tabletype == 'count'">
          <p v-show="tabletype == 'progress'">
            总量<input type="number" v-model="DATA.progress.total" min="1"/>
          </p>
          <p v-show="tabletype == 'aim' && DATA.aim.type == 'one'">
            目标<input type="number" v-model="DATA.aim.target" min="1"/>天
          </p>
          <p>
            <span v-show="tabletype == 'progress' && DATA.progress.type == 'increase'">每次增加</span>
            <span v-show="tabletype == 'progress' && DATA.progress.type == 'reduce'">每次减少</span>
            <span v-show="tabletype == 'aim'">每日目标</span>
            <input type="number" v-model="DATA[tabletype].every" min="1" />
            单位
            <input type="text" v-model="DATA[tabletype].unit" />
          </p>
          <p v-show="tabletype == 'aim'">
            {{ tabletype == "aim" ? "每次增加" : "" }}
            <input type="number" v-model="DATA.aim.everytime" />
          </p>
        </div>

        <!-- 频率 -->
        <template v-show="tabletype == 'aim'">
          <div class="content-box-title">
            频率
          </div>
          <div class="content-box-options">
            <button
              @click="SetDATA(DATA.aim,'frequency','fixed')"
              :class="{ active: DATA.aim.frequency == 'fixed'}"
            >
              固定
            </button>
            <!-- <button
              @click="SetDATA(DATA.aim,'frequency','week')"
              :class="{ active: DATA.aim.frequency == 'week'}"
            >
              每周
            </button>
            <button
              @click="SetDATA(DATA.aim,'frequency','month')"
              :class="{ active: DATA.aim.frequency == 'month'}"
            >
              每月
            </button> -->
          </div>
          <div class="content-box-options">
            <button
              v-for="(item,i) in ['一','二','三','四','五','六','日']"
              @click="DATA.aim.selectWeekday.includes(i+1)?DATA.aim.selectWeekday.splice(DATA.aim.selectWeekday.indexOf(i+1),1):DATA.aim.selectWeekday.push(i+1)"
              :class="{ active: DATA.aim.selectWeekday.includes(i+1)}"
            >
              周{{item}}
            </button>
          </div>
        </template>
        <!-- <div class="content-box-inputs" v-if="tabletype == 'aim'&&activeBtn_frequency == 0">
          <div class="demo-button-style">
            <el-checkbox-group v-model="selectWeekdays" size="small">
              <el-checkbox-button
                v-for="weekday in weekdays"
                :key="weekday"
                :label="weekday"
              >
                {{ weekday }}
              </el-checkbox-button>
            </el-checkbox-group>
          </div>
        </div>
        <div class="content-box-inputs" v-if="tabletype == 'aim'&&activeBtn_frequency == 1">
          <div class="demo-button-style">
            <el-radio-group v-model="selectManyWeekdays" size="small">
              <el-radio-button
                v-for="many in manyWeekdays"
                :key="many"
                :label="many"
              >
              </el-radio-button>
            </el-radio-group>
          </div>
        </div>
        <div class="content-box-inputs" v-if="tabletype == 'aim'&&activeBtn_frequency == 2">
          <p>
            每月
            <input type="number" v-model="everyMonth" />
            天
          </p>
        </div> -->
      </div>

      <!-- 收集箱 -->
      <!-- <div class="content-box">
        <div class="content-box-option">
          <div class="title">收集箱</div>
          <div class="describe">
            <span class="text">无</span>
            <right theme="outline" size="24" fill="#555" />
          </div>
        </div>
      </div> -->
      <div class="content-box" v-show="tabletype == 'progress' || (tabletype == 'aim' && DATA.aim.type=='one')">
        <div class="content-box-check">
          <div class="c-content">
            <div class="title">完成自动归档</div>
            <div class="describe"></div>
          </div>
          <div class="check"><el-switch v-model="form.needInFile" /></div>
        </div>
      </div>
      <div class="content-box" v-show="false">
        <div class="content-box-check">
          <div class="c-content">
            <div class="title">操作后显示记录想法</div>
            <div class="describe"></div>
          </div>
          <div class="check"><el-switch v-model="form.needRecord" /></div>
        </div>
      </div>
      <div class="content-box" v-show="form.needRecord">
        <div class="content-box-check">
          <div class="c-content">
            <div class="title">自动弹出输入框</div>
            <div class="describe"></div>
          </div>
          <div class="check"><el-switch v-model="form.needFrame" /></div>
        </div>
      </div>
      <div class="submit">
        <div class="btn-submit" v-if="type=='add'" @click="submit">保存</div>
        <div class="btn-submit" v-if="type=='edit'" @click="save">更改</div>
      </div>
    </div>
  </div>
  <div :class="{cover:1,hide:!(SelectColorShow)}" @click="SelectColorShow=false"></div>
  <SelectColorSection :SelectColor="form.themeColor" :SelectColorShow="SelectColorShow" @SetColor="SetColor"></SelectColorSection>
</template>

<script setup async>
import {ArrowLeft,Right} from "@icon-park/vue-next"
import { ref, watch, onMounted,toRaw,readonly,onActivated,inject, onDeactivated } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import emitter from '../utils/bus.js';
import { colorList } from '../utils/color.js'
import Idb from 'idb-js';
import db_list_config from '../utils/db_list_config.js';
import { getRandomString, dateToStr, getDayTime,getRandomNumber } from '../utils/helpers.js'; 
import SelectColorSection from '../components/SelectColor.vue';
const route = useRoute();
const router = useRouter();
const SelectColorShow = ref(false);
const changeState = ref(false);
const msg = inject('message').msg;
let type = route.query.type || '';
let tabletype = (route.query.tabletype || '');
let id = (route.query.id || '');
watch(() => route.query,(newQuery) => {
  type = newQuery.type || '';
  tabletype = (newQuery.tabletype || '');
  id = (newQuery.id || '');
});   
Idb(db_list_config)
let db = await Idb(db_list_config);
const loading = inject('loading')
const default_form = readonly({
  id:'',
  iconId: '',
  themeColor: 'SapphireBlue',
  title: '',
  describe: '',
  box: '',
  needInFile:true,
  needRecord:false,
  needFrame:false,
  madeTime:'', 
  stbTime:'',
})
const _DATA = readonly({
  progress : {
    type:'increase',
    total:undefined,
    unit:'次',
    now:0,
    sum:0,
    every:1,
  },
  count : {
    type:'day',
    unit:'次',
    now:0,
    sum:0,
    every:1,
  },
  aim : {
    type:'one',
    target: undefined,//?
    unit: '次',
    every: 1,
    everytime:1,
    frequency: 'fixed',
    selectWeekday:[1,2,3,4,5,6,7],//?
    sum:0,
  },
  absorbed:{
    target: undefined,//?
  }
})
const _form = readonly({
  ...raw(default_form),
})
const form = ref({tableType:tabletype,...raw(_form)})
const DATA = ref({...raw(_DATA)})
function raw(e){
  return JSON.parse(JSON.stringify(e))
}
async function ResetDATA(){
  try{
    // emitter.emit('hideTabBar');
    loading.showLoading();
    // debugger
    if(type == 'edit'){
      const res = (await db.query({
        tableName: "mainData",
        condition: (item, index) => item.id === id,
      })).data
      if(res.length){
        form.value = res[0]
        DATA.value[tabletype] = res[0].data
        loading.hideLoading();
      } else {
        emitter.emit('msg',['alert',{
          title:"错误",
          body:"没有找到该条目",
          boolien:false,
        }]);
      }
    } else {
      const rd = getRandomNumber(0,colorList.length-1)
      console.log('datareset')
      DATA.value = {...raw(_DATA)};
      form.value = {tableType:tabletype,...raw(_form),
        themeColor:colorList[rd].name,
        themeName:colorList[rd].zh_CN,};
      
      // debuggerx
      loading.hideLoading();

    }
  } catch(err) {
    ElMessage(err)
  }
}
function SetDATA(ref,key,value){
  let ref_;
  if(typeof ref == 'string'){}
  else ref_ = ref;
  // debugger
  ref_[key] = value;
}
watch(()=>form.value,(newValue)=>{
  changeState.value=true
})
watch(()=>DATA.value,(newValue)=>{
  changeState.value=true
})

onActivated(async ()=>{
  ResetDATA();
  db = await Idb(db_list_config);
})
onDeactivated(async ()=>{
  // ResetDATA()
})
onMounted(async () => {
  ResetDATA()
})
function goBack() {
  // emitter.emit("showTabBar")
  if(changeState.value){
    msg.alert({
      body:'是否保存？',
      boolien:true,
      confirm:async (boolien)=>{
        if(type == 'add')
          await submit();
        else 
          await save();
      },
      cancel:(boolien)=>{
        router.back();
      }
    })
  } else {
    router.back();
  }
}
function SelectColor(){
  SelectColorShow.value = true;
}
function SetColor(e){
  form.value.themeColor = e.name;
  form.value.themeName = e.zh_CN;
  SelectColorShow.value = false
}
async function submit() {
  if (!validateInput()) return;
  let data = prepareData();
  console.log("[submit]", data);
  try {
    const res = (await db.add({
      tableName: "mainData",
      data: data,
    })).data
    ElMessage.success("添加成功");
    emitter.emit("update");
    router.push({ path: "/" });
  } catch (error) {
    console.error("数据库操作失败", error);
  }
}

async function save(){
  if (!validateInput()) return;
  let data_ = updateData();
  console.log("[save]", data_);
  try {
    const res = (await db.update({
      tableName: "mainData",
      condition: (item, index) => item.id === id,
      handler:(r)=>{
        // debugger
        let { data,updateTime,id,iconId,themeColor,title,describe,box,
        needInFile,needRecord,needFrame,madeTime,stbTime,
        tableType } = data_;
        r.data = JSON.parse(JSON.stringify(data));
        r.updateTime = updateTime;
        r.iconId = iconId;
        r.themeColor = themeColor;
        r.title = title;
        r.describe = describe;
        r.box = box;
        r.needInFile = needInFile;
        r.needRecord = needRecord;
        r.needFrame = needFrame;
        r.madeTime = madeTime;
        r.stbTime = stbTime;
        r.tableType = tableType;
        console.log(r)
      }
    })).data
    ElMessage.success("更改成功");
    router.push({ path: "/" });
    emitter.emit("update");
  } catch (error) {
    console.error("数据库操作失败", error);
  }
}

function validateInput() {
  if (!form.value.title) {
    ElMessage.error("请输入标题");
    return false;
  }
  // 根据不同的表单类型进行额外的验证
  const d = (DATA.value)[tabletype];
  switch (tabletype) {
    case "progress":
      // 对于“progress”类型的表单，unit,every,total
      if (!(d.total)) {
        ElMessage.error("请输入有效的总数");
        return false;
      }
      if((d.sum > d.total)){
        ElMessage.error("总数不能小于已完成进度("+d.sum+")");
        return false;
      }
      if (!(d.unit)) {
        ElMessage.error("请输入单位");
        return false;
      }
      if (!(d.every)) {
        ElMessage.error("请输入“每次增加/减少”");
        return false;
      }
      break;
    case "count":
      // 对于“count”类型的表单，可能需要检查“unit”是否已选择,every
      if (!(d.unit)) {
        ElMessage.error("请选择单位");
        return false;
      }
      if (!(d.every)) {
        ElMessage.error("请输入“每次增加”");
        return false;
      }

      break;
    case "aim":
      // 对于“aim”类型的表单，要检查target,unit,every,everytime是否输入以及selectWeekday是否为空，分别提醒
      if (!(d.target) && d.type == 'one') {
        ElMessage.error("请输入目标");
        return false;
      }
      if (!(d.unit)) {
        ElMessage.error("请输入单位");
        return false;
      }
      if (!(d.every) ) {
        ElMessage.error("请输入“每日目标”");
        return false;
      }
      if (!(d.everytime)) {
        ElMessage.error("请输入“每次增加”");
        return false;
      }
      if (d.selectWeekday.length === 0) {
        ElMessage.error("至少选择一天");
        return false;
      }
      break;
    case "absorbed":
      if (!(d.target)) {
        ElMessage.error("请输入目标（分钟）");
        return false;
      }
      break;
    default:
      // 如果没有匹配到任何已知的表单类型，可以选择默认通过或者显示一个错误信息
      ElMessage.error("未知的表单类型");
      return false;
  }

  // 如果所有验证都通过了，则返回true
  return true;
}

function prepareData() {
  const now = new Date();
  // debugger;
  const result = {
    ...(form.value),
    data:{
      ...(raw(DATA.value[tabletype])),
      recordList: {},
      finishList: [],
    },
    madeTime: dateToStr(now), // 使用辅助函数转换日期
    stbTime: getDayTime(now),
    id: getRandomString(12), // 生成随机ID
  }

  return toRaw(result);
}

function updateData(){
  const now = new Date();
  const result = {
    ...(form.value),
    data:{
      ...(raw(DATA.value[tabletype])),
    },
    updateTime: dateToStr(now), // 使用辅助函数转换日期
  }
  // debugger

  return toRaw(result);
}

function transformManyWeekdays(value) {
  // 将选择的多个星期几转换为对应的时间范围
  const mapping = {
    "一天": "一周",
    "二天": "两周",
    "三天": "三周",
    "四天": "四周",
    "五天": "五周",
    "六天": "六周",
    "七天": "七周",
  };
  return mapping[value] || value;
}
</script>

<style>
.el-color-picker .el-color-picker__trigger {
  padding: 0;
}
</style>

<style scoped lang="scss">
.content {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 0 16px;
  padding-top: 22px;
  font-family: "MiSans-Bold";
  flex:1;
  overflow: auto;
}
.content-box {
  width: 100%;
  padding: 16px 14px;
  border-radius: 14px;
  margin-bottom: 22px;
  display: flex;
  color:#555;
  font-weight: 700;
  align-items: center;
  flex-direction: column;
  background: rgba(227, 237, 247, 1);
  box-shadow: 7px 5px 14px  rgba(211, 224, 236, 1), -7px -5px 15px  rgba(255, 255, 255, 1);
}
.content-box.h {
  flex-direction: row;
  cursor: pointer;
}
.content-box .content-box-icon {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background: #f6f6f6;
  margin-right: 16px;
}
.content-box .content-box-content {
  width: calc(100% - 50px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}
.content-box .content-box-content .option {
  width: 100%;
  display: flex;
  font-size: 17px;
  font-family: "MiSans-Bold";
  justify-content: space-between;
  height: 36px;
  line-height: 36px;
}
.content-box .content-box-content .option .i-icon {
  height: 24px;
  line-height: 24px;
  vertical-align: middle;
}
.content-box-title {
  width: 100%;
  text-align: left;
  font-size: 20px;
  line-height: 1.3em;
  margin-bottom: 14px;
  font-family: "MiSans-Bold";
  color: #555;
  font-weight: bold;
}
.content-box-input {
  width: 100%;
  text-align: left;
  background: #eff2f8;
  margin-bottom: 24px;
  overflow: hidden;
  border-radius: 12px;
  border-radius: 15px;
  background: rgba(227, 237, 247, 1);
  box-shadow:inset -4px -4px 7px  rgba(255, 255, 255, 1),inset 6px 4px 7px  rgba(191, 213, 235, 1);
}
.content-box-input input {
  background: transparent;
  border: 0;
  outline: 0;
  width: 100%;
  height: 46px;
  font-size: 16px;
  line-height: 26px;
  padding: 10px 14px;
  border-radius: 12px;
}
.content-box-options {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
  
}
.content-box-options button {
  padding: 10px 10px;
  font-size: 14px;
  margin: 0px 6px;
  border-radius: 8px;
  background: #eff2f8;
  border: 0;
  outline: 0;
  color: #3e7aff;
  background: rgba(227, 237, 247, 1);
  box-shadow: 7px 5px 14px  rgba(211, 224, 236, 1), -7px -5px 15px  rgba(255, 255, 255, 1);
}
.content-box-options button.active {
  background: #3e7aff;
  color: #fff;
}
.content-box-inputs {
  text-align: center;
  font-size: 15px;
}
.content-box-inputs p {
  margin-bottom: 12px;
}
.content-box-inputs input {
  width: 80px;
  margin: 0 6px;
  border-radius: 8px;
  background: #eff2f8;
  border: 0;
  outline: 0;
  padding: 10px 10px;
  text-align: center;
  color: #777;
  background: rgba(227, 237, 247, 1);
  box-shadow:inset -4px -4px 7px  rgba(255, 255, 255, 1),inset 6px 4px 7px  rgba(191, 213, 235, 1);
}
.content-box-option,
.content-box-check {
  width: 100%;
  display: flex;
  font-size: 17px;
  font-family: "MiSans-Bold";
  justify-content: space-between;
  height: 36px;
  line-height: 36px;
}
.submit {
  margin-bottom: 30px;
  width: 100%;
}
.btn-submit {
  height: 48px;
  width: 60%;
  border-radius: 24px;
  margin: 0 auto;
  background: #3e7aff;
  text-align: center;
  line-height: 48px;
  color: #fff;
  border-radius: 20px;
  font-size: 16px;
  cursor: default;
  box-shadow: 7px 5px 14px  rgba(211, 224, 236, 1), -7px -5px 15px  rgba(255, 255, 255, 1);
}

.cover{
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.3);
  z-index: 999;
  visibility: visible;
  opacity: 1;
  transition: all 0.2s ease;
  &.hide{
    opacity: 0;
    visibility: hidden;
  }
}
</style>


