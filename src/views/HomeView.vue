<template>
  <div class="main">
    <TopBar 
      ref="HomeTopBar_" 
      :class="{highZIndex:ShowCalendarCover}"
      mode="home"
      @changeDate="changeDate"
      @changeWeekView="changeWeekView" 
      @showAddMenu="showAddMenu"
    />
    <Suspense>
      <HomeMainSection 
        ref="HomeMainSection_" 
        :selectedDate="selectedDate"
        :editMode="editMode"
        class="HomeMainSection"
      />
    </Suspense>
    <HomeMenu 
      :class="{show:HomeMenuShow}" 
      ref="HomeMenu_" 
      @hideMenuCover="hideMenuCover()"
    />
    <div 
      :class="{CalendarCover:true,show:ShowCalendarCover}" 
      @click="hideCalendarCover"
    />
    <AddMenu 
      :class="{AddMenu:true,show:ShowAddMenu}" 
      @hideAddMenu="hideAddMenu" 
      @showAddMenu="showAddMenu" 
      v-model:ShowAddMenu="ShowAddMenu"
    />
  </div>
</template>

<style>
</style>

<script setup>
import { onMounted, ref, nextTick,Suspense } from 'vue'
import TopBar from '../components/TopBar.vue'
import HomeMainSection from "../components/HomeMainSection.vue";
import HomeMenu from "../components/HomeMenu.vue";
import AddMenu from "../components/AddMenu.vue";
import emitter from '../utils/bus.js'
const HomeMenuShow = ref(false)
const HomeMenu_ = ref()
const HomeTopBar_ = ref()
const ShowCalendarCover = ref(false)
const ShowAddMenu = ref(false)
const HomeMainSection_ = ref()
const selectedDate = ref()
const editMode = ref(false)
function changeDate(data){
  selectedDate.value = data
}
function changeWeekView(data){
  ShowCalendarCover.value = !data
}
function hideCalendarCover(data){
  HomeTopBar_.value.isShowWeekView=true
  ShowCalendarCover.value = false
}
function hideMenuCover(){
  HomeMenuShow.value = false
}
function showAddMenu(){
  emitter.emit('hideTabBar')
  ShowAddMenu.value = true
}
function hideAddMenu(e){
  // console.log('[HomeView]hideAddMenu',e)
  if(!e)
    emitter.emit('showTabBar')
  ShowAddMenu.value = false
}

</script>