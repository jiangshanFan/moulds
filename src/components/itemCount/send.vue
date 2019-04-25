<template>
    <div id="send">
      <el-button type="primary" size="mini" @click="$goback">返回</el-button>
      <!-- 搜索 -->
      <!--<div class="section-search mb20 mt20">-->
        <!--<el-row>-->
          <!--<el-col :span="24">-->
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
            <!--<el-button type="primary" icon="el-icon-search" class="fl"></el-button>-->
          <!--</el-col>-->
        <!--</el-row>-->
      <!--</div>-->


      <!-- 走模信息 -->
      <div class="ovw-h mt20">
        <el-tag>项目名称：{{info.projectName}}</el-tag>
        <el-tag>模具编号：{{info.mouldNo}}</el-tag>
        <el-row :gutter="20" style="line-height:40px;" class="mt20">
          <el-col :span="8">
            <el-col>远离公司时间：{{table.createTime}}</el-col>
            <el-col>货物类型：{{table.goodsType? '走模' : ''}}</el-col>
            <el-col>委托运输公司：{{table.transportCompany}}</el-col>
            <el-col>运输方式：{{table.transportType? table.transportType === 1? '陆运' : '空运' : ''}}</el-col>
            <el-col>运输单号：{{table.transportNo}}</el-col>
          </el-col>
          <el-col :span="16">
            <el-table :data="table.positionInfo" border style="width: 100%;">
              <el-table-column type="index" width="100" label="序号"></el-table-column>
              <el-table-column prop="time" label="时间" width="180"></el-table-column>
              <el-table-column prop="position" label="位置及相关信息"></el-table-column>
            </el-table>
          </el-col>
          <!--&lt;!&ndash; 分页 &ndash;&gt;-->
          <!--<div class="pagination fr ovw-h mt20">-->
            <!--<el-pagination @current-change="handleCurrentChange"-->
                           <!--:current-page="currentPage" :page-size="5"-->
                           <!--layout="total, prev, pager, next"-->
                           <!--:total="tableData.totalCount" v-if="tableData.totalCount">-->
            <!--</el-pagination>-->
          <!--</div>-->
        </el-row>
      </div>
    </div>
</template>

<script>
  import { Message } from 'element-ui';
  /** 导入api.js */
  import {getSampleMoveMouldList,} from '../../axios/api.js'
  export default {
    name: "send",
    created: async function() {
      if(this.$store.getters.itemCheck_item) {
        this.info = this.$store.getters.itemCheck_item;
      }
      this.getTableInfo();
    },

    // beforeRouteLeave (to, from, next) {
    //   // 导航离开该组件的对应路由时调用
    //   // 可以访问组件实例 `this`
    //
    //   this.$store.dispatch('itemCheck_item',{});
    //
    //   console.log(to.path);
    //   next();
    // },

    methods: {
      //获取表格数据
      async getTableInfo(val) {
        let params = { size: 5, goodsType: 2, mark: 2};
        if(val) {params.page = val;}else {params.page = 1;}
        if (this.$store.getters.itemCheck_item.mouldNo) {
          params.mouldNo = this.$store.getters.itemCheck_item.mouldNo;
        }
//获取送样/走模接口数据
        let res = await getSampleMoveMouldList(params);
        if (res.status === 1) {
          this.tableData = res.msg;
          if(this.tableData.content.length) {
            this.table = this.tableData.content[0];
          }
        }
      },

      // remoteMethod(query) {
      //   if (query !== '') {
      //     this.loading = true;
      //     setTimeout(() => {
      //       this.loading = false;
      //       this.options = this.list.filter(item => {
      //         return item.label.toLowerCase()
      //           .indexOf(query.toLowerCase()) > -1;
      //       });
      //     }, 200);
      //   } else {
      //     this.options = [];
      //   }
      // },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
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
        info: {},

        currentPage: 1,
        //请求接口的数据
        tableData: {

        },
        //基本信息和表格数据
        table: {},

        list: [],
        loading: false,
        options: [],
        value: '',
      }
    }
  }
</script>

<style scoped>

</style>
