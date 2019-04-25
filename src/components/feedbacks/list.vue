<template>
  <div id="all-list">
    <el-button type="primary" size="small" class="mb20" @click="$goto('/add','')">新增反馈</el-button>
    <div class="list border ovw-h" style="padding:0 10px;box-sizing: border-box;">
      <el-row :gutter="20" class="mb20" v-for="(item, index) in list.content" :key="index">
        <el-col :span="8">
          <div class="grid-content bg-purple imgbox">
            <img :src="item.imgUrl" :alt="item.imgUrl">
          </div>
        </el-col>
        <el-col :span="16" style="position:relative;height:360px;overflow:hidden;">
          <el-row class="mainInfo">
            <el-row :gutter="10" style="font-size:14px;">标题：{{item.title}}</el-row>
            <el-row :gutter="10">
              <el-col :span="8">提交时间：{{item.createTime}}</el-col>
              <el-col :span="8">提交人：{{item.userName}}</el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="8">制品名称：{{item.partName}}</el-col>
              <el-col :span="8">模具编号：{{item.mouldNo}}</el-col>
              <el-col :span="8">银宝山新项目经理：{{item.projectManager}}</el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="8">项目经理联系方式：{{item.projectManagerPhone}}</el-col>
              <el-col :span="16">项目经理邮箱：{{item.projectManagerEmail}}</el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="24"><div class="grid-content bg-purple"><span class="content">{{item.details}}</span></div></el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="6" :offset="18">
                <div class="grid-content bg-purple" style="margin-top:20px;">
                  <el-button type="primary" @click="lookDetail(item)" size="small">查看详情</el-button>
                </div>
              </el-col>
            </el-row>
          </el-row>
        </el-col>
        <hr>
      </el-row>

      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="5"
        layout="total, prev, pager, next"
        :total="list.totalCount">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import { Message } from 'element-ui';
  /** 导入api.js */
  import {getFeedBackList} from '../../axios/api.js'
  export default {
    name: "list",
    mounted: async function() {
      /** 查询反馈列表 */
      let res = await getFeedBackList({page:1, size: 5});
      this.list = res.msg;
      if(this.list.content !== undefined && this.list.content !== null) {
        for(let i of this.list.content) {
          if(i.imgeUrl !== undefined && i.imgeUrl !== null) {
            let img = i.imgeUrl.split('|');
            console.log(img);
            i.imgUrl = img[0];
          }
        }
      }
    },
    created: function() {

    },
    data () {
      return {
        currentPage: 1,
        //列表数据
        list: {},

        //查看详情需要传递的参数信息
        detailInfo: {},
      }
    },
    watch:{
      $route(to,from){ //跳转组件页面后，监听路由参数中对应的当前页面以及上一个页面
        console.log(to);
        // if(to.name=='book'||to.name=='my'){ // to.name来获取当前所显示的页面，从而控制该显示或隐藏footerBar组件
        //   this.$store.dispatch('showFooter') // 利用派发全局state.showFooter的值来控制
        // this.$store.dispatch('getNewFeedbackDetailInfo', this.detailInfo)  //this.detailInfo 要变化的实参
      }
    },
    methods: {
//点击页数查询列表
      async handleCurrentChange(val) {
        let res = await getFeedBackList({page:val, size: 5});
        this.list = res.msg;
        if(this.list.content !== undefined && this.list.content !== null) {
          for(let i of this.list.content) {
            if(i.imgeUrl !== undefined && i.imgeUrl !== null) {
              let img = i.imgeUrl.split('|');
              console.log(img);
              i.imgUrl = img[0];
            }
          }
        }
        console.log(`当前页: ${val}`);
      },

//获取详情信息，需要传递当前反馈的全部信息
      lookDetail(item) {
        this.detailInfo = item;
        this.$store.dispatch('getNewFeedbackDetailInfo', this.detailInfo);  //this.detailInfo 要变化的实参
        this.$router.push('/detail');
      }
    },
  }
</script>

<style scoped>
  #feedback-list {
    border: 1px solid #000;
    padding: 20px 40px;
    box-sizing: border-box;
  }
  .border {
    border:1px solid #333;
    padding:5px 10px;
    box-sizing:border-box;
  }
  .imgbox{
    position: relative;
    height: 360px;
  }
  .imgbox img{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    max-width: 100%;
    max-height: 100%;
    /*outline: 1px solid #000;*/
  }
  .mainInfo {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translate(0,-50%);
    width:calc(100% - 20px);
  }
  .mainInfo .el-row {
    line-height:30px;
    font-weight:bold;
    color:#333;
    font-size:13px;
  }
  span {
    word-break:break-all;
  }
  span.content {
    font-weight:normal;
    text-overflow: ellipsis;
    display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
    -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
    -webkit-line-clamp: 5; /** 显示的行数 **/
    overflow: hidden;  /** 隐藏超出的内容 **/
    letter-spacing:1px;
    line-height:24px;
    font-size:13px;
  }
  .el-pagination {
    float:right;
    margin:10px;
  }
</style>
