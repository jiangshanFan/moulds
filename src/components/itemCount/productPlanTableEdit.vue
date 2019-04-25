<template>
  <div id="productPlanTableEdit">
    <el-button type="primary" plain @click="$goback" class="el-button_plain_mini">返回</el-button>
    <!-- bigTypeName -->
    <div class="mt20">
      <el-button type="primary" plain :class="{active: isActive===1}" @click="getTableInfo(1)">设计</el-button>
      <el-button type="primary" plain :class="{active: isActive===2}" @click="getTableInfo(2)">加工</el-button>
      <el-button type="primary" plain :class="{active: isActive===3}" @click="getTableInfo(3)">精修整</el-button>
    </div>

    <!-- table -->
    <el-table :data="table" border stripe style="width: 100%;margin-top:5px;"
              header-cell-class-name="header_cell table_header_shadow" tooltip-effect="light" :cell-style="cellStyle">
      <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
      <el-table-column prop="processName" label="工序名称" :show-overflow-tooltip="tooltip" align="center"></el-table-column>
      <el-table-column prop="appointStartDate" label="计划开始时间" width="150" align="center"></el-table-column>
      <el-table-column prop="appointEndDate" label="计划结束时间" width="150" align="center"></el-table-column>
      <el-table-column prop="actualStartDate" label="实际开始时间" width="150" align="center"></el-table-column>
      <el-table-column prop="actualEndDate" label="实际结束时间" width="150" align="center"></el-table-column>
      <el-table-column fixed="right" label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button class="el-icon-back rotate90 buttonBorder" @click="up(scope.row)" size="medium" type="text" v-if="scope.row.bigTypeCode === 3 && scope.row.flag !== 1"></el-button>
          <el-button class="el-icon-back rotate270 buttonBorder" @click="down(scope.row)" size="medium" type="text" v-if="scope.row.bigTypeCode === 3 && scope.row.flag !== -1"></el-button>
          <el-button class="el-icon-edit-outline buttonBorder" @click="show_edit(scope.row)" size="medium" type="text"></el-button>
          <el-button class="el-icon-delete buttonBorder" @click="process_delete(scope.row)" size="medium" type="text" v-if="scope.row.partStatus"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- add new processName -->
    <el-button class="el-icon-circle-plus" size="medium" type="text" style="font-size:12px;" v-if="isActive === 3" @click="showDialog">添加工序</el-button>

    <!-- dialogs -->
    <el-dialog title="" :visible.sync="dialogFormVisible" center custom-class="dialogStyle">
      <el-form :model="form" label-position="right">
        <el-row :gutter="10" style="line-height:40px;">
          <el-col :span="24">
            <el-form-item class="fwb f16 c3" label="工序名称：" label-width="82">
              <el-input v-model="form.processName" autocomplete="off" size="small" style="width:200px;" :disabled="form.partStatus === 0" :title="form.processName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="form.bigTypeCode === 3">
            <el-form-item label="工序类别：" label-width="82">
              <span class="fwb c3">精修整</span>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="计划时间：" label-width="82">
              <el-date-picker v-model="form.appointStartDate" type="date" placeholder="选择起始日期" value-format="yyyy-MM-dd" @change="checkTime"></el-date-picker> ——
              <el-date-picker v-model="form.appointEndDate" type="date" placeholder="选择结束日期" value-format="yyyy-MM-dd" @change="checkTime"></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="实际时间：" label-width="82">
              <el-date-picker v-model="form.actualStartDate" type="date" placeholder="选择起始日期" value-format="yyyy-MM-dd" @change="checkTime"></el-date-picker> ——
              <el-date-picker v-model="form.actualEndDate" type="date" placeholder="选择结束日期" value-format="yyyy-MM-dd" @change="checkTime"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addOrChangeProcess(form)">确 定</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
  import { Message, MessageBox, Loading } from 'element-ui';
  /** 导入api.js */
  import {queryProcessDetailsByMouldCodeAndBigTypeCode, deleteProcessDetails, changeOrderProcessDetails, insertProcessDetails, updateProcessDetails} from '../../axios/api.js'

  export default {
    name: "productPlanTableEdit",
    created() {
      //初始化请求表格数据，传递设计类型--1
      this.getTableInfo(1);
    },
    methods: {
      //初始化，编辑，新增后刷新表格数据
      async getTableInfo(type) {
        this.isActive = type;
        let res = await queryProcessDetailsByMouldCodeAndBigTypeCode({mouldCode: this.$store.getters.itemCheck_item.mouldNo, bigTypeCode: type, mark: type});
        if(res.status === 1) {
          this.table = res.msg;
          for (let i =0; i < this.table.length; i++) {
            if(i === 0) {
              this.table[i].flag = 1;
            }else if(i === this.table.length - 1) {
              this.table[i].flag = -1;
            }
          }
        }
      },

      //上下移
      async up(row) {
        let res = await changeOrderProcessDetails({id: row.id, sortOrder: row.sortOrder, flag: 1});
        if(res.status === 1) {
          this.getTableInfo(row.bigTypeCode);
          Message({showClose: true, type: 'success', message: '上移成功！'});
        }
      },
      async down(row) {
        let res = await changeOrderProcessDetails({id: row.id, sortOrder: row.sortOrder, flag: -1});
        if(res.status === 1) {
          this.getTableInfo(row.bigTypeCode);
          Message({showClose: true, type: 'success', message: '下移成功！'});
        }
      },

      //添加工序
      showDialog() {
        this.dialogFormVisible = true;
        this.form = {bigTypeCode: 3, };
        this.type = 0;
      },

      async addOrChangeProcess(form) {
        if(this.valid) {
          if(this.valid1) {
            if(form.processName && form.appointStartDate && form.appointEndDate) {
              form.mouldCode = this.$store.getters.itemCheck_item.mouldNo;
              if(this.type === 0) {
                let res = await insertProcessDetails(form);
                if(res.status === 1) {
                  this.dialogFormVisible = false;
                  Message({showClose: true, type: 'success', message: '添加新工序成功！'});
                }
              }else {
                let res = await updateProcessDetails(form);
                if(res.status === 1) {
                  this.dialogFormVisible = false;
                  Message({showClose: true, type: 'success', message: '修改工序成功！'});
                }
              }
              this.getTableInfo(form.bigTypeCode);
            }else{
              Message({showClose: true, type: 'warning', message: '请填写完整信息，其中工序名称为必填项，若有计划开始时间必须有计划结束时间！'});
            }
          }else  {
            Message({showClose: true, type: 'error', message: '请正确填写时间，若有实际结束时间必须有实际开始时间，且实际开始时间必须小于实际结束时间！'});
          }
        }else  {
          Message({showClose: true, type: 'error', message: '请正确填写时间，计划开始时间必须小于计划结束时间！'});
        }
      },

      //编辑工序
      async show_edit(row) {
        this.form = JSON.parse(JSON.stringify(row));
        this.dialogFormVisible = true;
        this.type = 1;
      },

      //删除新增工序
      process_delete(row) { //此处如果还是使用this,就会指向当前页面的，而不是全局的
        let self = this;
        this.processDelete = row;
        MessageBox.confirm(`
            <div class="ovw-h">
            <!--确认是否删除的弹框-->
              <div class="flex_row_container" style="width: 600px;align-items:center;text-align:left;">
                <p class="messageBox_icon_confirm" style="width:200px;height:200px;"></p>
                <div class="ovw-h" style="padding:30px;box-sizing:border-box;width:400px;">
                  ${`是否删除工序
                  <p class="c3 fwb f16">“${row.processName}?”</p>`}
                </div>
              </div>
            </div>`, '', {dangerouslyUseHTMLString: true, confirmButtonText: '确定', cancelButtonText: '取消',}).then(
              async function() {
                let res = await deleteProcessDetails({id: row.id});
                if(res.status === 1) {
                  self.getTableInfo(row.bigTypeCode);
                  Message({type: 'success', message: '删除成功!'});
                }
              }).catch(
              function() {
                Message({type: 'info', message: '已取消删除'});
              })
      },

      //校验时间
      checkTime() {
        let form = this.form;
        if(form.appointStartDate && form.appointEndDate) {
          this.valid = form.appointStartDate <= form.appointEndDate;
        }

        if(form.actualEndDate) {
          if(form.actualStartDate) {
            this.valid1 = form.actualStartDate <= form.actualEndDate;
          }else {
            this.valid1 = false;
          }
        }
      }
    },
    data() {
      return {
        //切换显示不同的类型
        isActive: 1,
        tooltip: true,

        dialogFormVisible: false,
        form: {},
        valid: true, //判断弹框中输入的时间是否正确
        valid1: true, //判断弹框中输入的时间是否正确

        //确认删除的工序
        processDelete: {},

        //判断是修改还是新增
        type: 0,

        //表格数据
        table: [
        ],
        cellStyle: {
          height: '40px !important',
          padding: 0,
        },

      }
    }
  }
</script>

<style scoped>
  .buttonBorder{
    border: 1px solid;
    border-radius: 0;
    padding: 0;
  }
  .dialogStyle{
    padding: 20px 40px;
  }
</style>
