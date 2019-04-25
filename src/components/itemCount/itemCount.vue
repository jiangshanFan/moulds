<template>
    <div id="itemCount">
      <el-button type="primary" size="mini" class="mb20" @click="$goback">返回</el-button>
      <!-- 搜索 -->
      <div class="section-search mb20 mt20">
        <el-row>
          <el-col :span="24">
            <div class="fl mr20 mb20">
              <span>项目阶段：</span>
              <el-select v-model="project.projectStage" placeholder="请选择" clearable>
                <el-option v-for="item in options.projectStage" :key="item.id" :label="item.label" :value="item.id"></el-option>
              </el-select>
            </div>
            <div class="fl mr20 mb20">
              <span>项目状态：</span>
              <el-select v-model="project.status" placeholder="请选择" clearable>
                <el-option v-for="item in options.status" :key="item.id" :label="item.label" :value="item.id"></el-option>
              </el-select>
            </div>

            <div class="fl mr20 mb20">
              <span>项目名称：</span>
              <el-input v-model="value" clearable style="width:calc(100% - 100px);"></el-input>
            </div>
            <div class="fl mr20 mb20">
              <span>模具编号：</span>
              <el-input v-model="value1" clearable style="width:calc(100% - 100px);"></el-input>
            </div>
            <div class="fl mr20 mb20">
              <span>制品名称：</span>
              <el-input v-model="value2" clearable style="width:calc(100% - 100px);"></el-input>
            </div>

            <el-button type="primary" icon="el-icon-search" class="fl" @click="getListInfo()"></el-button>
          </el-col>
        </el-row>
      </div>
      <hr>
      <!-- 表格数据展示 -->
      <div class="table">
        <!-- 按钮 -->
        <div class="buttons">
          <el-button type="primary" @click="$goto('/itemAdd')">添加新项目</el-button>
          <el-button type="plain" size="small">报表导出</el-button>
          <el-button type="plain" size="small" @click="$goto('/itemCheck')">项目查看</el-button>
        </div>

        <!-- 数据 -->
        <div class="data">
          <el-table :data="tableData.content" border style="width: 100%;margin-top:30px;">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column type="index" label="序号" width="60"></el-table-column>
            <el-table-column prop="mouldNo" label="模具编号" width="180"></el-table-column>
            <el-table-column prop="projectName" label="项目名称" width="180"></el-table-column>
            <el-table-column prop="partName" label="制品名称" width="180"></el-table-column>
            <el-table-column prop="userName" label="客户名称" width="180"></el-table-column>
            <el-table-column prop="img" label="图片" width="250">
              <template slot-scope="scope">
                <img :src="scope.row.imgUrl" alt="图片">
              </template>
            </el-table-column>
            <el-table-column prop="partNo" label="制品尺寸" width="120"></el-table-column>
            <el-table-column prop="moldingMachineTonnage" label="成型机吨位(T)"></el-table-column>
            <el-table-column prop="material" label="制品材料" width="100"></el-table-column>
            <!--<el-table-column prop="material" label="计划试模时间" width="100"></el-table-column>-->
            <el-table-column prop="runner" label="热流道" width="100"></el-table-column>
            <el-table-column prop="cavityQty" label="模腔数量"></el-table-column>
            <el-table-column prop="projectNode" label="当前节点"></el-table-column>
            <el-table-column prop="updateTime" label="最新试模时间"></el-table-column>
            <el-table-column prop="projectStage" label="项目阶段">
              <template slot-scope="scope">
                <span>{{scope.row.projectStage === 'DESIGN'? '设计' :
                        scope.row.projectStage === 'SHIPMENTMOULD'? '走模' :
                        scope.row.projectStage === 'PAYOFF'? '客户已付完款' :
                      scope.row.projectStage === 'PROCESS'? '加工' : '精修'}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="status" label="项目状态">
              <template slot-scope="scope">
                <span>{{scope.row.status === 'URGENT'? '紧急' :
                      scope.row.status === 'DELAY'? '延期' :
                      scope.row.status === 'NORMAL'? '正常' : '完结'}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="projectDescribe" label="当前项目描述"></el-table-column>
            <el-table-column prop="dept" label="制模部门"></el-table-column>
            <el-table-column prop="proGroupLeader" label="制模组长"></el-table-column>
            <el-table-column prop="designGroupLeader" label="设计组长"></el-table-column>
            <el-table-column fixed="right" label="操作" width="80">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" size="small" type="primary" plain>编辑</el-button>
              </template>
            </el-table-column>
          </el-table>

          <div class="pagination fr ovw-h mt20">
            <el-pagination @current-change="handleCurrentChange"
                           :current-page="currentPage" :page-size="5"
                           layout="total, prev, pager, next"
                           :total="tableData.totalCount">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import { Message } from 'element-ui';
  /** 导入api.js */
  import {getProjectStatistics,getProjectStrageList, getProjectStatusList} from '../../axios/api.js'

  export default {
    name: "itemCount",
    created: async function() {
      //项目阶段、项目状态下拉列表请求
      let stage = await getProjectStrageList();
      this.options.projectStage = this.$objToOthers(stage.msg);
      let status = await getProjectStatusList();
      this.options.status = this.$objToOthers(status.msg);
      console.log(this.options);

      //获取项目统计列表接口数据
      this.getListInfo();
    },
    methods: {
      //获取项目统计列表接口数据--封装函数
      async getListInfo(val) {
        let params = {size:5,};
        if(val) {params.page = val;}else {params.page = 1;}
        if(this.value) {params.projectName = this.value;}
        if(this.value1) {params.mouldNo = this.value1;}
        if(this.value2) {params.partName = this.value2;}
        if(this.project.projectStage) {params.projectStage = this.project.projectStage;}
        if(this.project.status) {params.status = this.project.status;}
        let res = await getProjectStatistics(params);
        if(res.status === 1) {
          this.tableData = res.msg;
        }
      },

      //点击页码获取列表数据
      handleCurrentChange(val) {
        this.getListInfo(val);
        this.currentPage = val;
        console.log(`当前页: ${val}`);
      },
      handleClick(row) {
        this.$store.dispatch('itemCheck_item',row);
        this.$router.push('/itemAdd');
      }
    },
    data () {
      return {
        /** 搜索 */
        //项目阶段、状态等options
        options: {
          projectStage: [],
          status: [],
        },
        project: {//基本信息中的项目信息

        },
        value:'',
        value1: '',
        value2: '',

        //表格数据
        currentPage: 1,
        tableData: {table: [],},
      }
    }
  }
</script>

<style scoped>

</style>
