<template>
  <div id="noticeLeader">
    <!-- 搜索 -->
    <div class="section-search mb20">
      <el-row>
        <el-col :span="24">
          <div class="fl mr20">
            <span>项目经理：</span>
            <el-select v-model="value" filterable size="mini" clearable>
              <el-option v-for="item in managerList" :key="item.userId" :label="item.userName" :value="item.userId"></el-option>
            </el-select>
          </div>
          <div class="fl mr20">
            <span>项目名称：</span>
            <el-input v-model="value1" size="mini" clearable style="width:calc(100% - 70px);"></el-input>
          </div>
          <div class="fl mr20">
            <span>模具编号：</span>
            <el-input v-model="value2" size="mini" clearable style="width:calc(100% - 70px);"></el-input>
          </div>
          <el-button type="primary" icon="el-icon-search" class="fl" @click="search"></el-button>
        </el-col>
      </el-row>
      <hr>
    </div>
    <!-- 列表数据 -->
    <el-tag type="danger">项目状态变更提醒：</el-tag>

    <el-table :data="tableData.content" border style="width: 100%;margin-top:10px;" header-cell-class-name="header_cell table_header_shadow" tooltip-effect="light">
      <el-table-column fixed type="index" width="60" label="序号" :index="(index) => this.$indexS(index, currentPage, size)"></el-table-column>
      <el-table-column prop="storageTime" label="提醒时间" width="120"></el-table-column>
      <el-table-column prop="projectName" label="项目名称" width="120" show-overflow-tooltip></el-table-column>

      <el-table-column prop="mouldNo" label="模具编号" width="120"></el-table-column>
      <el-table-column prop="projectStatus" label="项目状态" width="120" align="center">
        <!--<template slot-scope="scope">-->
          <!--<p style="margin:0 -10px;border-bottom:1px solid #ebeef5;padding:5px 0;">计划时间</p>-->
          <!--<p style="margin:0;padding:5px 0;">实际时间</p>-->
        <!--</template>-->
      </el-table-column>
      <!--<el-table-column prop="time" label="提醒时间" width="100" align="center">-->
        <!--<template slot-scope="scope">-->
          <!--<p style="margin:0 -10px;border-bottom:1px solid #ebeef5;padding:5px 0;">{{scope.row.z[0]}}</p>-->
          <!--<p style="margin:0;padding:5px 0;">{{scope.row.z[1]}}</p>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column prop="partName" label="制品名称" width="120" show-overflow-tooltip></el-table-column>
      <el-table-column prop="customerName" label="客户名称" width="120" show-overflow-tooltip></el-table-column>

      <el-table-column prop="projectManager" label="项目经理" width="100"></el-table-column>
      <el-table-column prop="projectEngineer" label="项目工程师" width="100" align="center"></el-table-column>
      <!--<el-table-column prop="state" label="项目状态" width="100"></el-table-column>-->
      <el-table-column prop="changeContent" label="提醒内容" show-overflow-tooltip></el-table-column>
    </el-table>

    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                   :current-page="currentPage" :page-size="size"
                   layout="total, prev, pager, next"
                   :total="tableData.totalCount" class="fr mt20" v-if="tableData.totalCount">
    </el-pagination>
  </div>
</template>

<script>
  import { getUserListByRoleType, getProjectStatisticsChange } from '../../axios/api'
  export default {
    name: "noticeLeader",
    created: async function () {
      //获取项目经理列表
      this.managerList = (await getUserListByRoleType({type: 'XIANGMUJINGLI'})).msg;

      this.getList();
    },
    methods: {
      //获取项目变更提醒列表
      async getList() {
        let params = {
          page: this.currentPage,
          size: this.size,
        };
        if(this.value) {
          params.projectManager = this.value;
        }
        if(this.value1) {
          params.projectName = this.value1;
        }
        if(this.value2) {
          params.mouldNo = this.value2;
        }
        let res = await getProjectStatisticsChange(params);
        if(res.status === 1) {
          this.tableData = res.msg;
        }
      },

      //搜索列表
      search() {
        this.currentPage = 1;
        this.getList();
      },

      //点击页码
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getList();
        console.log(`当前页: ${val}`);
      },


      remoteMethod(query) {
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.options = this.list.filter(item => {
              return item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
            });
          }, 200);
        } else {
          this.options = [];
        }
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },

      handleClick(row) {
        let self = this;
        self.dialogFormVisible = true;
        self.form = row;
      },
      goto(path,arg) {
        this.$goto(path,arg);
      }
    },
    data () {
      return {
        currentPage: 1,
        size: 5,
        managerList: [],
        value: '',
        value1: '',
        value2: '',
        tableData: {

        },


        options: [],
        optionsItem: [],
        itemsState: [{
          value: '1',
          label: '正常'
        }, {
          value: '2',
          label: '紧张'
        }, {
          value: '3',
          label: '延期'
        }],
        items: [{
          value: '1',
          label: '设计'
        }, {
          value: '2',
          label: '加工'
        }, {
          value: '3',
          label: '精修'
        }],
        valueItem: '',
        list: [],

        cell: 'background-color:red;padding:0;',

        loading: false,


        cellNew:'cellNew'
      }
    },
  }
</script>

<style scoped>
  @import "../../style/common.css";
</style>
