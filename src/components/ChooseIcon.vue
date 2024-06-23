<!-- 功能不完善，砍掉了 -->
<!-- <template>
  <div style="width:200px;height:40px;" class="chooseIcons">
   <el-popover
       placement="bottom"
       width="450"
       trigger="click">
       <template v-slot:reference>
        <span style="display:inline-block;width:200px;height:40px;line-height:40px;">
            <i :class="userChooseIcon"></i>
            {{chooseIcons}}
        </span>
       </template>
       
       <div class="iconList">
           <i v-for="item in iconList" :key="item" :class="item" @click="setIcon(item)" style="font-size:20px"></i>
       </div>
   </el-popover>
</div>
</template>

<script lang="ts" setup>
import {ref, watch, getCurrentInstance, nextTick,defineExpose} from 'vue'
import {elementIcons} from '../../utils/icon'
let iconList=elementIcons;
let userChooseIcon=ref('');
let chooseIcons=ref('');
function setIcon(icon){
  userChooseIcon.value=icon;
  chooseIcons.value=icon;
  let instance=getCurrentInstance();
  // instance.emit('setIcon',icon);
}
</script> -->