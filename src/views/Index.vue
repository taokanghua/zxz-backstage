<template>
  <div class="index-container">
    <!-- 头部区域 -->
    <div class="header">
      <div class="user-info">
        <el-dropdown :hide-on-click="false">
          <span class="el-dropdown-link">
            <img
              src="http://minio.jeecg.com/otatest/temp/logo22_1584518595737.png"
              alt=""
              class="avatar"
            />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <template>
                <i class="el-icon-user-solid"></i>
                <span>个人中心</span>
              </template>
            </el-dropdown-item>
            <el-dropdown-item>
              <template>
                <i class="el-icon-star-off"></i>
                <span>账户设置</span>
              </template>
            </el-dropdown-item>
            <el-dropdown-item>
              <template>
                <i class="el-icon-key"></i>
                <span>密码修改</span>
              </template>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        
          <span class="user-wel">欢迎你，admin管理员</span>
        <el-button type="text" class="login-out" @click.native="loginOut">
          <template >
            <i class="el-icon-error"></i>
            <span>退出登录</span>
          </template>
        </el-button>
        
      </div>
    </div>
    <!-- 左边菜单区域 -->
    <div class="index-menu">
      <el-menu
        :default-active="curPage"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#6B9EFF"
      >
        <div v-for="(item, i) in menuList" :key="item.title">
          <!-- 有子级菜单 -->
          <el-submenu :index="item.path ? item.path : i + ''" v-if="!item.path">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{ item.title }}</span>
            </template>
            <div v-if="item.children">
              <el-menu-item
                :index="child.path.replace('/', '')"
                v-for="child in item.children"
                :key="child.title"
                @click="addTab(child.title, child.path.replace('/', ''))"
              >
                <i :class="child.icon"></i>
                <span>{{ child.title }}</span>
              </el-menu-item>
            </div>
          </el-submenu>
          <!-- 无子级菜单选项 -->
          <el-menu-item
            :index="item.path.replace('/', '')"
            v-else
            @click="addTab(item.title, item.path.replace('/', ''))"
          >
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </div>
        <!-- <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>会员管理</span>
          </template>
          <el-menu-item
            index="MemOrder"
            @click="addTab('会员列表', 'MemOrder')"
          >
            <i class="el-icon-location"></i>
            <span>会员列表</span>
          </el-menu-item>
          <el-menu-item index="order" @click="addTab('订单列表', 'order')">
            <i class="el-icon-location"></i>
            <span>订单列表</span>
          </el-menu-item>
          <el-menu-item
            index="rechargeChart"
            @click="addTab('充值统计', 'rechargeChart')"
          >
            <i class="el-icon-location"></i>
            <span>充值统计</span>
          </el-menu-item>
        </el-submenu>

        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">导航二</span>
        </el-menu-item> -->
      </el-menu>
    </div>
    <!-- 右边内容区域 -->
    <div class="index-content">
      <!-- 头部保留区域 比喻搜索用户头像 -->
      <!-- <div class="content-top">123kkk</div> -->

      <!-- 头部标签页 -->
      <!-- <el-button
    size="small"
    @click="addTab()"
  >
    add tab
  </el-button> -->
      <el-tabs
        type="card"
        closable
        @tab-click="changePage"
        @tab-remove="removeTab"
        :value="activeIndex"
      >
        <el-tab-pane
          v-for="item in editableTabs"
          :key="item.name"
          :label="item.title"
          :name="item.name"
        >
          <div class="card-content">
            <router-view></router-view>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      menuList: [
        {
          title: "首页",
          icon: "el-icon-s-home",
          path: "/welcome",
        },
        {
          title: "会员管理",
          icon: "el-icon-user",
          path:"/MemOrder",
        },
        {
          title: "订单管理",
          icon: "el-icon-notebook-2",
          children: [
            {
              title: "订单列表",
              icon: "el-icon-document-copy",
              path: "/order",
            },
            {
              title: "充值统计",
              icon: "el-icon-s-data",
              path: "/rechargeChart",
            },
          ]
        },
      ],
      editableTabs: this.$store.state.editableTabs,
      activeIndex: window.sessionStorage.getItem("tabIndex") || "0",
      curPage: "welcome", //当前页面路径
    };
  },
  methods: {
    // test(name){console.log(name)},
    // addTab(){ //测试函数
    //   let obj = {
    //     title:'Tab 4',
    //     name:'10',
    //     path:'/s'
    //   }
    //   obj.operation = 'a' //声明是什么操作
    //   // this.editableTabs.push(obj)
    //   this.$store.commit('changeEditTab', obj)
    // },
    changePage(targetName) {
      // 这个返回的是索引
      let index = targetName.index;
      let path = this.editableTabs[index].path;
      console.log(path);
      if (this.$route.path == path) return;
      this.$router.push({ name: path });
    },
    removeTab(targetName) {
      // 这个返回的是上面定义的name值
      let index = this.editableTabs.findIndex(
        (item) => item.name == targetName
      );
      // this.editableTabs.splice(index, 1)
      // 设置不能关闭首页
      if(index === 0){
        this.$message.warning('首页不能关闭!')
        return
      }
      this.$store.commit("changeEditTab", index);
    },
    addTab(title, path) {
      //获取点击的标题文字
      //这里有时候会报获取dom元素失败的错误提示 后面再修改   // 待后修复
      // 用来 async 和 nexttick 感觉稍微好了点  但是有时候还是会获取失败
      //如果没有此节点信息 return  如果已经有了该标签 return
      // 6/20 5:30 bug已解决 并且找到另一个新方法 虽然性能上比不上之前那个 但是方便一点
      // 这里可以不需要用vuex的 之前本地存储这个东西一下没想起来 反正以后还会用vuex 就让他把

      //防止用户重复点击导航到同一个页面
      if (this.$route.path.includes(path)) return;
      let ifHas = this.editableTabs.find((item) => item.title == title);
      this.$router.push({ name: path });
      if (ifHas) {
        this.activeIndex = ifHas.name; //点击左侧菜单设置活动标签  并设置跳转

        return;
      }

      let obj = {
        title,
        path,
        operation: "a",
        name:
          parseInt(this.$store.state.editableTabs.pop().name) + 1 + "" || "0",
      };
      // console.log(this.$store.state.editableTabs, this.activeIndex)
      this.$store.commit("changeEditTab", obj);
    },
    loginOut(){
      // 退出登录
      window.sessionStorage.clear() //清除所有本地存储内容
      this.$router.push({name:'login'})
    }
  },
  components: {},
  watch: {
    "$store.state.editableTabs"(n) {
      this.$nextTick(() => {
        // console.log('监听到了')

        this.editableTabs = n;
        // console.log(n.pop().name)
        this.activeIndex = n.length - 1 + "";
      });
    },
    "$route.path"(n) {
      this.curPage = n.split("/").pop();
      // console.log(this.curPage);
      // this.$router.push({name:this.curPage})
    },
    activeIndex(n) {
      //监听tab的活跃name  防止刷新页面 菜单和tab不一致的问题
      window.sessionStorage.setItem("tabIndex", n);
    },
  },
  created() {
    this.curPage = this.$route.path.split("/").pop(); //设置页面启动时候的路径 要不然刷新 菜单选中会有问题
    window.sessionStorage.setItem('tabs', JSON.stringify(this.editableTabs))
  },
};
</script>

<style lang="less" scoped>
.index-container {
  height: 100vh;
  display: flex;
  padding-top: 50px;
  box-sizing: border-box;
  position: relative;
  // overflow: hidden;
  .header {
    width: 100%;
    padding: 8px 1rem 8px 0;
    height: 50px;
    overflow: hidden;
    background-color: #1890ff;
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    box-sizing: border-box;
    .avatar {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      vertical-align: middle;
    }
    
    .user-wel{
      margin:0 .5rem;
      font-size: 14px;
      color: #fff;
    }
    .login-out{
      color: #fff;
    }
  }
}
.index-menu {
  width: 12%;
  min-width: 200px;
  height: 100vh;
  // overflow: hidden;
  .el-menu {
    height: 100%;
    border-right: none;
  }
}
.index-content {
  // 右边区域
  flex: 1;
  height: 100vh;
  background-color: #eeeeee;
  .card-content {
    width: 100%;
    padding: 0 1rem;
    box-sizing: border-box;
  }
}
</style>
