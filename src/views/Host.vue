<template>
  <div class="Host">
      <main-header></main-header>
      <transition name="fade" mode="out-in">
       <router-view></router-view>
      </transition>
      <index-footer></index-footer>
      <main-footer></main-footer>
  </div>
</template>

<script>
import Header from "./../components/Header.vue";
import Footer from "./../components/Footer.vue";
import index_Footer from "./../components/index_Footer.vue";

export default {
  name: "Host",
  data() {
    return {};
  },
  components: {
    "main-header": Header,
    "main-footer": Footer,
    "index-footer": index_Footer
  }
};
</script>
