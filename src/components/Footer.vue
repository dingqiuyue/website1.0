<template>
  <footer class="footer">
    <div class="row">
			<span style="text-align:center">
            {{msg}}
        </span>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
      msg: 'Copyright ©2018 广东新禾道信息科技有限公司 版权所有 粤ICP备14088119号-2'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.footer{
    position: relative;
    padding: 10px 0;
    background: #2a313d;
    color: #728398;
    font-size: 12px;
}
.row{
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
}
</style>
