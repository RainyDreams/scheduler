<template>

<button @click="back">
  <Left theme="outline" size="24" fill="#9F7DEA"/>
</button>

</template>

<style scoped lang="scss">
@import '../styles/theme.scss';
  button{
    position: absolute;
    z-index: 999;
    top:24px;
    left:24px;
    padding:4px;
    @include useTheme{
      color:gtv(curTextColor);
      background: gtv(curBgWhite);
      border:1px solid gtv(curBdColor);
      box-shadow: 0px 0px 8px gtv(curShadowWhite), 0px 0px 8px gtv(curShadowColor);
    };
    overflow: hidden;
  }
</style>

<script setup> 
import { Left } from '@icon-park/vue-next';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
function back() {
  router.go(-1)
}
</script>