<template>
    <div id="settings">
      <!-- style="box-shadow: rgba(0, 0, 0, 0.35) 0 3px 8px 0;padding: 20px;"-->
      <div class="ovw-h mb20">
        <span>基本信息：</span>
        <hr>
        <!--<el-button type="primary" plain round size="mini" @click="dialogFormVisible = true">修改</el-button>-->
        <el-row class="ovw-h" :gutter="40">
          <el-col :span="8">用户名：<b>{{form.userName}}</b></el-col>
          <el-col :span="8">账户名称：<b>{{form.accountName}}</b></el-col>
          <el-col :span="8">用户角色：<b>{{form.role?form.role.roleName:''}}</b></el-col>

          <!--<el-col :span="12"><div><span class="mr20">密码：{{form.password}}</span></div></el-col>  <el-button type="primary" plain size="mini">修改密码</el-button> -->
          <el-col :span="8">所属国家/区域：<b>{{form.area}}</b></el-col>
          <el-col :span="8">所属公司/部门：<b>{{form.organize}}</b></el-col>
          <el-col :span="8">联系方式：<b>{{form.mobile}}</b></el-col>
          <el-col :span="8">邮箱地址：<b>{{form.mail}}</b></el-col>
        </el-row>
      </div>

      <!--<hr> &lt;!&ndash;  style="box-shadow:0px 3px 8px 0px rgba(0, 0, 0, 0.35);padding:20px;" &ndash;&gt;-->
      <!--<div class="ovw-h mt20 mb20" v-if="roleCode !== 'XIANGMUWENYUAN' && roleCode !== 'WULIUADMIN' && roleCode !== 'XIANGMUZHUGUAN'">-->
        <!--<span>项目提醒设置：</span>-->
        <!--<el-button type="primary" plain round size="mini" @click="gotoSet('/remind',{})" :disabled="warnList.length === 6" :title="warnList.length === 6?'已达最大新增数，谢谢！': ''">+ 新增</el-button>-->
        <!--<el-row :gutter="60" class="mt20">-->
          <!--<el-button type="primary" plain round size="mini" style="margin-left:30px;" v-for="item in warnList" :key="item.id" @click="gotoSet('/remind',item)">{{item.warnName}}</el-button>-->
        <!--</el-row>-->
      <!--</div>-->

      <!--<hr class="mt20">-->
      <!--<span>权限管理：</span>-->
      <!--<el-row :gutter="40">-->
        <!--<el-col :span="8">项目分配设置：</el-col>-->
        <!--<el-col :span="16"><el-button type="primary" plain size="mini" @click="$goto('itemsAllocation')">设置</el-button></el-col>-->
        <!--<el-col :span="8">用户管理</el-col>-->
        <!--<el-col :span="16"><el-button type="primary" plain size="mini" @click="$goto('userManage')">设置</el-button></el-col>-->
      <!--</el-row>-->

      <!--&lt;!&ndash; Form &ndash;&gt;-->
      <!--<el-dialog title="修改基本参数" :visible.sync="dialogFormVisible" width="50%" center>-->
        <!--<hr>-->
        <!--<el-form :model="form1" status-icon :rules="rules" ref="ruleForm" label-width="120px" label-position="right" class="mt20">-->
          <!--<el-form-item label="联系方式：" v-if="changeFlag === 1">-->
            <!--<el-input v-model="form1.mobile" placeholder="请输入您的联系方式" clearable></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="邮箱地址：" v-if="changeFlag === 1">-->
            <!--<el-input v-model="form1.mail" placeholder="请输入您的邮箱地址" clearable></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="原密码：" prop="oldPass" v-if="changeFlag !== 1">-->
            <!--<el-input type="password" v-model="form1.oldPass" autocomplete="off" clearable></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="新密码：" prop="pass" v-if="changeFlag !== 1">-->
            <!--<el-input type="password" v-model="form1.password" autocomplete="off" clearable></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="确认新密码：" prop="checkPass" v-if="changeFlag !== 1">-->
            <!--<el-input type="password" v-model="form1.checkPass" autocomplete="off" clearable></el-input>-->
          <!--</el-form-item>-->

        <!--</el-form>-->
        <!--<div slot="footer" class="dialog-footer">-->
          <!--<el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>-->
          <!--<el-button @click="dialogFormVisible = false">取 消</el-button>-->
        <!--</div>-->
      <!--</el-dialog>-->

    </div>
</template>

<script>
  import { Message } from 'element-ui';
  // /** 导入api.js */
  // import {getWarnList, } from '../../axios/api.js'

  export default {
    name: "settings",
    inject: ['reload'],
    created: async function() {
      // //获取提醒列表
      // let res = await getWarnList();
      // if(res.status === 1) {
      //   this.warnList = res.msg;
      // }
      //
      // this.roleCode = JSON.parse(localStorage.getItem('userLoginVO')).role.roleCode;
    },
    mounted() {
      //获取用户信息
      this.form = JSON.parse(localStorage.getItem('userLoginVO'));
      // this.form1 = {
      //   mobile: this.form.mobile,
      //   mail: this.form.mail,
      // }
    },
    updated() {
      //获取用户信息
      // this.reload();
    },

    watch: {
      changeFlag: function () {
        this.form = this.changeFlag;
      }
    },

    methods: {
//修改提醒
      gotoSet(path,item) {
        this.$store.dispatch('warn_change',item);
        this.$goto(path);
      },
    },
    data () {
      return {
        //提醒设置
        warnList: [],

        roleCode: '',

        form: {

        },

        //修改基本参数或密码的flag
        changeFlag: JSON.parse(localStorage.getItem('userLoginVO')),

        //弹框
        dialogFormVisible: false,
        form1: {
          mobile: '',
          mail: '',
          oldPass: '',
          password: '',
          checkPass: '',
        }, //添加账户以及编辑账户入口对象
        rules: {
          // pass: [
          //   { validator: validatePass, trigger: 'blur' }
          // ],
          // checkPass: [
          //   { validator: validateCheckPass, trigger: 'blur' }
          // ]
        },
      }
    },
  }
</script>

<style scoped>
  .el-row{padding-left:60px;}
  .el-col{line-height:60px;}
</style>
