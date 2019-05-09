<template>
  <div id="app">
    <el-container style="height:100%;" v-if="this.$store.getters.app_visible">
      <el-header class="header" style="height:80px;">
        <div id="logoIndex">
          <img src="./assets/logo.png" alt="logo" class="img-logo">
        </div>

        <div id="user" v-if="this.$store.getters.getIsLogin">
          <!--<el-tag type="info">用户名：</el-tag>-->
          <div class="fr">
            <el-dropdown @command="handleCommand">
              <el-button type="primary" plain>{{this.$store.getters.getUsername}}<i class="el-icon-arrow-down el-icon--right"></i></el-button>
              <el-dropdown-menu slot="dropdown" style="font-size:12px;min-width:100px;">
                <el-dropdown-item command="1" style="font-size:10px;cursor:pointer;">修改信息</el-dropdown-item>
                <el-dropdown-item divided command="2" style="font-size:10px;cursor:pointer;">修改密码</el-dropdown-item>
                <el-dropdown-item divided command="3" style="font-size:10px;cursor:pointer;">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>


          <!--<el-button type="primary" @click="clearStorage" size="mini">退出</el-button>-->
        </div>
      </el-header>
      <el-container style="height: 100%;margin-bottom:100px;overflow:hidden;">
        <el-aside width="220px">
          <el-row class="tac">
            <el-col :span="24">
              <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
                @select="handleSelect" :unique-opened="unique" :router="router" :default-openeds="defaultOpeneds">
                <!--<el-menu-item index="login">登录</el-menu-item>-->
                <el-submenu index="0"> <!-- 设置router:true后index的值会作为路径跳转，如果不添加’/‘，会默认是嵌套的子路由 children -->
                  <template slot="title"><i class=""></i><span style="font-size:16px;">模具行业信息平台</span></template>
                  <!-- 模具行业信息发布平台 -->
                  <el-submenu index="1">
                    <template slot="title"><i class=""></i><span>行业信息发布平台</span></template>
                    <!-- 介绍 -->
                    <el-menu-item class="f14" index="/introduce">项目介绍展示</el-menu-item>
                    <!-- 项目统计 -->
                    <el-menu-item class="f14" index="/itemInfo" v-if="(roleCode === 'ADMIN' || roleCode === 'XIANGMUZONGJIAN' || roleCode === 'KEHU')">项目统计</el-menu-item>
                    <!-- 反馈统计 -->
                    <el-menu-item class="f14" index="/list" v-if="(roleCode === 'ADMIN' || roleCode === 'XIANGMUZONGJIAN' || roleCode === 'KEHU')">反馈统计</el-menu-item>
                    <!-- custom-items
                    <el-submenu index="1-2">
                      <template slot="title"><i class=""></i><span>项目信息</span></template>
                      <el-menu-item index="itemInfo">项目统计信息</el-menu-item>
                      <el-menu-item index="itemProgress">项目进度详情</el-menu-item>
                    </el-submenu>-->
                      <!-- 此处不应展示，只能通过该项目进度详情跳转
                      <el-submenu index="0-0">
                        <template slot="title"><i class=""></i><span>项目进度详情</span></template>
                        <el-menu-item index="itemProgressDetail/1">图纸</el-menu-item>
                        <el-menu-item index="itemProgressDetail/2">加工</el-menu-item>
                        <el-menu-item index="itemProgressDetail/3">试模</el-menu-item>
                        <el-menu-item index="itemProgressDetail/4">送样</el-menu-item>
                        <el-menu-item index="itemProgressDetail/5">走模</el-menu-item>
                      </el-submenu>-->
                    <!-- 反馈
                    <el-submenu index="1-3">
                      <template slot="title"><i class=""></i><span>反馈信息</span></template>
                      <el-menu-item index="list">反馈信息列表</el-menu-item>
                      <el-menu-item index="add">新增反馈</el-menu-item>
                    </el-submenu>-->
                  </el-submenu>

                  <!-- 企业信息共享系统 -->
                  <el-submenu index="2" v-if="roleCode !== 'KEHU'">
                    <template slot="title"><i class=""></i><span>企业信息共享系统</span></template>
                    <!-- 配置管理 -->
                    <el-submenu index="2-0">
                      <template slot="title"><i class=""></i><span>配置管理</span></template>
                      <!-- 基本信息设置 -->
                      <el-menu-item index="/settings">基本信息设置</el-menu-item>
                      <el-menu-item index="/roleIntroduce" v-if="roleCode !== 'WULIUADMIN'">项目角色</el-menu-item>

                      <el-menu-item index="/newRemind" v-if="(roleCode === 'ADMIN' || roleCode === 'XIANGMUGONGCHENGSHI' || roleCode === 'XIANGMUJINGLI' || roleCode === 'XIANGMUZONGJIAN')">新增提醒</el-menu-item>

                      <!-- 项目分配设置 -->
                      <el-menu-item index="/itemsAllocation" v-if="(roleCode === 'ADMIN' || roleCode === 'XIANGMUWENYUAN' || roleCode === 'XIANGMUZONGJIAN') && roleCode !== 'WULIUADMIN'">项目分配设置</el-menu-item>

                      <!-- 用户管理 -->
                      <el-menu-item index="/userManage" v-if="(roleCode === 'ADMIN' || roleCode === 'XIANGMUWENYUAN' || roleCode === 'XIANGMUZONGJIAN') && roleCode !== 'WULIUADMIN'">用户管理</el-menu-item>
                    </el-submenu>
                    <!-- 项目查看
                    <el-menu-item index="itemCheck">项目查看</el-menu-item>-->
                    <!-- 新增项目 -->
                    <el-submenu index="2-1" v-if="roleCode !== 'WULIUADMIN'">
                      <template slot="title"><i class=""></i><span>新增项目</span></template>
                      <!-- 新增项目 -->
                      <el-menu-item index="/projectsNew">手动添加</el-menu-item>
                      <el-menu-item index="/contract">合同评审表管理</el-menu-item>
                      <el-menu-item index="/projectInfo">工程任务书管理</el-menu-item>

                    </el-submenu>

                    <!-- 项目查看 -->
                    <el-submenu index="2-2" v-if="roleCode !== 'XIANGMUWENYUAN'">
                      <template slot="title"><i class=""></i><span>项目信息</span></template>

                      <!-- 新增页面 -->
                      <el-menu-item index="/projects" v-if="roleCode !== 'WULIUADMIN'">项目查看</el-menu-item>
                      <el-menu-item index="/unqualifiedPart" v-if="roleCode !== 'WULIUADMIN'">不合格零件</el-menu-item>

                      <!--<el-menu-item index="itemCheck">项目查看详情</el-menu-item>-->
                      <el-menu-item index="/testMouldSingle" v-if="roleCode !== 'WULIUADMIN'">试模统计</el-menu-item>
                      <el-menu-item index="/sampleCountSingle">送样/走模统计</el-menu-item>
                    </el-submenu>

                    <!-- 表格管理 -->
                    <el-submenu index="2-3" v-if="roleCode !== 'XIANGMUWENYUAN' && roleCode !== 'WULIUADMIN'">
                      <template slot="title"><i class=""></i><span>表格管理</span></template>

                      <!-- 加工进度表 -->
                      <el-menu-item index="/productPlan" v-if="roleCode !== 'WULIUADMIN'">加工进度表</el-menu-item>
                      <el-menu-item index="/salePlan" v-if="roleCode !== 'WULIUADMIN'">销售计划表</el-menu-item>
                      <!--<el-menu-item index="dataSync" v-if="roleCode !== 'WULIUADMIN'">数据同步说明</el-menu-item>-->
                    </el-submenu>

                    <!-- 项目统计 -->
                    <!--<el-menu-item index="itemCount">项目统计</el-menu-item>-->

                    <!-- 提醒 -->
                    <el-menu-item class="f14" index="/notice" v-if="(roleCode !== 'WULIUADMIN' && roleCode !== 'XIANGMUWENYUAN')">模具异常提醒</el-menu-item>
                    <el-menu-item class="f14" index="/noticeLeader" v-if="(roleCode === 'ADMIN' || roleCode === 'XIANGMUZONGJIAN' || roleCode === 'XIANGMUZHUGUAN')">项目状态变更提醒</el-menu-item>

                    <!-- 项目回复 -->
                    <el-menu-item class="f14" index="/itemFeedback" v-if="(roleCode === 'ADMIN' || roleCode === 'XIANGMUZONGJIAN' || roleCode === 'XIANGMUZHUGUAN' || roleCode === 'XIANGMUJINGLI')">客户反馈</el-menu-item>
                    <!-- 设置
                    <el-submenu index="2-1">
                      <template slot="title"><i class=""></i><span>配置管理</span></template>
                      <el-menu-item index="settings">参数设置</el-menu-item>
                      <el-menu-item index="remind">提醒设置</el-menu-item>
                      <el-menu-item index="itemsAllocation">项目分配设置</el-menu-item>
                      <el-menu-item index="userManage">用户管理设置</el-menu-item>
                    </el-submenu>-->

                      <!-- 此处不应该直接展示，通过跳转
                      <el-menu-item index="point">项目节点管理</el-menu-item>
                      <el-menu-item index="designProgress">设计进度查看</el-menu-item>
                      <el-menu-item index="purchase">采购统计</el-menu-item>
                      <el-menu-item index="machine">加工/精修</el-menu-item>
                      <el-menu-item index="testMould">试模统计</el-menu-item>
                      <el-menu-item index="sampleCount">送样/走模统计</el-menu-item> -->

                  </el-submenu>
                </el-submenu>
                <!--<el-submenu index="1-1">-->
                  <!--<template slot="title"><i class="el-icon-location"></i><span>介绍</span></template>-->
                  <!--<el-menu-item index="introduces">简介</el-menu-item>-->
                  <!--<el-menu-item index="newTec/3D">新技术</el-menu-item>-->
                <!--</el-submenu>-->
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>

        <el-container> <!--  style="height:100%;" -->
          <el-main>
            <transition name="slide-fade">
              <router-view @childClose="childClose" :realshow="realshow"></router-view>
            </transition>

            <!-- Form -->
            <el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="50%" center @closed="cancelAdd">
              <hr>
              <el-form :model="form" status-icon :rules="rules" ref="ruleForm" label-width="120px" label-position="right" class="mt20">
                <!--<el-form-item prop="mobile" label="联系方式：" v-if="changeFlag === 1" :rules="[{ required: true, min:11, max: 11, message: '请输入11位手机号码', trigger: ['blur', 'change'] }]">-->
                  <!--<el-input v-model="form.mobile" placeholder="请输入您的联系方式" clearable></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item prop="mail" label="邮箱地址：" v-if="changeFlag === 1" :rules="[{ required: true, message: '请输入邮箱地址', trigger: 'change' },{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }]">-->
                  <!--<el-input v-model="form.mail" placeholder="请输入您的邮箱地址" clearable></el-input>-->
                <!--</el-form-item>-->
                <el-form-item label="原密码：" prop="oldPassword" :rules="{ required: true, min: 6, max: 20, message: '请输入6-20个非中文字符！', trigger: ['blur', 'change'] }">
                  <el-input type="password" v-model="form.oldPassword" autocomplete="off" clearable></el-input>
                </el-form-item>
                <el-form-item label="新密码：" prop="newPassword">
                  <el-input type="password" v-model="form.newPassword" autocomplete="off" clearable></el-input>
                </el-form-item>
                <el-form-item label="确认新密码：" prop="checkPass">
                  <el-input type="password" v-model="form.checkPass" autocomplete="off" clearable></el-input>
                </el-form-item>

              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="changeInfo(form)">确 定</el-button>
                <el-button @click="dialogFormVisible = false">取 消</el-button>
              </div>
            </el-dialog>

            <el-dialog title="修改基本参数" :visible.sync="dialogFormVisible1" width="50%" center @closed="cancelAdd">
              <hr>
              <el-form :model="form" status-icon ref="ruleForm1" label-width="120px" label-position="right" class="mt20">
                <el-form-item prop="mobile" label="联系方式：" :rules="[{ required: true, min:11, max: 11, message: '请输入11位手机号码', trigger: ['blur', 'change'] }]">
                  <el-input v-model="form.mobile" placeholder="请输入您的联系方式" clearable></el-input>
                </el-form-item>
                <el-form-item prop="mail" label="邮箱地址：" :rules="[{ required: true, message: '请输入邮箱地址', trigger: ['blur', 'change'] },{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }]">
                  <el-input v-model="form.mail" placeholder="请输入您的邮箱地址" clearable></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="changeInfo(form)">确 定</el-button>
                <el-button @click="dialogFormVisible1 = false">取 消</el-button>
              </div>
            </el-dialog>

          </el-main>
        </el-container>
      </el-container>
      <el-footer style="background-color:#fff;height:80px;" class="ovw-h mt20">
        <!--<div style="background-color:#f5f5f5;height:20px;"></div>-->
        <img src="./assets/footer.png" alt="底部" style="width:auto;max-height:60px;margin-top:20px;">
      </el-footer>
    </el-container>
    <router-view v-if="!this.$store.getters.app_visible"></router-view>
  </div>
</template>

<script>
  import { Message } from 'element-ui'
  /** 导入api.js */
  import {loginOut, updateUserInfo, changePwd} from './axios/api.js'

  export default {
    name: 'App',
    provide () {
      return {
        reload: this.reload,
      }
    },
    data () {
      let self = this;
      let validateNewPassword = (rule, value, callback) => {
        if(!value) {
          value = '';
        }
        if (!/^[^\u4e00-\u9fa5]{6,20}$/.test(value)) {
          callback(new Error('请输入6-20个非中文的字符！'));
        } else {
          if (self.form.checkPass) { //只需要判断再次输入密码的校验，此处只需要满足test校验即可
            self.$refs.ruleForm.validateField('checkPass')
          }
          callback();
        }
      };
      let validateCheckPass = (rule, value, callback) => {
        if(!value) {
          value = '';
        }
        if (!/^[^\u4e00-\u9fa5]{6,20}$/.test(value)) {
          callback(new Error('请输入6-20个非中文的字符！'));
        } else if (value !== self.form.newPassword) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        //刷新子路由
        isRouterAlive: this.$store.getters.app_visible,

        realshow: true,
        //是否唯一展开菜单项
        unique: true,
        router: true,

        //角色 roleCode
        roleCode: JSON.parse(localStorage.getItem('userLoginVO'))? JSON.parse(localStorage.getItem('userLoginVO')).role.roleCode : '',

        //菜单
        active: '',
        activePath: '',
        defaultOpeneds: ['0','2','2-2'],

        route: this.$route,

        username: localStorage.getItem('username'),

        //弹框
        dialogFormVisible: false,
        dialogFormVisible1: false,
        form: {
          mail: '',
          mobile: '',
          oldPassword: '',
          newPassword: '',
          checkPass: '',
        },
        changeFlag: 1,

        rules: {
          newPassword: [
            { required: true, validator: validateNewPassword, trigger: ['blur', 'change']},
            // { required: true, min: 6, max: 20, message: '请输入6-20个字符！', trigger: 'change' }
          ],
          checkPass: [
            { required: true, validator: validateCheckPass, trigger: ['blur', 'change'] },
            // { required: true, min: 6, max: 20, message: '请输入6-20个字符！！', trigger: 'change' }
          ],
        },
      }
    },
    components: {

    },

    // beforeCreate() {
    //   if(!sessionStorage.getItem('currentUrl')) {
    //     let roleCode = JSON.parse(localStorage.getItem('userLoginVO')).role.roleCode;
    //     if(roleCode === 'XIANGMUWENYUAN') {
    //       this.$router.push('/projectInfo');
    //     }else if(roleCode === 'WULIUADMIN') {
    //       this.$router.push('/sampleCount');
    //     }else if(roleCode === 'KEHU'){
    //       this.$router.push('/introduce');
    //     }else{
    //       this.$router.push('/projects');
    //     }
    //   }
    // },

    created() {
      // console.log(this.roleCode + this.$format(new Date().getTime()));
      //在页面加载时读取sessionStorage里的状态信息
      if (localStorage.getItem("store") ) {
        this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(localStorage.getItem("store"))));
      }
      //在页面刷新时将vuex里的信息保存到sessionStorage里
      window.addEventListener("beforeunload",()=>{
        localStorage.setItem("store",JSON.stringify(this.$store.state));
      });
      this.form = {
        mail: localStorage.getItem('userLoginVO')? JSON.parse(localStorage.getItem('userLoginVO')).mail : '',
        mobile: localStorage.getItem('userLoginVO')? JSON.parse(localStorage.getItem('userLoginVO')).mobile : '',
      }
    },
    mounted: function () {
      // console.log(this.roleCode + this.$format(new Date().getTime()));//此处加载时this还不是指向vue实例
      //登录后显示用户名与退出按钮
      this.$store.dispatch('getNewIsLogin', localStorage.getItem('isLogin'));
      this.$store.dispatch('getNewUsername', localStorage.getItem('username'));

  //获取刷新页面前的地址项，当刷新时调用，跳转到当前页 -------------------------- 需要添加一个参数作为判断依据，决定当前页面是否属于详情页，还是独立页
  //     let path = this.$route.path;
  //     window.localStorage.setItem('currentUrl',this.$route.path);

      let path = localStorage.getItem('currentUrl');
      if(localStorage.getItem('token') === '' || localStorage.getItem('token') === null || localStorage.getItem('token') === undefined){
        this.$router.push('/login');
        this.isRouterAlive = false;
      }
      // else if(path === '/') {
      //   this.$store.dispatch('app_visible',true);
      //   this.isRouterAlive = true;
      //   let roleCode = JSON.parse(localStorage.getItem('userLoginVO')).role.roleCode;
      //   if(roleCode === 'XIANGMUWENYUAN') {
      //     this.$router.push('/projectInfo');
      //   }else if(roleCode === 'WULIUADMIN') {
      //     this.$router.push('/sampleCount');
      //   }else if(roleCode === 'KEHU'){
      //     this.$router.push('/introduce');
      //   }else{
      //     this.$router.push('/projects');
      //   }
      // }
      else {
        this.isRouterAlive = true;
        this.$store.dispatch('app_visible',true);
        this.$router.push(localStorage.getItem('currentUrl'));
      }
      this.active = localStorage.getItem('currentUrl');
      this.activePath = this.active;
    },

    watch: { //通过路由的更新可以直接赋值
      $route: function(to, from , next) {
        console.log(this.$route);
        if(from.path === '/login') {
          this.form = {
            mail: localStorage.getItem('userLoginVO')? JSON.parse(localStorage.getItem('userLoginVO')).mail : '',
            mobile: localStorage.getItem('userLoginVO')? JSON.parse(localStorage.getItem('userLoginVO')).mobile : '',
          }
        }
      },
    },

    beforeUpdate() {
      window.localStorage.setItem('currentUrl',this.$route.path);
    },

    updated() {
      if(localStorage.getItem('userLoginVO')) {
        this.roleCode = JSON.parse(localStorage.getItem('userLoginVO')).role.roleCode;
      }
    },

    methods: {
  //刷新子路由
      reload () {
        this.isRouterAlive = false;
        this.$nextTick(function () {
          this.isRouterAlive = true;
        });
      },

  //点击下拉菜单对应的菜单指令事件
      handleCommand(command) {
        if(command === '3') {
          this.clearStorage();
        }else if(command === '1') {
          this.changeFlag = 1;
          this.dialogFormVisible1 = true;
        }else {
          this.changeFlag = 2;
          this.dialogFormVisible = true;
          // this.form.oldPassword = '';
          // this.form.newPassword = '';
          // this.form.checkPass = '';
        }
      },

      //取消或者关闭弹框时清空校验信息
      cancelAdd() {
        if (this.changeFlag === 1) {
          this.$refs.ruleForm1.clearValidate();
        } else {
          this.$refs.ruleForm.resetFields();
        }
        // this.form.oldPassword = '';
        // this.form.newPassword = '';
        // this.form.checkPass = '';
      },

  //修改邮箱，联系方式或密码
      changeInfo(form) {
        if (this.changeFlag === 1) {
          this.$refs.ruleForm1.validate(async (valid) => {
            if(valid) {
              if (this.changeFlag === 1) {
                // let params = {};
                // if(form.mail) {
                //   params.mail = form.mail;
                // }
                // if(form.mobile) {
                //   params.mobile = form.mobile;
                // }
                let res = await updateUserInfo({mail: form.mail, mobile: form.mobile,});
                if (res.status === 1) {
                  let obj = Object.assign(JSON.parse(localStorage.getItem('userLoginVO')),{mail: form.mail, mobile: form.mobile,});
                  localStorage.setItem('userLoginVO',JSON.stringify(obj));
                  Message({showClose: true, type: 'success', message: '修改邮箱或联系方式成功！'});

                  if (this.$route.path === '/settings') {
                    this.reload();
                  }else {
                    this.$router.push('/settings');
                  }
                }
                this.dialogFormVisible1 = false;
              }
            }
          });
        }else {
          this.$refs.ruleForm.validate(async (valid) => {
            if (valid) {
              let res = await changePwd({oldPassword: form.oldPassword, newPassword: form.newPassword,});
              this.dialogFormVisible = false;
              if (res.status === 1) {
                Message({showClose: true, type: 'success', message: '修改密码成功，请重新登录以验证密码！'});
                // this.$router.push('/login');

                this.$refs.ruleForm.resetFields();
                this.clearStorage();
              }
            }
          })
        }
      },

  //点击退出，清空localStorage，并跳转登录页
      async clearStorage() {
        let res = await loginOut();
        if(res.status === 1) {
          localStorage.removeItem('token');
          localStorage.removeItem('username');
          localStorage.removeItem('userLoginVO');
          localStorage.removeItem('isLogin');
          this.$store.dispatch('getNewIsLogin', localStorage.getItem('isLogin'));
          this.isRouterAlive = false;
          this.$router.push('/login');
        }
      },

      handleOpen(key, keyPath) {
        // keyPath = '/'+key;
        // this.$router.push(keyPath);
      },
      handleClose(key, keyPath) {
        // keyPath = '/'+key;
        // this.$router.push(keyPath);
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      handleSelect(key, keyPath) {
        // this.active = key;
        // localStorage.setItem('active',this.active);
        this.activePath = keyPath[keyPath.length - 1];
        console.log(this.activePath)
        console.log(keyPath)
      },

      //项目流程收起展开
      childClose () {
        this.realshow = !this.realshow;
        console.log(this.realshow);
      }
    }
  }
</script>

<style lang="scss">
  @import "style/common.css";
  @import "style/commons.scss";

  html,body, #app {height: 100% !important; margin:0 !important;}

  /* 可以设置不同的进入和离开动画 */
  /* 设置持续时间和动画函数 */
  .slide-fade-enter-active {
    transition: all .8s ease;
  }
  /*.slide-fade-leave-active {=====对于不同组件或者不同元素之间切换会造成同时存在的情况*/
    /*transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);*/
  /*}*/
  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateX(30px);
    opacity: 0;
  }

#app {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  height: 100%;
  /*margin-top: 20px;*/
  font-size:13px;
  min-width:1280px;
  overflow:auto;
  /*margin-bottom:80px;*/
}


header{margin-bottom:20px;box-sizing: border-box;clear:both;position:relative;
  display: flex;align-items: center;justify-content: space-between;}

.header:after{content:'';width:100%;border-bottom:1px solid #ddd;height:0;
  position:absolute;bottom:0;left:0;}

.el-footer{
  position: fixed; bottom: 0; left:0; width:100%; z-index:1000; margin-top: 20px;
}
.el-footer:before{content:'';width:100%;border-top:1px solid #ddd;height:0;
  position:absolute;top:0;left:0;}

img{
  display: block;
  width:100%;
}


  .img-proFlow {
    max-width: 960px;
  }

  .img-logo{
    float:left;
    /*margin-left:10px;*/
    max-width:250px;
  }

  #logoIndex{
    width: 20%;
  }

  #user{
    width: 80%;

  }

  .intro-title{
    padding:10px 0;display: block;font-weight:bold;
  }

.fr{float:right !important;} .fl{float:left !important;} .ovw-h{overflow:hidden;}
  .mb20{margin-bottom:20px !important;} .mr20{margin-right:20px !important;} .mt20{margin-top:20px !important;}

  .border {
    border:1px solid #333;
    padding:5px 10px;
    box-sizing:border-box;
  }

.reportForm .el-form-item__label { text-align:center !important; background-color: #409eff !important; color: #fff !important;border-radius: 2px;padding: 0;}
.reportForm .el-input.is-disabled .el-input__inner { margin: 0 5px;box-sizing:border-box; color: #000 !important;}
.textarea .el-textarea__inner {margin: 0 5px; color:#000 !important;}

.g-labels { left: 20px !important; }

.timeLine { border:1px solid #aaa;border-right:none;font-size:12px;text-align:center;width:39px; }
.g-labels .g-label:last-child .timeLine { border-right:1px solid #aaa; }


//动态数据 -- 不合格报告
.label:before{content:'';position:absolute; left:100px;top:0;height:100vh;border-right:1px dashed;}
.label:after{content:'' !important;position:absolute; left:0;bottom:0;width:100%;border-bottom:1px dashed;display:block !important;}
.label:last-child:after{content:'';border-bottom:none;}

//菜单项
  .el-submenu .el-menu-item{font-size:12px;}
</style>
