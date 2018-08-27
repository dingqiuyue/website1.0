<template>
  <div class="Banner">
        <div class="pic">
            <ul class="trans">
                <li v-for="img in imgs" :key="img.id" :class="{active:img.isactive}" :style="'background-image:url('+  img.url +')'"></li>
            </ul>
        </div>
        <div class="tab">
            <ol>
                <li v-for="(img,index) in imgs" :key="img.id" :class="{on:img.isactive}" @click="ChangeState(index)" ></li>
            </ol>
        </div>
    </div>
</template>

<script>
export default {
  name: "Banner",
  data() {
    return {
      imgs: [
        { url: require("./../../assets/banner_top2.png"), isactive: true },
        { url: require("./../../assets/banner_top3.png"), isactive: false },
        { url: require("./../../assets/banner_top4.png"), isactive: false }
      ],
      Theactive: 0,
      timer: ""
    };
  },
  mounted() {
      this.go();
  },
  methods: {
    ChangeState(id) {
      this.imgs[this.Theactive].isactive = false;
      if (id !== undefined) {
        this.imgs[id].isactive = true;
        this.Theactive = id;
      } else {
        if (this.Theactive < this.imgs.length - 1) this.Theactive++;
        else {
          this.Theactive = 0;
        }
        this.imgs[this.Theactive].isactive = true;
      }
    },
    stop() {
      clearInterval(this.timer);
    },
    go() {
      const that = this;
      this.timer = setInterval(function() {
        that.ChangeState();
      }, 2000);
    }
  }
};
</script>

<style scoped>

.Banner {
  width: 100%;
  position: relative;
}
.pic {
  width: 100%;
  overflow: hidden;
  position: relative;
}
.trans {
  height: 250px;
  position: relative;
}
.trans li{
  position: absolute;
  width: 100%;
  height: 100%;
  background: no-repeat center center/cover;
  top: 0;
  left: 0;
  opacity: 0;
  -webkit-transition: opacity 1s linear;
  -moz-transition: opacity 1s linear;
  transition: opacity 1s linear;
}
.trans li.active {
  opacity: 1;
}
.tab {
  position: absolute;
  left: 50%;
  bottom: 10px;
  width: 100px;
  height: 15px;
  margin-left: -50px;
  z-index: 10;
}
.tab ol li {
  float: left;
  height: 12px;
  width: 12px;
  border: 1px solid white;
  border-radius: 10px;
  cursor: pointer;
  margin: 2px 3px;
}
.tab ol li.on {
  background: white;
}
</style>
