<template>
  <div id="salePlanEdit">
    <el-button type="primary" size="mini" @click="$goback">返回</el-button>
    <!-- 基本参数 -->
    <div class="args mt20">
      <!-- 具体参数 -->
      <el-form :model="basicInfo" :rules="rules" ref="itemAdd" label-width="150px" label-position="left">

        <el-row :gutter="10" class="salePlanEdit">
          <el-col :span="8">
            <el-form-item label="项目启动计划日期">
              <el-date-picker :editable="false" v-model="basicInfo.projectStartPlan" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" :clearable="false"></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="项目启动实际时间">
              <el-date-picker :editable="false" v-model="basicInfo.projectStartFinish" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" :clearable="false"></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="项目启动报告日期">
              <el-date-picker :editable="false" v-model="basicInfo.projectStartReport" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" :clearable="false"></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="合同评审表计划日期">
              <el-date-picker :editable="false" v-model="basicInfo.contractReviewPlan" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" :clearable="false"></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="合同评审表实际时间">
              <el-date-picker :editable="false" v-model="basicInfo.contractReviewFinish" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" :clearable="false"></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="合同评审表是否准时">
              <span>{{basicInfo.contractReviewPlan && basicInfo.contractReviewFinish ?basicInfo.contractReviewPlan < basicInfo.contractReviewFinish? '是' : '否' :''}}</span>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="订料确认计划日期">
              <el-date-picker :editable="false" v-model="basicInfo.steelOrderConfirmationPlan" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" :clearable="false"></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="订料确认实际时间">
              <el-date-picker :editable="false" v-model="basicInfo.steelOrderConfirmationFinish" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" :clearable="false"></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="加工确认计划日期">
              <el-date-picker :editable="false" v-model="basicInfo.roughMillingApprovalPlan" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" :clearable="false"></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="加工确认实际时间">
              <el-date-picker :editable="false" v-model="basicInfo.roughMillingApprovalFinish" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" :clearable="false"></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="T0计划日期">
              <el-date-picker :editable="false" v-model="basicInfo.t0Plan" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" :clearable="false"></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="T0实际时间">
              <el-date-picker :editable="false" v-model="basicInfo.t0Finish" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" :clearable="false"></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="T1计划日期">
              <el-date-picker :editable="false" v-model="basicInfo.t1Plan" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" :clearable="false"></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="T1实际时间">
              <el-date-picker :editable="false" v-model="basicInfo.t1Finish" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" :clearable="false"></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="T2计划日期">
              <el-date-picker :editable="false" v-model="basicInfo.t2Plan" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" :clearable="false"></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="T2实际时间">
              <el-date-picker :editable="false" v-model="basicInfo.t2Finish" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" :clearable="false"></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="T3计划日期">
              <el-date-picker :editable="false" v-model="basicInfo.t3Plan" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" :clearable="false"></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="T3实际时间">
              <el-date-picker :editable="false" v-model="basicInfo.t3Finish" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" :clearable="false"></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="T4计划日期">
              <el-date-picker :editable="false" v-model="basicInfo.t4Plan" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" :clearable="false"></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="T4实际时间">
              <el-date-picker :editable="false" v-model="basicInfo.t4Finish" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" :clearable="false"></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="T5计划日期">
              <el-date-picker :editable="false" v-model="basicInfo.t5Plan" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" :clearable="false"></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="T5实际时间">
              <el-date-picker :editable="false" v-model="basicInfo.t5Finish" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" :clearable="false"></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="走模计划日期">
              <el-date-picker :editable="false" v-model="basicInfo.moldDepartureFromBasisPlan" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" :clearable="false"></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="走模实际时间">
              <el-date-picker :editable="false" v-model="basicInfo.moldDepartureFromBasisFinish" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" :clearable="false"></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="终检验收单计划日期">
              <el-date-picker :editable="false" v-model="basicInfo.finalValidationPlan" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" :clearable="false"></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="终检验收单实际时间">
              <el-date-picker :editable="false" v-model="basicInfo.finalValidationFinish" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" :clearable="false"></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="开票日期计划日期">
              <el-date-picker :editable="false" v-model="basicInfo.invoicePlan" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" :clearable="false"></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="开票日期实际时间">
              <el-date-picker :editable="false" v-model="basicInfo.invoiceFinish" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" :clearable="false"></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="FMEA">
              <el-select v-model="basicInfo.fmea" placeholder="请选择" size="mini">
                <el-option v-for="item in options.FMEA" :key="item.id" :label="item.label" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="第一次传图是否满足要求" label-width="180px">
              <el-select v-model="basicInfo.firstUploadPic" placeholder="请选择" size="mini">
                <el-option v-for="item in options.sendPhoto" :key="item.id" :label="item.label" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="是否实现销售">
              <el-select v-model="basicInfo.saleOrNot" placeholder="请选择" size="mini">
                <el-option v-for="item in options.saleSelect" :key="item.id" :label="item.label" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <!--<el-col :span="24">-->
            <!--<el-form-item label="备注">-->
              <!--<el-input type="textarea" :autosize="{ minRows: 5, maxRows: 5}" v-model="basicInfo.remark" resize="none"></el-input>-->
            <!--</el-form-item>-->
          <!--</el-col>-->

        </el-row>
      </el-form>

      <div class="mt20 tc">
        <el-button type="primary" @click="saveInfo(basicInfo)">保存</el-button>
      </div>

    </div>
  </div>
</template>

<script>
  import { Message } from 'element-ui'
  /** 导入api.js */
  import {updateSalePlan,} from '../../../axios/api.js'
  export default {
    name: "salePlanEdit",
    created: async function () {
      this.basicInfo = this.$store.getters.salePlan;
      this.first = Object.assign({},this.basicInfo);
    },

    computed: {

    },

    methods: {
    //更新信息
      async saveInfo(info) {
        for (let i in info) {
          if(info[i] !== '' && info[i] !== null && info[i] !== this.first[i]) {
            this.hasChange[i] = info[i];
            // console.log(this.hasChange);
          }
        }
        if(Object.keys(this.hasChange).length) {
          this.hasChange.mouldNo = this.first.mouldNo;
          let res = await updateSalePlan(this.hasChange);
          if(res.status === 1) {
            Message({showClose: true, type: 'success', message: '保存信息成功！'});
          }
        }
        this.$router.push('/salePlan');
      }
    },
    data() {
      return {
        projectStartPlan: '',
        //监听
        first: {},
        hasChange: {},

        basicInfo: {

        },
        rules: {

        },
        options: {
          contractSelect: [
            { label: '是', id: true,},
            { label: '否', id: false,},
          ],
          FMEA: [
            { label: '是', id: 1,},
            { label: '否', id: 0,},
            { label: 'NA', id: -1,},
          ],
          sendPhoto: [
            { label: '是', id: true,},
            { label: '否', id: false,},
          ],
          saleSelect: [
            { label: '是', id: true,},
            { label: '否', id: false,},
          ],
        },
      }
    }
  }
</script>

<style lang="scss">
  @import "../../../style/commons.scss";
 .salePlanEdit {
   .el-date-editor {
     max-width: 100% !important;
   }
   .el-col {
     //border-bottom: $--border;
     //border-right: $--border;
     .el-form-item {
       overflow: hidden;
       height: 40px;
       margin: 10px 0;
     }
     &:last-child {
       .el-form-item {
         height: auto;
       }
     }
   }
 }
</style>
