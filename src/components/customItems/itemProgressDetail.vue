<template>
    <div id="itemProgressDetail">
      <el-button type="primary" size="mini" @click="$goback">返回</el-button>
      <!-- 节点详情信息 -->
      <el-row type="flex" justify="space-around" class="mt20">
        <el-col class="ovw-h">
          <p class="fl">制品图例：</p>
          <p class="fl" style="width:calc(100% - 100px)"><img :src="detail.imgUrl" alt="图例" style="height:77px;width:auto !important;"></p>
        </el-col>
        <el-col>
          <p>模号：{{detail.mouldNo}}</p>
          <p>制品名称：{{detail.partName}}</p>
          <p v-show="detailType === 1">已发布图纸数量：{{detail.issueDrawingCount}} 张</p>
          <p v-show="detailType === 2">已加工零件数量：{{detail.machiningPartCount}} 个</p>
        </el-col>
        <el-col>
          <p>项目名称：{{detail.projectName}}</p>
          <!--<p>生产所在地：{{detail.remark}}</p>-->
          <p v-show="detailType === 2">待加工零件数量：{{detail.waitingMachiningPartCount}} 个</p>
        </el-col>
        <el-col>
          <p>制品尺寸：{{detail.partNo}}</p>
          <p>预计T1时间：{{detail.expectT1Time}}</p>
        </el-col>
      </el-row>
      <div style="color:#999;">
        <p v-show="detailType === 3" class="mt20">备注：现阶段由于公司试模资料统计不完全，所以无法显示所有试模时间，如有给您带来不便之处请你谅解！</p>
        <p v-show="detailType === 4 || detailType ===5" class="mt20">备注：现阶段由于部分合作物流公司无法提供货物位置信息，所以可能存在部分物流信息缺失，如有给您带来不便之处请你谅解！</p>
      </div>

      <hr>


      <!-- 表格 -->
      <div style="display:flex;justify-content:center;padding-top:60px;">
        <el-row style="width:70%">
          <!-- 图纸详情 -->
          <div class="ovw-h" v-show="detailType === 1">
            <el-table ref="multipleTable" :data="table.content" tooltip-effect="dark" border size="small"
                      @selection-change="handleSelectionChange">
              <!--<el-table-column type="selection" width=40></el-table-column>-->
              <el-table-column label="序号" width="50" type="index" :index="(index) => this.$indexS(index, currentPage, size)"></el-table-column>
              <el-table-column prop="type" label="类型" width="100"></el-table-column>
              <el-table-column prop="drawingName" label="图纸名称" show-overflow-tooltip></el-table-column>
              <el-table-column prop="createTime" label="发布时间" width="160"></el-table-column>
              <!--<el-table-column label="操作" width="80" fixed="right">-->
                <!--<template slot-scope="scope">-->
                  <!--<el-button @click.native.prevent="" type="primary" size="small">下载</el-button>-->
                <!--</template>-->
              <!--</el-table-column>-->
            </el-table>
            <!-- 分页 -->
            <div class="pagination fr ovw-h mt20">
              <el-pagination @current-change="handleCurrentChange"
                             :current-page="currentPage" :page-size="size"
                             layout="total, prev, pager, next"
                             :total="table.totalCount" v-if="table.totalCount">
              </el-pagination>
            </div>
          </div>


          <!-- 加工零件详情 -->
          <div class="ovw-h" v-show="detailType === 2">
            <el-table ref="multipleTable" :data="table2.content" tooltip-effect="dark" border size="small">
              <el-table-column label="序号" width="60" type="index" :index="(index) => this.$indexS(index, currentPage, size)"></el-table-column>
              <el-table-column prop="partName" label="零件名称" width="150"></el-table-column>
              <el-table-column prop="materialCategory" label="类型" width="150"></el-table-column>

              <el-table-column prop="partStatus" label="加工状态" width="100"></el-table-column>
              <el-table-column prop="calculateActualStartDate" label="开始时间" width="140"></el-table-column>
              <el-table-column prop="calculateActualEndDate" label="完成时间" width="140"></el-table-column>
              <el-table-column prop="remark" label="备注" show-overflow-tooltip></el-table-column>
              <el-table-column label="操作" width="120" fixed="right">
                <template slot-scope="scope">
                  <el-button @click="lookDetail(scope.row)" type="primary" size="small">详情</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页 -->
            <div class="pagination fr ovw-h mt20">
              <el-pagination @current-change="handleCurrentChange"
                             :current-page="currentPage1" :page-size="size"
                             layout="total, prev, pager, next"
                             :total="table2.totalCount" v-if="table2.totalCount">
              </el-pagination>
            </div>
          </div>
          <!-- 详情弹框 -->
          <el-dialog title="加工零件详情" :visible.sync="dialog_partCount">
            <el-table border :data="dialog_partCount_items">
              <el-table-column label="序号" width="60" type="index"></el-table-column>
              <el-table-column property="processNo" label="工艺编码" width="150"></el-table-column>
              <el-table-column property="processName" label="工艺名称" width="200"></el-table-column>
              <el-table-column property="actualStartDate" label="加工开始时间"></el-table-column>
              <el-table-column property="actualEndDate" label="加工结束时间"></el-table-column>
              <el-table-column property="address" label="工艺说明"></el-table-column>
            </el-table>
          </el-dialog>

          <!-- 试模详情 -->
          <div class="ovw-h" v-show="detailType === 3">
            <el-table ref="multipleTable" :data="table3" tooltip-effect="dark" border size="small">
              <el-table-column label="序号" width="60" type="index"></el-table-column>
              <el-table-column prop="date" label="日期" width="100"></el-table-column>
              <el-table-column prop="board" label="机台" width="100"></el-table-column>
              <el-table-column prop="material" label="材料" width="140"></el-table-column>
              <el-table-column prop="debugTime" label="调试时间" width="140"></el-table-column>
              <el-table-column prop="testModeCause" label="试模原因" width="100"></el-table-column>
              <el-table-column prop="taskRemark" label="备注"></el-table-column> <!-- show-overflow-tooltip -->
            </el-table>
          </div>

          <!-- 送样详情 -->
          <div class="delivery" v-show="detailType === 4">
            <div v-for="(item,index) in items" :key="index">
              <el-row :gutter="40" class="mb20">
                <el-col :span="6" :style="{fontSize:'16px'}">第{{index + 1}}次送样：</el-col>
                <el-col :span="6">运输公司：{{item.transportCompany}}</el-col>
                <el-col :span="6">运输单号：{{item.transportNo}}</el-col>
              </el-row>
              <el-table ref="multipleTable" :data="item.positionInfo" tooltip-effect="dark" border size="small">
                <el-table-column label="序号" width="50" type="index"></el-table-column>
                <el-table-column prop="time" label="时间" width="150"></el-table-column>
                <el-table-column prop="position" label="位置及相关信息" show-overflow-tooltip></el-table-column>
              </el-table>
              <hr class="mt20 mb20">
            </div>

            <!-- 若无数据则显示此项 -->
            <p v-if="!items.length" style="text-align:center;">暂无数据！</p>
          </div>

          <!-- 走模详情 -->
          <div class="ovw-h" v-show="detailType === 5">
            <el-row :gutter="40" class="mb20">
              <el-col :span="6">运输公司：{{table5[0].transportCompany}}</el-col>
              <el-col :span="6">运输单号：{{table5[0].transportNo}}</el-col>
            </el-row>
            <el-table ref="multipleTable" :data="table5[0].positionInfo" tooltip-effect="dark" border size="small">
              <el-table-column label="序号" width="50" type="index"></el-table-column>
              <el-table-column prop="time" label="时间" width="150"></el-table-column>
              <el-table-column prop="position" label="位置及相关信息" show-overflow-tooltip></el-table-column>
            </el-table>
          </div>
        </el-row>
      </div>
    </div>
</template>

<script>
  import { Message } from 'element-ui';
  /** 导入api.js */
  import {getDrawingList,getSampleMoveMouldLists,getTestMouldDetail,queryItemPartMouldCode,/**  */queryItemByPartId} from '../../axios/api.js'
  export default {
    name: "itemProgressDetail",
    created: async function() {
//创建实例时获取查看进度类型
      this.detailType = this.$store.getters.customItems_detailType.type;
      this.detail = this.$store.getters.customItems_detailType.detail;
      // console.log(this.$route.params.id)
      let mould = this.detail.mouldNo;
      let res;
      switch (this.detailType) {
        case 1:
          res = await getDrawingList({page:1, size:10, mouldNo: mould});
          this.table = res.msg;
          break;
        case 2:
          res = await queryItemPartMouldCode({page:1, size:10,mouldCode: mould});
          if(res.msg) {
            this.table2 = res.msg;
            for(let item of this.table2.content) {
              switch(item.partStatus) {
                case '0':
                  item.partStatus = '未开始';
                  break;
                case '1':
                  item.partStatus = '加工中';
                  break;
                case '2':
                  item.partStatus = '已完工';
                  break;
              }
              switch(item.materialCategory) {
                case '0':
                  item.materialCategory = '模胚';
                  break;
                case '1':
                  item.materialCategory = '前(上)模';
                  break;
                case '2':
                  item.materialCategory = '后(下)模';
                  break;
                default:
                  item.materialCategory = '标准件';
              }
            }
          }else {
            this.table2 = {content:[],}
          }
          break;
        case 3:
          res = await getTestMouldDetail({mouldNo: mould});
          this.table3 = res.msg;
          break;
        case 4:
          res = await getSampleMoveMouldLists({mouldNo: mould, type: 1});
          this.items = res.msg;
          break;
        case 5:
          res = await getSampleMoveMouldLists({mouldNo: mould, type: 2});
          this.table5 = res.msg;
          this.table5[0] = {};
          break;
      }
    },
    methods: {
      //点击查看详情
      async lookDetail(row) {
        this.dialog_partCount = true;
        let res = await queryItemByPartId({id: row.id});
        if(res.status === 1) {
          this.dialog_partCount_items = res.msg;
        }
        if(!this.dialog_partCount_items) {
          this.dialog_partCount_items = [];
        }
      },

//点击页码调用接口数据
      async handleCurrentChange(val) {
        let mould = this.detail.mouldNo;
        let res;
        switch (this.detailType) {
          case 1:
            res = await getDrawingList({page:val, size:10, mouldNo: mould});
            this.table = res.msg;
            this.currentPage = val;
            break;
          case 2:
            res = await queryItemPartMouldCode({page:val, size:10,mouldCode: mould});
            if(res.msg) {
              this.table2 = res.msg;
              for(let item of this.table2.content) {
                switch(item.partStatus) {
                  case '0':
                    item.partStatus = '未开始';
                    break;
                  case '1':
                    item.partStatus = '加工中';
                    break;
                  case '2':
                    item.partStatus = '已完工';
                    break;
                }
                switch(item.materialCategory) {
                  case '0':
                    item.materialCategory = '模胚';
                    break;
                  case '1':
                    item.materialCategory = '前(上)模';
                    break;
                  case '2':
                    item.materialCategory = '后(下)模';
                    break;
                  default:
                    item.materialCategory = '标准件';
                }
              }

            }else {
              this.table2 = {content:[],}
            }
            this.currentPage1 = val;
            break;
          case 3:
            res = await getTestMouldDetail({mouldNo: mould});
            this.table.content = res.msg;
            break;
          case 4:
            res = await getSampleMoveMouldLists({mouldNo: mould, type: 1});
            this.items = res.msg;
            break;
          case 5:
            res = await getSampleMoveMouldLists({mouldNo: mould, type: 2});
            this.table5 = res.msg;
            break;
        }
        console.log(`当前页: ${val}`);
      },

      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    },
    watch: {
      // 如果 `detailType` 发生改变，这个函数就会运行
      '$route' (to, from) {
        this.detailType = this.$store.getters.customItems_detailType.type;
        // console.log(to.params.id)
      }
    },
    data () {
      return {
        //序号--序列化

        //跳转传递回来的参数
        detailType: '', //需要查询的详情的类型
        detail: {}, //所有信息：1.从统计列表传回的数据 2.项目进度中传回的参数
        table: {}, //图纸
        table2: [], //加工
        table3: [], //试模
        table5: [{position:[]}], //走模
        items: [], //送样

        currentPage: 1,
        size: 10,
        currentPage1: 1,
        multipleSelection: [],

        //加工零件详情是否显示
        dialog_partCount: false,
        dialog_partCount_items: [],
      }
    }
  }
</script>

<style scoped>

</style>
