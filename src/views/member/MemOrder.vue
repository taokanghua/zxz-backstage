<template>
  <el-card class="box-card">
    <el-input
      placeholder="查询用户"
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
          <el-tooltip
            class="item"
            effect="dark"
            content="用户信息"
            placement="top-end"
            :enterable="false"
          >
            <el-button
              type="info"
              icon="el-icon-message"
              circle
              @click="getInfo(scope.$index, scope.row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="注销用户"
            placement="top"
            :enterable="false"
          >
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              @click="deleteUser(scope.$index, scope.row)"
            ></el-button>
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

    <!-- 弹出框 -->
    <el-dialog title="用户信息" :visible.sync="dialogTableVisible" center>
      <el-form ref="form" :model="form" label-width="100px" class="dialog-form">
        <!-- <el-form-item label="用户头像:"> -->
        <img src="http://taokanghua.cn/sources/avatar/8.jpg" alt="" />
        <!-- </el-form-item> -->
        <el-form-item label="会员ID:">
          <el-button type="text" disabled>666666</el-button>
        </el-form-item>
        <el-form-item label="会员姓名:">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="身份证号:">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="账户密码:">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="账户密码:">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号码:">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="性别:">
          <el-radio-group v-model="form.sex">
            <el-radio label="男" ></el-radio>
            <el-radio label="女" ></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="账号状态:">
          <el-radio-group v-model="statusCode[form.ajaxStatus].status" size="small" disabled :text-color="statusCode[form.ajaxStatus].color">
            <el-radio-button label="冻结"></el-radio-button>
            <el-radio-button label="正常"></el-radio-button>
            <el-radio-button label="注销"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="QQ号:">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="微信号:">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="支付密码:">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="邀请我的:">
          <el-button type="text" disabled>sKiosYYs</el-button>
        </el-form-item>
        <el-form-item label="我的邀请码:">
          <el-button type="text" disabled>suYsJSIs</el-button>
        </el-form-item>
        <el-form-item label="推荐人ID:">
          <el-button type="text" disabled>123456</el-button>
        </el-form-item>
        <el-form-item label="业务员ID:">
          <el-button type="text" disabled>9856241</el-button>
        </el-form-item>
        
        <el-form-item label="会员积分:">
          <el-button type="text" >1200</el-button>
        </el-form-item>
        <el-form-item label="账户余额:">
          <el-button type="text">{{form.balance}}</el-button>
          <el-button type="text" size="small" style="color:orange" @click="updateBalance">余额设置</el-button>
        </el-form-item>
        <el-form-item label="最后登录:">
          <el-button type="text" disabled>?????</el-button>
        </el-form-item>
        <el-form-item label="最后登录IP:">
          <el-button type="text" disabled>192.168.1.1</el-button>
        </el-form-item>
        <el-form-item label="注册时间:">
          <el-button type="text" disabled>2020-6-22</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      isUse: true, //账号启用状态
      dialogVisible: false, //冻结账号弹框
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
      dialogTableVisible: false, //用户信息窗口
      form: {
        name: "",
        balance:99,
        sex:'男',
        ajaxStatus:'1'
      },
      statusCode:{ //用来匹配后台传来的状态 并每个状态有各自的颜色
        '1':{status:'正常', color:'#409EFF'},
        '2':{status:'冻结', color:'#E6A23C'},
        '3':{status:'注销', color:'#F56C6C'}
      } //账号状态颜色表
    };
  },
  methods: {
    changeStatus(index, row) {
      //修改用户账号状态函数
      // index 索引值  row 列信息
      //返回被点击后索引值
      // console.log(index, row)
      // this.dialogVisible = true
      //保存上一次的值
      let flag = this.isUse;
      this.isUse = !this.isUse;
      let msg = flag
        ? `确认启用${row.name}的账号使用权？`
        : `确认冻结 <span style='color:red'>${row.name}</span> 的账号？`;
      this.$confirm(msg, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        dangerouslyUseHTMLString: true,
        type: "warning",
      })
        .then(() => {
          if (flag) {
            this.isUse = true;
            this.$message.success("账号已启用!");
          } else {
            this.isUse = false;
            this.$message.success("账号冻结成功!");
          }
        })
        .catch(() => {
          this.$message.info("取消操作");
        });
    },
    getInfo(index, row) {
      //获取用户信息
      this.dialogTableVisible = true;
    },
    deleteUser(index, row) {
      //删除用户
      this.$confirm(`确认永久删除${row.name}用户?`, "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
      })
        .then(() => {
          console.log("删除");
        })
        .catch((action) => {
          if (action == "cancel") {
            console.log("取消删除");
          } else {
            console.log("取消操作");
          }
        });
    },
    updateBalance(){
      this.$prompt('请输入要设置的余额!',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(({value})=>{
        this.$message.success(value)
        this.form.balance = value
      })
    }
  },
};
</script>

<style lang="less" scoped>
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

.dialog-form {
  position: relative;
  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    position: absolute;
    left: 0;
    top: 0;
    transform: translateY(-115%);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
}
</style>
