<template>
    <div id="itemsAllocation">
      <!--<el-button type="primary" size="mini" @click="$goback">返回</el-button>-->
      <!-- 搜索 -->
      <div class="section-search mb20 mt20">
        <el-row class="mb20">
          <el-col :span="24">
            <div class="fl mr20">
              <span>制品名称：</span>
              <el-input v-model="search.partName" clearable style="width:auto;"></el-input>
            </div>
            <div class="fl mr20">
              <span>模具编号：</span>
              <el-input v-model="search.mouldNo" clearable style="width:auto;"></el-input>
            </div>
            <div class="fl mr20">
              <span>项目经理：</span>
              <el-input v-model="search.projectManagerName" clearable style="width:auto;"></el-input>
            </div>
            <el-button type="primary" icon="el-icon-search" class="fl" @click="searchList()"></el-button>
          </el-col>
        </el-row>
        <hr>
      </div>
      <!--<el-button type="primary" round size="mini" @click="handleClick({},'新增项目/模具')">新增项目/模具</el-button>-->
      <div class="allocated mt20" style="padding-left:30px;">
        <el-tag type="info">项目分配：</el-tag>
        <el-table :data="tableData.content" border tooltip-effect="light" header-cell-class-name="header_cell table_header_shadow" style="width: 100%;margin-top:30px;">
          <el-table-column fixed="left" type="index" width="50" label="序号" :index="(index) => this.$indexS(index, currentPage, size)"></el-table-column>
          <el-table-column prop="projectName" label="项目名称" width="150"></el-table-column>
          <el-table-column prop="partName" label="制品名称" width="150" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="mouldNo" label="模具编号" width="150"></el-table-column>
          <el-table-column prop="projectStage" label="项目阶段" width="100">
            <template slot-scope="scope">
              <span>{{getStage(scope.row.projectStage)}}</span>
              <!--<span>{{scope.row.projectStage === 'DESIGN'? '设计' :-->
                      <!--scope.row.projectStage === 'SHIPMENTMOULD'? '走模' :-->
                      <!--scope.row.projectStage === 'PAYOFF'? '客户已付完款' :-->
                      <!--scope.row.projectStage === 'PROCESS'? '加工' : '精修'}}</span>-->
            </template>
          </el-table-column>
          <el-table-column prop="projectZhuguanName" label="项目主管" width="100" show-overflow-tooltip></el-table-column>
          <el-table-column prop="projectManagerName" label="项目经理" width="100" show-overflow-tooltip></el-table-column>
          <el-table-column prop="projectEngineerName" label="项目工程师" width="100" show-overflow-tooltip></el-table-column>
          <el-table-column prop="companyName" label="客户公司名称" width="120" show-overflow-tooltip></el-table-column>
          <el-table-column prop="customerName" label="客户项目联系人" width="150" show-overflow-tooltip></el-table-column>
          <el-table-column prop="customerPhone" label="客户电话" width="130"></el-table-column>
          <el-table-column prop="customerEmail" label="客户邮箱" width="180"></el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="edit(scope.row)" size="small" type="primary" icon="el-icon-edit" plain>编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination fr ovw-h">
        <el-pagination @current-change="handleCurrentChange"
          :current-page="currentPage" :page-size="size"
          layout="total, prev, pager, next"
          :total="tableData.totalCount">
        </el-pagination>
      </div>

      <!-- Form -->
      <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="60%" center>
        <hr>
        <el-form :model="form" label-width="100px" label-position="left" class="mt20">
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="模具编号">
                <el-input v-model="form.mouldNo" autocomplete="off" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="项目经理">
                <el-select v-model="form.projectManagerName" filterable>
                  <el-option v-for="item in list.manager" :key="item.userId" :label="item.userName" :value="item.userId"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="制品名称">
                <el-input v-model="form.partName" autocomplete="off" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="项目工程师">
                <el-select v-model="form.projectEngineerName" filterable>
                  <el-option v-for="item in list.engineer" :key="item.userId" :label="item.userName" :value="item.userId"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="项目名称">
                <el-input v-model="form.projectName" autocomplete="off" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="项目主管">
                <el-select v-model="form.projectZhuguanName" filterable>
                  <el-option v-for="item in list.zhuguan" :key="item.userId" :label="item.userName" :value="item.userId"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="客户名称">
                <!--<el-select v-model="form.customerName" filterable>-->
                  <!--<el-option v-for="item in list.customer" :key="item.userId" :label="item.userName" :value="item.userId"></el-option>-->
                <!--</el-select>-->
                <el-select v-model="form.customerName" filterable remote reserve-keyword placeholder="请输入客户名称"
                  :remote-method="searchCustomers"
                  :loading="loading">
                  <el-option v-for="item in list.customer" :key="item.userId" :label="item.userName" :value="item.userId"></el-option>
                </el-select>
                <span style="font-size:6px;float:right;line-height:20px;">提示：可输入关键词查询客户</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="项目阶段">
                <el-select v-model="form.projectStage" filterable>
                  <el-option v-for="item in list.stage" :key="item.id" :label="item.label" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitInfo(form)">确 定</el-button>
          <el-button @click="dialogFormVisible = false">取 消</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
  import { Message } from 'element-ui';
  /** 导入api.js */
  import {getProjectAllotList,updateProjectAllot,getUserListByRoleType,getProjectStrageList} from '../../axios/api.js'
  export default {
    name: "itemsAllocation",
    created: async function () {
      /** 根据条件查询用户列表 */
      let params = {
        page: 1,
        size: 5,
      };
      let res = await getProjectAllotList(params);
      this.tableData = res.msg;
      console.log(res);

      /** 下拉选项列表数据，编辑弹框中的信息 */
      // let list = ['XIANGMUJINGLI','XIANGMUZHUANGGUAN','XIANGMUGONGCHENGSHI'].map(key => getUserListByRoleType({type: key})); --- promise对象如何转为数组
      this.list.manager = (await getUserListByRoleType({type: 'XIANGMUJINGLI'})).msg;
      this.list.zhuguan = (await getUserListByRoleType({type: 'XIANGMUZHUGUAN'})).msg;
      this.list.engineer = (await getUserListByRoleType({type: 'XIANGMUGONGCHENGSHI'})).msg;
      //项目阶段数据
      let stage = await getProjectStrageList();
      this.list.stage = this.$objToOthers(stage.msg);

      //客户所有数据
      this.listDown = (await getUserListByRoleType({type: 'KEHU'})).msg;

      console.log(localStorage.getItem('userLoginVO'));
    },
    methods: {
      //序号
      // indexS (index) {
      //   return this.$indexS(index, this.currentPage);
      //   // let add = (this.currentPage - 1) * this.size + 1;
      //   // return index + add;
      // },

      //获取当前项的阶段
      getStage(arg) {
        for(let item of this.list.stage) {
          if(item.id === arg) {
            return item.label;
          }
        }
      },

//根据条件查询客户下拉列表
      searchCustomers(query) {
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.list.customer = this.listDown.filter(item => {
              return item.userName.toLowerCase().indexOf(query.toLowerCase()) > -1;
            });
          }, 200);
        } else {
          this.list.customer = [];
        }
      },
//请求接口 getProjectAllotList 数据封装函数
      async getProjectAllotListFunction () {
        let params = {
          page: this.currentPage,
          size: 5,
        };
        if(this.search.partName !== '') {
          params.partName = this.search.partName;
        }
        if(this.search.mouldNo !== '') {
          params.mouldNo = this.search.mouldNo;
        }
        if(this.search.projectManagerName !== '') {
          params.projectManagerName = this.search.projectManagerName;
        }
        console.log(params);
        let res = await getProjectAllotList(params);
        this.tableData = res.msg;
      },


//按条件搜索列表信息
      async searchList() {
        this.currentPage = 1;
        this.getProjectAllotListFunction();
      },

//编辑项目后提交更新
      async submitInfo(params) {
        console.log(typeof params.customerName);
        let param = {
          "customerId": typeof params.customerName === 'number'? params.customerName : params.customerId,
          "id": params.id,
          "mouldNo": params.mouldNo,
          "partName": params.partName,
          "projectEngineerId": typeof params.projectEngineerName === 'number'? params.projectEngineerName : params.projectEngineerId,
          "projectManagerId": typeof params.projectManagerName === 'number'? params.projectManagerName : params.projectManagerId,
          "projectName": params.projectName,
          "projectStage": params.projectStage,
          "projectZhuguanId": typeof params.projectZhuguanName === 'number'? params.projectZhuguanName : params.projectZhuguanId,
        };
        let res = await updateProjectAllot(param);
        this.dialogFormVisible = false;
        this.tableData = (await getProjectAllotList({page: this.currentPage, size: 5,})).msg;
        console.log(params);
      },

//编辑详情
      edit(row) {
        this.dialogFormVisible = true;
        this.form = JSON.parse(JSON.stringify(row));
        if(!this.form.projectStage) {
          this.form.projectStage = 'DESIGN';
        }
      },

      async handleCurrentChange(val) {
        this.currentPage = val;
        this.getProjectAllotListFunction();
        console.log(`当前页: ${val}`);
      },
    },
    data () {
      return {
        //搜索模块
        search: {
          partName: '',
          mouldNo: '',
          projectManagerName: '',
          optionsProjectManagerName: [],
        },

        //表格数据
        tableData: {},
        stage:{}, //原始的阶段数据

        //下拉项列表
        list: {
          managerName: '',
          manager: [],
          engineerName: '',
          engineer: [],
          zhuguanName: '',
          zhuguan: [],
          stageName: '',
          stage: [],
          customerName: '',
          customer: [],
        },
        //客户所有数据列表
        listDown: [],
        loading: false, //下拉列表请求后提示加载中

        //弹框数据
        formBefore: {},//改变前
        form: {}, //改变后

        dialogTitle: '',
        currentPage: 1,
        size: 5,
        dialogFormVisible: false,

        options: [{
          value: 1,
          label: '进行中'
        }, {
          value: 2,
          label: '已完成'
        }, {
          value: 3,
          label: '已延期'
        }],
        value: '',
      }
    }
  }
</script>

<style scoped>
  .el-select{width:100% !important;}
  /*.customerSearch i::before {content: "\E605";}*/
</style>
