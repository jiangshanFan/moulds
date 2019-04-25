<template>
  <div id="projectInfoDetailEdit">
    <el-button type="primary" plain @click="$goback" class="el-button_plain_mini">返回</el-button>

    <div id="allInfo">
      <h2 class="tc fwb border_solid_bottom_c lh40">工程任务书详情编辑</h2>

      <el-row :gutter="30">
        <!-- 上传图片 -->
        <el-col :span="4">
          <img :src="basicInfo.imgUrl" alt="项目图" v-if="dialogImageUrlVisible" class="mb20">
          <el-upload action="/api/upload/uploadFile" list-type="picture-card"
                     :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-success="handleSuccess"
                     :auto-upload="true" :limit=limit :data="uploadData">
            <!--<i class="el-icon-plus"></i>-->
            <el-button size="small" type="primary">上传图片</el-button>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="basicInfo.imgUrl" alt="图片">
          </el-dialog>
        </el-col>
        <!-- 具体参数 -->
        <el-col class="mb20" :span="20">
          <el-form :model="basicInfo" :rules="rules" ref="projectInfoDetailEdit" label-width="132px" label-position="right">

            <el-row :gutter="10" class="spec">
              <el-col :span="6">
                <!--<span>模具编号：</span><el-input v-model="basicInfo.mouldNo" size="mini" clearable @change="getMouldBasicInfo"></el-input>-->
                <el-form-item label="模具编号：" prop="mouldNo">
                  <el-tooltip content="不可修改，如需修改，请联系销售重新提交合同评审表！" placement="top" effect="light" :popper-class="tipsStyle">
                    <el-input style="width:100%;" v-model="basicInfo.mouldNo" size="mini" clearable disabled :title="basicInfo.mouldNo"></el-input>
                  </el-tooltip>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <!--<span>项目编号：</span><el-input v-model="basicInfo.projectNo" size="mini" clearable></el-input>-->
                <el-form-item label="项目编号：" prop="projectNo">
                  <el-input style="width:100%;" v-model="basicInfo.projectNo" size="mini" clearable :title="basicInfo.projectNo"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <!--<span>项目名称：</span><el-input v-model="basicInfo.projectName " size="mini" clearable></el-input>-->
                <el-form-item label="制品名称：" prop="partName">
                  <el-input style="width:100%;" v-model="basicInfo.partName" size="mini" clearable :title="basicInfo.partName"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <!--<span>合同编号：</span><el-input v-model="basicInfo.contractNo" size="mini" clearable></el-input>-->
                <el-form-item label="制品编号：">
                  <el-input style="width:100%;" v-model="basicInfo.partNo" size="mini" clearable :title="basicInfo.partNo"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6"><span>制品尺寸：</span><el-input v-model="basicInfo.partSize" size="mini" clearable :title="basicInfo.partSize"></el-input></el-col>

              <el-col :span="6"><span>客户模号：</span><el-input v-model="basicInfo.customerMouldCode" size="mini" clearable :title="basicInfo.customerMouldCode"></el-input></el-col>
              <el-col :span="6"><span>客户的成型工厂：</span><el-input v-model="basicInfo.customerMoldingFactory" size="mini" clearable :title="basicInfo.customerMoldingFactory"></el-input></el-col>
              <el-col :span="6"><span>客户是否开过模具：</span><el-input v-model="basicInfo.customerOpenOrNoMould" size="mini" clearable :title="basicInfo.customerOpenOrNoMould"></el-input></el-col>

              <el-col :span="6"><span>制品材料：</span><el-input v-model="basicInfo.material" size="mini" clearable :title="basicInfo.material"></el-input></el-col>

              <el-col :span="6"><span>制品颜色：</span><el-input v-model="basicInfo.productColour" size="mini" clearable :title="basicInfo.productColour"></el-input></el-col>

              <el-col :span="6"><span>收缩率：</span><el-input v-model="basicInfo.shrinkageRate" size="mini" clearable :title="basicInfo.shrinkageRate"></el-input></el-col>

              <el-col :span="6"><span>皮纹号：</span><el-input v-model="basicInfo.grainNo" size="mini" clearable :title="basicInfo.grainNo"></el-input></el-col>
              <el-col :span="6"><span>模腔数量：</span><el-input v-model="basicInfo.cavityQty" size="mini" clearable :title="basicInfo.cavityQty"></el-input></el-col>
              <el-col :span="6"><span>热流道：</span><el-input v-model="basicInfo.runner" size="mini" clearable :title="basicInfo.runner"></el-input></el-col>
              <el-col :span="6"><span>浇口：</span><el-input v-model="basicInfo.gate" size="mini" clearable :title="basicInfo.gate"></el-input></el-col>
              <el-col :span="6"><span>A板：</span><el-input v-model="basicInfo.aplate" size="mini" clearable :title="basicInfo.aplate"></el-input></el-col>
              <el-col :span="6"><span>B板：</span><el-input v-model="basicInfo.bplate" size="mini" clearable :title="basicInfo.bplate"></el-input></el-col>
              <el-col :span="6"><span>型腔：</span><el-input v-model="basicInfo.cavity" size="mini" clearable :title="basicInfo.cavity"></el-input></el-col>
              <el-col :span="6"><span>型芯：</span><el-input v-model="basicInfo.core" size="mini" clearable :title="basicInfo.core"></el-input></el-col>
              <el-col :span="6"><span>滑块：</span><el-input v-model="basicInfo.slider" size="mini" clearable :title="basicInfo.slider"></el-input></el-col>

              <el-col :span="6"><span>启动日期：</span><el-input v-model="basicInfo.startMouldDate" size="mini" clearable :title="basicInfo.startMouldDate"></el-input></el-col>
              <el-col :span="6"><span>T1时间：</span><el-input v-model="basicInfo.t1Date" size="mini" clearable :title="basicInfo.t1Date"></el-input></el-col>
              <el-col :span="6"><span>送样时间：</span><el-input v-model="basicInfo.sampleDeliveryTime" size="mini" clearable :title="basicInfo.sampleDeliveryTime"></el-input></el-col>

              <!--  -->
              <el-col :span="6">
                <span>制造工厂：</span>
                <el-select v-model="basicInfo.manufacturingPlant " filterable size="mini" :title="basicInfo.manufacturingPlant">
                  <el-option label="深圳一厂" value="深圳一厂"></el-option>
                  <el-option label="深圳二厂" value="深圳二厂"></el-option>
                  <el-option label="深圳五厂" value="深圳五厂"></el-option>
                  <el-option label="天津" value="天津"></el-option>
                  <el-option label="武汉" value="武汉"></el-option>
                  <el-option label="南通" value="南通"></el-option>
                </el-select>
              </el-col>

              <el-col :span="6"><span>设计外包：</span><el-input v-model="basicInfo.designOutsourcing" size="mini" clearable :title="basicInfo.designOutsourcing"></el-input></el-col>
              <el-col :span="6"><span>制造外包：</span><el-input v-model="basicInfo.manufacturingOutsourcing" size="mini" clearable :title="basicInfo.manufacturingOutsourcing"></el-input></el-col>
              <el-col :span="6"><span>制品3D数据图档名：</span><el-input v-model="basicInfo.productDataFileName" size="mini" clearable :title="basicInfo.productDataFileName"></el-input></el-col>
              <el-col :span="6"><span>标准件：</span><el-input v-model="basicInfo.standardParts" size="mini" clearable :title="basicInfo.standardParts"></el-input></el-col>

            </el-row>
          </el-form>

        </el-col>
        <el-col><span>客户是否有参考模、经验总结或特别要求：</span><el-input class="mt20" type="textarea" resize="none" :rows="3" v-model="basicInfo.customerAdditionalRequirements"></el-input></el-col>
      </el-row>
      <el-row class="tc mt20">
        <el-button type="primary" @click="saveData">保存</el-button>
      </el-row>

    </div>
  </div>
</template>

<script>
  import { Message, MessageBox } from 'element-ui';
  /** 导入api.js */
  import {updateProjectInformation } from '../../axios/api.js'

  export default {
    name: "projectInfoDetailEdit",
    created: function() {
      this.basicInfo = this.$store.getters.projectInfoDetailEdit;
      console.log(this.basicInfo);
      if(this.basicInfo.imgUrl) {
        this.dialogImageUrlVisible = true;
      }
    },

    mounted() {
      console.log(this.$refs.projectInfoDetailEdit);
    },

    methods: {
      //保存修改后的信息并返回详情页
      saveData() {
        this.$refs.projectInfoDetailEdit.validate(async (valid) => {
          if (valid) {
            let res = await updateProjectInformation(this.basicInfo);
            if(res.status === 1) {
              Message({showClose: true, type: 'success', message: '修改并保存信息成功！'});
              this.$goto('/projectInfoDetail');
            }
          } else {
            this.$message({showClose: true, type: 'warning', message: '请填写完整信息,其中模具编号，项目名称，项目编号，合同编号是必填项！'});
            console.log('error submit!!');
            return false;
          }
        });
      },

      //上传图片成功
      handleSuccess(res, file) {
        this.basicInfo.imgUrl = res.msg.url;
        this.dialogImageUrlVisible = false;
      },

      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.basicInfo.imgUrl = file.url;
        this.dialogVisible = true;
      },
    },
    data() {
      return {
        //上传图片
        uploadData: {path: 'itemAdd'},
        limit: 1,
        dialogImageUrlVisible: false,
        dialogVisible: false,

        basicInfo: {},

        //tooltip样式
        tipsStyle: 'tooltip_#D9270A',

        //校验
        rules: {
          mouldNo: [
            { required: true, message: '模号不能为空', trigger: 'change' }
          ],
          projectNo: [
            { required: true, message: '项目名称不能为空', trigger: 'change' }
          ],
          // partNo: [
          //   { required: true, message: '制品编号不能为空', trigger: 'change' }
          // ],
          partName: [
            { required: true, message: '制品名称不能为空', trigger: 'change' }
          ],
        },
      }
    }
  }
</script>

<style scoped>
  .spec .el-col { line-height:40px;}
  .spec .el-col span { display:inline-block; width:132px; float:left;text-align:right;padding-right:6px;box-sizing:border-box;}
  .spec .el-col .el-input{ width:calc(100% - 132px); float:left;}
  .spec .el-col .el-select{ width:calc(100% - 132px); display:inline-block;  margin: 0 !important;float:left;}
</style>
