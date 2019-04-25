<template>
  <div id="add" class="border" style="padding:15px 30px;">
    <el-button type="primary" size="mini" class="mb20" @click="$goback">返回</el-button>

    <!-- 内容 -->
    <div class="ovw-h mt20">
      <div class="info">
        <!-- 反馈信息 -->
        <el-row :gutter="20">
          <el-col :span="18">标题：<el-input v-model="info.title" size="small"></el-input></el-col>
          <!--<el-col :span="8">制品名称：<el-input v-model="info.product" size="small"></el-input></el-col>-->
          <el-col :span="8">模具编号：<el-input v-model="info.mouldNo" size="small"></el-input></el-col>
        </el-row>
        <!-- 模具使用是否正常 -->
        <div class="ovw-h mt20">
          <el-col :span="24">
            <span>模具使用是否正常：</span>
            <el-radio v-model="radio" label="1" border size="mini">正常</el-radio>
            <el-radio v-model="radio" label="2" border size="mini">异常</el-radio>
          </el-col>
        </div>
      </div>

      <div class="add-content border mt20">
        <p>{{radio === '1'? '希望我们进一步提高的地方：' : '异常原因：'}}</p>
        <el-input
          type="textarea"
          :autosize="{ minRows: 15}"
          placeholder="请输入内容"
          v-model="info.details">
        </el-input>

        <!-- 上传图片或者文件 -->
        <div class="add-upload mt20 mb20">
          <el-upload
            action="/api/upload/uploadManyFile"
            accept="image/*"
            list-type="picture-card" multiple
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="handleAvatarSuccess"
            :data="uploadData"
            :file-list="fileList"
            :limit="6"
            :on-exceed="handleExceed">
            <i class="el-icon-plus"><div slot="tip" class="el-upload__tip">添加图片</div></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="info.imgeUrl" alt="">
          </el-dialog>
        </div>
      </div>

      <el-row style="text-align:center;" class="mt20">
        <el-col :span="6" :offset="6"><el-button type="primary" plain size="medium" @click="addNew(info)">提交</el-button></el-col>
        <el-col :span="6"><el-button type="primary" plain size="medium" @click="back">取消</el-button></el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import { Message } from 'element-ui';
  /** 导入api.js */
  import {addFeedBack} from '../../axios/api.js'
  export default {
    name: "add",
    data() {
      return {
        //添加新增信息
        info: {},

        //上传图片
        imgUrl: '', //提交反馈的图片地址
        fileList: [],
        uploadData: {path: 'feedback'}, //上传时需要传递的额外参数

        radio: '1',
        dialogVisible: false
      }
    },
    mounted() {

    },
    methods: {
//添加新反馈
      async addNew(info) {
        info.imgeUrl = this.imgUrl?this.imgUrl.slice(0,this.imgUrl.length - 1):this.imgUrl;
        info.normal = (this.radio === '1');
        if(info.title && info.mouldNo) {
          let res = await addFeedBack(info);
          if(res.status === 1) {
            this.$message({showClose: true, type: 'success', message: '新增反馈成功！'});
            this.$router.push('/list');
          }
        }else{
          this.$message({showClose: true, type: 'warning', message: '请填写完整所有内容！'});
        }

      },

      handleAvatarSuccess(res, file) {//图片上传成功
        let img = res.msg[0].url;
        this.imgUrl += img + '|';
      },

      handleRemove(file, fileList) {
        this.fileToImg(fileList);
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.info.imgeUrl = file.url;
        this.dialogVisible = true;
      },
      handleExceed(files, fileList) {
        // this.$message.warning(`当前限制选择 6 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        this.$message.warning(`图片添加数量不能超过6张!`);
      },
      back() {
        this.$router.go(-1);
      },
      //转换 fileList 到拼接 字符串类型 imgUrl, | 连接
      fileToImg (val) {
        for (let item of val) {
          this.imgUrl += item.url + '|';
        }
      },
    }
  }
</script>

<style scoped>
  .el-row {
    line-height:40px;
    /*font-weight:bold;*/
    color:#333;
    font-size:13px;
  }

  textarea {border:none !important;}
</style>
