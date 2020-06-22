<template>
  <el-card>
    <el-input
      placeholder="查询订单"
      prefix-icon="el-icon-search"
      class="searchBox"
    >
    </el-input>
    <!-- 表单 -->
    <el-table :data="tableData" style="width: 100%" border stripe>
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column prop="date" label="日期" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="phone" label="手机号" width="180">
      </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
    >
    </el-pagination>
  </el-card>
</template>

<script>
export default {
  data(){
    return{
       tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          phone: "135354634154",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          phone: "135354634154",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          phone: "135354634154",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          phone: "135354634154",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    }
  }
}
</script>

<style lang="less" scoped>
.el-card{
  .el-input{
    width: 20%;
  }
  .el-table{
    margin: 1rem 0;
  }
}
</style>