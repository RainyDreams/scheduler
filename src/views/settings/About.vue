<template>
  <div class="main">
    <PageHeader back title="关于软件" />
    <div class="aboutPage">
      <div class="iconSection">
        <div class="name" style="margin-bottom: 10px;">记录进度目标计数和专注的网页应用程序</div>
        <div style="margin-bottom: 10px;">作者：张新越</div>
        <div class="version">Version 1.0.0</div>
      </div>
      <div class="bottom">
        <p><b>本软件及其代码均属于原创作品。</b></p>
        <p>Copyright © 2022-2024 ZhangXinyue. All Rights Reserved</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import PageHeader from '../../components/PageHeader.vue';
import { RouterLink } from 'vue-router';
</script>
<style scoped lang="scss">
@import '../../styles/theme.scss';
  .aboutPage{
    display: flex;
    height:100%;
    font-size: 13px;
    flex-direction: column;
    .iconSection{
      display: flex;
      align-items: center;
      padding-top: 12px;
      flex-direction: column;
      justify-content: center;
      flex:1;
      @include useTheme{
        color:rgba(gtv(curTextColor),0.9);
      };
      .icon{
        width: 100px;
        height: 100px;
        background-size: cover;
      }
      .name{
        font-size: 18px;
        font-weight: 600;
        line-height:1.2em;
        font-weight: bolder;
      }
      .version{
        font-size: 16px;
        font-weight: bolder;
      }
    }
    .bottom{
      padding-bottom: 12px;
      font-size: 12px;
      @include useTheme{
        color:rgba(gtv(curTextColor),0.6);
      };
      opacity: 0.6;
      p{
        margin: 3px 0;
      }
    }
  }
  
</style>


