<template >
  <div class="page" :data-theme="isDarkMode?'dark':'light'" >
    <Loading  mode="screen"></Loading>
    <Suspense >
      <router-view v-slot="{ Component }" >
        <keep-alive >
          <component  :is="Component" />
        </keep-alive>
      </router-view>
    </Suspense>
    <!-- <div class="TabBarCover" v-if="!TabBarHide"></div> -->
    <!-- tabbar -->
    <div :class="{show:!TabBarHide,TabBar:1}" >
      <router-link class="w-nt ic_tag" to="/" >
        <div class="w-bt">
          <div class="icon" >
            <calendar class="ic_dark ic_normal " theme="outline" size="20" fill="#ABC4DF"/>
            <calendar class="ic_dark ic_active" theme="outline" size="20" fill="#3E3E3E"/>
            <calendar class="ic_light ic_normal " theme="outline" size="20" fill="#ABC4DF"/>
            <calendar class="ic_light ic_active" theme="outline" size="20" fill="#FFFFFF"/>
          </div>
          <p>首页</p>
        </div>
      </router-link>
      <router-link class="w-nt ic_tag"  to="/inFile">
        <div class="w-bt">
          <div class="icon" >
            <folder-open class="ic_dark ic_normal "  theme="filled" size="20" fill="#ABC4DF"/>
            <folder-open class="ic_dark ic_active"  theme="filled" size="20" fill="#3E3E3E"/>
            <folder-open class="ic_light ic_normal "  theme="filled" size="20" fill="#ABC4DF"/>
            <folder-open class="ic_light ic_active"  theme="filled" size="20" fill="#FFFFFF"/>
          </div>
          <p>存档</p>
        </div>
      </router-link>
      <router-link class="w-nt ic_tag" to="/settings">
        <div class="w-bt">
          <div class="icon" >
            <setting-one class="ic_dark ic_normal " theme="outline" size="20" fill="#ABC4DF"/>
            <setting-one class="ic_dark ic_active"  theme="outline" size="20" fill="#3E3E3E"/>
            <setting-one class="ic_light ic_normal"  theme="outline" size="20" fill="#ABC4DF"/>
            <setting-one class="ic_light ic_active" theme="outline" size="20" fill="#FFFFFF"/>
          </div>
          <p>设置</p>
        </div>
      </router-link>
    </div>
    <MessageDom :message="message"></MessageDom>
  </div>
</template>


<script setup>
import { ref,defineEmits,onMounted,inject,watch } from 'vue'
import { RouterLink, RouterView,useRoute } from 'vue-router'
import { Calendar,FolderOpen,SettingOne } from '@icon-park/vue-next'
import MessageDom from "./components/MessageService.vue";
import emitter from './utils/bus'
import Loading from './components/Loading.vue'
const emit = defineEmits(['showTabBar','hideTabBar'])
const TabBarHide = ref(false)
const route = useRoute()
import {MessageService} from "./utils/message";
import { Watch } from '@icon-park/vue-next';
const msg = inject('message')
const loading = inject('loading');
const message = ref({});
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");  
const isDarkMode = ref(prefersDark.matches);  
const handleDarkModeChange = (e) => {
  if(localStorage.getItem('theme')==='auto' || localStorage.getItem('theme') == null){
    isDarkMode.value = e.matches;  
  } else {
    // localStorage.setItem('theme',e.matches?'dark')
  }
};

prefersDark.addListener(handleDarkModeChange);  
if(localStorage.getItem('theme')==='auto' || localStorage.getItem('theme') == null){
  isDarkMode.value = prefersDark.matches;  
} else if(localStorage.getItem('theme')==='dark') {
  isDarkMode.value = true; 
} else if(localStorage.getItem('theme')==='light') {
  isDarkMode.value = false;
}
emitter.on('theme',(e)=>{
  console.log('[Calendar]theme',e)
  isDarkMode.value = e;
  localStorage.setItem('theme',e)
  if(e=='auto'){
    isDarkMode.value = prefersDark.matches;
  } else {
    isDarkMode.value = (e=='dark')
  }
})

emitter.on('showTabBar',()=>{
  // console.log('[Calendar]showTabBar')
  TabBarHide.value = false;
})
emitter.on('hideTabBar',()=>{
  // console.log('[Calendar]hideTabBar')
  TabBarHide.value = true
});
function checkPath(to){
  // console.log(to)
  if(to == "/" || to == "/inFile" || to == "/settings"){
    TabBarHide.value = false;
  } else {
    TabBarHide.value = true
  }
}
watch(()=>route.path,(to)=>{
  checkPath(to)
})
onMounted(()=>{
  msg.updateOprating(new MessageService(message));
  checkPath(route.path)
});

</script>

<style scoped>
*{
  font-size: 0;
}


</style>
