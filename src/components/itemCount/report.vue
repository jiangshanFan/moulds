<template>
    <div id="report">
      <el-button type="primary" plain @click="$goback">返回</el-button>
      <div class="ovw-h" style="width:90%;min-width:720px;margin:0 auto;max-width:980px;">
        <div class="reportContent mb20" style="padding-bottom:10px;border-bottom:1px dashed;">
          <!-- 头部项目信息 -->
          <el-row :gutter="10" class="mt20 mb20" style="padding-left:20px;font-size:16px;">
            <el-col :span="8">项目编号：{{report.projectNo}}</el-col>
            <el-col :span="8">模具编号：{{report.mouldCode}}</el-col>
            <el-col :span="8">零件编号：{{report.materialNo?report.materialNo.slice(9,report.materialNo.length): ''}}</el-col>
          </el-row>
          <!-- 表单 -->
          <el-form ref="form" :model="report" label-width="90px" disabled style="border:1px solid #aaa;" class="reportForm">
            <el-form-item label-width="0">
              <el-row :gutter="10">
                <el-col :span="12"><img src="../../assets/logo.png" alt="logo" style="height:40px;width:auto;"></el-col>
                <el-col :span="12"><el-form-item label="单号"><el-input v-model="report.noAdd"></el-input></el-form-item></el-col>
              </el-row>
              <el-row :gutter="10"><el-col :span="24" style="text-align: center;">不合格处理报告</el-col></el-row>

              <el-row :gutter="10"><el-col :span="24"><el-form-item label="主题"><el-input v-model="report.title"></el-input></el-form-item></el-col></el-row>

              <el-row :gutter="10">
                <el-col :span="12"><el-form-item label="申请人"><el-input v-model="report.appliMan"></el-input></el-form-item></el-col>
                <el-col :span="12"><el-form-item label="申请日期"><el-input v-model="report.appliDate"></el-input></el-form-item></el-col>
              </el-row>

              <el-row :gutter="10"><el-col :span="24"><el-form-item label="申请部门"><el-input v-model="report.appliDept"></el-input></el-form-item></el-col></el-row>

              <el-row :gutter="10"><el-col :span="24"><el-form-item label="检查人员"><el-input v-model="report.checkMan"></el-input></el-form-item></el-col></el-row>

              <el-row :gutter="10">
                <el-col :span="8"><el-form-item label="公司名称"><el-input v-model="report.companyName"></el-input></el-form-item></el-col>
                <el-col :span="8"><el-form-item label="运营中心"><el-input v-model="report.operationCenter"></el-input></el-form-item></el-col>
                <el-col :span="8"><el-form-item label="采购订单号"><el-input v-model="report.purchaseOrderNo"></el-input></el-form-item></el-col>
              </el-row>

              <el-row :gutter="10">
                <el-col :span="24">
                  <el-form-item label="不合格来源">
                  <span style="padding-left:5px;">
                    <el-radio v-model="report.unqualifiledSources" label="外购">外购</el-radio>
                    <el-radio v-model="report.unqualifiledSources" label="外协">外协</el-radio>
                    <el-radio v-model="report.unqualifiledSources" label="制程">制程</el-radio>
                  </span>
                  </el-form-item>
                </el-col>
              </el-row>


              <el-row :gutter="10">
                <el-col :span="8"><el-form-item label="收货单号"><el-input v-model="report.receivedNo"></el-input></el-form-item></el-col>
                <el-col :span="8"><el-form-item label="收货项次"><el-input v-model="report.itemsReceived"></el-input></el-form-item></el-col>
                <el-col :span="8"><el-form-item label="检验批次"><el-input v-model="report.checkBatch"></el-input></el-form-item></el-col>
              </el-row>

              <el-row :gutter="10">
                <el-col :span="16"><el-form-item label="物料编号"><el-input v-model="report.materialNo"></el-input></el-form-item></el-col>
                <el-col :span="8"><el-form-item label="进料日期"><el-input v-model="report.feedDate"></el-input></el-form-item></el-col>
              </el-row>

              <el-row :gutter="10"><el-col :span="24"><el-form-item label="物料名称"><el-input v-model="report.materialBane"></el-input></el-form-item></el-col></el-row>

              <el-row :gutter="10">
                <el-col :span="8"><el-form-item label="规格型号"><el-input v-model="report.specModel"></el-input></el-form-item></el-col>
                <el-col :span="8"><el-form-item label="图号"><el-input v-model="report.mapNumber"></el-input></el-form-item></el-col>
                <el-col :span="8"><el-form-item label="版本"><el-input v-model="report.edition"></el-input></el-form-item></el-col>
              </el-row>

              <el-row :gutter="10"><el-col :span="24"><el-form-item label="责任部门"><el-input v-model="report.responDept"></el-input></el-form-item></el-col></el-row>

              <el-row :gutter="10"><el-col :span="24"><el-form-item label="责任人"><el-input v-model="report.responMan"></el-input></el-form-item></el-col></el-row>

              <el-row :gutter="10"><el-col :span="24"><el-form-item label="本批数量"><el-input v-model="report.batchNumber"></el-input></el-form-item></el-col></el-row>

              <el-row :gutter="10">
                <el-col :span="8"><el-form-item label="检验数量"><el-input v-model="report.checkNumber"></el-input></el-form-item></el-col>
                <el-col :span="8"><el-form-item label="不良品数量"><el-input v-model="report.badNumber"></el-input></el-form-item></el-col>
                <el-col :span="8"><el-form-item label="不良品率"><el-input v-model="report.badRate"></el-input></el-form-item></el-col>
                <el-col :span="8"><el-form-item label="分群码"><el-input v-model="report.clustreCode"></el-input></el-form-item></el-col>
                <el-col :span="8"><el-form-item label="分群码名称"><el-input v-model="report.clustreCodeName"></el-input></el-form-item></el-col>
                <el-col :span="8"><el-form-item label="客户名称"><el-input v-model="report.customName"></el-input></el-form-item></el-col>
                <el-col :span="8"><el-form-item label="单位"><el-input v-model="report.unit"></el-input></el-form-item></el-col>
                <el-col :span="8"><el-form-item label="异常等级"><el-input v-model="report.abnormalGrade"></el-input></el-form-item></el-col>
                <el-col :span="8"><el-form-item label="不良类型"><el-input v-model="report.badType"></el-input></el-form-item></el-col>
                <el-col :span="8"><el-form-item label="不良大类"><el-input v-model="report.badLargeCategory"></el-input></el-form-item></el-col>
                <el-col :span="8"><el-form-item label="不良中类"><el-input v-model="report.badMediumCategory"></el-input></el-form-item></el-col>
                <el-col :span="8"><el-form-item label="不良细类"><el-input v-model="report.badFineCategory"></el-input></el-form-item></el-col>
              </el-row>

              <el-row :gutter="10">
                <el-col :span="24">
                  <el-form-item label="不合格项描述">
                    <el-input class="textarea" type="textarea" resize="none" :autosize="{ minRows: 3,}" v-model="report.unqualfiedDesc" :title="report.unqualfiedDesc"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <!--<el-row :gutter="10"><el-col :span="24"><el-form-item label="附件"></el-form-item></el-col></el-row>-->

              <el-row :gutter="10"><el-col :span="24"><el-form-item label="初审关"><el-input v-model="report.firstPoint"></el-input></el-form-item></el-col></el-row>

              <el-row :gutter="10"><el-col :span="24"><el-form-item label="评审关"><el-input v-model="report.assessmentPoint"></el-input></el-form-item></el-col></el-row>

              <el-row :gutter="10"><el-col :span="24"><el-form-item label="知悉关"><el-input v-model="report.knowPoint"></el-input></el-form-item></el-col></el-row>

              <el-row :gutter="10"><el-col :span="24"><el-form-item label="终审关"><el-input v-model="report.finalPoint"></el-input></el-form-item></el-col></el-row>

              <el-row :gutter="10">
                <el-col :span="24">
                  <el-form-item label="是否进行成本核算">
                  <span style="padding-left:5px;">
                    <el-radio v-model="report.whetherAccountCost" label="是">是</el-radio>
                    <el-radio v-model="report.whetherAccountCost" label="否">否</el-radio>
                  </span>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="10"><el-col :span="24" style="text-align: center;">成本损失核算</el-col></el-row>

              <el-row :gutter="10">
                <el-col :span="16">
                  <el-form-item label="费用说明">
                    <el-input class="textarea" type="textarea" resize="none" :autosize="{ minRows: 3,}" v-model="report.costExplain" :title="report.costExplain"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="费用总计">
                    <el-input class="textarea" type="textarea" resize="none" :autosize="{ minRows: 3,}" v-model="report.costTotal"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
        </div>

        <!-- 动态数据 -->
        <div class="ovw-h" style="position:relative;border:1px dashed;" v-if="report.items?report.items.length : false">
          <el-row class="label ovw-h" v-for="(item,index) in report.items" :key="index">
            <el-col style="width:100px;line-height:60px;text-align:center;border-right:1px dashed;">{{item.tableHead}}</el-col>
            <el-col style="width:calc(100% - 100px);line-height:30px;padding:0 10px;">
              <p class="out" style="margin:0;height:30px;">{{item.approverOpinion}}</p>
              <p style="text-align:right;margin:0;">{{item.approverMan}} {{'（' +item.approverDate + '）'}}</p>
            </el-col>
          </el-row>
        </div>
      </div>

    </div>
</template>

<script>
  import { Message } from 'element-ui';
  export default {
    name: "report",
    created: async function() {
      // this.basicInfo = Object.assign(this.$store.getters.itemCheck_item,this.$store.getters.projects_info);
      //根据统计列表跳转传递的参数获取不合格报告数据
      this.report = this.$store.getters.itemCheck_report;
      this.report.firstPoint = this.report.firstPoint.split(';')[0];
      this.report.assessmentPoint = this.report.assessmentPoint.split(';')[0];
      this.report.knowPoint = this.report.knowPoint.split(';')[0];
      this.report.finalPoint = this.report.finalPoint.split(';')[0];
    },

    // beforeRouteLeave (to, from, next) {
    //   // 导航离开该组件的对应路由时调用
    //   // 可以访问组件实例 `this`
    //   if(to.path !== '/purchase' && to.path !== '/machineBad') {
    //     this.$store.dispatch('itemCheck_item',{});
    //   }
    //
    //   console.log(to.path);
    //   next();
    // },

    computed: {

    },
    methods: {

    },
    data () {
      return {
        //详情参数
        report: {},
        basicInfo: {},
      }
    }
  }
</script>


<style scoped>
  form { padding: 0 5px;}
  form .el-col { border-bottom: 1px solid #aaa; padding: 5px;}
  .el-form-item { margin-bottom:0 !important;}
</style>
