<template>
    <div id="login" style="position:relative;">
      <div class="loginForm">
        <el-row style="text-align:center;font-size:20px;color:#000;">登录</el-row>
        <el-row>账户<el-input v-model="user.username" placeholder="请输入你的账户"></el-input></el-row>
        <el-row>密码<el-input v-model="user.pwd" placeholder="请输入你的密码" type="password"></el-input></el-row>
        <el-button type="primary" style="width:100%;" class="mt20" @click="checkLoginInfo(user)">确认登录</el-button>
      </div>
    </div>
</template>

<script>
  import { Message } from 'element-ui';
  /** 导入api.js */
  import {login,} from '../axios/api.js'
  export default {
    inject: ['reload'],
    name: "login",
    created() {
      this.$store.dispatch('app_visible',false);
    },
    methods: {
//登录接口调用
      async checkLoginInfo(user) {
        if(user.username !== '' && user.pwd !== '') {
          let res = await login(user);
          if(res.status === 1) {
            localStorage.setItem('token',res.msg.authorization);
            localStorage.setItem('username',res.msg.userLoginVO.userName);
            localStorage.setItem('userLoginVO',JSON.stringify(res.msg.userLoginVO));
            localStorage.setItem('isLogin','true');

            this.$store.dispatch('getNewToken', localStorage.getItem('token'));
            this.$store.dispatch('getNewUsername', localStorage.getItem('username'));
            this.$store.dispatch('userLoginVO', JSON.parse(localStorage.getItem('userLoginVO')));
            this.$store.dispatch('getNewIsLogin', localStorage.getItem('isLogin'));
            this.$store.dispatch('app_visible',true);
            let roleCode = JSON.parse(localStorage.getItem('userLoginVO')).role.roleCode;
            if(roleCode === 'XIANGMUWENYUAN') {
              this.$router.push('/projectInfo');
            }else if(roleCode === 'WULIUADMIN') {
              this.$router.push('/sampleCountSingle');
            }else if(roleCode === 'KEHU'){
              this.$router.push('/introduce');
            }else{
              this.$router.push('/projects');
            }
            this.reload();
          }
        } else if(user.username) {
          this.$message({showClose: true, type: 'warning', message: '请输入用户名'});
        } else {
          this.$message({showClose: true, type: 'warning', message: '请输入密码'});
        }
      },
    },
    data () {
      return {
        user: {
          username: '',
          pwd: '',
        },
      }
    }
  }
</script>

<style scoped>
#login {
  background: url('../assets/login_background.png') no-repeat center 0;
  background-size: cover;
  height: 100vh;
}
  .loginForm {
    width:300px;
    position:absolute;
    top:30%;
    left:50%;
    transform:translate(-50%,-50%);
    background: #fff;
    border-radius:10px;
    line-height:40px;
    padding:20px 50px;
  }
</style>
