<template>

  <div class="PageHeader">
    <div class="back" @click="back">
      <Left theme="outline" size="24"/>
    </div>
    <div class="title">{{props.title}}</div>
    <div class="btn"></div>
  </div>

</template>

<script setup>
import {Left} from '@icon-park/vue-next';
import {defineProps} from 'vue';
const props = defineProps(['title']);
import { useRouter } from 'vue-router';
const router = useRouter()
function back() {
  router.go(-1)
}

</script>


<style scoped lang="scss">
@import '../styles/theme.scss';
  .PageHeader {
    position: sticky;
    top:0;
    width:100%;
    left:0;
    height:50px;
    // padding:0 16px;
    display: flex;
    @include useTheme{
      color:gtv(curTextColor);
      background: gtv(contentBgColor);
    }
    .back,.btn{
      width:50px;
      height:50px;
      line-height: 50px;
      text-align: center;
      cursor: pointer;
      svg{
        @include useTheme{
          color:gtv(curTextColor);
        }
      }
    }
    .title{
      flex:1;
      font-size: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      line-height: 18px;
      @include useTheme{
        color:gtv(curTextColor);
      }
    }
  }

</style>