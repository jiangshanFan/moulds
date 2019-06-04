<template>
  <div id="projectsPointManage">
    <el-button type="primary" plain size="mini" @click="$goto('/projects')">返回</el-button>
    <!-- 搜索 -->
    <div class="section-search mb20 mt20">
      <el-row>
        <div class="fl mr100" style="line-height:28px;">
          <span class="fwb" style="color:#1B7CE2;">项目名称：{{items.projectName}}</span>
        </div>
        <div class="fl mr20">
          <span class="c6">制品名称：</span>
          <el-input v-model="value" size="mini" clearable style="width:calc(100% - 100px);"></el-input>
        </div>
        <div class="fl mr20">
          <span class="c6">模具编号：</span>
          <el-input v-model="value1" size="mini" clearable style="width:calc(100% - 100px);"></el-input>
        </div>
        <el-button type="primary" size="mini" icon="el-icon-search" class="fl" @click="searchCheck"></el-button>
      </el-row>
      <hr>
    </div>

    <!-- 内容 -->
    <div class="project_info">
      <div class="project_type mb20 ovw-h">
        <el-button class="el-button_common fl mr20" type="primary" plain @click="$goto('/itemCheck')">项目查看详情</el-button>
        <!--<el-button type="primary" plain class="el-button_common fl mr20">选择展示节点</el-button>-->
        <!--<el-button type="primary" plain class="el-button_common">总进度计划报表导入</el-button>-->
        <!-- 上传文件 -->
        <el-upload
          class="fl mr20"
          ref="upload"
          accept=".xlsx"
          action="/api/project/import/projectRateImport"
          :headers="importHeaders"
          :show-file-list="false"
          :on-success="upload_status">
          <el-button type="primary" plain class="el-button_common fl">总进度计划报表导入</el-button>
        </el-upload>
        <el-button class="el-button_common fl" type="primary" plain @click="export_excel">总进度计划报表导出</el-button>


        <!-- 状态图例-start -->
        <el-col :span="12" class="legend fr">
          <span class="emergency posr">紧急</span>
          <span class="delay posr">已延期</span>
          <span class="normal posr">正常</span>
          <span class="parsed posr">已暂停</span>
          <span class="cancel posr">已取消</span>
        </el-col>
        <!-- 状态图例-end -->
      </div>

      <el-table :data="tableData.content" border style="width: 100%;font-size:12px;" class="mt20" tooltip-effect="light"
                header-cell-class-name="header_cell table_header_shadow" :row-class-name="row_style" :row-style="urgent? URGENT: {}"
                :cell-style="cell_style">
        <el-table-column fixed type="index" label="序号" width="60" align="center" :index="(index) => this.$indexS(index, currentPage, size)"></el-table-column>

        <el-table-column fixed prop="partName" label="制品名称" width="120" align="center" :show-overflow-tooltip="tooltip"></el-table-column>

        <el-table-column fixed label="制品图片" height="60" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.imageUrl" alt="图片">
          </template>
        </el-table-column>

        <el-table-column fixed prop="contractNo" label="合同号" width="110" align="center"></el-table-column>

        <el-table-column fixed prop="mouldNo" label="模具编号" width="100" align="center"></el-table-column>

        <!--<el-table-column prop="item" label="客户模号" width="120"></el-table-column>-->
        <el-table-column prop="cavityQty" label="模腔数量" width="70" align="center"></el-table-column>

        <el-table-column prop="material" label="制品材料" width="100" align="center" :show-overflow-tooltip="tooltip"></el-table-column>

        <el-table-column prop="projectDeliveryTime" label="LT" width="60" align="center"></el-table-column>

        <el-table-column prop="projectDescribe.projectDescribe" label="当前模具描述" width="100" align="center" :show-overflow-tooltip="tooltip"></el-table-column>

        <el-table-column label="计划" width="48" align="center">
          <template slot-scope="scope">
            <p class="double_one fwb c3 planTime posr">计划</p>
            <p class="double_two fwb c3 actualTime posr">实际</p>
          </template>
        </el-table-column>

        <el-table-column prop="IMM" label="注塑机资料" width="86" align="center">
          <template slot-scope="scope">
            <p class="double_one timePoint">{{scope.row.nodeInfo.IMM[0]}}</p>
            <p class="double_two">{{scope.row.nodeInfo.IMM[1]}}</p>
          </template>
        </el-table-column>

        <el-table-column prop="Factory_Information" label="工厂信息" width="70" align="center">
          <template slot-scope="scope">
            <p class="double_one timePoint">{{scope.row.nodeInfo.Factory_Information[0]}}</p>
            <p class="double_two">{{scope.row.nodeInfo.Factory_Information[1]}}</p>
          </template>
        </el-table-column>

        <el-table-column prop="Shrinkage" label="缩水率" width="60" align="center">
          <template slot-scope="scope">
            <p class="double_one timePoint">{{scope.row.nodeInfo.Shrinkage[0]}}</p>
            <p class="double_two">{{scope.row.nodeInfo.Shrinkage[1]}}</p>
          </template>
        </el-table-column>

        <el-table-column prop="Final_MF" label="最终版模流" width="81" align="center">
          <template slot-scope="scope">
            <p class="double_one timePoint">{{scope.row.nodeInfo.Final_MF[0]}}</p>
            <p class="double_two">{{scope.row.nodeInfo.Final_MF[1]}}</p>
          </template>
        </el-table-column>

        <el-table-column prop="CAD_data_90" label="90%产品数据" width="100" align="center">
          <template slot-scope="scope">
            <p class="double_one timePoint">{{scope.row.nodeInfo.CAD_data_90[0]}}</p>
            <p class="double_two">{{scope.row.nodeInfo.CAD_data_90[1]}}</p>
          </template>
        </el-table-column>

        <el-table-column prop="DFM_Report_Providing" label="报告提供" width="70" align="center">
          <template slot-scope="scope">
            <p class="double_one timePoint">{{scope.row.nodeInfo.DFM_Report_Providing[0]}}</p>
            <p class="double_two">{{scope.row.nodeInfo.DFM_Report_Providing[1]}}</p>
          </template>
        </el-table-column>

        <el-table-column prop="Steel_Order_Report_Providing" label="订料报告提供" width="94" align="center">
          <template slot-scope="scope">
            <p class="double_one timePoint">{{scope.row.nodeInfo.Steel_Order_Report_Providing[0]}}</p>
            <p class="double_two">{{scope.row.nodeInfo.Steel_Order_Report_Providing[1]}}</p>
          </template>
        </el-table-column>

        <el-table-column prop="Steel_Order_Confirmation" label="订料确认" width="72" align="center">
          <template slot-scope="scope">
            <p class="double_one timePoint">{{scope.row.nodeInfo.Steel_Order_Confirmation[0]}}</p>
            <p class="double_two">{{scope.row.nodeInfo.Steel_Order_Confirmation[1]}}</p>
          </template>
        </el-table-column>

        <el-table-column prop="Leadtime_of_Steel" label="钢料交期" width="70" align="center">
          <template slot-scope="scope">
            <p class="double_one timePoint">{{scope.row.nodeInfo.Leadtime_of_Steel[0]}}<span v-if="scope.row.nodeInfo.Leadtime_of_Steel[0]">weeks</span></p>
            <p class="double_two">{{scope.row.nodeInfo.Leadtime_of_Steel[1]}}<span v-if="scope.row.nodeInfo.Leadtime_of_Steel[1]">weeks</span></p>
          </template>
        </el-table-column>

        <el-table-column prop="CAD_data_100" label="100%产品数据" width="100" align="center">
          <template slot-scope="scope">
            <p class="double_one timePoint">{{scope.row.nodeInfo.CAD_data_100[0]}}</p>
            <p class="double_two">{{scope.row.nodeInfo.CAD_data_100[1]}}</p>
          </template>
        </el-table-column>

        <el-table-column prop="Final_Mold_Design_Providing" label="最终模图提供" width="95" align="center">
          <template slot-scope="scope">
            <p class="double_one timePoint">{{scope.row.nodeInfo.Final_Mold_Design_Providing[0]}}</p>
            <p class="double_two">{{scope.row.nodeInfo.Final_Mold_Design_Providing[1]}}</p>
          </template>
        </el-table-column>

        <el-table-column prop="Steel_Ready" label="钢料回厂" width="70" align="center">
          <template slot-scope="scope">
            <p class="double_one timePoint">{{scope.row.nodeInfo.Steel_Ready[0]}}</p>
            <p class="double_two">{{scope.row.nodeInfo.Steel_Ready[1]}}</p>
          </template>
        </el-table-column>

        <el-table-column prop="Final_Mold_Design_Review" label="最终模图评审" width="94" align="center">
          <template slot-scope="scope">
            <p class="double_one timePoint">{{scope.row.nodeInfo.Final_Mold_Design_Review[0]}}</p>
            <p class="double_two">{{scope.row.nodeInfo.Final_Mold_Design_Review[1]}}</p>
          </template>
        </el-table-column>

        <el-table-column prop="Rough_Milling_Approval" label="粗加工确认" width="82" align="center">
          <template slot-scope="scope">
            <p class="double_one timePoint">{{scope.row.nodeInfo.Rough_Milling_Approval[0]}}</p>
            <p class="double_two">{{scope.row.nodeInfo.Rough_Milling_Approval[1]}}</p>
          </template>
        </el-table-column>

        <el-table-column prop="Fine_Milling_Approval" label="精加工确认" width="82" align="center">
          <template slot-scope="scope">
            <p class="double_one timePoint">{{scope.row.nodeInfo.Fine_Milling_Approval[0]}}</p>
            <p class="double_two">{{scope.row.nodeInfo.Fine_Milling_Approval[1]}}</p>
          </template>
        </el-table-column>

        <el-table-column prop="HRS_Ready" label="热流道回厂" width="82" align="center">
          <template slot-scope="scope">
            <p class="double_one timePoint">{{scope.row.nodeInfo.HRS_Ready[0]}}</p>
            <p class="double_two">{{scope.row.nodeInfo.HRS_Ready[1]}}</p>
          </template>
        </el-table-column>

        <el-table-column prop="holidays1" label="假期1" width="55" align="center">
          <template slot-scope="scope">
            <p class="double_two" style="height:61px;line-height:61px;">{{scope.row.nodeInfo.holidays1[0]}}</p>
          </template>
        </el-table-column>

        <el-table-column prop="T0" label="T0" align="center" width="50">
          <template slot-scope="scope">
            <p class="double_one timePoint">{{scope.row.nodeInfo.T0[0]}}</p>
            <p class="double_two">{{scope.row.nodeInfo.T0[1]}}</p>
          </template>
        </el-table-column>

        <el-table-column prop="T1" label="T1" align="center" width="50">
          <template slot-scope="scope">
            <p class="double_one timePoint">{{scope.row.nodeInfo.T1[0]}}</p>
            <p class="double_two">{{scope.row.nodeInfo.T1[1]}}</p>
          </template>
        </el-table-column>

        <el-table-column prop="T2" label="T2" align="center" width="50">
          <template slot-scope="scope">
            <p class="double_one timePoint">{{scope.row.nodeInfo.T2[0]}}</p>
            <p class="double_two">{{scope.row.nodeInfo.T2[1]}}</p>
          </template>
        </el-table-column>

        <el-table-column prop="T3" label="T3" align="center" width="50">
          <template slot-scope="scope">
            <p class="double_one timePoint">{{scope.row.nodeInfo.T3[0]}}</p>
            <p class="double_two">{{scope.row.nodeInfo.T3[1]}}</p>
          </template>
        </el-table-column>

        <el-table-column prop="Graining_Validation" label="光板件确认" width="82" align="center">
          <template slot-scope="scope">
            <p class="double_one timePoint">{{scope.row.nodeInfo.Graining_Validation[0]}}</p>
            <p class="double_two">{{scope.row.nodeInfo.Graining_Validation[1]}}</p>
          </template>
        </el-table-column>

        <el-table-column prop="Graining_LT" label="皮纹交期" width="70" align="center">
          <template slot-scope="scope">
            <p class="double_one timePoint">{{scope.row.nodeInfo.Graining_LT[0]}}<span v-if="scope.row.nodeInfo.Graining_LT[0]">weeks</span></p>
            <p class="double_two">{{scope.row.nodeInfo.Graining_LT[1]}}<span v-if="scope.row.nodeInfo.Graining_LT[1]">weeks</span></p>
          </template>
        </el-table-column>

        <el-table-column prop="holidays2" label="假期2" width="55" align="center">
          <template slot-scope="scope">
            <p class="double_two" style="height:61px;line-height:61px;">{{scope.row.nodeInfo.holidays2[0]}}</p>
          </template>
        </el-table-column>

        <el-table-column prop="T4" label="T4" align="center" width="50">
          <template slot-scope="scope">
            <p class="double_one timePoint">{{scope.row.nodeInfo.T4[0]}}</p>
            <p class="double_two">{{scope.row.nodeInfo.T4[1]}}</p>
          </template>
        </el-table-column>

        <el-table-column prop="T5" label="T5" align="center" width="50">
          <template slot-scope="scope">
            <p class="double_one timePoint">{{scope.row.nodeInfo.T5[0]}}</p>
            <p class="double_two">{{scope.row.nodeInfo.T5[1]}}</p>
          </template>
        </el-table-column>

        <el-table-column prop="Final_Validation" label="走模前验收" width="84" align="center">
          <template slot-scope="scope">
            <p class="double_one timePoint">{{scope.row.nodeInfo.Final_Validation[0]}}</p>
            <p class="double_two">{{scope.row.nodeInfo.Final_Validation[1]}}</p>
          </template>
        </el-table-column>

        <el-table-column prop="Mold_Shipment_Preparation" label="走模准备时间" width="94" align="center">
          <template slot-scope="scope">
            <p class="double_one timePoint">{{scope.row.nodeInfo.Mold_Shipment_Preparation[0]}}<span v-if="scope.row.nodeInfo.Mold_Shipment_Preparation[0]">weeks</span></p>
            <p class="double_two">{{scope.row.nodeInfo.Mold_Shipment_Preparation[1]}}<span v-if="scope.row.nodeInfo.Mold_Shipment_Preparation[1]">weeks</span></p>
          </template>
        </el-table-column>

        <el-table-column prop="Mold_Departure_From_Basis" label="模具离厂日期" width="94" align="center">
          <template slot-scope="scope">
            <p class="double_one timePoint">{{scope.row.nodeInfo.Mold_Departure_From_Basis[0]}}</p>
            <p class="double_two">{{scope.row.nodeInfo.Mold_Departure_From_Basis[1]}}</p>
          </template>
        </el-table-column>

        <el-table-column prop="holidays3" label="假期3" width="55" align="center">
          <template slot-scope="scope">
            <p class="double_two" style="height:61px;line-height:61px;">{{scope.row.nodeInfo.holidays3[0]}}</p>
          </template>
        </el-table-column>

        <el-table-column fixed="right" label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="primary">详情</el-button>
            <!--<el-button @click="sendProductInfo(scope.row)" type="primary">加工进度表</el-button>-->
          </template>
        </el-table-column>
      </el-table>

      <el-pagination @current-change="handleCurrentChange"
                     :current-page="currentPage" :page-size="size"
                     layout="total, prev, pager, next"
                     :total="tableData.totalCount" v-if="tableData.totalCount">
      </el-pagination>
    </div>

    <!--弹框-->


  </div>
</template>

<script>
  import { Message, MessageBox, Loading } from 'element-ui';
  /** 导入api.js */
  import {getProjectSchedule,projectRateExport} from '../../axios/api.js'

  export default {
    name: "projectsPointManage",
    created: async function () {
      this.changeData();
      // console.log(1);
    },
    methods: {
      //点击按钮下载Excel
      export_excel() {
        let res = projectRateExport({projectNo: this.$store.getters.projects_info.projectNumber,},this.$store.getters.projects_info); //返回一个Promise对象
        if (res.status === 1) {
          this.changeData();
        }
      },

      //文件上传成功后调用参数进行判断并提示信息
      upload_status(response, file, fileList) {
        let message = response.msg;
        if(response.status === 1) {
          let show_error = false, show_error_mouldNo = false, show_error_node = false;
          if(message.mouldNoExist.length || message.nodeExist.length) {
            show_error = true;
            if(message.mouldNoExist.length) {
              show_error_mouldNo = true;
            }else {
              show_error_node = true;
            }
          }
          /** 信息模板------待优化*/
          this.$alert(`
            <div class="ovw-h">
            <!--导入失败-->
              <div class="${show_error?'flex_row_container': 'flex_row_container disn'}" style="width: 600px;align-items:center;text-align:left;">
                <p class="messageBox_icon_error" style="width:200px;height:200px;"></p>
                <div class="ovw-h" style="padding:30px;box-sizing:border-box;width:400px;">
                  <!--查询模具编号不存在-->
                  <div class="${show_error_mouldNo?'ovw-h': 'ovw-h disn'}">
                    <h3>模具编号：</h3>
                    <p class="out_double f12" style="word-break: break-all;">${message.mouldNoExist.join('/')}</p>
                    <h3>未找到合同评审表/工程任务书相关信息！</h3>
                    <h2 style="color:#E51C23;">导入失败！</h2>
                  </div>

                  <!--部分模具编号不存在，部分模具编号的节点信息已存在-->
                  <div class="${show_error_node?'ovw-h': 'ovw-h disn'}">
                    <h3>模具编号：</h3>
                    <p class="out_double f12" style="word-break: break-all;">${message.nodeExist.join('/')}</p>
                    <h3>节点信息已存在！</h3>
                    <h2 style="color:#E51C23;">导入失败！</h2>
                  </div>
                </div>
              </div>
              <!--导入成功-->
              <div class="${!show_error?'flex_row_container': 'flex_row_container disn'}" style="width: 300px;align-items:center;">
                <p class="messageBox_icon_success" style="width:100px;height:100px;"></p>
                <div class="ovw-h" style="padding:30px;box-sizing:border-box;width:200px;">
                  <h2 style="color:#1A910A;width:200px;">导入成功！</h2>
                </div>
              </div>
            </div>`, '', {dangerouslyUseHTMLString: true,},
          );
          console.log(response);  /**此处获取上传成功后的接口返回数据 */
        }else if(response.status === 0) {
          this.$alert(`
            <div class="ovw-h">
            <!--导入失败-->
              <div class="flex_row_container" style="width: 600px;align-items:center;text-align:left;">
                <p class="messageBox_icon_error" style="width:200px;height:200px;"></p>
                <div class="ovw-h" style="padding:30px;box-sizing:border-box;width:400px;">
                  <!--文件读取失败-->
                  <div class="ovw-h">
                    <h3>可能原因：</h3>
                    <p>${message}</p>
                    <h2 style="color:#E51C23;">文件读取失败！</h2>
                  </div>
                </div>
              </div>
            </div>`, '', {dangerouslyUseHTMLString: true,},)
        }
      },

      //转换数据，防止nodeInfo出现null的情况
      async changeData() {
        // console.log(2);
        this.items = this.$store.getters.projects_info;
        let params = {
          projectNo: this.items.projectNumber,
          page: this.currentPage,
          size: this.size,
        };
        if(this.value) {
          params.partName = this.value;
        }
        if(this.value1) {
          params.mouldNo = this.value1;
        }
        let res = await getProjectSchedule(params);
        if(res.status === 1) {
          this.tableData = res.msg;
          if(this.tableData.content.length) {
            for(let item of this.tableData.content) {
              if(!item.nodeInfo) {
                item.nodeInfo = this.nodeInfo;
              }else {
                item.nodeInfo = Object.assign({},this.nodeInfo,item.nodeInfo);
              }
            }
          }else{
            Message({showClose:true, type: 'warning', message: '查询无相关数据，请确认相关信息！'});
          }
        }
      },

      //点击查看跳转详情
      handleClick(item) {
        console.log(item);
        item.projectName = this.$store.getters.projects_info.projectName;
        item.mark = 3;
        this.$store.dispatch('itemCheck_item',item);
        this.$router.push('/itemAdd');
      },
      // //点击查看加工进度计划表
      // sendProductInfo(item) {
      //   console.log(item);
      //   item.projectName = this.$store.getters.projects_info.projectName;
      //   this.$store.dispatch('itemCheck_item',item);
      //   this.$router.push('/productPlanTable');
      // },

      //点击页码调用数据
      handleCurrentChange(val) {
        this.currentPage = val;
        this.changeData();
      },
      //搜索
      async searchCheck() {
        this.changeData();
      },

      //表格行样式
      row_style(arg) {
        let status = arg.row.status;
        switch (status) {
          case 'URGENT':
            this.urgent = true;
            return 'row_URGENT';
          case 'DELAY':
            return 'row_DELAY';
          case 'NORMAL':
            return 'row_NORMAL';
          case 'SUSPENSION':
            return 'row_SUSPENSION';
          case 'CANCEL':
            return 'row_CANCEL';
        }
      },

      //表格单元格样式
      cell_style(arg) {
        if(arg.column.label === '当前模具描述' || arg.column.label === '计划') {
          return this.cell_styles;
        }else {
          return this.cellStyle;
        }
      },
    },
    data() {
      return {
        //设置上传时的token
        importHeaders: {
          Authorization: localStorage.getItem('token'),
        },

        urgent: false,
//表格第一行的样式修改，通过row-class-name传入不起作用
        URGENT: {color:'#E51C23',},

        //搜索
        value: '',
        value1: '',

        //表格数据
        tableData: {content:[],},

        //跳转页面传递的参数
        items: {},
        currentPage: 1,
        size: 10,
        //nodeInfo为空时的初始化数据
        nodeInfo: {
          holidays1: [],
          holidays2: [],
          holidays3: [],
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
        },

        //表格分单元格样式
        cellStyle: {
          padding: '0 !important',
          height: '60px !important',
        },

        //内容过长隐藏，显示tooltip
        tooltip: true,

        cell_styles: {
          borderRightColor: '#aaa',  //此处borderRight不成功--待优化
          padding: '0 !important',
          height: '60px !important',
        },
      }
    },
  }
</script>

<style scoped>


</style>

<style>
  @import url('../../style/common.css');

  /*.el-upload-list{display:none !important;}*/

  /* 表格行样式 */
  .el-table .row_URGENT{color:#E51C23 !important;}
  .row_DELAY{color:#F9BB00 !important;}
  .row_NORMAL{color:#333 !important;}
  .row_SUSPENSION{color:#9936E6 !important;}
  .row_CANCEL{color:#ccc !important;}

  /* 表格单元格样式 */
  .cell_style{border-right:1px solid #333 !important;}
</style>
