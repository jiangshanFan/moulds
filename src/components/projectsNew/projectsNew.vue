<template>
  <div id="projectsNew" style="padding:20px;">
    <el-row :gutter="40" style="display:flex;flex-direction:column;align-items:center;">
      <el-col style="max-width:650px;">
        <div class="flex_column_container mb20" style="box-shadow:0px 3px 8px 0px rgba(0, 0, 0, 0.35);padding:20px;height:220px;">
          <span class="flex_item fwb mb20" style="font-size:18px;">手动添加单个模具项目完整信息</span>
          <el-button class="flex_column_item button fwb f14" type="primary" size="medium" @click="$goto('/itemAddSingle')">手动添加</el-button>
          <!--<el-button type="plain" size="small" class="flex_column_item button">合同评审表</el-button>-->
          <!--<el-button type="plain" size="small" class="flex_column_item button">工程任务书</el-button>-->
          <!--<el-button type="plain" size="small" class="flex_column_item button">项目总进度计划表</el-button>-->
        </div>
      </el-col>

      <el-col style="max-width:650px;height:220px;">
        <div class="flex_column_container" style="box-shadow:0px 3px 8px 0px rgba(0, 0, 0, 0.35);padding:20px;height:220px;">
          <span class="flex_item fwb mb20" style="font-size:18px;">Excel标准模板下载</span>

          <div class="container">
            <a href="/pic/temp/Mold Contract Review Form.xlsx"><el-button class="item-a" type="plain" size="small">合同评审表下载</el-button></a>
            <a href="/pic/temp/Mold Design & Manufactue Planning.xlsx"><el-button class="item-b" type="plain" size="small">项目总进度表下载</el-button></a>
            <a href="#"><el-button class="item-c" type="plain" size="small">工程任务书下载</el-button></a>
            <a href="#"><el-button class="item-d" type="plain" size="small">加工进度计划表下载</el-button></a>
          </div>
        </div>
      </el-col>

      <!--<el-col :span="24">-->
        <!--<div class="flex_column_container mt20" style="box-shadow:0px 3px 8px 0px rgba(0, 0, 0, 0.35);padding:20px;">-->
          <!--<span class="flex_item fwb mb20" style="font-size:18px;">手动填写项目信息</span>-->
          <!--<div class="flex_row_container">-->
            <!--<div class="flex_column_container " style="padding-right:40px;border-right:1px solid #EEEEEE;">-->
              <!--<span>分批填写项目信息</span>-->
              <!--<el-button type="plain" size="small" class="flex_column_item button">合同评审表</el-button>-->
              <!--<el-button type="plain" size="small" class="flex_column_item button">工程任务书</el-button>-->
              <!--<el-button type="plain" size="small" class="flex_column_item button">项目总进度计划表</el-button>-->
            <!--</div>-->
            <!--<div class="flex_column_container" style="padding-left: 40px;">-->
              <!--<span>录入单个模具项目完整信息</span>-->
              <!--<el-button type="plain" size="small" class="flex_column_item button" @click="$goto('/itemAdd')">录入</el-button>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</el-col>-->
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "projectsNew",
    data() {
      return {

      }
    }
  }
</script>

<style scoped>
  @import url('../../style/common.css');

  .container {
    display: grid;
    grid-template-columns: 150px 150px;
    grid-template-rows: auto auto;
    grid-gap: 20px;
  }
  .item-a,
  .item-b,
  .item-c,
  .item-d {
    width:100%;
    margin: 0;
  }
</style>
