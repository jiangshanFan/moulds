<template>
  <div id="feedback-detail">
    <!-- 搜索 -->
    <!--<div class="section-search mb20">-->
    <!--<el-row>-->
    <!--<el-col :span="24">-->
    <!--<div class="fl mr20">-->
    <!--<span>制品名称：</span>-->
    <!--<el-select-->
    <!--v-model="value" filterable remote reserve-keyword-->
    <!--placeholder="请输入制品名称"-->
    <!--:remote-method="remoteMethod"-->
    <!--:loading="loading">-->
    <!--<el-option-->
    <!--v-for="item in options" :key="item.value" :label="item.label" :value="item.value">-->
    <!--</el-option>-->
    <!--</el-select>-->
    <!--</div>-->
    <!--<div class="fl mr20">-->
    <!--<span>模具编号：</span>-->
    <!--<el-select-->
    <!--v-model="value" filterable remote reserve-keyword-->
    <!--placeholder="请输入模号"-->
    <!--:remote-method="remoteMethod"-->
    <!--:loading="loading">-->
    <!--<el-option-->
    <!--v-for="item in options" :key="item.value" :label="item.label" :value="item.value">-->
    <!--</el-option>-->
    <!--</el-select>-->
    <!--</div>-->
    <!--<el-button type="primary" icon="el-icon-search" class="fl"></el-button>-->
    <!--</el-col>-->
    <!--</el-row>-->
    <!--</div>-->
    <!--<hr>-->
    <el-button type="primary" size="medium" round class="mb20" @click="back">返回</el-button>
    <div class="title" style="text-align: center;">
      <el-row style="font-size:14px;">标题：{{item.title}}</el-row>
    </div>
    <div class="border mb20" style="padding:20px;box-sizing:border-box;">
      <el-row :gutter="20">
        <el-col :span="6"><div class="grid-content bg-purple"><span>制品名称：{{item.partName}}</span></div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"><span>模具编号：{{item.mouldNo}}</span></div></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6"><div class="grid-content bg-purple"><span>客户名称：{{item.custom}}</span></div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"><span>客户联系人：{{item.customer}}</span></div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"><span>走模时间：{{item.sendTime}}</span></div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"><span>销售负责人：{{item.sales}}</span></div></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6"><div class="grid-content bg-purple"><span>客户联系人邮箱：{{item.customerEmail}}</span></div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"><span>客户联系人电话：{{item.customerPhone}}</span></div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"><span>模具使用：{{item.normal? '正常':'异常'}}</span></div></el-col>
      </el-row>
    </div>
    <div id="mainContent" class="border mb20" style="padding:20px 40px;">
      <div id="customer">
        <el-row :gutter="10">
          <el-col :span="24">问题描述：</el-col>
        </el-row>

        <el-row :gutter="10" class="border">
          <el-col :span="24">
            <div class="grid-content">
              <el-row :gutter="10">
                <el-col :span="6" v-for="(i, index) in item.imgeUrl" :key="index"><img :src="i" :alt="i" class="mb20"></el-col>
              </el-row>

              <el-col :span="24" style="font-size:12px;font-weight:normal;">{{item.details}}</el-col>
            </div>
          </el-col>
        </el-row>
      </div>

      <div id="self">
        <el-row :gutter="10" style="font-size:12px;font-weight:normal;" class="mt20 border" v-for="(item, index) in answers" :key="index">
          <el-col :span="24">{{item.type === '0'? ('银宝山新 ' + item.roleName +': ') : item.organize + ': '}}{{item.userName}}</el-col>
          <el-col :span="24" style="padding-left:20px;box-sizing:border-box;">{{item.details}}</el-col>
          <el-col :span="8" :offset="16" align="right">提交时间：{{item.createTime}}</el-col>
        </el-row>
      </div>
    </div>
    <el-button type="primary" size="small" @click="dialogVisible = true">添加回复</el-button>

    <!-- 反馈弹框 -->
    <el-dialog title="继续回复" :visible.sync="dialogVisible" center>
      <el-form :model="form">
        <el-form-item label="回复内容:">
          <el-input v-model="form.details" autocomplete="off" type="textarea" :autosize="{minRows:10,maxRows:10}"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="add(form)">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { Message } from 'element-ui';
  /** 导入api.js */
  import {getFeedBackDetailList,againAddFeedBackInner} from '../../axios/api.js'
  export default {
    name: "mine",
    created: async function() {
      //获取反馈列表跳转详情的参数信息
      this.item = this.$store.getters.getFeedbackDetailInfo;
      //图片
      let imgeUrl = this.item.imgeUrl;
      if(imgeUrl.length > 1 && imgeUrl !== undefined && imgeUrl !== null) {
        if(imgeUrl.charAt(imgeUrl.length - 1) === '|') {
          this.item.imgeUrl = imgeUrl.substr(0,imgeUrl.length - 1).split('|');
        }else {
          this.item.imgeUrl = imgeUrl.split('|');
        }
      }

      //获取对话列表
      this.answers = (await getFeedBackDetailList({parentId: this.item.id})).msg;
    },
    methods: {
      back() {
        this.$router.go(-1);
      },
// 添加反馈
      async add (form) {
        if(form.details !== undefined && form.details !== '' && form.details !== null) {
          let res = await againAddFeedBackInner({mouldNo: this.item.mouldNo, details: form.details, parentId: this.item.id});
          if(res.status === 1) {
            this.answers = (await getFeedBackDetailList({parentId: this.item.id})).msg;
          }
          this.dialogVisible = false;
        }else {
          this.$message({showClose: true, type: 'warning', message: '请填写完整内容！'})
        }
      }
    },
    data () {
      return {
        //反馈列表跳转详情的参数信息
        item: {},

        //图片地址数组
        imgUrl: [],

        //对话列表数组
        answers: [],

        //弹框信息
        form: {},
        dialogVisible: false, //弹框是否显示
      }
    },
  }
</script>

<style scoped>
  .el-row {
    line-height:30px;
    font-weight:bold;
    color:#333;
    font-size:13px;
  }
</style>
