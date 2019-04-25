<template>
    <div id="sampleCount">
      <!--<el-button type="primary" size="mini" plain @click="$goback" v-if="this.$store.getters.sampleCount_ifAll">返回</el-button>-->
      <!-- 搜索 -->
      <div class="section-search mb20 mt20">
        <el-row>
          <el-col :span="24">
            <div class="fl mr20">
              <span>项目名称：</span>
              <el-input v-model="value" clearable style="width:calc(100% - 100px);"></el-input>
            </div>
            <div class="fl mr20">
              <span>模具编号：</span>
              <el-input v-model="value1" clearable style="width:calc(100% - 100px);"></el-input>
            </div>
            <el-button type="primary" icon="el-icon-search" class="fl" @click="search"></el-button>
          </el-col>
        </el-row>
      </div>
      <hr>

      <!-- 内容 -->
      <div class="mt20">
        <!-- 添加 -->
        <el-button type="primary" size="mini" @click="openAdd">添加</el-button>

        <!-- 表格数据 -->
        <el-table :data="table.content" stripe border style="width: 100%;margin-top:10px;" header-cell-class-name="header_cell table_header_shadow">
          <el-table-column fixed type="index" width="60" label="序号" align="center" :index="(index) => this.$indexS(index, currentPage, size)"></el-table-column>
          <el-table-column prop="projectName" label="项目名称" width="85" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="mouldNo" label="模具编号" width="100" align="center"></el-table-column>
          <el-table-column prop="sendSampleCount" label="送样次数" width="85" align="center"></el-table-column>
          <el-table-column prop="transportType" label="运输方式" width="85" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.transportType === 1? '陆运' : '空运'}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="goodsType" label="货物类型" width="85" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.goodsType === 1? '送样' : '走模'}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="transportCompany" label="运输公司" width="85" align="center"></el-table-column>
          <el-table-column prop="transportNo" label="运输单号" width="100" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="positionInfo" label="备注" align="center">
            <template slot-scope="scope">
              <p class="positionInfo ovw-h" v-for="(item,index) in scope.row.positionInfo" :key="index">
                <span style="padding:0;margin:0;" :title="item.time+': '+item.position">{{item.time}} : {{item.position}}</span>
              </p>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="60" align="center">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" class="underline" align="center">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="pagination fr ovw-h mt20">
          <el-pagination @current-change="handleCurrentChange"
                         :current-page="currentPage" :page-size="size"
                         layout="total, prev, pager, next"
                         :total="table.totalCount" v-if="table.totalCount">
          </el-pagination>
        </div>

        <!-- 详细内容弹框 -->
        <el-dialog :title="flag?'运输信息详情': '新增运输信息'" :visible.sync="dialogFormVisible" center custom-class="dialogStyle" @closed="cancelAdds">
          <el-form :model="form" label-position="right" label-width="130px">
            <el-row :gutter="10" style="line-height:40px;">
              <el-col :span="11">
                <el-form-item label="模具编号：" label-width="82">
                  <el-input v-model="form.mouldNo" autocomplete="off" size="small" style="width:162px;" :disabled="flag===1 || mouldNoDisabled"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11" :offset="2">
                <el-form-item label="第几次送样/走模：">
                  <el-input v-model="form.sendSampleCount" autocomplete="off" size="small" style="width:162px;" :disabled="flag===1"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="11">
                <el-form-item label="运输单号：" label-width="82">
                  <el-input v-model="form.transportNo" autocomplete="off" size="small" style="width:162px;" :disabled="flag===1"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="11" :offset="2">
                <el-form-item label="运输公司：">
                  <el-input v-model="form.transportCompany" autocomplete="off" size="small" style="width:162px;" :disabled="flag===1"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="11">
                <el-form-item label="货物类别：" label-width="82">
                  <el-select v-model="form.goodsType" placeholder="请选择" size="small" style="width:162px;" :disabled="flag===1">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="11" :offset="2">
                <el-form-item label="运输方式：">
                  <el-select v-model="form.transportType" placeholder="请选择" size="small" style="width:162px;" :disabled="flag===1">
                    <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>



            </el-row>
            <p class="c3 fwb f16">详情：</p>
            <el-table class="mb20" :data="form.positionInfo" max-height="300" size="small" border style="width: 100%;" header-cell-class-name="header_cell">
              <el-table-column type="index" width="100" label="序号"></el-table-column>
              <el-table-column prop="time" label="时间" width="180"></el-table-column>
              <el-table-column prop="position" label="位置及相关信息"></el-table-column>
            </el-table>
            <el-button type="primary" size="small" plain @click="openInner(form)">添加位置及相关信息</el-button>

          </el-form>
          <div slot="footer" class="dialog-footer" v-show="!flag">
            <el-button type="primary" @click="add(form)">确 定</el-button>
            <el-button @click="dialogFormVisible = false">取 消</el-button>
          </div>
        </el-dialog>

        <!-- 添加位置信息 -->
        <el-dialog width="30%" title="添加位置及相关信息" :visible.sync="innerVisible" append-to-body @closed="cancelAdd">
          <el-form :model="inner" label-position="left">
            <el-form-item label="时间：">
              <div class="block">
                <el-date-picker v-model="inner.positionTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
              </div>
            </el-form-item>
            <el-form-item label="位置及相关信息：">
              <el-input v-model="inner.position" resize="none" autocomplete="off" type="textarea" :autosize="{ minRows: 2}" style="width:100%;"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="innerSubmit(inner)">确 定</el-button>
            <el-button @click="innerVisible = false">取 消</el-button>
          </div>
        </el-dialog>
      </div>

    </div>
</template>

<script>
  import { Message } from 'element-ui';
  /** 导入api.js */
  import {addSampleMoveMould,getSampleMoveMouldList,addPositionInfo} from '../../axios/api.js'
  import _debounce from 'lodash.debounce'
  import _throttle from 'lodash.throttle'

  export default {
    name: "sampleCount",
    created: async function() {
      let params = {page: 1, size: this.size};
      // if(this.$store.getters.itemCheck_item.mouldNo) {
      //   params.mouldNo = this.$store.getters.itemCheck_item.mouldNo;
      //   this.mouldNoDisabled = true;
      // }
//获取送样/走模接口数据
      let res = await getSampleMoveMouldList(params);
      if(res.status === 1) {
        this.table = res.msg;
      }
    },

    mounted() {

    },

    // beforeRouteLeave (to, from, next) {
    //   // 导航离开该组件的对应路由时调用
    //   // 可以访问组件实例 `this`
    //   this.$store.dispatch('itemCheck_item',{});
    //   console.log(to.path);
    //   next();
    // },

    methods: {
//点击页码调用送样/走模接口数据
      async handleCurrentChange(val) {
        this.currentPage = val;
        let params = {page:val,size: this.size,};
        // params.mouldNo = this.$store.getters.itemCheck_item.mouldNo;
        if(this.value !== '') {
          params.projectName = this.value;
        }
        if(this.value1 !== '') {
          params.mouldNo = this.value1;
        }
        let res = await getSampleMoveMouldList(params);
        if(res.status === 1) {
          this.table = res.msg;
        }
      },

//搜索按钮调用接口数据
      async search() {
        let params = {page:1,size: this.size,};
        if(this.value !== '') {
          params.projectName = this.value;
        }
        if(this.value1 !== '') {
          params.mouldNo = this.value1;
        }
        let res = await getSampleMoveMouldList(params);
        if(res.status === 1) {
          this.table = res.msg;
        }
      },

//点击查看详情打开外层弹框，传递表格行参数，并改变ifShowAdd变量值
      handleClick(row) {
        this.form = row;
        this.transportNo = row.transportNo;
        this.dialogFormVisible = true;
        this.flag = 1;
      },

//点击添加按钮打开外层弹框，并改变ifShowAdd变量值
      openAdd() {
        this.flag = 0;
        this.form = {positionInfo:[],};
        // if(this.$store.getters.itemCheck_item.mouldNo) {
        //   this.form.mouldNo = this.$store.getters.itemCheck_item.mouldNo;
        //   this.mouldNoDisabled = true;
        // }
        this.dialogFormVisible = true;
        this.transportNo = '';
      },

//点击添加位置及相关位置信息按钮打开内层弹框，并改变transportNo
      openInner(form) {
        if(form.transportNo) {
          this.transportNo = form.transportNo;
        }else {
          this.transportNo = '';
        }
        this.innerVisible = true;
      },

//用户新增添加送样/走模
      add: _debounce(async function(form) {
        // console.log(this.transportNo);
        if(this.dialogFormVisible) {
          if(form.transportNo !== '') {
            // console.log(form);
            if(form.mouldNo && form.goodsType && form.transportType && form.transportCompany) {
              if((form.goodsType === 1 && form.sendSampleCount) || (form.goodsType === 2 && !form.sendSampleCount)) {
                // if (form.positionInfo.length) {
                  this.dialogFormVisible = false;
                  let res = await addSampleMoveMould(form);
                  // console.log(res);
                  this.flag_add = 1;
                  if(res.status === 1) {
                    let params = {page:this.currentPage, size: this.size,};
                    // params.mouldNo = form.mouldNo;
                    let add = await getSampleMoveMouldList(params);
                    if(add.status === 1) {
                      this.table = add.msg;
                    }
                  }
                // } else {
                //   this.$message({showClose: true, type: 'warning', message: '请注意填写信息,新增送样/走模统计信息时，时间和位置信息必须填写！'});
                // }
              }else {
                this.$message({showClose: true, type: 'warning', message: '请注意填写信息,走模状态不要填写‘第几次送样/走模这一项信息！'});
              }
            }else {
              this.$message({showClose: true, type: 'warning', message: '请填写完整信息！'});
            }
          }else {
            this.$message({showClose: true, type: 'warning', message: '请填写运输单号！'});
          }
        }
      },2000, {
        'maxWait': 100,
        'leading': true,
        'trailing': false,
      }),

//用户添加时间，位置及相关信息
      innerSubmit: _debounce(async function(val) {
        //更新添加
        let t = this.transportNo;
        if (this.innerVisible) {
          if(t !== '' && t !== null && t !== undefined) {
            let innerTime;
            if(val.positionTime) {
              innerTime = this.$format(val.positionTime.getTime()); //格式化
            }
            if(innerTime && val.position) {
              this.innerVisible = false;
              this.form.positionInfo= [{'time':innerTime,'position':val.position}, ...this.form.positionInfo];
              if(this.flag === 1) {
                let params = {position:val.position, time: innerTime, transportNo: t};
                let res = await addPositionInfo(params);
                if(res.status === 1) {
                  this.$message({showClose: true, type: 'success', message: '添加位置及相关信息成功！'});
                  let params = {page:this.currentPage, size: this.size,};
                  // params.mouldNo = this.form.mouldNo;
                  let info = await getSampleMoveMouldList(params);
                  if(info.status === 1) {
                    this.table= info.msg;
                  }
                }
              }
            }else {
              Message({showClose: true, type: 'warning', message: '请完整填写信息！'})
            }
          }else {
            Message({showClose: true, type: 'warning', message: '请输入运单号！'})
          }
        }
      }, 3000, {
        'maxWait': 100,
        'leading': true,
        'trailing': false,
      }),
      //取消或者关闭弹框时清空校验信息
      cancelAdd() {
        this.inner = {
          positionTime: '',
          position: '',
        };
      },

      cancelAdds() {
        this.form = {};
        this.flag_add = 0;
      }
    },
    data () {
      return {
        //搜索
        value: '',
        value1: '',

        //表格数据
        table:{},

        //弹框数据
        flag_add: 0, //判断是否已经点击过添加的按钮
        flag: 0, //打开弹框的类型 0添加，1详情
        dialogFormVisible: false,
        innerVisible: false,
        form: {
          positionInfo: [],
        },
        //是否从项目查看详情入口进入，有无模号
        mouldNoDisabled: false,

        //添加时间，位置及相关信息
        inner: {
          positionTime: '',
          position: '',
        },

        //运输单号
        transportNo: '',


        //打开弹框的方式决定是否显示添加按钮
        ifShowAdd: true,

        //货物类别和运输方式
        options: [{value: 1, label: '送样'}, {value: 2, label: '走模'},],
        options1: [{value: 1, label: '陆运'}, {value: 2, label: '空运'},],

        currentPage: 1,
        size: 10,
      }
    },
  }
</script>

<style scoped>
  .positionInfo{display:none !important; padding: 0; margin: 0;}
  .positionInfo:first-child {display:block !important;}
</style>

<style>
  @import "../../style/common.css";
  .dialogStyle{padding:30px 100px;width:900px;font-size:20px;font-weight:bold;color:#535353;}
  .el-dialog__title{font-size:20px;font-weight:bold;color:#535353;}
  .el-form-item{margin-bottom:10px !important;}
</style>
