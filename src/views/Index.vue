<template>
  <div class="index-container">
    <!-- 左边菜单区域 -->
    <div class="index-menu">
      <el-menu
    :default-active="curPage"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>会员管理</span>
      </template>
      <el-menu-item index="MemOrder" @click="addTab('会员列表', 'MemOrder')">
        <i class="el-icon-location"></i>
        <span>会员列表</span>
      </el-menu-item>
      <el-menu-item index="order" @click="addTab('订单列表', 'order')">
        <i class="el-icon-location" ></i>
        <span>订单列表</span>
      </el-menu-item>
      <el-menu-item index="rechargeChart" @click="addTab('充值统计', 'rechargeChart')">
        <i class="el-icon-location" ></i>
        <span>充值统计</span>
      </el-menu-item>
    </el-submenu>
    
    <el-menu-item index="2">
      <i class="el-icon-menu"></i>
      <span slot="title">导航二</span>
    </el-menu-item>
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
      <el-tabs type="card" closable @tab-click="changePage" @tab-remove="removeTab" :value="activeIndex">
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
import {mapState } from 'vuex'
export default {
    data(){
      return {
        editableTabs: this.$store.state.editableTabs,
        activeIndex:"0", 
        curPage:'MemOrder', //当前页面路径
      }
    },
    methods:{
      test(name){console.log(name)},
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
      changePage(targetName){
        // 这个返回的是索引
        let index = targetName.index
        let path = this.editableTabs[index].path
        console.log(path)
        if(this.$route.path == path) return
        this.$router.push({name:path})
      },
      removeTab(targetName){
        // 这个返回的是上面定义的name值
        let index = this.editableTabs.findIndex(item=>item.name == targetName)
        // this.editableTabs.splice(index, 1)
        this.$store.commit('changeEditTab', index)
      },
      addTab(title, path){ //获取点击的标题文字
      //这里有时候会报获取dom元素失败的错误提示 后面再修改   // 待后修复
      // 用来 async 和 nexttick 感觉稍微好了点  但是有时候还是会获取失败
      //如果没有此节点信息 return  如果已经有了该标签 return
        
        
          let ifHas = this.editableTabs.find(item=>item.title==title)
          this.$router.push({name:path})
          if(ifHas){
            this.activeIndex = ifHas.name //点击左侧菜单设置活动标签  并设置跳转
            
            return
          }
        
          
          
          let obj = {
            title,
            path,
            operation: 'a',
            name: this.$store.state.editableTabs.length+''
          }
          // console.log(obj)
          this.$store.commit('changeEditTab',obj)
        
        
      }
    },
    components:{
      
    },
    watch:{
      '$store.state.editableTabs'(n){
        this.$nextTick(()=>{
          // console.log('监听到了')
          console.log(n)
        this.editableTabs = n
        // console.log(n.pop().name)
        this.activeIndex = n.length-1+''
        })
      },
      '$route.path'(n){
        this.curPage = n.split('/').pop()
        // console.log(n)
      }
    },
    created(){
      this.curPage = this.$route.path.split('/').pop()//设置页面启动时候的路径 要不然刷新 菜单选中会有问题
      
    }
  
};
</script>

<style lang="less" scoped>
.index-container{
  height: 100vh;
  display: flex;
}
.index-menu{
  width: 12%;
  min-width: 200px;
  height: 100vh;
  // overflow: hidden;
  .el-menu{
    height: 100%;
    border-right: none;
  }
}
.index-content{
  // 右边区域
  flex:1;
  height: 100%;
  background-color: #EEEEEE;
  .card-content{
    width: 100%;
    padding: 0 1rem;
    box-sizing: border-box;
  }
}




</style>