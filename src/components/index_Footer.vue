<template>
  <section class="tem_index_footer">
	<div class="container">
		<dl class="tem_index_footer_link">
			<dt>友情链接</dt>
			<dd>
				<div class="tem_txt">
					<a href="http://www.mlr.gov.cn/" target="_blank">国土资源部</a>
					<a href="http://www.mohurd.gov.cn/" target="_blank">住房和城乡建设部</a>
					<a href="http://www.sbsm.gov.cn/" target="_blank">国家测绘地理信息局</a>
					<a href="http://www.saac.gov.cn/" target="_blank">国家档案局</a>
					<a href="http://www.cityup.org/chinasus/" target="_blank">中国城市科学研究会</a>
					<a href="http://www.cagis.org.cn/" target="_blank">中国地理信息产业协会</a>
					<a href="http://www.idangan.com/" target="_blank">中国档案学术网</a>
					<a href="http://www.gdsia.org.cn/" target="_blank">广东软件行业协会</a>
				</div>
			</dd>
		</dl>
	</div>
</section>
</template>

<script>
export default {
  name: "index_Footer",
  data() {
    return {};
  }
};
</script>

<style scoped>
.tem_index_footer {
  padding: 20px 0;
  background: #363f4d;
}
.container {
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}
.tem_index_footer dl dt{
  height: 40px;
  color: #00b8ee;
  font-size: 16px;
	font-weight: 700;
	line-height: 40px;
}
.tem_index_footer dl dd{
	margin-top: 20px;
	padding-bottom:  10px;
}
/*.tem_index_footer_link {
		border-bottom: 1px solid #2a313d;
		margin-bottom: 20px;
		
	}*/
.tem_txt {
	word-break: break-all;
}
.tem_txt a{
	display: inline-block;
	overflow: hidden;
	height: 30px;
	line-height: 30px;
  margin: 0 12px 10px 0;
  color: #728398;
  white-space: nowrap;
}
</style>
