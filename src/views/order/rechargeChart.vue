<template>
  <div ref="chart" class="chart"></div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    rechargeChart() {
      let myChart = this.$echarts.init(this.$refs.chart);

      //测试
      let arr = ["1日", "2日", "3日", "4日", "5日", "6日", "7日", "8日", "9日", "10日", "11日", "12日", "13日", "14日", "15日", "16日", "17日", "18日", "19日", "20日", "21日", "22日", "23日", "24日", "25日", "26日", "27日", "28日", "29日", "30日", "31日"]
      let jiaData = [2404, 2850, 860, 2593, 3249, 3677, 4311, 3611, 2696, 1895, 3419, 954, 2097, 3893, 1113, 175, 1578, 4943, 2422, 3281, 4629, 1750, 1820, 1581, 4035, 449, 3580, 2149, 4605, 912, 434]

      // echart图表配置项
      let option = {
        title:{
        show:true,
        text:'月充值金额'
    },
    xAxis: {
        type: 'category',
        // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        data:arr
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data:jiaData,
        // data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true
    }],
    tooltip:{
        show:true,
        trigger: 'axis'
    },
    toolbox:{
        show:true,
        orient:'horizontal',
        right:'3%',
        itemSize: 15,
        itemGap: 10,
        showTitle: true,
        feature:{
            saveAsImage:{},
            dataView:{},
            dataZoom:{},
            
        }
    }
      };
      myChart.setOption(option)
    },
  },
  mounted() {
    this.rechargeChart();
  },
};
</script>

<style lang="less" scoped>
.chart {
  height: 90vh;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}
</style>
