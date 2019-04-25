<template>
    <div id="itemProgress">
      <el-button type="primary" size="mini" @click="$goback">返回</el-button>
      <!-- 搜索 -->
      <div class="section-search mb20 mt20">
        <el-row>
          <el-col :span="24">
            <div class="fl mr20 disn">
              <span>制品名称：</span>
              <el-input v-model="value" clearable style="width:calc(100% - 100px);"></el-input>
            </div>
            <div class="fl mr20">
              <span>模具编号：</span>
              <el-input v-model="value1" clearable style="width:calc(100% - 100px);"></el-input>
            </div>
            <el-button type="primary" icon="el-icon-search" class="fl" @click="search"></el-button>
          </el-col>
        </el-row>
      </div>
      <hr>
      <!-- 项目详情info -->
      <div class="itemProgressInfo mt20">
        <el-row type="flex" justify="space-around" class="mb20" style="font-weight:bold;font-size:16px;">
          <el-col :span="8">项目名称：{{detail.projectName}}</el-col>
          <el-col :span="8">模具编号：{{detail.mouldNo}}</el-col>
          <el-col :span="8">制品名称：{{detail.partName}}</el-col>
        </el-row>
        <el-row type="flex" justify="space-around">
          <el-col :span="8">
            <p>银宝山新项目经理：{{detail.projectManager}}</p>
            <p>当前项目状态：{{detail.status === 'URGENT'? '紧急' : detail.status === 'DELAY'? '延期' : detail.status === 'NORMAL'? '正常' : '完结'}}</p>
            <p><span style="padding-right:10px;">已发布图纸：{{info.issueDrawingCount}}张</span><el-button size="mini" type="plain" @click="checkDetail('1')">查看</el-button></p>
            <p><span style="padding-right:10px;">送样：{{info.sendingSampleCount}}次</span><el-button size="mini" type="plain" @click="checkDetail('4')">查看</el-button></p>
          </el-col>
          <el-col :span="8">
            <p>我司项目负责人：{{detail.customerUserName}}</p>
            <p>项目启动时间：{{detail.projectStartTime}}</p>
            <p><span style="padding-right:10px;">已加工零部件：{{info.machiningPartCount}}个</span><el-button size="mini" type="plain" @click="checkDetail('2')">查看</el-button></p>
            <p><span style="padding-right:10px;">走模状态：{{info.mouldShipment}}</span><el-button size="mini" type="plain" @click="checkDetail('5')">查看</el-button></p>
          </el-col>
          <el-col :span="8">
            <p>当前项目节点：{{detail.projectNode}}</p>
            <p>预期T1时间：{{detail.expectT1Time}}</p>
            <p><span style="padding-right:10px;">试模：{{info.testMouldCount}}次</span><el-button size="mini" type="plain" @click="checkDetail('3')">查看</el-button></p>
          </el-col>
        </el-row>
      </div>
    </div>
</template>

<script>
  import { Message } from 'element-ui';
  /** 导入api.js */
  import {getProjectProgressInfo, getProjectInfoList} from '../../axios/api.js'

  export default {
    name: "itemProgress",
    created: async function() {
//获取项目信息统计列表
      this.detail = this.$store.getters.customItems_detail;
      let res = await getProjectProgressInfo({mouldNo: this.detail.mouldNo});
      if(res.status === 1) {
        this.info = res.msg;
      }
    },
    methods: {
//搜索项目进度详情
      async search() {
        let params = {};
        if(this.value !== '') {
          params.partName = this.value;
        }
        if(this.value1 !== '') {
          params.mouldNo = this.value1;
          let res = await getProjectProgressInfo(params);
          if(res.status === 1) {
            this.info = res.msg;
          }
          let res1 = await getProjectInfoList({page: 1, size: 5, mouldNo: this.value1});
          if(res1.status === 1) {
            this.detail = res1.msg.content[0];
          }
        }else {
          Message({showClose: true, type: 'warning', message: '请填入相应的模号！'})
        }
        // console.log(params);

      },

//点击查看按钮，传递 type 参数，跳转不同的详情页面
      checkDetail(type) {
        switch (type) {
          case '1':
            this.$store.dispatch('customItems_detailType', {type: 1, detail: {...this.detail, ...this.info}});
            break;
          case '2':
            this.$store.dispatch('customItems_detailType', {type: 2, detail: {...this.detail, ...this.info}});
            break;
          case '3':
            this.$store.dispatch('customItems_detailType', {type: 3, detail: {...this.detail, ...this.info}});
            break;
          case '4':
            this.$store.dispatch('customItems_detailType', {type: 4, detail: {...this.detail, ...this.info}});
            break;
          case '5':
            this.$store.dispatch('customItems_detailType', {type: 5, detail: {...this.detail, ...this.info}});
            break;
        }
        this.$router.push('/itemProgressDetail');
      },
    },
    data () {
      return {
        //进度详情信息
        detail: {}, //列表传过来的参数对象
        info: {},

        //搜索
        value: '',
        value1: '',
      }
    }
  }
</script>

<style scoped>

</style>
