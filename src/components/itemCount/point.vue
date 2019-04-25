<template>
    <div id="pointManage">
      <el-button type="primary" size="mini" @click="$goback">返回</el-button>
      <!-- 基本参数 -->
      <!--<div class="args">-->
        <!--<span class="topic">基本参数：</span>-->
        <!--<el-row :gutter="30">-->
          <!--&lt;!&ndash; 上传图片 &ndash;&gt;-->
          <!--<el-col :span="4">-->
            <!--<span>图片：</span>-->
            <!--<img src="../../assets/blank.png" alt="项目">-->
          <!--</el-col>-->
          <!--&lt;!&ndash; 具体参数 &ndash;&gt;-->
          <!--<el-col :span="20">-->
            <!--<el-row :gutter="10" class="spec">-->
              <!--<el-col :span="8"><span>模具编号：</span>ffff</el-col>-->
              <!--<el-col :span="8"><span>制品名称：</span></el-col>-->
              <!--<el-col :span="8"><span>客户名称：</span></el-col>-->
              <!--<el-col :span="8"><span>合同编号：</span></el-col>-->
              <!--<el-col :span="8"><span>制品尺寸：</span></el-col>-->
              <!--<el-col :span="8"><span>制品材料：</span></el-col>-->
              <!--<el-col :span="8"><span>客户模号：</span></el-col>-->
              <!--<el-col :span="8">-->
                <!--<span>项目阶段：</span>-->
                <!--<el-select v-model="value" placeholder="请选择" size="small">-->
                  <!--<el-option-->
                    <!--v-for="item in options"-->
                    <!--:key="item.value"-->
                    <!--:label="item.label"-->
                    <!--:value="item.value">-->
                  <!--</el-option>-->
                <!--</el-select>-->
              <!--</el-col>-->
              <!--<el-col :span="8">-->
                <!--<span>项目状态：</span>-->
                <!--<el-select v-model="value" placeholder="请选择" size="small">-->
                  <!--<el-option-->
                    <!--v-for="item in options"-->
                    <!--:key="item.value"-->
                    <!--:label="item.label"-->
                    <!--:value="item.value">-->
                  <!--</el-option>-->
                <!--</el-select>-->
              <!--</el-col>-->
            <!--</el-row>-->
          <!--</el-col>-->
        <!--</el-row>-->
      <!--</div>-->
      <!-- 项目描述 -->
      <!--<div class="description">-->
        <!--<span class="topic">项目描述：</span>-->
        <!--<el-row><el-col :span="18"><el-input type="textarea" :autosize="{ minRows: 5, maxRows: 5}"></el-input></el-col></el-row>-->
      <!--</div>-->
      <!-- 节点设置 -->
      <!-- 节点设置 -->
      <div class="point">
        <!-- 新增节点 -->
        <el-row class="mt20">
          <el-tag type="info" class="mr20">项目节点</el-tag>
          <el-button type="primary" size="mini" @click="ifHasMouldNo('dialogPoint')" class="mb20">新增节点</el-button>
        </el-row>

        <!-- 新增节点弹框 -->
        <el-dialog title="新增节点" :visible.sync="dialogPoint" center>
          <el-form ref="formPoint" :model="formPoint" label-width="80px">
            <el-form-item label="节点名称"><el-input v-model="formPoint.nodeName"></el-input></el-form-item>
            <el-form-item label="计划时间">
              <el-date-picker v-model="formPoint.time" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogPoint = false">取 消</el-button>
            <el-button type="primary" @click="addNewPoint(formPoint)">提 交</el-button>
          </div>
        </el-dialog>
        <!-- 表格 -->
        <el-table :data="tableData" border style="width: 100%;" @cell-click="getInfo" :span-method="spanMethod">
          <el-table-column prop="timeType" label="类型" width="100" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.timeType === 0?'计划时间' : '实际时间'}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="IMM" label="IMM 注塑机资料" width="180" align="center">
            <template slot-scope="scope">
              <p v-for="item in scope.row.nodeInfo.IMM" class="timePoint">{{item}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="Factory_Information" label="Factory Information工厂信息" width="180" align="center">
            <template slot-scope="scope">
              <p v-for="item in scope.row.nodeInfo.Factory_Information" class="timePoint">{{item}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="Shrinkage" label="Shrinkage 缩水率" width="180" align="center">
            <template slot-scope="scope">
              <p v-for="item in scope.row.nodeInfo.Shrinkage" class="timePoint">{{item}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="Final_MF" label="Final MF 最终版模流" width="180" align="center">
            <template slot-scope="scope">
              <p v-for="item in scope.row.nodeInfo.Final_MF" class="timePoint">{{item}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="CAD_data_90" label="90%CAD data 90%产品数据" width="180" align="center">
            <template slot-scope="scope">
              <p v-for="item in scope.row.nodeInfo.CAD_data_90" class="timePoint">{{item}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="DFM_Report_Providing" label="DFM Report Providing DFM报告提供" width="180" align="center">
            <template slot-scope="scope">
              <p v-for="item in scope.row.nodeInfo.DFM_Report_Providing" class="timePoint">{{item}}</p>
            </template>
          </el-table-column>

          <el-table-column prop="Steel_Order_Report_Providing" label="Steel Order Report Providing 订料报告提供" width="180" align="center">
            <template slot-scope="scope">
              <p v-for="item in scope.row.nodeInfo.Steel_Order_Report_Providing" class="timePoint">{{item}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="Steel_Order_Confirmation" label="Steel Order Confirmation 订料确认" width="180" align="center">
            <template slot-scope="scope">
              <p v-for="item in scope.row.nodeInfo.Steel_Order_Confirmation" class="timePoint">{{item}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="Leadtime_of_Steel" label="Leadtime of Steel 钢料交期" width="180" align="center">
            <template slot-scope="scope">
              <p v-for="item in scope.row.nodeInfo.Leadtime_of_Steel" class="timePoint">{{item}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="CAD_data_100" label="100%CAD data 100%产品数据" width="180" align="center">
            <template slot-scope="scope">
              <p v-for="item in scope.row.nodeInfo.CAD_data_100" class="timePoint">{{item}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="Final_Mold_Design_Providing" label="Final Mold Design Providing 最终模图提供" width="180" align="center">
            <template slot-scope="scope">
              <p v-for="item in scope.row.nodeInfo.Final_Mold_Design_Providing" class="timePoint">{{item}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="Steel_Ready" label="SteelReady 钢料回厂" width="180" align="center">
            <template slot-scope="scope">
              <p v-for="item in scope.row.nodeInfo.Steel_Ready" class="timePoint">{{item}}</p>
            </template>
          </el-table-column>

          <el-table-column prop="Final_Mold_Design_Review" label="Final Mold Design Review 最终模图评审" width="180" align="center">
            <template slot-scope="scope">
              <p v-for="item in scope.row.nodeInfo.Final_Mold_Design_Review" class="timePoint">{{item}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="Rough_Milling_Approval" label="Rough Milling Approval 粗加工确认" width="180" align="center">
            <template slot-scope="scope">
              <p v-for="item in scope.row.nodeInfo.Rough_Milling_Approval" class="timePoint">{{item}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="Fine_Milling_Approval" label="Fine Milling Approval 精加工确认" width="180" align="center">
            <template slot-scope="scope">
              <p v-for="item in scope.row.nodeInfo.Fine_Milling_Approval" class="timePoint">{{item}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="HRS_Ready" label="HRS Ready 热流道回厂" width="180" align="center">
            <template slot-scope="scope">
              <p v-for="item in scope.row.nodeInfo.HRS_Ready" class="timePoint">{{item}}</p>
            </template>
          </el-table-column>

          <el-table-column prop="holidays1" label="holidays1 假期1" width="180" align="center">
            <template slot-scope="scope">
              <p>{{scope.row.nodeInfo.holidays1?scope.row.nodeInfo.holidays1[0]: ''}}</p>
            </template>
          </el-table-column>

          <el-table-column prop="T0" label="T0" align="center">
            <template slot-scope="scope">
              <p v-for="item in scope.row.nodeInfo.T0" class="timePoint">{{item}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="T1" label="T1" align="center">
            <template slot-scope="scope">
              <p v-for="item in scope.row.nodeInfo.T1" class="timePoint">{{item}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="T2" label="T2" align="center">
            <template slot-scope="scope">
              <p v-for="item in scope.row.nodeInfo.T2" class="timePoint">{{item}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="T3" label="T3" align="center">
            <template slot-scope="scope">
              <p v-for="item in scope.row.nodeInfo.T3" class="timePoint">{{item}}</p>
            </template>
          </el-table-column>

          <el-table-column prop="Graining_Validation" label="Graining Validation 光板件确认" width="180" align="center">
            <template slot-scope="scope">
              <p v-for="item in scope.row.nodeInfo.Graining_Validation" class="timePoint">{{item}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="Graining_LT" label="Graining LT 皮纹交期" width="180" align="center">
            <template slot-scope="scope">
              <p v-for="item in scope.row.nodeInfo.Graining_LT" class="timePoint">{{item}}</p>
            </template>
          </el-table-column>

          <el-table-column prop="holidays2" label="holidays2 假期2" width="180" align="center">
            <template slot-scope="scope">
              <p>{{scope.row.nodeInfo.holidays2?scope.row.nodeInfo.holidays2[0]: ''}}</p>
            </template>
          </el-table-column>

          <el-table-column prop="T4" label="T4" align="center">
            <template slot-scope="scope">
              <p v-for="item in scope.row.nodeInfo.T4" class="timePoint">{{item}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="T5" label="T5" align="center">
            <template slot-scope="scope">
              <p v-for="item in scope.row.nodeInfo.T5" class="timePoint">{{item}}</p>
            </template>
          </el-table-column>

          <el-table-column prop="Final_Validation" label="Final Validation 走模前验收" width="180" align="center">
            <template slot-scope="scope">
              <p v-for="item in scope.row.nodeInfo.Final_Validation" class="timePoint">{{item}}</p>
            </template>
          </el-table-column>

          <el-table-column prop="Mold_Shipment_Preparation" label="Mold Shipment Preparation 走模准备时间" width="180" align="center">
            <template slot-scope="scope">
              <p v-for="item in scope.row.nodeInfo.Mold_Shipment_Preparation" class="timePoint">{{item}}</p>
            </template>
          </el-table-column>

          <el-table-column prop="Mold_Departure_From_Basis" label="Mold Departure From Basis 模具离厂日期" width="180" align="center">
            <template slot-scope="scope">
              <p v-for="item in scope.row.nodeInfo.Mold_Departure_From_Basis" class="timePoint">{{item}}</p>
            </template>
          </el-table-column>

          <el-table-column label="holidays3 假期3" width="180" align="center">
            <template slot-scope="scope">
              <p>{{scope.row.nodeInfo.holidays3?scope.row.nodeInfo.holidays3[0]: ''}}</p>
            </template>
          </el-table-column>
        </el-table >



        <!-- 新增节点表格 -->
        <div class="mt20" v-if="newPointShow">
          <el-tag type="info">新增节点类型：</el-tag>
          <el-table :data="newTableData" border style="width: 100%;" @cell-click="getNewInfo" class="mt20">
            <el-table-column prop="timeType" label="类型" width="100">
              <template slot-scope="scope">
                <span>{{scope.row.timeType === 0?'计划时间' : '实际时间'}}</span>
              </template>
            </el-table-column>
            <!-- 循环获取新增节点 -->
            <el-table-column width="180" v-for="item in Object.keys(newTableData[0].nodeInfo)" :key="item" :prop="item" :label="item">
              <template slot="header" slot-scope="scope">
                <span>{{scope.column.property}}</span>
              </template>
              <template slot-scope="scope">
                <p v-for="i in scope.row.nodeInfo[item]" class="timePoint">{{i}}</p>
              </template>
            </el-table-column>
          </el-table>
        </div>


        <!-- 修改节点弹框 -->
        <el-dialog title="修改节点" :visible.sync="dialogPointChange" center>
          <el-form ref="formPointChange" :model="formPointChange" label-width="100px">
            <el-form-item label="节点名称：">
              <span>{{formPointChange.label}}</span>
            </el-form-item>
            <el-form-item :label="formPointChange.timeType === 0?'计划时间：':'实际时间：'" v-if="ifTime">
              <el-date-picker v-model="formPointChange.time" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
            <!-- 钢料交期，皮纹交期，走模准备时间 -->
            <el-form-item label="时间周期：" v-if="!ifTime">
              <el-input v-model="formPointChange.remark" style="width:60px;margin-right:20px;"></el-input>周
            </el-form-item>
          </el-form>

          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="changeNode(formPointChange)">提 交</el-button>
            <el-button @click="dialogPointChange = false">取 消</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
</template>

<script>
  import { Message } from 'element-ui';
  /** 导入api.js */
  import {getProjectNodeManageList,addProjectNodeManage} from '../../axios/api.js'
  export default {
    name: "point",
    created: async function () {
//获取store中的模号参数调用接口数据
      let mould = this.mouldNo = this.$store.getters.itemCheck_item.mouldNo;
      //请求接口-节点列表
      let point = await getProjectNodeManageList({mouldNo:mould,type:0, mark: 1});
      let newPoint = await getProjectNodeManageList({mouldNo:mould,type:1, mark: 1});
      //获取节点数据时判断其数组长度是多少，进行不同的赋值
      if(point.msg.length === 1) {
        this.tableData = this.tableOrg;
        this.tableData[0].nodeInfo = point.msg[0].nodeInfo;
        this.tableData[1].nodeInfo = Object.assign({},this.tableOrg[1].nodeInfo);
      }else if(point.msg.length === 2) {
        this.tableData = point.msg;
      }
      //获取新增项目节点数据时判断其数组长度是多少，进行不同的赋值,并显示新增节点表格
      if(newPoint.msg.length === 1) {
        this.newTableData = this.tableOrg;
        this.newTableData[0].nodeInfo = newPoint.msg[0].nodeInfo;
        this.newTableData[1].nodeInfo = Object.assign({},this.tableOrg[1].nodeInfo);
        this.newPointShow = true;
      }else if(newPoint.msg.length === 2) {
        this.newTableData = newPoint.msg;
        this.newPointShow = true;
      }else if(newPoint.msg.length === 0){
        this.newPointShow = false;
        this.newTableData = this.tableOrg;
      }
    },

    // beforeRouteLeave (to, from, next) {
    //   // 导航离开该组件的对应路由时调用
    //   // 可以访问组件实例 `this`
    //   this.$store.dispatch('itemCheck_item',{});
    //
    //   console.log(to.path);
    //   next();
    // },

    methods: {
      //合并单元格
      spanMethod({ row, column, rowIndex, columnIndex }) {
        if(column.label === 'holidays1 假期1' || column.label === 'holidays2 假期2' || column.label === 'holidays3 假期3') {
          if(rowIndex % 2 === 0) {
            return {
              rowspan: 2,
              colspan: 1,
            }
          }else {
            return {
              rowspan: 0,
              colspan: 0,
            }
          }
        }
      },
//修改节点时间
      async changeNode(form) {
        let params = {
          mouldNo: this.mouldNo,
          nodeName: form.nodeName,
          nodeType: form.nodeType,
          timeType: form.timeType,
          fieldType: form.fieldType,
        };
        if(form.fieldType === 0) {
          params.time = form.time;
        }else {
          params.remark = form.remark;
        }
        let res = await addProjectNodeManage(params);
        //添加节点显示在表格中 --或者-- 重新请求接口调回数据
        if(res.status === 1) {
          //请求接口-节点列表
          let point = await getProjectNodeManageList({mouldNo:this.mouldNo,type:form.nodeType, mark: 1});
          if(form.nodeType === 0) {
            /** 如果只修改了计划时间，直接赋值会导致实际时间这一行不存在，因为接口中没有，此处需要进行判断 */
            if(point.msg.length === 2) {
              this.tableData = point.msg;
            }else if(form.timeType === 0) { //---此处需要掌握数据结构进行判断
              this.tableData[0].nodeInfo = point.msg[0].nodeInfo;
            }else {
              this.tableData[1].nodeInfo = point.msg[0].nodeInfo;
            }
          }else {
            if(point.msg.length === 2) {
              this.newTableData = point.msg;
            }else if(form.timeType === 0) { //---此处需要掌握数据结构进行判断
              this.newTableData[0].nodeInfo = point.msg[0].nodeInfo;
            }else {
              this.newTableData[1].nodeInfo = point.msg[0].nodeInfo;
            }
          }
        }
        this.dialogPointChange = false;
      },

      //新增节点
      async addNewPoint(form) {
        //点击提交按钮前验证信息是否填写完整
        if(form.nodeName !== undefined && form.nodeName !== null && form.nodeName !== '' && form.time !== undefined && form.time !== null && form.time !== '') {
          let params = {
            mouldNo: this.mouldNo,
            nodeName: form.nodeName,
            nodeType: 1,
            timeType: 0,
            time: form.time,
            fieldType: 0,
          };
          let res = await addProjectNodeManage(params);
          if(res.status === 1) {
            //请求接口-节点列表
            let point = await await getProjectNodeManageList({mouldNo:params.mouldNo,type:1, mark: 1});
            // let newPoint = await getProjectNodeManageList({mouldNo:mould,type:1});

            this.newTableData[0].nodeInfo = point.msg[0].nodeInfo;
            this.newPointShow = true;
          }
          this.dialogPoint = false;
        }else {
          this.$message({showClose: true, type: 'warning', message: '请将信息填写完整！'})
        }
      },

      //点击单元格修改节点
      //默认节点修改
      getInfo(row,column,cell,event) {
        if(this.mouldNo !== null && this.mouldNo !== undefined && this.mouldNo !== '') {
          if(column.label === 'holidays1 假期1' || column.label === 'holidays2 假期2' || column.label === 'holidays3 假期3') {
            this.dialogPointChange = false;
          }else {
            this.dialogPointChange = true;
            this.formPointChange.label = column.label;
            this.formPointChange.nodeName = column.property;
            this.formPointChange.timeType = row.timeType;
            this.formPointChange.row = row;
            this.formPointChange.nodeType = 0;
            console.log(column.label);
            if(column.label === 'Leadtime of Steel 钢料交期' || column.label === 'Graining LT 皮纹交期' || column.label === 'Mold Shipment Preparation 走模准备时间') {
              this.formPointChange.fieldType = 1;
              this.ifTime = false;
            }else {
              this.formPointChange.fieldType = 0;
              this.ifTime = true;
            }
          }
        }
      },
      //新增节点修改
      getNewInfo(row,column,cell,event) {
        if(this.mouldNo !== null && this.mouldNo !== undefined && this.mouldNo !== '') {
          this.dialogPointChange = true;
          this.formPointChange.label = column.label;
          this.formPointChange.nodeName = column.property;
          this.formPointChange.timeType = row.timeType;
          this.formPointChange.row = row;
          this.formPointChange.nodeType = 1;
          this.formPointChange.fieldType = 0;
          this.ifTime = true;
        }else {
          this.$message({showClose: true, type: 'warning', message: '请先输入模号！'})
        }
      },

//点击新增节点按钮前判断是否已经输入模号
      ifHasMouldNo(arg) {
        if(this.mouldNo !== null && this.mouldNo !== '' && this.mouldNo !== undefined) {
          this[arg] = true;
        }else {
          this.$message({showClose: true, type: 'warning', message: '请先输入模号'})
        }
      },

      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
    },
    data() {
      return {
        //是否为钢料交期等
        ifTime: true,

        //模号
        mouldNo: 'MBS180001',

        //节点表格数据
        tableData: [],
        //新增节点表格数据
        newTableData: [],
        newPointShow: false, //新增节点表格是否显示
        tableOrg: [
          {
            timeType: 0,
            nodeInfo:{
              IMM:[],
              Factory_Information:[],
              Shrinkage:[],
              Final_MF:[],
              CAD_data_90:[],
              DFM_Report_Providing:[],
              Steel_Order_Report_Providing:[],
              Steel_Order_Confirmation:[],
              Leadtime_of_Steel:[],
              CAD_data_100:[],
              Final_Mold_Design_Providing:[],
              Steel_Ready:[],
              Final_Mold_Design_Review:[],
              Rough_Milling_Approval:[],
              Fine_Milling_Approval:[],
              HRS_Ready:[],
              T0:[],
              T1:[],
              T2:[],
              T3:[],
              Graining_Validation:[],
              Graining_LT:[],
              T4:[],
              T5:[],
              Final_Validation:[],
              Mold_Shipment_Preparation:[],
              Mold_Departure_From_Basis:[],
            }
          },
          {
            timeType: 1,
            nodeInfo:{
              IMM:[],
              Factory_Information:[],
              Shrinkage:[],
              Final_MF:[],
              CAD_data_90:[],
              DFM_Report_Providing:[],
              Steel_Order_Report_Providing:[],
              Steel_Order_Confirmation:[],
              Leadtime_of_Steel:[],
              CAD_data_100:[],
              Final_Mold_Design_Providing:[],
              Steel_Ready:[],
              Final_Mold_Design_Review:[],
              Rough_Milling_Approval:[],
              Fine_Milling_Approval:[],
              HRS_Ready:[],
              T0:[],
              T1:[],
              T2:[],
              T3:[],
              Graining_Validation:[],
              Graining_LT:[],
              T4:[],
              T5:[],
              Final_Validation:[],
              Mold_Shipment_Preparation:[],
              Mold_Departure_From_Basis:[],
            }
          }
        ],

        //基本信息
        basicInfo: {},
        project: {//基本信息中的项目信息
          projectZhuguan: {userId:''},
          projectManager: {userId:''},
          projectEngineer: {userId:''},
        },

        //弹框表单数据
        formPoint: {},  //新增节点
        formPointChange: {},  //修改节点

        //弹框是否可见
        dialogPoint: false,
        dialogVisible: false,
        dialogPointChange: false,
        dialogDescriptionVisible: false,

        limit: 1,

        dialogImageUrl: '',
        value: '',
      };
    },
  }
  // //改变时间并提交数据到后台，以及更新表格数据
  // changeTime(formPointChange) {
  //   this.dialogPointChange = false;
  //   let label = formPointChange.label,
  //     type = formPointChange.type,
  //     time = 'W' + formPointChange.week + '.' + formPointChange.day;
  //   if(type === 0) {
  //     this.tableData[0].nodeInfo[label].push(time);
  //   }else {
  //     this.tableData[1].nodeInfo[label].push(time);
  //   }
  //   console.log(this.tableData);
  //   this.formPointChange = {};
  //
  // }
  // },
</script>

<style scoped>
  .timePoint { padding:0;line-height:20px;text-decoration:line-through;margin:0;cursor:pointer !important;}
  .cell .timePoint:last-child{text-decoration:none !important;}
  .topic {font-size:16px;font-weight:bold;color:#000;line-height:40px;}
  .spec .el-col { line-height:40px;}
  .spec .el-col span { display:inline-block; width:100px; }
  .spec .el-col .el-input{ width:calc(100% - 100px); }
  .spec .el-col .el-select{ width:calc(100% - 110px); display:inline-block;  margin: 0 !important;}
  .el-upload-list { display:block;}
  .el-upload--picture-card {
    background-color: #fbfdff;
    border: none !important;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: auto !important;
    height: auto !important;
    line-height: unset !important;
    vertical-align: top;
  }

  .formPointChange{
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 50%;
    margin: 0 auto;
  }
</style>
