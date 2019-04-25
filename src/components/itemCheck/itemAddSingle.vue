<template>
    <div id="itemAdd">
      <el-button type="primary" size="mini" @click="$goback">返回</el-button>
      <!-- 基本参数 -->
      <div class="args mt20">
        <el-tag class="mb20">基本参数：</el-tag>
        <el-row :gutter="30">
          <!-- 上传图片 -->
          <el-col :span="4">
            <img :src="dialogImageUrl" alt="项目图" v-if="dialogImageUrlVisible" class="mb20">
            <el-upload action="/api/upload/uploadFile" list-type="picture-card"
              :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-success="handleSuccess"
              :auto-upload="true" :limit=limit :data="uploadData" :before-upload="handleBeforeUpload">
              <!--<i class="el-icon-plus"></i>-->
              <el-button size="small" type="primary">上传图片</el-button>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
            <!--<el-col>-->
              <!--<span>提醒设置：</span>-->
              <!--<el-select v-model="value" placeholder="请选择" size="small">-->
                <!--<el-option-->
                  <!--v-for="item in options"-->
                  <!--:key="item.value"-->
                  <!--:label="item.label"-->
                  <!--:value="item.value">-->
                <!--</el-option>-->
              <!--</el-select>-->
            <!--</el-col>-->
          </el-col>
          <!-- 具体参数 -->
          <el-col :span="20">
            <el-form :model="basicInfo" :rules="rules" ref="itemAdd" label-width="100px" label-position="right">

              <el-row :gutter="10" class="spec">
                <el-col :span="6">
                  <!--<span>模具编号：</span><el-input v-model="basicInfo.mouldNo" size="mini" clearable @change="getMouldBasicInfo"></el-input>-->
                  <el-form-item label="模具编号：" prop="mouldNo">
                    <el-input style="width:100%;" v-model="basicInfo.mouldNo" size="mini" clearable @change="getMouldBasicInfo"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <!--<span>项目名称：</span><el-input v-model="basicInfo.projectName " size="mini" clearable></el-input>-->
                  <el-form-item label="项目名称：" prop="projectName">
                    <el-input style="width:100%;" v-model="basicInfo.projectName" size="mini" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <!--<span>项目编号：</span><el-input v-model="basicInfo.projectNo" size="mini" clearable></el-input>-->
                  <el-form-item label="项目编号：" prop="projectNo">
                    <el-input style="width:100%;" v-model="basicInfo.projectNo" size="mini" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <!--<span>合同编号：</span><el-input v-model="basicInfo.contractNo" size="mini" clearable></el-input>-->
                  <el-form-item label="合同编号：" prop="contractNo">
                    <el-input style="width:100%;" v-model="basicInfo.contractNo" size="mini" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6"><span>客户名称：</span><el-input v-model="basicInfo.customerName" size="mini" clearable></el-input></el-col>
                <el-col :span="6"><span>制品名称：</span><el-input v-model="basicInfo.partName" size="mini" clearable></el-input></el-col>
                <el-col :span="6"><span>制品尺寸：</span><el-input v-model="basicInfo.partNo" size="mini" clearable></el-input></el-col>
                <el-col :span="6"><span>制品材料：</span><el-input v-model="basicInfo.material" size="mini" clearable></el-input></el-col>
                <el-col :span="6"><span>收缩率：</span><el-input v-model="basicInfo.shrinkageRate" size="mini" clearable></el-input></el-col>
                <el-col :span="6"><span>模腔数量：</span><el-input v-model="basicInfo.cavityQty" size="mini" clearable></el-input></el-col>
                <el-col :span="6"><span>皮纹号：</span><el-input v-model="basicInfo.grainNo" size="mini" clearable></el-input></el-col>
                <el-col :span="6"><span>模具重量：</span><el-input v-model="basicInfo.moldWeight" size="mini" clearable></el-input></el-col>
                <el-col :span="6"><span>浇口：</span><el-input v-model="basicInfo.gate" size="mini" clearable></el-input></el-col>
                <el-col :span="6"><span>热流道：</span><el-input v-model="basicInfo.runner" size="mini" clearable></el-input></el-col>
                <el-col :span="6"><span>成型机吨位：</span><el-input v-model="basicInfo.moldingMachineTonnage" size="mini" clearable></el-input></el-col>
                <el-col :span="6"><span>A板：</span><el-input v-model="basicInfo.aplate" size="mini" clearable></el-input></el-col>
                <el-col :span="6"><span>B板：</span><el-input v-model="basicInfo.bplate" size="mini" clearable></el-input></el-col>
                <el-col :span="6"><span>型腔：</span><el-input v-model="basicInfo.cavity" size="mini" clearable></el-input></el-col>
                <el-col :span="6"><span>型芯：</span><el-input v-model="basicInfo.core" size="mini" clearable></el-input></el-col>
                <el-col :span="6"><span>滑块：</span><el-input v-model="basicInfo.slider" size="mini" clearable></el-input></el-col>

                <!-- 项目主管，项目经理，项目工程师接口调用 -->
                <!--<el-col :span="6">-->
                  <!--<span>项目主管：</span>-->
                  <!--<el-select v-model="project.projectZhuguan.userId" filterable size="mini">-->
                    <!--<el-option v-for="item in list.zhuguan" :key="item.userId" :label="item.userName" :value="item.userId"></el-option>-->
                  <!--</el-select>-->
                <!--</el-col>-->
                <!--<el-col :span="6">-->
                  <!--<span>项目经理：</span>-->
                  <!--<el-select v-model="project.projectManager.userId" filterable size="mini">-->
                    <!--<el-option v-for="item in list.manager" :key="item.userId" :label="item.userName" :value="item.userId"></el-option>-->
                  <!--</el-select>-->
                <!--</el-col>-->
                <!--<el-col :span="6">-->
                  <!--<span>项目工程师：</span>-->
                  <!--<el-select v-model="project.projectEngineer.userId" filterable size="mini">-->
                    <!--<el-option v-for="item in list.engineer" :key="item.userId" :label="item.userName" :value="item.userId"></el-option>-->
                  <!--</el-select>-->
                <!--</el-col>-->

                <el-col :span="6"><span>销售负责人：</span><el-input v-model="basicInfo.salesDept" size="mini" clearable></el-input></el-col>
                <el-col :span="6"><span>设计经理：</span><el-input v-model="basicInfo.manager" size="mini" clearable></el-input></el-col>
                <el-col :span="6"><span>设计组长：</span><el-input v-model="basicInfo.designGroupLeader" size="mini" clearable></el-input></el-col>
                <el-col :span="6"><span>设计组员：</span><el-input v-model="basicInfo.designGroupMember" size="mini" clearable></el-input></el-col>
                <el-col :span="6"><span>改模组长：</span><el-input v-model="basicInfo.modifyGroupLeader" size="mini" clearable></el-input></el-col>
                <el-col :span="6"><span>制模部门：</span><el-input v-model="basicInfo.dept" size="mini" clearable></el-input></el-col>
                <el-col :span="6"><span>制模科长：</span><el-input v-model="basicInfo.sectionManager" size="mini" clearable></el-input></el-col>
                <el-col :span="6"><span>制模组长：</span><el-input v-model="basicInfo.proGroupLeader" size="mini" clearable></el-input></el-col>
                <el-col :span="6"><span>精修组长：</span><el-input v-model="basicInfo.fineTuningGroupLeader" size="mini" clearable></el-input></el-col>
                <el-col :span="6"><span>工程负责人：</span><el-input v-model="basicInfo.engineeringDept" size="mini" clearable></el-input></el-col>
                <el-col :span="6"><span>客户订单号：</span><el-input v-model="basicInfo.cutomerPoNo" size="mini" clearable></el-input></el-col>
                <el-col :span="6"><span>客户电话：</span><el-input v-model="basicInfo.customerTelephone" size="mini" clearable></el-input></el-col>
                <el-col :span="6"><span>客户邮箱：</span><el-input v-model="basicInfo.customerEmail" size="mini" clearable></el-input></el-col>
                <el-col :span="6"><span>客户传真：</span><el-input v-model="basicInfo.customerFax" size="mini" clearable></el-input></el-col>
                <el-col :span="6"><span>下单时间：</span><el-input v-model="basicInfo.poDate" size="mini" clearable></el-input></el-col>
                <el-col :span="6">
                  <span>提醒设置：</span>
                  <el-select v-model="warnId" placeholder="请选择" size="mini" clearable>
                    <el-option
                      v-for="item in warnList"
                      :key="item.id"
                      :label="item.warnName"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="6"><span>模具到达国家：</span><el-input v-model="basicInfo.mouldReachCountry" size="mini" clearable></el-input></el-col>
              </el-row>
            </el-form>
          </el-col>
        </el-row>
      </div>
      <hr class="mt20 mb20">
      <!-- 阶段/状态 -->
      <div class="state">
        <el-tag class="mb20">阶段/状态：</el-tag>
        <el-row :gutter="40" class="spec">
          <el-col :span="6">
            <span>项目阶段：</span>
            <el-select v-model="project.projectStage" placeholder="请选择" size="small">
              <el-option
                v-for="item in options.projectStage"
                :key="item.id"
                :label="item.label"
                :value="item.id">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <span>项目状态：</span>
            <el-select v-model="project.status" placeholder="请选择" size="small">
              <el-option
                v-for="item in options.status"
                :key="item.id"
                :label="item.label"
                :value="item.id">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
      </div>
      <hr class="mt20 mb20">
      <!-- 项目描述 -->
      <div class="description">
        <el-row>
          <el-col :span="24">
            <el-tag class="mb20 mr20">项目描述：</el-tag>
            <el-button type="primary" size="mini" @click="" class="mb20" @click="ifHasMouldNo('dialogDescriptionVisible')">添加描述</el-button>
          </el-col>
          <el-col :span="24"><el-input type="textarea" :autosize="{ minRows: 5, maxRows: 5}" v-model="formDescription.projectDescribe" resize="none" readonly></el-input></el-col>
        </el-row>
        <!-- 项目描述弹框 -->
        <el-dialog title="项目描述" :visible.sync="dialogDescriptionVisible">
          <hr>
          <!-- 前期添加的描述列表 -->
          <el-row class="descriptionList mb20" style="line-height:24px;padding:0 20px;" v-if="formDescription.list.length">
            <el-col :span="24" v-for="item in formDescription.list" :key="item.id">
              <el-col :span="24">{{item.createTime}}</el-col>
              <el-col :span="24" style="padding:0 20px;">{{item.projectDescribe}}</el-col>
            </el-col>
          </el-row>
          <!-- 新增项目描述 -->
          <el-form :model="newDescription">
            <el-form-item label="新增：" label-width="60px">
              <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 5}" v-model="newDescription.projectDescribe" maxlength="100" resize="none" autofocus="true"></el-input>
              <span style="font-size:6px;float:right;">最多输入100个字</span>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogDescriptionVisible = false">取 消</el-button>
            <el-button type="primary" @click="addNewDescription(newDescription)">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <hr class="mt20 mb20">
      <!-- 节点设置 -->
      <div class="point">
        <el-tag class="mb20">节点设置</el-tag>
        <el-row :gutter="10" style="line-height:40px;">
          <el-col :span="6">LT Without Holiday 交期（不含假期）：</el-col>
          <el-col :span="6">
            <!--<el-date-picker v-model="project.projectDeliveryTime" type="date" placeholder="选择日期"></el-date-picker>-->
            <el-input class="mr20 fl" style="width:60px;" size="mini" v-model="project.projectDeliveryTime"></el-input>周
          </el-col>
          <!--<el-col :span="2"><el-input type="text" v-model="week" size="small"></el-input></el-col>-->
          <!--<el-col :span="1">周</el-col>-->
          <!--<el-col :span="2"><el-input type="text" v-model="day" size="small"></el-input></el-col>-->
          <!--<el-col :span="1">天</el-col>-->
        </el-row>
        <!-- 新增节点 -->
        <el-button type="primary" size="mini" @click="ifHasMouldNo('dialogPoint')" class="mb20">新增节点</el-button>
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
        </el-table>



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
      <!-- 创建和取消 -->
      <el-row class="mt20" style="text-align:center;">
        <el-col :span="6" :offset="6"><el-button type="primary" size="small" @click="newItem">{{this.ifMouldNo? '保存' : '创建'}}</el-button></el-col>
        <el-col :span="6"><el-button type="primary" size="small">取消</el-button></el-col>
      </el-row>
    </div>
</template>

<script>
  import { Message } from 'element-ui';
  /** 导入api.js */
  import {getProjectDescribeList,getUserListByRoleType,getMouldBasicInfo,getProjectNodeManageList,getWarnList,
    getProjectStatusList,getProjectStrageList,addProjectNodeManage,addProjectInfo,addOrUpdateProjectDescribe,} from '../../axios/api.js'
  export default {
    name: "itemAdd",
    created: async function () {
      //项目阶段、项目状态下拉列表请求
      let stage = await getProjectStrageList();
      this.options.projectStage = this.$objToOthers(stage.msg);
      let status = await getProjectStatusList();
      this.options.status = this.$objToOthers(status.msg);
      /** 下拉选项列表数据，编辑弹框中的信息 */
      // let list = ['XIANGMUJINGLI','XIANGMUZHUANGGUAN','XIANGMUGONGCHENGSHI'].map(key => getUserListByRoleType({type: key})); --- promise对象如何转为数组
      this.list.manager = (await getUserListByRoleType({type: 'XIANGMUJINGLI'})).msg;
      this.list.zhuguan = (await getUserListByRoleType({type: 'XIANGMUZHUGUAN'})).msg;
      this.list.engineer = (await getUserListByRoleType({type: 'XIANGMUGONGCHENGSHI'})).msg;

      /** 获取提醒列表 */
      let warnList = await getWarnList();
      if(warnList.status === 1) {
        this.warnList = warnList.msg;
      }

      // /** 项目查看跳转传递模号 */
      // let mould = this.$store.getters.itemCheck_item.mouldNo;
      // if(mould) {
      //   this.getMouldBasicInfo(mould);
      // }else {
      if(this.warnList.length){
        this.warnId = this.warnList[0].id;
      }else {
        this.warnId = null;
      }
      this.project.projectStage = 'DESIGN';
      this.project.status = 'NORMAL';
      // }
      // console.log(mould);
    },

    // beforeRouteEnter(to, from, next) {
    //   if(from.path !== 'itemCheck') {
    //
    //   }
    //   next(vm => {
    //     // 通过 `vm` 访问组件实例
    //   })
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
//上传图片之前----假如需要先输入模号的话
      handleBeforeUpload(file) {
        if(!this.basicInfo.mouldNo) {
          Message({showClose: true, type: 'warning', message: '请先输入模号！'});
          return false;
        }

      },

//上传图片成功
      handleSuccess(res, file) {
        this.dialogImageUrl = res.msg.url;
        this.dialogImageUrlVisible = false;
      },

//根据模号获取项目基本信息
      async getMouldBasicInfo(arg) {
        let mould;
        if(!arg) {
          mould = this.basicInfo.mouldNo;
        }else {
          mould = arg;
        }

        if(mould !== undefined && mould !== null && mould !== '') {
          let res = await getMouldBasicInfo({mouldNo:mould, mark: 1});
          let point = await getProjectNodeManageList({mouldNo:mould,type:0});
          let newPoint = await getProjectNodeManageList({mouldNo:mould,type:1});

          //项目描述列表
          let description = await getProjectDescribeList({mouldNo: mould});
          if(description.status === 1) {
            this.formDescription.list = description.msg;
            let t = this.formDescription.list.length;
            if(t) {
              this.formDescription.projectDescribe = this.formDescription.list[t-1].projectDescribe;
            }
          }

          // //赋值图片 dialogImageUrl,如果先上传了图片后，再填写模号，模号中无论图片地址是否存在，都修改成上传的地址
          // if(!this.dialogImageUrl) {
          //   this.dialogImageUrl = res.msg.imgUrl;
          //   this.dialogImageUrlVisible = true;
          // }

          this.dialogImageUrl = res.msg.imgUrl;
          this.dialogImageUrlVisible = true;
          //获取节点数据时判断其数组长度是多少，进行不同的赋值
          if(point.msg.length === 1) {
            this.tableData[0].nodeInfo = point.msg[0].nodeInfo;
            this.tableData[1].nodeInfo = this.tableOrg[0];
          }else if(point.msg.length === 2) {
            this.tableData = point.msg;
          }
          //获取新增项目节点数据时判断其数组长度是多少，进行不同的赋值,并显示新增节点表格
          if(newPoint.msg.length === 1) {
            this.newTableData[0].nodeInfo = newPoint.msg[0].nodeInfo;
            this.newTableData[1].nodeInfo = this.tableOrg[0];
            this.newPointShow = true;
          }else if(newPoint.msg.length === 2) {
            this.newTableData = newPoint.msg;
            this.newPointShow = true;
          }else if(newPoint.msg.length === 0){
            this.newPointShow = false;
            this.newTableData = this.tableOrg;
          }
          //创建项目时需要传递id的值判断是新增还是更新
          if(res.msg.id) {
            this.id = res.msg.id;
          }else {
            this.id = null;
          }
          if(res.msg.warnId) {
            this.warnId = res.msg.warnId;
          }else if(this.warnList.length){
            this.warnId = this.warnList[0].id;
          }else {
            this.warnId = null;
          }
          //只有当存在的模号才会有数据，才能赋值给basicInfo
          if(res.msg.mouldBasicInfo !== null) {
            this.ifMouldNo = true;
            this.basicInfo = res.msg.mouldBasicInfo;
            if(res.msg.projectZhuguan !== null && res.msg.projectManager !== null && res.msg.projectEngineer !== null) {
              this.project = {
                projectZhuguan: {userId: res.msg.projectZhuguan.userId},
                projectManager: {userId: res.msg.projectManager.userId},
                projectEngineer: {userId: res.msg.projectEngineer.userId},
                projectDeliveryTime: res.msg.projectDeliveryTime,
                projectStage: "DESIGN",
                status: 'NORMAL',
              };
            }
            if(res.msg.projectStage) {
              this.project.projectStage = res.msg.projectStage;
            }else {
              this.project.projectStage = "DESIGN";
            }
            if(res.msg.status) {
              this.project.status = res.msg.status;
            }else {
              this.project.status = "NORMAL";
            }
          }else {
            this.ifMouldNo = false;
            this.dialogImageUrlVisible = false;
            this.basicInfo = {mouldNo: mould,};
            this.formDescription = {projectDescribe: '', list: [],};
            this.project = {//基本信息中的项目信息
              projectZhuguan: {userId:''},
              projectManager: {userId:''},
              projectEngineer: {userId:''},
              projectStage: 'DESIGN',
              status: 'NORMAL',
            };
            this.tableData = this.tableOrg;
            this.newPointShow = false;
            //设置默认项
            if(this.warnList.length){
              this.warnId = this.warnList[0].id;
            }else {
              this.warnId = null;
            }
            // this.project.projectStage = 'DESIGN';
            // this.project.status = 'NORMAL';
          }
        }else {
          this.ifMouldNo = false;
          this.dialogImageUrlVisible = false;
          this.basicInfo = {};
          this.formDescription = {projectDescribe: '', list: [],};
          this.project = {//基本信息中的项目信息
            projectZhuguan: {userId:''},
            projectManager: {userId:''},
            projectEngineer: {userId:''},
            projectStage: 'DESIGN',
            status: 'NORMAL',
          };
          this.tableData = this.tableOrg;
          this.newPointShow = false;
          //设置默认项
          if(this.warnList.length){
            this.warnId = this.warnList[0].id;
          }else {
            this.warnId = null;
          }
          // this.project.projectStage = 'DESIGN';
          // this.project.status = 'NORMAL';
        }
      },

//修改节点时间
      async changeNode(form) {
        let params = {
          mouldNo: this.basicInfo.mouldNo,
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
          let point = await getProjectNodeManageList({mouldNo:this.basicInfo.mouldNo,type:form.nodeType});
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
            mouldNo: this.basicInfo.mouldNo,
            nodeName: form.nodeName,
            nodeType: 1,
            timeType: 0,
            time: form.time,
            fieldType: 0,
          };
          let res = await addProjectNodeManage(params);
          if(res.status === 1) {
            //请求接口-节点列表
            let point = await await getProjectNodeManageList({mouldNo:params.mouldNo,type:1});
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
        if(this.basicInfo.mouldNo !== null && this.basicInfo.mouldNo !== undefined && this.basicInfo.mouldNo !== '') {
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
        }else {
          this.$message({showClose: true, type: 'warning', message: '请先输入模号！'})
        }
      },
      //新增节点修改
      getNewInfo(row,column,cell,event) {
        if(this.basicInfo.mouldNo !== null && this.basicInfo.mouldNo !== undefined && this.basicInfo.mouldNo !== '') {
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

//新增项目描述
      async addNewDescription(form) {
        let params = {
          mouldNo: this.basicInfo.mouldNo,
          projectDescribe: form.projectDescribe
        };
        let res = await addOrUpdateProjectDescribe(params);
        let newDescription = await getProjectDescribeList({mouldNo: this.basicInfo.mouldNo});
        if(newDescription.status === 1 && newDescription.msg.length) {
          this.formDescription.projectDescribe = newDescription.msg[newDescription.msg.length - 1].projectDescribe;
          this.formDescription.list = newDescription.msg;
          this.newDescription.projectDescribe = '';
          this.dialogDescriptionVisible = false;
        }
      },

//新增项目或编辑项目
      newItem() {
        this.$refs.itemAdd.validate(async (valid) => {
          if (valid) {
            if(this.basicInfo.mouldNo) {
              let params = {...this.project};
              //判断是编辑还是新增
              if(this.id) {
                params.id = this.id;
              }
              params.imgUrl = this.dialogImageUrl;
              params.mouldBasicInfo = this.basicInfo;
              // if(this.warnId) {
              //   params.warnId = this.warnId;
              //   let res = await addProjectInfo(params);
              //   if(res.status === 1) {
              //     this.$message({showClose: true, type: 'success', message: '创建成功！'});
              //     this.$store.dispatch('itemCheck_item',{});
              //     this.$goback();
              //   }
              // }else {
              //   Message({showClose:true, type: 'warning', message: '请选择提醒种类！'})
              // }
            //不判断是否提醒必填
              if(this.warnId) {
                params.warnId = this.warnId;
              }
              let res = await addProjectInfo(params);
              if(res.status === 1) {
                this.$message({showClose: true, type: 'success', message: '创建或保存成功！'});
                this.$store.dispatch('itemCheck_item',{});
                this.$goback();
              }
            }else {
              this.$message({showClose: true, type: 'warning', message: '请填写完整信息,其中模具编号，项目名称，项目编号，合同编号是必填项！'})
            }
          } else {
            this.$message({showClose: true, type: 'warning', message: '请填写完整信息,其中模具编号，项目名称，项目编号，合同编号是必填项！'});
            console.log('error submit!!');
            return false;
          }
        });
      },

//点击新增节点按钮前判断是否已经输入模号
      ifHasMouldNo(arg) {
        if(this.basicInfo.mouldNo !== null && this.basicInfo.mouldNo !== '' && this.basicInfo.mouldNo !== undefined) {
          this[arg] = true;
          return 1;
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

        //上传图片
        uploadData: {path: 'itemAdd'},
        limit: 1,
        dialogImageUrl: '',
        dialogImageUrlVisible: false,

        //新增项目或更新
        id: '',
        warnId: '',

        //项目描述列表信息
        formDescription: {
          projectDescribe: '',
          list: [],
        },
        newDescription: {},

        //基本信息
        basicInfo: {},
        project: {//基本信息中的项目信息
          projectZhuguan: {userId:null},
          projectManager: {userId:null},
          projectEngineer: {userId:null},
          projectStage: 'DESIGN',
          status: 'NORMAL',
        },
        //下拉项列表
        list: {
          managerName: '',
          manager: [],
          engineerName: '',
          engineer: [],
          zhuguanName: '',
          zhuguan: [],
        },

        //项目阶段、状态等options
        options: {
          projectStage: [],
          status: [],
        },

        //表格模块数据
        tableOrg: [
          {
            timeType: 0,
            nodeInfo:{
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
            }
          },
          {
            timeType: 1,
            nodeInfo:{
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
            }
          }
        ],
        //节点表格数据
        tableData: [
          {
            timeType: 0,
            nodeInfo:{
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
            }
          },
          {
            timeType: 1,
            nodeInfo:{
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
            }
          }
        ],
        //新增节点表格数据
        newTableData: [
          {
            timeType: 0,
            nodeInfo:{
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
            }
          },
          {
            timeType: 1,
            nodeInfo:{
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
            }
          }
        ],
        newPointShow: false, //新增节点表格是否显示

        //弹框表单数据
        formPoint: {},  //新增节点
        formPointChange: {},  //修改节点


        //弹框是否可见
        dialogPoint: false,
        dialogVisible: false,
        dialogPointChange: false,
        dialogDescriptionVisible: false,

        //提醒
        warnList: [],

        //判断此模号是否已经存在
        ifMouldNo: false,

        //校验
        rules: {
          mouldNo: [
            { required: true, message: '模号不能为空', trigger: 'change' }
          ],
          projectName: [
            { required: true, message: '项目名称不能为空', trigger: 'change' }
          ],
          projectNo: [
            { required: true, message: '项目编号不能为空', trigger: 'change' }
          ],
          contractNo: [
            { required: true, message: '合同编号不能为空', trigger: 'change' }
          ],
        },
        //校验信息是否行内显示
        inlineMessage: true,
      };
    },
  }
</script>

<style scoped>
  .timePoint { padding:0;line-height:20px;text-decoration:line-through;margin:0;cursor:pointer !important;}
  .cell .timePoint:last-child{text-decoration:none !important;}
  .topic {font-size:16px;font-weight:bold;color:#000;line-height:40px;}

  .spec .el-col { line-height:40px;}
  .spec .el-col span { display:inline-block; width:100px; float:left;text-align:right;padding-right:6px;box-sizing:border-box;}
  .spec .el-col .el-input{ width:calc(100% - 100px); float:left;}
  .spec .el-col .el-select{ width:calc(100% - 100px); display:inline-block;  margin: 0 !important;float:left;}

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
</style>
