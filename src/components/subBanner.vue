<template>
   <div class="subBanner" >
        <div class="bg" :style="'background-image:url('+ img +')'">
        </div>
 
    </div>
</template>

<script>
export default {
  name: "subBanner",
  props: ["type"],
  data() {
    return {};
  },
  computed: {
    img() {
      if (this.type)
      return  require("./../assets/top_banner_" + this.type + ".png");
    }
  }
};
</script>

<style scoped>
.subBanner {
  height: 214px;
  width: 100%;
  overflow: hidden;
}
.bg{
  height:100%;
  width:100%;
  background: no-repeat center center/cover;
  animation: scaleDraw 10s ease-in-out infinite;
  -webkit-animation: scaleDraw 10s ease-in-out infinite;
  -moz-animation: scaleDraw 10s ease-in-out infinite;
  -ms-zoom-animation: scaleDraw 10s ease-in-out infinite;
  -o-animation: scaleDraw 10s ease-in-out infinite;
}
@keyframes scaleDraw {  /*定义关键帧、scaleDrew是需要绑定到选择器的关键帧名称*/
    0%{
        transform: scale(1);  /*开始为原始大小*/
    }
    50%{
      transform: scale(1.1);
    }
    100%{
        transform: scale(1);
    }
}
</style>