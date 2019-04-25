<template>
  <div id="projectInfoDetail">
    <el-button type="primary" plain @click="$goto('/projectInfo')" class="el-button_plain_mini">返回</el-button>

    <div id="allInfo">
      <h2 class="tc fwb border_solid_bottom_c lh40">模具工程任务书</h2>

      <div id="tables">
        <p class="tc">
          <span class="mr20">项目名称：<i class="fwb">{{vuexInfo.projectName}}</i></span>
          <span class="mr20">客户名称：<i class="fwb">{{vuexInfo.customerName}}</i></span>
          <span class="mr20">合同编号：<i class="fwb">{{vuexInfo.contractNo}}</i></span>
        </p>

        <!-- 表格 -->
        <!-- 内容 -->
        <el-table :data="tableData.map.items" border style="width: 100%;font-size:12px;" class="mt20 mb20" tooltip-effect="light"
                  header-cell-class-name="header_cell table_header_shadow">
          <el-table-column fixed type="index" label="序号" width="60" align="center" :index="(index) => this.$indexS(index, currentPage, size)"></el-table-column>
          <el-table-column fixed prop="mouldNo" label="模具编号" width="100" align="center"></el-table-column>

          <el-table-column fixed prop="projectNo" label="项目编号" width="120" align="center" :show-overflow-tooltip="tooltip"></el-table-column>
          <el-table-column prop="partName" label="制品名称" width="120" align="center" :show-overflow-tooltip="tooltip"></el-table-column>
          <el-table-column prop="partNo" label="制品编号" width="120" align="center" show-overflow-tooltip></el-table-column>

          <el-table-column label="制品图片" height="60" align="center">
            <template slot-scope="scope">
              <img :src="scope.row.imgUrl" alt="图片" style="height:40px;">
            </template>
          </el-table-column>

          <el-table-column prop="partSize" label="制品尺寸" width="120" align="center"></el-table-column>
          <el-table-column prop="productDataFileName" label="产品3D数据图档名" width="120" align="center"></el-table-column>
          <el-table-column prop="customerMouldCode" label="客户模号" width="120" align="center"></el-table-column>
          <el-table-column prop="customerMoldingFactory" label="客户的成型工厂" width="120" align="center"></el-table-column>

          <el-table-column prop="customerOpenOrNoMould" label="客户以前是否开过模具" width="120" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.customerOpenOrNoMould === 0?'否':'是'}}</span>
            </template>
          </el-table-column>

          <el-table-column prop="customerAdditionalRequirements" label="客户是否有参考模、经验总结或特别要求" width="120" align="center"></el-table-column>
          <el-table-column prop="material" label="制品材料" width="120" align="center" :show-overflow-tooltip="tooltip"></el-table-column>
          <el-table-column prop="shrinkageRate" label="收缩率" width="120" align="center"></el-table-column>

          <el-table-column prop="productColour" label="制品颜色" width="100" align="center"></el-table-column>

          <el-table-column prop="grainNo" label="皮纹号" width="160" align="center"></el-table-column>
          <el-table-column prop="cavityQty" label="模腔数量" width="160" align="center"></el-table-column>

          <el-table-column prop="runner" label="流道" width="120" align="center" :show-overflow-tooltip="tooltip"></el-table-column>
          <el-table-column prop="gate" label="浇口" width="120" align="center" :show-overflow-tooltip="tooltip"></el-table-column>

          <el-table-column prop="aplate" label="A板" width="100" align="center" show-overflow-tooltip></el-table-column>

          <el-table-column prop="bplate" label="B板" width="120" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="cavity" label="型腔" width="120" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="core" label="型芯" width="120" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="slider" label="滑块" width="120" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="standardParts" label="标准件" width="120" align="center"></el-table-column>
          <el-table-column prop="startMouldDate" label="启动日期" width="120" align="center"></el-table-column>
          <el-table-column prop="t1Date" label="T1时间" width="120" align="center"></el-table-column>
          <el-table-column prop="sampleDeliveryTime" label="送样时间" width="120" align="center"></el-table-column>
          <el-table-column prop="manufacturingOutsourcing" label="制造外包" width="120" align="center"></el-table-column>
          <el-table-column prop="designOutsourcing" label="设计外包" width="120" align="center"></el-table-column>
          <el-table-column prop="manufacturingPlant" label="模具制造工厂" width="100" align="center" :show-overflow-tooltip="tooltip"></el-table-column>
          <el-table-column fixed="right" label="操作" width="100" align="center">
            <template slot-scope="scope">
              <el-button class="underline" type="text" @click="$setVuex('/projectInfoDetailEdit', 'projectInfoDetailEdit', scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination @current-change="handleCurrentChange"
                       :current-page="currentPage" :page-size="size"
                       layout="total, prev, pager, next"
                       :total="tableData.map.total" v-if="tableData.map.total">
        </el-pagination>
      </div>

      <!-- 附表 -->
      <div class="mt20" id="forms">
        <el-form class="f12" ref="form" :model="form" label-position="left" label-width="220px">
          <div style="color:#E52058;">
            <p><span>备注：</span> 当客户的产品图或技术方案确认时间滞后，以及设计方案有重大变化时，技术部设计组须通知项目经理，由项目经理向客户提出并得到确认有关合同变更事项。</p>
            <p>confirmed delay or design scheme has big changes,Design dept. must inform project manager,then Project manager will discuss with customer to change contract issue and get cofirmation.</p>
          </div>
          <el-form-item label="1.模具是否在我司进行小批量试产？">
            <el-radio-group v-model="form.batchProd">
              <el-radio label="是"></el-radio>
              <el-radio label="否"></el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="2.合同要求试模次数">
            <span><el-input v-model="form.testMouldNum" style="width:100px;" clearable></el-input> 次</span>
          </el-form-item>

          <el-form-item label="3.合同要求提供样件啤数">
            <span class="mr20">T1: <el-input v-model="form.t1Shots" style="width:100px;" clearable></el-input> 啤shots</span>
            <span class="mr20">T2: <el-input v-model="form.t2Shots" style="width:100px;" clearable></el-input> 啤shots</span>
            <span class="mr20">T3: <el-input v-model="form.t3Shots" style="width:100px;" clearable></el-input> 啤shots</span>
            <span class="mr20">T4: <el-input v-model="form.t4Shots" style="width:100px;" clearable></el-input> 啤shots</span>
          </el-form-item>

          <el-form-item label="4.样件运输方式">
            <el-checkbox-group v-model="form.samplesWay">
              <el-checkbox label="物流空运"></el-checkbox>
              <el-checkbox label="物流陆运"></el-checkbox>
              <el-checkbox label="快递"></el-checkbox>
              <el-checkbox label="自送"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="5.模具运输方式">
            <el-checkbox-group v-model="form.mouldWay">
              <el-checkbox label="空运"></el-checkbox>
              <el-checkbox label="陆运"></el-checkbox>
              <el-checkbox label="海运"></el-checkbox>
              <el-checkbox label="铁路运输"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="6.模具是否空转">
            <el-radio-group v-model="form.dryCycleOrNot">
              <el-radio label="是"></el-radio>
              <el-radio label="否"></el-radio>
            </el-radio-group>
            <span class="ml20 mr20">空转: <el-input v-model="form.dryCycleCount" style="width:100px;" clearable></el-input> 次</span>
          </el-form-item>

          <el-form-item label="7.本项目是否配送注塑工具">
            <el-checkbox-group v-model="form.deliveredOrNot">
              <el-checkbox label="夹具"></el-checkbox>
              <el-checkbox label="检具"></el-checkbox>
              <el-checkbox label="检测支架"></el-checkbox>
              <el-checkbox label="机械抓手"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="8.模具转包">
            <el-radio-group v-model="form.mouldSubcontract">
              <el-radio label="天津银宝"></el-radio>
              <el-radio label="武汉银宝"></el-radio>
              <el-radio label="广东银宝"></el-radio>
              <el-radio label="惠州银宝"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>

        <!--<el-form id="form1" class="mt20 f12" ref="form" :model="form1" label-position="left">-->
          <!--<el-row class="border_dashed_bottom_c">-->
            <!--<p class="f16 fwb">制表：</p>-->
            <!--<el-row class="pl20 pr20">-->
              <!--<el-col class="pr20" :span="6">-->
                <!--<el-form-item label="销售经理：" label-width="72px">-->
                  <!--<el-input v-model="form.name" clearable></el-input>-->
                <!--</el-form-item>-->
              <!--</el-col>-->
              <!--<el-col class="pr20" :span="6">-->
                <!--<el-form-item label="项目经理：" label-width="72px">-->
                  <!--<el-input v-model="form.name" clearable></el-input>-->
                <!--</el-form-item>-->
              <!--</el-col>-->
            <!--</el-row>-->
          <!--</el-row>-->

          <!--<el-row>-->
            <!--<p class="f16 fwb">批准：</p>-->
            <!--<el-row class="pl20 pr20">-->
              <!--<el-col class="pr20" :span="6">-->
                <!--<el-form-item label="销售部：" label-width="60px">-->
                  <!--<el-input v-model="form.name" clearable></el-input>-->
                <!--</el-form-item>-->
              <!--</el-col>-->
              <!--<el-col class="pr20" :span="6">-->
                <!--<el-form-item label="技术部：" label-width="60px">-->
                  <!--<el-input v-model="form.name" clearable></el-input>-->
                <!--</el-form-item>-->
              <!--</el-col>-->
              <!--<el-col class="pr20" :span="6">-->
                <!--<el-form-item label="品质部：" label-width="60px">-->
                  <!--<el-input v-model="form.name" clearable></el-input>-->
                <!--</el-form-item>-->
              <!--</el-col>-->
            <!--</el-row>-->

            <!--<el-row class="pl20 pr20">-->
              <!--<el-col class="pr20" :span="6">-->
                <!--<el-form-item label="项目部：" label-width="60px">-->
                  <!--<el-input v-model="form.name" clearable></el-input>-->
                <!--</el-form-item>-->
              <!--</el-col>-->
              <!--<el-col class="pr20" :span="6">-->
                <!--<el-form-item label="模具厂：" label-width="60px">-->
                  <!--<el-input v-model="form.name" clearable></el-input>-->
                <!--</el-form-item>-->
              <!--</el-col>-->
              <!--<el-col class="pr20" :span="6">-->
                <!--<el-form-item label="试模部：" label-width="60px">-->
                  <!--<el-input v-model="form.name" clearable></el-input>-->
                <!--</el-form-item>-->
              <!--</el-col>-->
            <!--</el-row>-->
          <!--</el-row>-->
        <!--</el-form>-->
      </div>

      <p class="tc mt20">
        <el-button type="primary" size="small" @click="saveInfo">保存</el-button>
        <el-button type="primary" size="small" @click="dialogTableVisible = true">选择并导出</el-button>
        <el-button type="primary" size="small">取消</el-button>
      </p>

      <el-dialog class="commonDialog" title="工程任务书导出" :visible.sync="dialogTableVisible" center>
        <el-form :model="form2">
          <el-form-item label="项目经理" label-width="72px">
            <el-select v-model="form2.userName" filterable size="mini" clearable>
              <el-option v-for="item in manager" :key="item.userId" :label="item.userName" :value="item.userName"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="">
            <el-checkbox-group v-model="form2.ids">
              <el-checkbox v-for="item in tableData.map.items" :key="item.id" :label="item.id">{{item.mouldNo}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="export_excel">确 定</el-button>
          <el-button @click="dialogTableVisible = false">取 消</el-button>
        </div>
      </el-dialog>

    </div>
  </div>
</template>

<script>
  import { Message, MessageBox } from 'element-ui';
  /** 导入api.js */
  import {queryProjectInformationDetails, getUserListByRoleType, engineeringTaskBookExport, updateProjectInformationDetails} from '../../axios/api.js'

  export default {
    name: "projectInfoDetail",
    created() {
      //接收跳转时传递的参数
      this.vuexInfo = this.$store.getters.projectInfoDetail;

      this.getTableInfo();
    },
    methods: {
      //点击按钮下载Excel
      export_excel() {
        let res = engineeringTaskBookExport({id: this.vuexInfo.id, ids: this.form2.ids.join(','), userName: this.form2.userName},this.tableData); //返回一个Promise对象
        this.dialogTableVisible = false;
      },

      //点击按钮保存修改的表单信息
      async saveInfo() {
        let params = this.form;
        params.deliveredOrNot = params.deliveredOrNot.join(',');
        params.mouldWay = params.mouldWay.join(',');
        params.samplesWay = params.samplesWay.join(',');
        params.id = this.tableData.id;
        // params.t1Shots = Number(params.t1Shots);
        // params.t2Shots = Number(params.t2Shots);
        // params.t3Shots = Number(params.t3Shots);
        // params.t4Shots = Number(params.t4Shots);
        let res = await updateProjectInformationDetails(params);
        if(res.status === 1) {
          Message({showClose: true, type: 'success', message: '信息修改成功！'});
          this.getTableInfo();
        }
      },

      //表格接口数据调用
      async getTableInfo() {
        //项目经理接口调用
        this.manager = (await getUserListByRoleType({type: 'XIANGMUJINGLI'})).msg;
        let params = {
          page: this.currentPage,
          size: this.size,
          id: this.$store.getters.projectInfoDetail.id,
        };
        let res = await queryProjectInformationDetails(params);
        if(res.status === 1) {
          this.tableData = res.msg;
          let t = this.tableData;
          this.form = {
            mouldSubcontract: t.mouldSubcontract,
            deliveredOrNot: t.deliveredOrNot? t.deliveredOrNot.split(','): [],
            batchProd: t.batchProd,
            testMouldNum: t.testMouldNum,
            samplesWay: t.samplesWay? t.samplesWay.split(','):[],
            mouldWay: t.mouldWay? t.mouldWay.split(','):[],
            dryCycleOrNot: t.dryCycleOrNot,
            t1Shots: t.t1Shots,
            t2Shots: t.t2Shots,
            t3Shots: t.t3Shots,
            t4Shots: t.t4Shots,
            dryCycleCount: t.dryCycleCount,
          };
        }
      },

      handleCurrentChange(val) {
        this.currentPage = val;
        this.getTableInfo();
      },
    },
    data() {
      return {
        //弹框
        dialogTableVisible: false,

        //项目经理
        manager: [],

        form: {
          mouldSubcontract: '',
          deliveredOrNot: [],
          batchProd: '',
          testMouldNum: 0,
          samplesWay: [],
          mouldWay: [],
          dryCycleOrNot: '',
          t1Shots: 0,
          t2Shots: 0,
          t3Shots: 0,
          t4Shots: 0,
          dryCycleCount: 0,
        },
        form1: {

        },
        form2: {
          ids: [],
          userName: '',
        },

        //是否开启tooltip
        tooltip: true,

        currentPage: 1,
        size: 10,

        tableData: {
          map: {
            items: [
              {
                // projectName: 'MAS861--9087766',
                // 1: '5',
                // 2: '2019-1-20 12:30',
                // 3: '芜湖市常春汽车内饰件有限公司',
                // 4: 'MHT201812163',
                // 5: '注塑模具',
                // 6: '2019-05-24',
                // 7: '0553-5815222',
                // 8: 'huzhenhe@caip.com.cn',
              }
            ],
            total: 1,
          },


        },

        //跳转到当前页时需要的参数
        vuexInfo: {},
      }
    }
  }
</script>

<style scoped>

</style>
