<template>
  <el-card class="box-card">
    <el-input
      placeholder="查询用户"
      prefix-icon="el-icon-search"
      class="searchBox"
    >
    </el-input>
    <!-- 表单 -->
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column prop="date" label="日期" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="phone" label="手机号" width="180">
      </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
      <el-table-column label="状态" width="80">
        <template v-slot="scope">
          <el-switch
            v-model="isUse"
            @change="changeStatus(scope.$index, scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template v-slot="scope">
          <el-tooltip class="item" effect="dark" content="用户信息" placement="top-end" :enterable="false">
            <el-button type="info" icon="el-icon-message" circle @click="getInfo(scope.$index, scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="注销用户" placement="top" :enterable="false">
            <el-button type="danger" icon="el-icon-delete" circle @click="deleteUser(scope.$index, scope.row)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
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
  data() {
    return {
      isUse:true, //账号启用状态
      dialogVisible:false, //冻结账号弹框
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
    };
  },
  methods:{
    changeStatus(index,row){ //修改用户账号状态函数
      // index 索引值  row 列信息
      //返回被点击后索引值
      // console.log(index, row)
      // this.dialogVisible = true
      //保存上一次的值
      let flag = this.isUse
      this.isUse = !this.isUse
      this.$confirm('确认修改该账户状态?', '提示',{
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type:'warning'
      }).then(()=>{
        if(flag){
          this.isUse = true
          this.$message.success('账号已启用!')
        }else{
          this.isUse = false
          this.$message.success('账号冻结成功!')
        }
      }).catch(()=>{
        this.$message.info('取消操作')
      })
    },
    getInfo(index, row){
      //获取用户信息
    },
    deleteUser(index, row){
      //删除用户
      this.$confirm(`确认永久删除${row.name}用户?`, '提示',{
        confirmButtonText:'删除',
        cancelButtonText:'取消'
      }).then(()=>{
        console.log('删除')
      }).catch(action=>{
        if(action=='cancel'){
          console.log('取消删除')
        }else{
          console.log('取消操作')
        }
      })
    }
  }
};
</script>

<style>
.el-card {
  /* width: calc(100vw-2rem); */
  overflow: hidden;
}
.searchBox {
  width: 20%;
}
.el-table {
  margin: 0.8rem 0;
}
</style>
