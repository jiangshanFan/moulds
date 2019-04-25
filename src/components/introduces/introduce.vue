<template>
  <div id="main-introduce">
    <div class="item-toggle">
      <!--<el-tag class="mr20">项目流程介绍：</el-tag>-->
      <el-row class="flex_row_container_left pl40 mb20">
        <img src="../../assets/home1920/home.png" alt="项目介绍" style="height:40px;width:auto;margin-right:20px;">
        <el-button type="plain" size="mini" round @click="childClose" class="active">收起</el-button>
      </el-row>
      <p style="text-align:center;" v-if="show"><img src="../../assets/home1920/home-01.png" alt=""></p>
    </div>
    <hr>

    <!-- 第一版 class="img-proFlow"-->
    <!--<el-tag class="mr20">银宝山新：</el-tag>-->
    <!--<el-row :gutter="20" class="posr" style="margin:20px -10px;">-->
      <!--<el-col :span="12"><div class="grid-content bg-purple"><img src="../../assets/home/home-02.png" alt=""></div></el-col>-->
      <!--<el-col :span="12">-->
        <!--<div class="grid-content bg-purple-light">-->
          <!--<span class="line-cut">银宝山新</span>-->
          <!--<el-button type="primary" class="lookMore" size="mini">查看更多...</el-button>-->
        <!--</div>-->
      <!--</el-col>-->
    <!--</el-row>-->
    <!-- 第一版 -->
    <el-row class="posr">
      <el-row class="flex_row_container_left pl40 mb20 mt20">
        <img src="../../assets/home1920/home-02-01.png" alt="银宝山新简介" style="height:40px;width:auto;margin-right:20px;">
      </el-row>
      <div class="grid-content bg-purple"><img src="../../assets/home1920/home-02.png" alt=""></div>
    </el-row>
    <hr>

    <el-row class="flex_row_container_left pl40 mb20 mt20">
      <img src="../../assets/home1920/home-04.png" alt="新技术简介" style="height:40px;width:auto;margin-right:20px;">
    </el-row>
    <el-row class="pl60 mb20">
      <el-button type="plain" round size="mini" :autofocus="laser" :class="{active: isActive}" @click="isActive = true">激光雕刻</el-button>
      <el-button type="plain" round size="mini" style="margin-left:0;" :class="{active: !isActive}" @click="isActive = false">3D打印</el-button>
    </el-row>
    <img src="../../assets/home1920/home-laser.png" alt="激光雕刻" v-if="isActive" @click="goto('newTec',0)">
    <img src="../../assets/home1920/home-3D.png" alt="3D打印" v-if="!isActive" @click="goto('newTec',1)">
  </div>
</template>

<script>
    export default {
      name: "introduce",
      props: ["realshow"],
      data () {
        return {
          tabs: '3D',
          show: this.realshow, //将父组件传来的值进行重新赋值，避免子组件直接操作父组件传来的参数

          laser:true,
          isActive: true,
        }
      },
      methods: {
        goto(path,arg) {
          this.$router.push(path);
          this.$store.dispatch('newTec_detail',arg);
        },

        handleClick(tab, event) {
          console.log(tab, event);
        },
        moreInfo(tabs) {
          this.$router.push({name: 'newTec', params: {id: tabs}})
        },
        childClose: function(e) {
          if (this.show === false) {
            this.show = true; //改变的只是组件内部的值，不会报错了
            e.target.innerHTML = '收起';
          }else {
            this.show = false;
            e.target.innerHTML = '展开';
          }
          this.$emit('childClose');
        }
      },
      watch: {
        realshow: function name(params) {
          this.show = this.realshow;     //用watch属性对父组件传来的realshow值进行监听，如果改变，我们相应的也对子组件内部的值进行改变
        }
      }
    }
</script>

<style scoped>
  @import url('../../style/common.css');
  .line-cut{
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
    -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
    -webkit-line-clamp: 3; /** 显示的行数 **/
    overflow: hidden;  /** 隐藏超出的内容 **/
    letter-spacing:1px;
    line-height:24px;
  }

  .img-proFlow{display:inline-block;}
  .posr{position:relative;}

  .lookMore{position:absolute;bottom:5px;right:10px;}


  /*详情是否触发*/
  .active{background-color:#4580EE !important;color:#fff !important;}
</style>
