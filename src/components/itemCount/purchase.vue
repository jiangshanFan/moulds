<template>
    <div id="purchase">
      <el-button type="primary" size="mini" @click="$goback">返回</el-button>
      <!-- 基本信息和发布统计 -->
      <div class="info">
        <el-row style="font-size:16px;font-weight:bold;" class="mt20"><el-tag>基本信息：</el-tag></el-row>
        <el-row type="flex" justify="space-around" style="padding-left:20px;">
          <el-col class="ovw-h mr20" :span="6">
            <p class="fl">图片：</p>
            <p class="fl" style="width:calc(100% - 100px)"><img :src="item.imgUrl" alt="图例" style="height:77px;width:auto !important"></p>
          </el-col>
          <el-col class="ovw-h mr20" :span="6">
            <p>项目名称：{{item.projectName}}</p>
            <p>客户：{{item.customerUserName}}</p>
          </el-col>
          <el-col class="ovw-h mr20" :span="6">
            <p class="out" :title="item.partName">制品名称：{{item.partName}}</p>
            <p>制品尺寸：{{item.partNo}}</p>
          </el-col>
          <el-col class="ovw-h mr20" :span="6">
            <p>模具编号：{{item.mouldNo}}</p>
          </el-col>
        </el-row>
        <hr>
        <!-- 发布统计 -->
        <el-row style="font-size:16px;font-weight:bold;" class="mt20 mb20"><el-tag>发布统计：</el-tag></el-row>
        <el-col class="ovw-h" :span="24" style="padding-left:20px;">设计部发布采购零件总数：{{publish.purchaseNumTotal}}</el-col>
        <el-row type="flex" justify="space-around" style="padding-left:20px;">
          <el-col class="ovw-h">
            <p>模胚数量：{{publish.mouldBaseNum}}</p>
            <p>委外零件：{{publish.subNumber}}</p>
            <p>不合格物料：{{publish.unqualifiedNum}}</p>
          </el-col>
          <el-col>
            <p>前(上)模数量：{{publish.mouldFrontNum}}</p>
            <p>已下单物料：{{publish.mouldAlreadOutNum}}</p>
            <p>未入库物料：{{publish.mouldNoArrivedNum}}</p>
          </el-col>
          <el-col>
            <p>后(下)模数量：{{publish.mouldAfterNum}}</p>
            <p>采购长周期：{{publish.mouldLongCirceNum}}</p>
            <p>已入库物料：{{publish.mouldWareHouseNum}}</p>
          </el-col>
          <el-col>
            <p>标准件数量：{{publish.mouldStandardNum}}</p>
          </el-col>
        </el-row>
        <hr>
      </div>
      <!-- 统计详情： -->
      <div class="countDetail"
           v-loading="loading"
           element-loading-text="拼命加载中"
           element-loading-spinner="el-icon-loading"
           element-loading-background="rgba(0, 0, 0, 0.8)">
        <el-tabs id="tab-purchase" v-model="activeName" type="card" @tab-click="handleClick" class="mt20 posr tab-purchase">

          <el-button class="posa" id="search-purchase" @click="ifSearchClick" size="mini" type="primary" icon="el-icon-search" plain title="搜索" v-if="ifSearchBtn">搜索</el-button>

          <div class="section-search mb20 mt20" v-if="ifSearch">
            <el-row class="mb20">
              <el-col :span="24">
                <div class="fl mr20">
                  <span>物料编码：</span>
                  <el-input v-model="search.code" style="width:auto;"></el-input>
                </div>
                <div class="fl mr20">
                  <span>物料名称：</span>
                  <el-input v-model="search.name" style="width:auto;"></el-input>
                </div>
                <el-button type="primary" icon="el-icon-search" class="fl" @click="searchList(search)"></el-button>
              </el-col>
            </el-row>
            <hr>
          </div>

          <!-- 主料 -->
          <el-tab-pane label="主料" name="6">
            <el-table :data="table.content" border  max-height="800" size="small"
                      header-cell-class-name="header_cell table_header_shadow"
                      tooltip-effect="light"
                      style="width: 100%;margin-top:30px;">
              <el-table-column prop="" label="物料编码" width="180" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{scope.row.partCode}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="purchaseOrderNo" label="采购单号" width="120" show-overflow-tooltip></el-table-column>
              <el-table-column prop="singlePurchase" label="采购批次" width="80" show-overflow-tooltip></el-table-column>

              <el-table-column prop="partName" label="物料名称" width="180" show-overflow-tooltip></el-table-column>
              <el-table-column prop="materialCategory" label="物料类别" width="100" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{scope.row.materialCategory === '0'? '模胚' :
                          scope.row.materialCategory === '1'? '前(上)模' :
                          scope.row.materialCategory === '2'? '后(下)模' : '标准件'}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="" label="来源" width="80" show-overflow-tooltip></el-table-column> <!--暂无字段-->
              <el-table-column prop="prescribedProcurementCycle" label="计划采购周期" width="120" show-overflow-tooltip></el-table-column>
              <el-table-column prop="procurementTime" label="提交时间" show-overflow-tooltip></el-table-column>


              <el-table-column prop="estimatedReturnTime" label="预计到厂时间" width="180" show-overflow-tooltip></el-table-column>
              <el-table-column prop="actualReturnTime" label="实际到厂时间" width="180" show-overflow-tooltip></el-table-column>
              <el-table-column prop="partSpecification" label="规格型号" width="120" show-overflow-tooltip></el-table-column>
              <el-table-column prop="purchaseQuantity" label="数量" width="180" show-overflow-tooltip></el-table-column>
              <el-table-column prop="partMaterial" label="材质" width="120" show-overflow-tooltip></el-table-column>
              <el-table-column prop="purchaseName" label="采购商家" width="100" show-overflow-tooltip></el-table-column>
              <el-table-column prop="partsBrand" label="品牌" show-overflow-tooltip></el-table-column>
              <el-table-column prop="originalCustomMade" label="ORI/STD"></el-table-column>
            </el-table>
          </el-tab-pane>

          <!-- 不合格 -->
          <el-tab-pane label="不合格" name="1" v-if="false">
            <el-table :data="table.content" border  max-height="800" size="small"
                      header-cell-class-name="header_cell table_header_shadow"
                      tooltip-effect="light"
                      style="width: 100%;margin-top:30px;">
              <el-table-column prop="" label="物料编码" width="150" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{scope.row.materialNo}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="noAdd" label="报告ID" width="180"></el-table-column>

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
              <el-table-column prop="checkNumber" label="检测数量" width="80" show-overflow-tooltip></el-table-column>
              <el-table-column prop="badNumber" label="不良数量" width="80" show-overflow-tooltip></el-table-column>
              <el-table-column prop="abnormalGrade" label="异常等级" width="100" show-overflow-tooltip></el-table-column>
              <el-table-column prop="badType" label="不良类型" width="120" show-overflow-tooltip></el-table-column>
              <el-table-column prop="unqualfiedDesc" label="不合格规格描述" width="180" show-overflow-tooltip></el-table-column>

              <el-table-column prop="responsibleFirm" label="采购商家" width="180" show-overflow-tooltip></el-table-column>

              <el-table-column prop="checkMan" label="检查人员" show-overflow-tooltip></el-table-column>
              <el-table-column label="不合格报告" width="100" fixed="right">
                <template slot-scope="scope">
                  <el-button @click="checkReport(scope.row)" type="text" size="small">查看</el-button>
                </template>
              </el-table-column>
              <!--<el-table-column label="不合格处理" width="120">-->
                <!--<template slot-scope="scope">-->
                  <!--<el-button type="text" size="small"></el-button>-->
                <!--</template>-->
              <!--</el-table-column>-->
            </el-table>
          </el-tab-pane>

          <!-- 长周期 -->
          <el-tab-pane label="长周期" name="2">
            <el-table :data="table.content" border  max-height="800" size="small"
                      header-cell-class-name="header_cell table_header_shadow"
                      tooltip-effect="light"
                      style="width: 100%;margin-top:30px;">
              <el-table-column prop="" label="物料编码" width="180" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{scope.row.partCode}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="partName" label="物料名称" width="180" show-overflow-tooltip></el-table-column>
              <el-table-column prop="materialCategory" label="物料类别" width="100" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{scope.row.materialCategory === '0'? '模胚' :
                          scope.row.materialCategory === '1'? '前(上)模' :
                          scope.row.materialCategory === '2'? '后(下)模' : '标准件'}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="" label="来源" width="80" show-overflow-tooltip></el-table-column> <!--暂无字段-->
              <el-table-column prop="prescribedProcurementCycle" label="计划采购周期" width="120" show-overflow-tooltip></el-table-column>
              <el-table-column prop="procurementTime" label="提交时间" show-overflow-tooltip></el-table-column>


              <el-table-column prop="estimatedReturnTime" label="预计到厂时间" width="180" show-overflow-tooltip></el-table-column>
              <el-table-column prop="actualReturnTime" label="实际到厂时间" width="180" show-overflow-tooltip></el-table-column>
              <el-table-column prop="partSpecification" label="规格型号" width="120" show-overflow-tooltip></el-table-column>
              <el-table-column prop="purchaseQuantity" label="数量" width="180" show-overflow-tooltip></el-table-column>
              <el-table-column prop="partMaterial" label="材质" width="120" show-overflow-tooltip></el-table-column>
              <el-table-column prop="purchaseName" label="采购商家" width="100" show-overflow-tooltip></el-table-column>
              <el-table-column prop="partsBrand" label="品牌" show-overflow-tooltip></el-table-column>
              <el-table-column prop="originalCustomMade" label="ORI/STD"></el-table-column>
            </el-table>
          </el-tab-pane>


          <!-- 委外单 -->
          <el-tab-pane label="委外单" name="4">
            <el-table :data="table.content" border  max-height="800" size="small"
                      header-cell-class-name="header_cell table_header_shadow"
                      tooltip-effect="light"
                      style="width: 100%;margin-top:30px;">
              <el-table-column prop="" label="物料编码" width="180" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{scope.row.partCode}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="partName" label="物料名称" width="180" show-overflow-tooltip></el-table-column>
              <el-table-column prop="materialCategory" label="物料类别" width="100" show-overflow-tooltip>
                <template slot-scope="scope">
                <span>{{scope.row.materialCategory === '0'? '模胚' :
                        scope.row.materialCategory === '1'? '前(上)模' :
                        scope.row.materialCategory === '2'? '后(下)模' : '标准件'}}</span>
                </template>
              </el-table-column>

              <el-table-column prop="procurementTime" label="提交时间" show-overflow-tooltip></el-table-column>
              <el-table-column prop="estimatedReturnTime" label="预计到厂时间" width="180" show-overflow-tooltip></el-table-column>
              <el-table-column prop="actualReturnTime" label="实际到厂时间" width="180" show-overflow-tooltip></el-table-column>
              <!--<el-table-column prop="ifGood" label="是否合格" width="180"></el-table-column>-->


              <el-table-column prop="partSpecification" label="规格型号" width="120" show-overflow-tooltip></el-table-column>
              <el-table-column prop="purchaseQuantity" label="数量" width="180" show-overflow-tooltip></el-table-column>
              <el-table-column prop="partMaterial" label="材质" width="120" show-overflow-tooltip></el-table-column>
              <el-table-column prop="purchaseName" label="采购商家" width="100" show-overflow-tooltip></el-table-column>
              <el-table-column prop="partsBrand" label="品牌" show-overflow-tooltip></el-table-column>
              <el-table-column prop="originalCustomMade" label="ORI/STD" show-overflow-tooltip></el-table-column>
            </el-table>
          </el-tab-pane>

          <!-- 未入库 -->
          <el-tab-pane label="未入库" name="3">
            <el-table :data="table.content" border  max-height="800" size="small"
                      header-cell-class-name="header_cell table_header_shadow"
                      tooltip-effect="light"
                      style="width: 100%;margin-top:30px;">
              <el-table-column prop="" label="物料编码" width="180" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{scope.row.partCode}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="partName" label="物料名称" width="180" show-overflow-tooltip></el-table-column>
              <el-table-column prop="materialCategory" label="物料类别" width="100" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{scope.row.materialCategory === '0'? '模胚' :
                          scope.row.materialCategory === '1'? '前(上)模' :
                          scope.row.materialCategory === '2'? '后(下)模' : '标准件'}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="puchaseOrderNature" label="来源" width="80" show-overflow-tooltip></el-table-column>
              <el-table-column prop="purchaserMenberName" label="采购负责人" width="120" show-overflow-tooltip></el-table-column>
              <el-table-column prop="procurementTime" label="提交时间" show-overflow-tooltip></el-table-column>

              <el-table-column prop="estimatedReturnTime" label="预计到厂时间" width="180" show-overflow-tooltip></el-table-column>
              <el-table-column prop="partSpecification" label="规格型号" width="120" show-overflow-tooltip></el-table-column>
              <el-table-column prop="purchaseQuantity" label="数量" width="180" show-overflow-tooltip></el-table-column>
              <el-table-column prop="partMaterial" label="材质" width="120" show-overflow-tooltip></el-table-column>
              <el-table-column prop="purchaseName" label="采购商家" width="100" show-overflow-tooltip></el-table-column>
              <el-table-column prop="partsBrand" label="品牌" show-overflow-tooltip></el-table-column>
              <el-table-column prop="originalCustomMade" label="ORI/STD" show-overflow-tooltip></el-table-column>
            </el-table>
          </el-tab-pane>

          <!-- 已入库 -->
          <el-tab-pane label="已入库" name="5">
            <el-table :data="table.content" border  max-height="800" size="small"
                      header-cell-class-name="header_cell table_header_shadow"
                      tooltip-effect="light"
                      style="width: 100%;margin-top:30px;">
              <el-table-column prop="" label="物料编码" width="180" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{scope.row.partCode}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="partName" label="物料名称" width="180" show-overflow-tooltip></el-table-column>
              <el-table-column prop="materialCategory" label="物料类别" width="100" show-overflow-tooltip>
                <template slot-scope="scope">
                <span>{{scope.row.materialCategory === '0'? '模胚' :
                        scope.row.materialCategory === '1'? '前(上)模' :
                        scope.row.materialCategory === '2'? '后(下)模' : '标准件'}}</span>
                </template>
              </el-table-column>

              <el-table-column prop="procurementTime" label="提交时间" show-overflow-tooltip></el-table-column>
              <el-table-column prop="estimatedReturnTime" label="预计到厂时间" width="180" show-overflow-tooltip></el-table-column>
              <el-table-column prop="warehousingTime" label="实际入库时间" width="180" show-overflow-tooltip></el-table-column>
              <!--<el-table-column prop="ifGood" label="是否合格" width="180"></el-table-column>-->


              <el-table-column prop="partSpecification" label="规格型号" width="120" show-overflow-tooltip></el-table-column>
              <el-table-column prop="purchaseQuantity" label="数量" width="180" show-overflow-tooltip></el-table-column>
              <el-table-column prop="partMaterial" label="材质" width="120" show-overflow-tooltip></el-table-column>
              <el-table-column prop="purchaseName" label="采购商家" width="100" show-overflow-tooltip></el-table-column>
              <el-table-column prop="partsBrand" label="品牌" show-overflow-tooltip></el-table-column>
              <el-table-column prop="originalCustomMade" label="ORI/STD" show-overflow-tooltip></el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>

        <!-- 分页 -->
        <el-pagination :background="false" @current-change="handleCurrentChange" :current-page.sync="currentPage"
          :page-size="size" layout="total, prev, pager, next" :total="table.totalCount" v-if="table.totalCount" class="mt20 fr">
        </el-pagination>
      </div>
    </div>
</template>

<script>
  import { Message } from 'element-ui';
  /** 导入api.js */
  import {erpLongTimeMessage,erpNoArrivedTimeMessage,getWarehousedPurchaseInformation,
    erpOutsourcingListTimeMessage,selectUnqualifiedFormByMouldCode,getCountPurchase,purchaseIngredientsInformation} from '../../axios/api.js'
  export default {
    name: "purchase",
    created: async function() {


      //获取跳转传递回来的参数信息
      //获取头部的基本信息
      this.item = this.$store.getters.itemCheck_item;

      //调用采购不合格接口
      let params={mouldCode: this.item.mouldNo, page: 1, size:this.size,};
      let res = await purchaseIngredientsInformation(params);
      if(res.status === 1) {
        this.table = res.msg;
        this.loading = false;
      }

      //发布统计信息接口调用
      let res1 = await getCountPurchase({mouldCode: this.item.mouldNo});
      if(res1.status === 1) {
        this.publish = res1.msg;
      }
    },

    beforeMount() {

    },

    mounted() {
      // this.$refs.tabPurchase.appendChild(`<el-button class="posa" @click="" size="mini" type="primary" icon="el-icon-search" plain title="搜索">搜索</el-button>`);
      let clone = document.getElementById('search-purchase');
      let cloned = clone.cloneNode(true);
      document.getElementById('tab-purchase').appendChild(cloned);
      cloned.addEventListener("click", this.ifSearchClick);
      this.ifSearchBtn = false;
    },

    beforeUpdate() {

    },

    // beforeRouteLeave (to, from, next) {
    //   // 导航离开该组件的对应路由时调用
    //   // 可以访问组件实例 `this`
    //   if(to.path !== '/report') {
    //     this.$store.dispatch('itemCheck_item',{});
    //   }
    //   console.log(to.path);
    //   next();
    // },

    methods: {
      ifSearchClick() {
        this.ifSearch = !this.ifSearch;
        this.search = {};
      },

      //通过获取this的name，判断调用的接口,并接受参数进行搜索
      async searchList(obj) {
        this.loading = true;
        this.currentPage = 1;
        let res, params={mouldCode: this.item.mouldNo, page: 1, size:this.size};
        this.table = {};

        if(obj.code) {
          if(this.name == 1) {
            params.materialNo = obj.code;
          } else {
            params.partCode = obj.code;
          }
        }
        if(obj.name) {
          if(this.name == 1) {
            params.materialBane = obj.name;
          } else {
            params.partName = obj.name;
          }
        }

        switch(this.name) //注意字符串和数字的区别
        {
          case '2':
            res = await erpLongTimeMessage(params);
            break;
          case '3':
            res = await erpNoArrivedTimeMessage(params);
            break;
          case '4':
            res = await erpOutsourcingListTimeMessage(params);
            break;
          case '5':
            res = await getWarehousedPurchaseInformation(params);
            break;
          case '6':
            res = await purchaseIngredientsInformation(params);
            break;
          default:
            // params.num = 2;
            res = await selectUnqualifiedFormByMouldCode(params);
            console.log('不合格');
        }
        if(res.status === 1) {
          this.table = res.msg;
          this.loading = false;
        }
      },

//通过获取tab的name，判断调用的接口
      async handleClick(tab, event) {
        this.loading = true;
        this.currentPage = 1;
        let res, params={mouldCode: this.item.mouldNo, page: 1, size:this.size};
        this.table = {};
        switch(tab.name) //注意字符串和数字的区别
        {
          case '2':
            res = await erpLongTimeMessage(params);
            break;
          case '3':
            res = await erpNoArrivedTimeMessage(params);
            break;
          case '4':
            res = await erpOutsourcingListTimeMessage(params);
            break;
          case '5':
            res = await getWarehousedPurchaseInformation(params);
            break;
          case '6':
            res = await purchaseIngredientsInformation(params);
            break;
          default:
            // params.num = 2;
            res = await selectUnqualifiedFormByMouldCode(params);
            console.log('不合格');
        }
        if(res.status === 1) {
          if(tab.name !== this.name) {
            this.ifSearch = false;
            this.name = tab.name;
          }

          this.table = res.msg;
          this.loading = false;
        }
        // console.log(tab, event);
      },

//改变页码调用接口
      async handleCurrentChange(cur) {
        this.loading = true;
        this.currentPage = cur;
        let res, params={mouldCode: this.item.mouldNo, page: cur, size:this.size};
        if(this.ifSearch) {
          if(this.search.code) {
            if(this.name == 1) {
              params.materialNo = this.search.code;
            } else {
              params.partCode = this.search.code;
            }
          }
          if(this.search.name) {
            if(this.name == 1) {
              params.materialBane = this.search.name;
            } else {
              params.partName = this.search.name;
            }
          }
        }

        switch(this.name) //注意字符串和数字的区别
        {
          case '2':
            res = await erpLongTimeMessage(params);
            break;
          case '3':
            res = await erpNoArrivedTimeMessage(params);
            break;
          case '4':
            res = await erpOutsourcingListTimeMessage(params);
            break;
          case '5':
            res = await getWarehousedPurchaseInformation(params);
            break;
          case '6':
            res = await purchaseIngredientsInformation(params);
            break;
          default:
            // params.num = 2;
            res = await selectUnqualifiedFormByMouldCode(params);
            console.log('不合格');
        }
        if(res.status === 1) {
          this.table = res.msg;
          this.loading = false;
        }
      },

//查看不合格报告，触发改变vuex中的 itemCheck_report 数据
      checkReport(row) {
        this.$store.dispatch('itemCheck_report', row);
        this.$router.push('/report');
      }
    },
    data () {
      return {
        search: {
          code: '',
          name: '',
        },
        ifSearchBtn: true,
        ifSearch: false,

        size: 5,

        //跳转页面传递回来的参数信息
        item: {},

        //发布统计信息
        publish: {},

        activeName: '6',
        table: {
          content: [],
        },
        loading: true,

        //分页
        currentPage:1,
        name: '6',
      }
    }
  }
</script>

<style scoped>
  #search-purchase {
    top: 6px;
    left: 500px;
  }
</style>
