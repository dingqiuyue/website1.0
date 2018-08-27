<template>
  <div class="Home">
      <main-banner></main-banner>
      <hot-news></hot-news>
      <state-news></state-news>
      <industry-app></industry-app>
      <typical-case></typical-case>
  </div>
</template>

<script>
import Banner from "./../components/Home/Banner.vue";
import HotNews from "./../components/Home/HotNews.vue";
import StateANews from "./../components/Home/StateANews.vue";
import IndustryApp from "./../components/Home/IndustryApp.vue";
import TypicalCase from "./../components/Home/TypicalCase.vue";

export default {
  name: "Home",
  data() {
    return {};
  },
  computed:{
  },
  components: {
    "main-banner": Banner,
    "hot-news": HotNews,
    "state-news": StateANews,
    "industry-app":IndustryApp,
    "typical-case":TypicalCase
  },
  mounted() {
    
  }
};
</script>
