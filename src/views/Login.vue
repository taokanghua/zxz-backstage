<template>
  <div class="login-container">
    <div class="form">
      <div class="logo"><img src="../assets/now-logo.png" alt=""></div>
      <div class="input-item">
        <input type="text" placeholder="请输入用户名" v-model="name">
        <i class="el-icon-user"></i>
      </div>
      <div class="input-item">
        <input type="text" placeholder="请输入密码" v-model="pwd">
        <i class="el-icon-unlock"></i>
      </div>

      <el-button type="primary" @click="loginIn">登录</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      name:'',
      pwd:''
    }
  },
  methods:{
    loginIn(){
      this.$router.push({path:'/index/MemOrder'})
    }
  }
}
</script>

<style lang="less" scoped>
.login-container{
  width: 100vw;
  height: 100vh;
  background-color: #ccc;
  position: relative;

  background-image: url('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1592651313007&di=f8d77b0b41a79e2b796700fc3796ea22&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F9%2F55f672f13b0db.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}
.form{
  width: 20%;

  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 35%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .logo{
    width: 60px;
    height: 60px;
    margin-bottom: 30px;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .input-item{
    width: 100%;
    margin-bottom: 1rem;
    position: relative;
    input{
      width: 100%;
      outline: none;
      height: 46px;
      border: none;
      border-radius: 30px;
      background-color: rgba(243,237,237,.6);
      color: #33691E;
      padding-left: 22%;
      box-sizing: border-box;
    }
    i{
      position: absolute;
      left: 10%;
      top: 50%;
      transform: translateY(-50%);
      color: #fff;
      font-size: 20px;
    }
  }
  .el-button{
    width: 100%;
    margin-top: 2rem;
    border-radius: 30px;
  }
}
</style>