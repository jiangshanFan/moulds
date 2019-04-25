<template>
  <div id="unqualifiedPart">
    <!-- 搜索 -->
    <div class="section-search mb20 mt20">
      <el-row>
        <div class="fl mr20 mb20">
          <span>模具编号：</span>
          <el-input v-model="value" clearable size="mini" style="width:calc(100% - 100px);"></el-input>
        </div>

        <div class="fl mr20 mb20">
          <span>来源：</span>
          <el-select v-model="source" placeholder="请选择" size="mini">
            <el-option v-for="item in options.source" :key="item.id" :label="item.label" :value="item.id"></el-option>
          </el-select>
        </div>
        <div class="fl mr20 mb20">
          <span>物料编号：</span>
          <el-input v-model="value1" clearable size="mini" style="width:calc(100% - 100px);"></el-input>
        </div>


        <div class="fl mr20 mb20">
          <span>物料名称：</span>
          <el-input v-model="value2" clearable size="mini" style="width:calc(100% - 100px);"></el-input>
        </div>
        <el-button type="primary" size="mini" icon="el-icon-search" class="fl" @click="searchCheck"></el-button>

      </el-row>
      <hr>
    </div>

    <!-- 不合格 -->
    <el-table :data="table.content" border  max-height="800" size="small"
              header-cell-class-name="header_cell table_header_shadow"
              tooltip-effect="light"
              style="width: 100%;margin-top:30px;">
      <el-table-column fixed type="index" label="序号" width="60" align="center" :index="(index) => this.$indexS(index, currentPage, size)"></el-table-column>
      <el-table-column prop="" label="物料编码" width="150" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row.materialNo}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="noAdd" label="报告ID" width="180" show-overflow-tooltip></el-table-column>
      <el-table-column prop="projectName" label="项目名称" width="120" show-overflow-tooltip></el-table-column>
      <el-table-column prop="mouldCode" label="模具编号" width="120" show-overflow-tooltip></el-table-column>

      <el-table-column prop="materialBane" label="物料名称" width="180" show-overflow-tooltip></el-table-column>
      <el-table-column prop="materialCategory" label="物料类别" width="100" show-overflow-tooltip>
        <template slot-scope="scope">
                <span>{{scope.row.materialCategory === '0'? '模胚' :
                        scope.row.materialCategory === '1'? '前(上)模' :
                        scope.row.materialCategory === '2'? '后(下)模' : '标准件'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="unqualifiledSources" label="来源" width="80" show-overflow-tooltip></el-table-column>
      <el-table-column prop="specModel" label="规格型号" width="100" show-overflow-tooltip></el-table-column>
      <!--<el-table-column prop="checkNumber" label="检测数量" width="80" show-overflow-tooltip></el-table-column>-->
      <!--<el-table-column prop="badNumber" label="不良数量" width="80" show-overflow-tooltip></el-table-column>-->
      <el-table-column prop="checkNumber" label="数量" width="80" show-overflow-tooltip></el-table-column>
      <!--<el-table-column prop="partMaterial" label="材质" width="120" show-overflow-tooltip></el-table-column>-->
      <!--<el-table-column prop="partsBrand" label="品牌" show-overflow-tooltip></el-table-column>-->
      <el-table-column prop="companyName" label="公司名称" show-overflow-tooltip></el-table-column>

      <el-table-column prop="appliDate" label="申请日期" show-overflow-tooltip></el-table-column>
      <el-table-column prop="appliMan" label="申请人" show-overflow-tooltip></el-table-column>

      <el-table-column prop="checkMan" label="检查人员" show-overflow-tooltip></el-table-column>
      <el-table-column prop="abnormalGrade" label="异常等级" width="100" show-overflow-tooltip></el-table-column>

      <el-table-column prop="badType" label="不良类型" width="120" show-overflow-tooltip></el-table-column>
      <el-table-column prop="unqualfiedDesc" label="不合格规格描述" width="180" show-overflow-tooltip></el-table-column>

      <!--<el-table-column prop="unqualfiedDesc" label="最新审核结果" width="180" show-overflow-tooltip></el-table-column>-->

      <!--<el-table-column prop="responsibleFirm" label="采购商家" width="180" show-overflow-tooltip></el-table-column>-->


      <el-table-column label="不合格报告" width="100" fixed="right">
        <template slot-scope="scope">
          <el-button @click="checkReport(scope.row)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination fr ovw-h mt20">
      <el-pagination @current-change="handleCurrentChange"
                     :current-page="currentPage" :page-size="size"
                     layout="total, prev, pager, next"
                     :total="table.totalCount" v-if="table.totalCount">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import { Message } from 'element-ui'
  /** 导入api.js */
  import {queryFuzzyUnqualifiedForm,} from '../../axios/api.js'
  export default {
    name: "unqualifiedPart",
    created() {
      this.getInfo();
    },
    methods: {
//查看不合格报告，触发改变vuex中的 itemCheck_report 数据
      checkReport(row) {
        this.$store.dispatch('itemCheck_report', row);
        this.$router.push('/report');
      },
//获取表格数据
      async getInfo() {
        let params = {
          page: this.currentPage,
          size: this.size,
          num: this.source,
        };

        if(this.value) {
          params.mouldCode = this.value;
        }
        if(this.value1) {
          params.materialNo = this.value1;
        }
        if(this.value2) {
          params.materialBane = this.value2;
        }
        let res = await queryFuzzyUnqualifiedForm(params);
        if(res.status === 1) {
          this.table = res.msg;
        }
      },
//搜索表格
      searchCheck() {
        this.currentPage = 1;
        this.getInfo();
      },

//点击页码调用列表接口
      async handleCurrentChange(val) {
        this.currentPage = val;
        this.getInfo();
        console.log(`当前页: ${val}`);
      },
    },
    data() {
      return {
        //来源列表
        options: {
          source: [
            { label: '全部', id: 0,},
            { label: '制程', id: 1,},
            { label: '采购', id: 2,},
          ],
        },
        //搜索
        source: 0,
        value: '',
        value1: '',
        value2: '',
        //表格数据
        table: {
          content: [],
        },
        currentPage: 1,
        size: 10,
      }
    }
  }
</script>

<style scoped>

</style>
