<script setup>
import {Close} from "@icon-park/vue-next"
import { toRefs, defineProps, watch, ref, getCurrentInstance  } from "vue";
const props = defineProps({
  message: Object,
});
const { proxy } = getCurrentInstance()
const { message } = toRefs(props);
const msgElement = ref()
const WindowWidth = ref(window.innerWidth)
const List_Alert = ref([])
const List_SmallMessage = ref([])
const Show_SmallMessageDetail = ref([])

class Scheduler {
  constructor(max){
    this.max = max;this.count = 0 ;this.queue = new Array();
  }
  async add(promiseCreator){
    if(this.count>=this.max) await new Promise((resolve,reject)=>this.queue.push(resolve));   
    this.count ++;let res = await promiseCreator();this.count--;
    if(this.queue.length){this.queue.shift()();}
    return res;
  }
}
const doTask = fn => new Promise(resolve => {
  fn(resolve)
})
const scheduler = new Scheduler(1);
const addTask = (prFn,order) => {
  scheduler.add(() => doTask(prFn)).then()
}


/*
// addTask(async ()=>{
//   await new Promise(resolve => setTimeout(resolve,5000))
//   console.log('开始执行函数1')
// },11)

// addTask((resolve)=>{
//     setTimeout(() => {
//     console.log('timeout');
//       resolve()
//     }, 10000)
// }),1)

// addTask(new Promise((resolve)=>{
//     setTimeout(() => {
//     console.log('timeou2t');
//     resolve()
//     }, 10000)
// }),2)

// addTask(async ()=>{
//   await new Promise(resolve => setTimeout(resolve,1000))
//   console.log('开始执行函数3')
// },33)




// output: 2 3 1 4
*/

function findbyid(list,id){
  const index = list.findIndex(item=>item.id==id)
  if(index==-1) return null
  return {index,id}
}
const Fn_Alert = {
  default(e,i){
    addTask(function (resolve) {
      if(!i) i = findbyid(List_Alert.value,e)?.index
      if(i==null) return;
      List_Alert.value[i].hide=true;
      setTimeout(()=>{
        addTask(function (resolve) {
          List_Alert.value.splice(i,1)
          resolve()
        },0)
      },400)
      resolve()
    },e)
  },
  confirm(e){
    let i = findbyid(List_Alert.value,e)?.index;
    if(typeof List_Alert.value[i].confirm == 'function') List_Alert.value[i].confirm()
    this.default(e,i)
  },
  cancel(e){
    let i = findbyid(List_Alert.value,e)?.index;
    if(typeof List_Alert.value[i].cancel == 'function') List_Alert.value[i].cancel()
    this.default(e,i)
  },
  close(e){
    this.default(e)
  },
}

const Fn_SmallMessage = {
  //延迟
  delay(e,t){
    let _this=this
    if(!t) t=6000
    setTimeout(()=>{
      _this.default(e)
    },t)
  },
  default(e){
    addTask(function (resolve){
      let i = findbyid(List_SmallMessage.value,e)?.index
      if(i==null) return;
      List_SmallMessage.value[i].hide=true;
      setTimeout(()=>{
        addTask(function (resolve){
          let i = findbyid(List_SmallMessage.value,e)?.index
          List_SmallMessage.value.splice(i,1)
          resolve()
        })
      },500)
      resolve()
    },e)
  },
  close(e){
    this.default(e)
  },
  closeDetail(e){
    Show_SmallMessageDetail.value = []
  },
  more(e){
    Show_SmallMessageDetail.value[0]=e
  }
}

watch(
  ()=>props.message, 
  (newVal, oldVal) => {
  if(typeof newVal !== "object") throw 'error'
  if(newVal?.msgType === "alert"){
    List_Alert.value.push(newVal.value)
  } else if(newVal?.msgType === "small"){
    let msg = newVal.value
    msg.time = new Date().getTime()
    if(msg.text.length>=25){
      msg.realText = msg.text;
      msg.text = msg.text.substring(0,20)+"...";
      msg.more=true;
    }
    List_SmallMessage.value.push(msg)
    Fn_SmallMessage.delay(msg?.id,newVal?.value?.delay)
    proxy.$addMessage("msg",msg).then(e=>{

    })
  } else {

  }
});


</script>

<template>
  <!-- MessageService引入成功 -->
  <div class="MessageService" ref="msgElement">
    <!-- {{ message }} -->
    <!-- Alert功能 -->
    <div :class="{'mx-modal__wrapper':true,hide:conf.hide}" v-for="conf in List_Alert" :key="conf.id" :id="conf.id">
      <div :class="`mx-modal__container ${conf.boolien?'onlytrue':''}`" style='margin-top: 15vh;'>
        <div class='mx-modal__header'>
          <span class='mx-modal__title'>{{conf.title}}</span>
          <button class='mx-modal__headerbtn' aria-label="close" @click="Fn_Alert.close(conf.id)">
            <close theme="outline" size="16" fill="#555"/>
          </button>
        </div>
        <div class='mx-modal__body'>
          <div>{{conf.body}}<textarea class='mx-alert-content' style='opacity:0;width:1px;height:1px;' v-model="conf.body"></textarea></div>
        </div>
        <div class='mx-modal__footer'>
          <button v-if="conf.boolien != false" aria-label="cancel" @click="Fn_Alert.cancel(conf.id)"
          class='mx-modal-button mx-modal--default'><span>{{conf.t2}}</span></button>
          <button class='mx-modal-button mx-modal--primary' aria-label="confirm" @click="Fn_Alert.confirm(conf.id)"><span>{{conf.t1}}</span></button>
        </div>
      </div>
    </div>

    <!-- SmallMessage功能 -->
    <template v-for="(conf,i) in List_SmallMessage" :key="conf.id">
      <div :class="['mx-smallAlert',conf.hide?'hide':'',conf.type,
                    ,(List_SmallMessage.length-i==1)?'show':'behined']" 
         :id="conf.id"
         :style="{marginTop:((List_SmallMessage.length-i)*8)+'px',}"
         :data-transform="(List_SmallMessage.length-i==1)?'':'scale('+(0.9+0.1*(i/(List_SmallMessage.length-1))||1).toFixed(2)+') !important'"
         v-if="(List_SmallMessage.length-i)<=3">
         <div class="mx-msg__content" v-if="(List_SmallMessage.length-i)<=3">
          <div class="mx-msg__App">
            <div class="mx-msg__App--name">
              {{conf.app.name}}
            </div>
            <div class="mx-msg__time">
              刚刚{{ List_SmallMessage.length-i }}
            </div>
          </div>
          <div class="mx-msg__text">
            <span class="mx-msg--title">
              {{conf.title}}
            </span>
            <span class="mx-msg--text">
              {{conf.text}}
              <a @click="Fn_SmallMessage.more(conf)" v-if="conf.more">More</a>
            </span>
          </div>
        </div>
      </div>
    </template>

    <!-- SmallMessageMore功能 -->
    <template v-for="conf in Show_SmallMessageDetail" :key="conf.id">
      <div class="mx-modal__wrapper"></div>
      <div class="smallAlert_More">
        <div class="mx-msg__content">
          <div class="mx-msg__App">
          <div class="mx-msg__App--name">
            {{conf.app.name}}
          </div>
          <button class='mx-modal__headerbtn' aria-label="close" @click="Fn_SmallMessage.closeDetail(conf.id)">
            <close theme="outline" size="16" fill="#555"/>
          </button>
          
        </div>
        <div class="mx-msg__text">
          <span class="mx-msg--title">
            {{conf.title}}
          </span>
          <span class="mx-msg--text" v-html="conf.realText">
          </span>
        </div>
        </div>
      </div>
    </template>

  </div>
</template>




<style lang="scss">
:root {
  --mx-anim : cubic-bezier(0, 0.87, 0.66, 1.15);
  --blackcolor: #000;
  --PageBackground: #f1f4fa;
  --Background: #fff;
  --Shadow: rgba(0, 0, 0, 0.05);
  --SmShadow: rgba(0, 0, 0, .1);
  --Hover: #ededed60;
  --Red: #ff3308;
  --Grey: #ededed;
  --Grey-text: #999; 
  --White: #fff;
  --bdWhite: #fff;
  --Black: #1b1b1b;
  --NavbarBorder: #e8e8e8;
  --NavbarText: #222226;
  --BgNavbarText: #222226;
  --NavbarHover: #f0f0f5;
  --NavbarTextAfter: #007bff;
  --BreadcrumbBackground: #e5eaee;
  --BreadcrumbText: #6c757d;
  --ActiveColor: #007bff;
  --BgActiveColor: #007bff;
  --BdActiveColor: #007bff;
  --ListTextIcon: #222;
  --ListTextDate: #000;
  --ListText: #555;
  --ListColor: #212529;
  --SmListText: #2a2b31;
  --BdSmListText: #2a2b31;
  --LoginBackground: #f7f7f7;
  --Loginbutton: #006de2;
  --FooterTextLink: #efefef;
  --FooterText: #efefefa4;
  --AlertTitle: #303133;
  --AlertColor: #333;
  --sx: #252525b4;
  --sxa: #0092ff;
  --buttonBackground: #f6f6f6;
  --buttoncolor: #0071eb;
  --bgbuttoncolor: #e8e8e8;
  --bgbuttonActive: #0071eb;
  --dcolor: #dadada;
  --dp: #555;
  --dimg: #666;
  --searchbutton: #f8f8f8;
  --searchspan: #441a88;
  --searchshadow: #eaeaea;
  --searchactive: #006de2;
  --bgsearch: #f1f4fa;
  --bdsearch: #0071eb;
  --bguser: #00000080;
  --userli: #eee5;
}
</style>