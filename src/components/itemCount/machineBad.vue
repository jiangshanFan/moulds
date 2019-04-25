<template>
    <div id="machineBad">
      <el-button type="primary" size="mini" @click="$goback">返回</el-button>

      <div class="ovw-h mt20">
        <el-tag type="danger" class="mb20">不合格零件：</el-tag>
        <el-table :data="table.content" border style="width: 100%;">
          <el-table-column type="index" width="100" label="序号"></el-table-column>
          <el-table-column prop="" label="物料编码" width="150">
            <template slot-scope="scope">
              <span>{{scope.row.mouldCode}}{{scope.row.partCode}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="noAdd" label="报告ID" width="180"></el-table-column>
          <el-table-column prop="unqualifiledSources" label="来源" width="80"></el-table-column>
          <el-table-column prop="materialBane" label="物料名称" width="120"></el-table-column>
          <el-table-column prop="materialCategory" label="物料类别" width="100">
            <template slot-scope="scope">
                  <span>{{scope.row.materialCategory === '0'? '模胚' :
                          scope.row.materialCategory === '1'? '前(上)模' :
                          scope.row.materialCategory === '2'? '后(下)模' : '标准件'}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="specModel" label="规格型号" width="100"></el-table-column>
          <el-table-column prop="checkNumber" label="检测数量"></el-table-column>
          <el-table-column prop="material" label="材质" width="180"></el-table-column>
          <el-table-column prop="brand" label="品牌"></el-table-column>
          <el-table-column prop="companyName" label="公司名称" width="180"></el-table-column>
          <el-table-column prop="appliDate" label="申请日期" width="100"></el-table-column>
          <el-table-column prop="appliMan" label="申请人" width="80"></el-table-column>
          <el-table-column prop="checkMan" label="检查人员" width="80"></el-table-column>
          <el-table-column prop="abnormalGrade" label="异常等级" width="100"></el-table-column>
          <el-table-column prop="badType" label="不良类型"></el-table-column>
          <el-table-column prop="badMediumCategory" label="不良中类" width="80"></el-table-column>
          <el-table-column prop="badFineCategory" label="不良细类"></el-table-column>
          <el-table-column prop="unqualfiedDesc" label="不合格描述" width="180"></el-table-column>
          <el-table-column prop="finalJudgeView" label="最新审核结果"></el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" size="small" type="primary" plain>查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage"
                       :page-size="10" layout="total, prev, pager, next" :total="table.totalCount" v-if="table.totalCount" class="mt20 fr">
        </el-pagination>
      </div>

    </div>
</template>

<script>
  import { Message } from 'element-ui';
  /** 导入api.js */
  import {oaUnqualifiedFormByResource} from '../../axios/api.js'

  export default {
    name: "machineBad",
    created: async function() {
      //调用采购不合格接口
      let params={mouldCode: this.$store.getters.itemCheck_item.mouldNo, page: 1, size:10, num: 1,};
      let res = await oaUnqualifiedFormByResource(params);
      if(res.status === 1) {
        this.table = res.msg;
      }
    },

    // beforeRouteLeave (to, from, next) {
    //   // 导航离开该组件的对应路由时调用
    //   // 可以访问组件实例 `this`
    //   if(to.path !== '/machine' && to.path !== '/report') {
    //     this.$store.dispatch('itemCheck_item',{});
    //   }
    //
    //   console.log(to.path);
    //   next();
    // },

    methods: {
//改变页码调用接口
      async handleCurrentChange(cur) {
        let res, params={mouldCode: this.$store.getters.itemCheck_item.mouldNo, page: cur, size:10};
        res = await oaUnqualifiedFormByResource(params);
        this.table = res.msg;
      },

      handleClick(row) {
        this.$store.dispatch('itemCheck_report', row);
        this.$router.push('/report');
      }
    },
    data () {
      return {
        table: {},
        //分页
        currentPage:1,
      }
    }
  }
</script>

<style scoped>

</style>
