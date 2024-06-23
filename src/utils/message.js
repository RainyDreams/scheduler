/* some tools of mxlib, author Zhangxinyue */
// 这是我写的其他项目中的功能，直接迁移过来了（本项目其实只用了一点它的作用）
// 这个实际上是一个多样式（功能）消息队列的实现
import { ref,watch,} from "vue"
import { getRandomString } from "./helpers";
export var MessageForApp = function(){

}

export function addMessage (key, newVal) {
  if (key == 'msg') {
    // 创建一个StorageEvent事件
    var newStorageEvent = document.createEvent('StorageEvent');
    function addMessage (k, val) {
      if(typeof val != 'object') throw new Error('Not AN OBJECT')
      let old = JSON.parse(sessionStorage.getItem(k) || '[]');
      old.push(val);
      let arr = []
      old.forEach(item=>{
        if(item.read != true) arr.push(item)
      })
      sessionStorage.setItem(k, JSON.stringify(old));
      sessionStorage.setItem('msg_unread',arr.length);
      newStorageEvent.initStorageEvent('changeMessage', false, false, k, null, val, null, null); 
      window.dispatchEvent(newStorageEvent)
    }
    return new Promise((resolve, reject) => {
      if (newVal) {
        addMessage(key, newVal)
        resolve(newVal)
      } else {
        reject(new Error('Not AN OBJECT'))
      }
    });
  }
}

/**
 * @description 消息处理函数
 * @class MessageService
 */
export class MessageService {
  constructor(refr) {
    this.alertList = []
    this.msgList = []
    this.ref=refr
    this.AppInfo = {
      'MAI-fieUv67UBYHow':{
        name:'系统提示',
      }
    }
    this.ref.value = {
      msgType:'console',
      value:'helloworld'
    }
    let _this = this

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
      _this.ref.value=fn;
      resolve()
    })
    this.scheduler = new Scheduler(1);
    this.addTask = (prFn,order) => {
      _this.scheduler.add(() => doTask(prFn)).then(()=>{})
    }
  }
  
  getAppInfo(AppId){
    return this.AppInfo[AppId]?this.AppInfo[AppId]:this.AppInfo['MAI-fieUv67UBYHow']
  }
  /**
   * @param {Object} obj 
   */
  async alert (obj){
    const defaultConfig = {
      title:"提示", 
      body:"无内容", 
      boolien:false, 
      t1:"确认",
      t2:"取消"
    }
    var conf = {
      ...defaultConfig,
      ...obj
    }
    var id = 'MD'+getRandomString(11)
    this.addTask({
      msgType:'alert',
      value:{
        ...conf,
        id
      },
      msgId:id
    })
  }
  

  async smallAlert(obj){
    var ObjDefault = {
      appId:'MAI-fieUv67UBYHow',
      type:'default',
      title:"提示",
      text:'无提示内容',
      fn:()=>{}
    }
    let conf = {...ObjDefault,...obj}
    let app = this.getAppInfo(conf.appId)
    console.log('[MxMessageService]',{
      type:'smallAlert',
      conf
    })
    let id = 'MM'+getRandomString(11)
    this.ref.value={
      msgType:'small',
      value:{
        ...conf,
        app,
        id
      }
    }
  }
}
 