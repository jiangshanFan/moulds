<template>
    <div id="itemInfo">
      <!-- 搜索 -->
      <div class="section-search mb20 mt20">
        <el-row>
          <el-col :span="24">
            <div class="fl mr20">
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
      <!-- 项目统计 -->
      <div class="items mt20" style="padding-left:30px;">
        <el-tag type="info">项目统计：</el-tag>
        <el-table :data="table.content" border style="width: 100%;margin-top:30px;" tooltip-effect="dark">
          <el-table-column type="index" width="50" label="序号" align="center" :index="(index) => this.$indexS(index, currentPage, size)"></el-table-column>
          <el-table-column prop="partName" label="制品名称" show-overflow-tooltip align="center"></el-table-column>
          <el-table-column prop="mouldNo" label="模具编号" width="180" align="center"></el-table-column>
          <el-table-column prop="projectManager" label="银宝山新项目经理" width="160" align="center"></el-table-column>
          <el-table-column prop="customerUserName" label="项目负责人" width="100" align="center"></el-table-column>
          <el-table-column prop="status" label="项目状态" width="100" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.status === 'URGENT'? '紧急' :
                      scope.row.status === 'DELAY'? '延期' :
                      scope.row.status === 'NORMAL'? '正常' : '完结'}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="projectNode" label="项目节点" width="120" show-overflow-tooltip align="center"></el-table-column>
          <el-table-column prop="projectStartTime" label="项目启动时间" width="120" align="center"></el-table-column>
          <el-table-column prop="expectT1Time" label="预期T1时间" width="120" align="center" show-overflow-tooltip>

          </el-table-column>
          <el-table-column prop="remark" label="备注" width="100" show-overflow-tooltip align="center"></el-table-column>
          <el-table-column fixed="right" label="操作" width="100" align="center">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" size="small" type="primary" plain>查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination fr ovw-h">
        <el-pagination @current-change="handleCurrentChange"
                       :current-page="currentPage" :page-size="size"
                       layout="total, prev, pager, next"
                       :total="table.totalCount" v-if="table.totalCount">
        </el-pagination>
      </div>
    </div>
</template>

<script>
  import { Message } from 'element-ui';
  /** 导入api.js */
  import {getProjectInfoList} from '../../axios/api.js'

  export default {
    name: "itemInfo",
    created: async function() {
//获取项目信息统计列表
      let res = await getProjectInfoList({page: 1, size: this.size,});
      if(res.status === 1) {
        this.table = res.msg;
      }
    },
    methods: {
//点击页码调用送样/走模接口数据
      async handleCurrentChange(val) {
        this.currentPage = val;
        let params = {page:val,size: this.size,};
        if(this.value !== '') {
          params.partName = this.value;
        }
        if(this.value1 !== '') {
          params.mouldNo = this.value1;
        }
        let res = await getProjectInfoList(params);
        if(res.status === 1) {
          this.table = res.msg;
        }
      },

//搜索按钮调用接口数据
      async search() {
        let params = {page:1,size:5,};
        if(this.value !== '') {
          params.partName = this.value;
        }
        if(this.value1 !== '') {
          params.mouldNo = this.value1;
        }
        // console.log(params);
        let res = await getProjectInfoList(params);
        if(res.status === 1) {
          this.table = res.msg;
        }
      },

//点击查看详情，传递表格行参数
      handleClick(row) {
        this.$store.dispatch('customItems_detail',row);
        this.$router.push('/itemProgress')
      },
    },
    data() {
      return {
        currentPage: 1,
        size: 10,
        value: '',
        value1: '',
        table: {},
      }
    }
  }
</script>

<style scoped>

</style>
