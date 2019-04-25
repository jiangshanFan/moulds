<template>
    <div id="notice">
      <!-- 搜索 -->
      <div class="section-search mb20">
        <el-row>
          <el-col :span="24">
            <!--<div class="fl mr20">-->
              <!--<span>模号：</span>-->
              <!--<el-select-->
                <!--v-model="value" filterable remote reserve-keyword-->
                <!--placeholder="请输入模号"-->
                <!--:remote-method="remoteMethod"-->
                <!--:loading="loading">-->
                <!--<el-option-->
                  <!--v-for="item in options" :key="item.value" :label="item.label" :value="item.value">-->
                <!--</el-option>-->
              <!--</el-select>-->
            <!--</div>-->
            <div class="fl mr20">
              <span>项目名称：</span>
              <el-input v-model="value1" size="mini" clearable style="width:calc(100% - 70px);"></el-input>
            </div>
            <div class="fl mr20">
              <span>模具编号：</span>
              <el-input v-model="value" size="mini" clearable style="width:calc(100% - 70px);"></el-input>
            </div>
            <el-button type="primary" icon="el-icon-search" class="fl" @click="search"></el-button>
          </el-col>
        </el-row>
        <hr>
      </div>
      <!-- 列表数据 -->
      <el-tag type="danger">项目异常提醒：</el-tag>

      <el-table :data="tableData.content" border style="width: 100%;margin-top:10px;" header-cell-class-name="header_cell table_header_shadow" tooltip-effect="light">
        <el-table-column fixed type="index" width="60" label="序号" :index="(index) => this.$indexS(index, currentPage, size)"></el-table-column>
        <el-table-column prop="warnType" label="提醒类别" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="mouldNo" label="模具编号" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="projectName" label="项目名称" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="partName" label="制品名称" width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="warnTime" label="提醒时间" width="100" show-overflow-tooltip></el-table-column>
        <!--<el-table-column label="状态" width="100">-->
          <!--<template slot-scope="scope">-->
            <!--<el-select v-model="scope.row.warnStatus" placeholder="请选择">-->
              <!--<el-option v-for="item in optionsState" :key="item.value" :label="item.label" :value="item.value"></el-option>-->
            <!--</el-select>-->
          <!--</template>-->
        <!--</el-table-column>-->
        <el-table-column prop="warnContent" label="提醒内容" show-overflow-tooltip></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" size="small" type="primary" plain>查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 详细内容弹框 -->
      <el-dialog title="提醒详情" :visible.sync="dialogFormVisible">
        <el-form :model="form" label-position="left">
          <el-row :gutter="10" style="line-height:40px;">
            <el-col :span="8">模号：{{form.mouldNo}}</el-col>
            <el-col :span="8">项目名称：{{form.projectName}}</el-col>
            <el-col :span="8">提醒类别：{{form.warnType}}</el-col>
            <el-col :span="8">提醒时间：{{form.warnTime}}</el-col>
            <!--<el-col :span="8">发布人：{{form.name}}</el-col>-->
          </el-row>
          <el-form-item label="提醒内容：">
            <el-input v-model="form.warnContent" autocomplete="off" type="textarea" :autosize="{ minRows: 10, maxRows: 10}" style="width:100%;"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>

      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="currentPage" :page-size="size"
                     layout="total, prev, pager, next"
                     :total="tableData.totalCount" class="fr mt20" v-if="tableData.totalCount">
      </el-pagination>
    </div>
</template>

<script>
  import { Message, Loading } from 'element-ui';
  /** 导入api.js */
  import {getWarnProjectAbnormalReminder,} from '../../axios/api.js'

    export default {
      name: "notice",

      created: async function () {
        let params = {page: 1, size: this.size};
        // if(this.$store.getters.itemCheck_item.mouldNo) {
        //   params.mouldNo = this.$store.getters.itemCheck_item.mouldNo;
        // }
        let res = await getWarnProjectAbnormalReminder(params);
        if(res.status === 1) {
          this.tableData = res.msg;
        }
      },

      // beforeRouteLeave (to, from, next) {
      //   // 导航离开该组件的对应路由时调用
      //   // 可以访问组件实例 `this`
      //   this.$store.dispatch('itemCheck_item',{});
      //   console.log(to.path);
      //   next();
      // },

      methods: {
        //搜索试模
        async search() {
          let params = {
            page: 1,
            size: this.size,
          };

          if(this.value) {
            params.mouldNo = this.value;
          }
          if(this.value1) {
            params.projectName = this.value1;
          }

          let res = await getWarnProjectAbnormalReminder(params);
          if(res.status === 1) {
            this.tableData = res.msg;
          }
        },

        remoteMethod(query) {
          if (query !== '') {
            this.loading = true;
            setTimeout(() => {
              this.loading = false;
              this.options = this.list.filter(item => {
                return item.label.toLowerCase()
                  .indexOf(query.toLowerCase()) > -1;
              });
            }, 200);
          } else {
            this.options = [];
          }
        },
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
        },

        //点击页码调用列表接口
        async handleCurrentChange(val) {
          this.currentPage = val;
          let params = {page: val, size: this.size,};
          // if(this.$store.getters.itemCheck_item.mouldNo) {
          //   params.mouldNo = this.$store.getters.itemCheck_item.mouldNo;
          // }
          if(this.value) {
            params.mouldNo = this.value;
          }
          if(this.value1) {
            params.projectName = this.value1;
          }
          let res = await getWarnProjectAbnormalReminder(params);
          if(res.status === 1) {
            this.tableData = res.msg;
          }
          console.log(`当前页: ${val}`);
        },

        handleClick(row) {
          let self = this;
          self.dialogFormVisible = true;
          self.form = row;
        },
        goto(path,arg) {
          this.$goto(path,arg);
        }
      },
      data () {
        return {
          dialogFormVisible: false,
          formLabelWidth: '100px',
          form: {
            name: '',
            region: '',
            date1: '',
            date2: '',
            delivery: false,
            type: [],
            resource: '',
            desc: '',
            options: [{
              value: '1',
              label: '前'
            }, {
              value: '2',
              label: '后'
            },],
            value: '',
          },




          options: [],
          optionsItem: [],
          optionsState: [{
            value: '0',
            label: '打开'
          }, {
            value: '1',
            label: '关闭'
          }],
          itemsState: [{
            value: '1',
            label: '正常'
          }, {
            value: '2',
            label: '紧张'
          }, {
            value: '3',
            label: '延期'
          }],
          items: [{
            value: '1',
            label: '设计'
          }, {
            value: '2',
            label: '加工'
          }, {
            value: '3',
            label: '精修'
          }],
          valueState: '打开',
          valueItem: '',
          list: [],
          loading: false,

          //数据
          tableData: {

          },
          value: '',
          value1: '',
          currentPage: 1,
          size:5,
            // {
            //   item: '2018112900001',
            //   mould: 'MSX-890TZSMOULD',
            //   content: 'hello nice to meet you!',
            //   type: '不合格报告提醒',
            //   time: '2018-12-12',
            //   engineer: '陈师傅',
            //   custom: 'sliverBasis上海市普陀区金沙江路 1518 弄',
            //   customMemberOne: 'Lisa',
            //   customMemberTwo: 'Sam',
            // },
        }
      },
    }
</script>

<style scoped>

</style>
