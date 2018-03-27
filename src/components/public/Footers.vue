<template>
	<div>
		<mt-tabbar v-model="selected" :fixed="true">
			<mt-tab-item id="首页">
				<img slot="icon" src="../../assets/imgs/btc.png">
				首页
			</mt-tab-item>
			<mt-tab-item id="交易市场">
				<img slot="icon" src="../../assets/imgs/btc.png">
				交易市场
			</mt-tab-item>
			<mt-tab-item id="资产">
				<img slot="icon" src="../../assets/imgs/btc.png">
				资产
			</mt-tab-item>
			<mt-tab-item id="我的">
				<img slot="icon" src="../../assets/imgs/btc.png">
				我的
			</mt-tab-item>
		</mt-tabbar>
	</div>
</template>
<script>
import { Tabbar } from "mint-ui";
export default {
  data() {
    return { selected: this.$store.state.stroe_data.selected, };
  },
  watch: {
    selected: function(val,oldVal) {
		 this.selected = val;
      if (val == "首页") {
		this.$router.push({ path: "/index/Hall" });
		this.$store.commit('selectChange',"首页");
		this.selected = this.$store.state.stroe_data.selected;
      }
      if (val == "交易市场") {
		this.$router.push({ path: "/tradingMarket/tradingMarket" });
		// this.selected = "交易市场";
		this.$store.commit('selectChange',"交易市场");
      }
      if (val == "资产") {
		this.$router.push({ path: "/assets/assets" });
		this.$store.commit('selectChange',"资产");
      }
      if (val == "我的") {
		this.$router.push({ path: "/my/My" });
		this.$store.commit('selectChange',"我的");
      }
    }
  }
};
</script>
<style>
.red{
	color: red;
}
.active {
    background-color: #eaeaea !important;
    color: #26a2ff !important;
	}
</style>
