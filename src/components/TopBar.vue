<template>
  <div class="TopBar" ref="TopBar_">
    <div class="TipBar">
      <div class="TipBar_left" >
        <div class="menuButton"  v-if="props.btn == 'back'" style="font-size:0;width:24px;height:24px" @click="clickBtn">
          <left-small theme="outline" size="24" fill="#999"/>
        </div>
        <div class="date">
          <template v-if="mode=='home'">
            {{ shouldShowMonth ? selectMonth : '' }}{{ shouldShowMonth ? '月，' : '' }}{{ whatDay }}
          </template>
          <template v-else-if="mode=='inFile'">
            存档内容
          </template>
          <template v-else-if="mode=='recycle'">
            回收站
          </template>
          <template v-else>
            未知内容
          </template>
        </div>
      </div>
      <div class="TipBar_right">
        <div class="badge" @click="onClickEdit" :style="editState[props.mode]?'background:rgba(0, 128, 255, 0.133);color:#0080ff':''">
          <write v-if="!editState[props.mode]" style="margin-right: 6px" theme="filled" size="14" fill="#999" :strokeWidth="2"/>
          <close v-if="editState[props.mode]" style="margin-right: 6px" theme="filled" size="14" fill="#0080ff" :strokeWidth="6"/>
          <span>{{editState[props.mode]?'取消':'编辑'}}</span>
        </div>
        <div v-if="mode == 'home'" class="badge" @click="onClickAdd">
          <add style="margin-right: 6px" theme="filled" size="14" fill="#999" />
          <span>新增</span>
        </div>
      </div>
    </div>
    <div class="searchBar" :style="mode=='home'?'':'margin-bottom:18px'">
      <input type="text" @keyup="searchText($event)" placeholder="支持模糊搜索"/>
    </div>
    <template v-if="mode=='home'">
      <div class="dateBar">
        <div class="calendar">
          <vueHashCalendar ref="Calendar" 
            :showWeekView="isShowWeekView" 
            :showAction="false" 
            :visible="isShowCalendar"
            :showTodayButton="true"
            :pickerType="'date'" 
            @change="onCalendarChange" 
            @slidechange="onSlideChange"
          />
          <div class="Arrow" @click="onChangeWeekView">
            <img :style="isShowWeekView ? 'transform:rotate(180deg)' : ''"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAANp0lEQVR4Xu2dbYwdZRXHz7m7l94LSsluKr6kwRqINQtsd2Y0kagxEqsfNFFJipSKTTUajRWKEcSWlhIltFhE40uCWAotGDDRDxg1kcQPSk3MzNysa1HTagMYI5WtvNTQ7C5zzFOngLAv954789y59/zna+c8z5zfmV/PnX3uM5cJBwiAwIIEGGxAAAQWJgBBcHeAwCIEIAhuDxCAILgHQEBHAB1Exw1RRghAECOFRpo6AhBExw1RRghAECOFRpo6AhBExw1RRghAECOFRpo6AhBExw1RRghAECOFRpo6AhBExw1RRghAECOFRpo6AhBExw1RRghAECOFRpo6AhBExw1RRghAECOFRpo6AhBExw1RRghAECOFRpo6AhBExw1RRghAECOFRpo6AhBExw1RRghAECOFRpo6AhBExw1RRghAECOFRpo6AhBExw1RRghAECOFRpo6AhBExw1RRghAECOFRpo6AhBExw1RRghAECOFRpo6AhBExw1RRghAECOFRpo6AhBExw1RRghAECOFRpo6AhBExw1RRghAECOFRpo6AhBExw1RRghAECOFRpo6AhBExw1RRghAECOFRpo6AhBExw1RRghAECOFRpo6AhBExw1RRghAECOFRpo6AhBExw1RRghAECOFRpo6AhBExw1RRghAECOFRpo6AhBExw1RRghAECOFRpo6AhBExw1RRghAEI+FfuKJJ5pPPfXU2izLJk5PKyLP1Wq1XwRB8KjHS8FUbRKAIG2C6ua0NE3fmWXZ9US0lpmbC4x1hIgOjIyM7Fq1atXJbuZDbHEEIEhxLOcdKUmS3UT05XanEZG/Dg0NXTUxMXGw3RicVx4BCFIS28nJyQvn5uYeJKK3KabIROSO0dHRregmCnoFhkCQAmG6oUSkliTJdcy8k4jO6HL4I0NDQ1euWbPm912Og3AlAQiiBDdf2OTk5Kq5ubkDRHRJgcOimxQIs9OhIEinxBY4P0mSzxDRHiJ6TUFDvnIYdJOSwC42LATpEnqapitE5F4i+mCXQ7UT7rrJN0dHR7fh2aQdXN2fA0G6YJgkyUdF5AfMPNrFMJpQdBMNNUUMBFFAO3z48NnPPvvsd4logyK8qBB0k6JILjIOBOkQcpIk7yMi95HqTR2GlnU6uklZ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">
          </div>
        </div>
      </div>
    </template>
  </div>
</template>


<script setup>
import { LeftSmall, Home, Write, Close, Add} from "@icon-park/vue-next"
import { onMounted, inject, ref, nextTick, defineEmits, defineExpose, defineProps} from 'vue'
import { getDateDiff } from '../utils/helpers.js'
import emitter from '../utils/bus'
import { useRouter } from 'vue-router'
const props = defineProps(['mode','btn'])
const emit = defineEmits(["onOpenMenu",'changeDate','changeWeekView','onClickEdit','showAddMenu','searchText'])
const selectMonth = ref('');
const whatDay = ref('');
const shouldShowMonth = ref(true);
const isShowWeekView = ref(false);
const isShowCalendar = ref(true);
const TopBar_ = ref()
const Calendar = ref()
const editState = ref({})
const router = useRouter()
function escapeRegExp(input) {
    return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
function searchText(e){
  const text = (e.srcElement.value).replace(/\s/g, '')
  const transformedArr = Array.from(text).map((char, index, arr) => {
    return escapeRegExp(char)
  });
  const regexString = `.*${transformedArr.join('.*')}.*$`;
  const regex = new RegExp(regexString);
  emitter.emit('filler',{reg:regex,page:props.mode})
}
function clickBtn() {
  if(props.btn == 'back')
    router.go(-1);
  else 
    emitter.emit('clickTopBarMenu',{page:props.mode});
}
function onCalendarChange(date) {
  selectMonth.value = new Date(date).getMonth() + 1 + ''
  let dateDiff = getDateDiff(date)
  whatDay.value = dateDiff.str;
  shouldShowMonth.value = dateDiff.show;
  let dateYear = date.getFullYear();
  let dateMonth = date.getMonth() + 1; 
  let dateDay = date.getDate();
  let dateStr = dateYear + '-' + dateMonth + '-' + dateDay;
  console.log('[OnCalendarChange]', dateStr);
  emit('changeDate', dateStr)
}
function onSlideChange(direction) {
  if (direction === 'up') {
    isShowWeekView.value = true
  } else if (direction === 'down') {
    isShowWeekView.value = false
  }
  emit('changeWeekView', isShowWeekView.value)
}
function onChangeWeekView() {
  if (isShowWeekView.value === false) {
    isShowWeekView.value = true
  } else {
    isShowWeekView.value = false
  }
  emit('changeWeekView', isShowWeekView.value)
}
function onClickEdit() {
  emitter.emit(editState.value[props.mode]?'hideEdit':'showEdit',{page:props.mode})
}
function onClickAdd() {
  emit('showAddMenu')
}
emitter.on('showEdit',({page})=>{
  editState.value[page] = true;
})
emitter.on('hideEdit',({page})=>{
  editState.value[page] = false;
})
onMounted(() => {
  nextTick(() => {
    isShowWeekView.value = true
    selectMonth.value = (new Date().getMonth() + 1) + ''
    let dateDiff = getDateDiff(new Date())
    whatDay.value = dateDiff.str;
    shouldShowMonth.value = dateDiff.show
  })
})
defineExpose({
  isShowWeekView
});

</script>


<style>
span.i-icon {
  vertical-align: middle;
  line-height: 0;
}
</style>