<template>
  <div id="newRemind">
    <div class="ovw-h mt20 mb20" v-if="warnList.length">
      <span>项目提醒设置：</span>
      <el-button type="primary" plain round size="mini" @click="initial" :disabled="warnList.length === 6" :title="warnList.length === 6?'已达最大新增数，谢谢！': ''">+ 新增提醒</el-button>
      <el-row :gutter="60" class="mt20">
        <el-button :class="{active: warnListType === item.id}" type="primary" plain round size="mini" style="margin-left:30px;" v-for="item in warnList" :key="item.id" @click="getList(item)">{{item.warnName}}</el-button>
      </el-row>
      <hr>
    </div>


    <div class="mt20" style="width:50%;margin:0 auto;min-width:960px;">
      <!-- 标题 -->
      <!--<p>默认提醒设置</p>-->
      <div class="ovw-h" style="font-size:16px;font-weight:bold;margin-left:-30px;">
        <span>提醒设置名称：</span>
        <el-input class="require" type="text" v-model="title" maxlength="20" clearable style="width:200px;margin-right:20px;"></el-input>
        <el-checkbox v-model="defaults" label="设为默认提醒"></el-checkbox>
      </div>
      <!-- 事件触发提醒 -->
      <div class="system">
        <el-tag style="margin:20px 20px 20px -10px;">事件触发提醒</el-tag>
        <el-row style="line-height:32px;">
          <el-col :span="8">节点种类：</el-col>
          <el-col :span="16">说明：</el-col>
          <!-- 节点种类列表 -->
          <el-checkbox-group v-model="checkList">
            <el-row class="dashed" v-for="item in allWarnList.event" :key="item.id">
              <el-col :span="8"><el-checkbox :label="item.warnNode"></el-checkbox></el-col>
              <el-col :span="16">{{item.detail}}</el-col>
            </el-row>
          </el-checkbox-group>

        </el-row>
      </div>
      <hr>
      <!-- 节点触发提醒 -->
      <div class="self">
        <el-tag style="margin:20px 20px 20px -10px;">节点触发提醒</el-tag>
        <!--<el-button type="plain" size="small" class="mb20" @click="dialogFormVisible = true">新增提醒</el-button>-->
        <el-checkbox-group v-model="checkList1">
          <el-row :gutter="20" style="line-height:32px;" class="dashed">
            <el-col :span="6" v-for="item in allWarnList.node" :key="item.id"><el-checkbox :label="item.warnNode" :title="item.warnNode"></el-checkbox></el-col>
            <!--<el-col :span="10">{{item.detail}}</el-col>-->
          </el-row>
        </el-checkbox-group>
      </div>

      <hr>

      <!-- 不合格零件提醒 -->
      <div class="self">
        <el-tag style="margin:20px 20px 20px -10px;">不合格零件提醒</el-tag>
        <!--<el-button type="plain" size="small" class="mb20" @click="dialogFormVisible = true">新增提醒</el-button>-->
        <el-checkbox-group v-model="checkList2">
          <el-row :gutter="20" style="line-height:32px;" class="dashed">
            <el-col :span="6" v-for="item in allWarnList.reject" :key="item.id"><el-checkbox :label="item.warnNode" :title="item.warnNode"></el-checkbox></el-col>
            <!--<el-col :span="10">{{item.detail}}</el-col>-->
          </el-row>
        </el-checkbox-group>
      </div>

      <el-row :gutter="10" type="flex" justify="center" class="mt40">
        <el-col :span="3"><el-button type="primary" round @click="newWarn">{{warnList.length === 0?'新增':'保存'}}</el-button></el-col>
        <!--<el-col :span="3"><el-button type="primary" round>取消</el-button></el-col>-->
      </el-row>
    </div>
  </div>
</template>

<script>
  import { Message } from 'element-ui';
  /** 导入api.js */
  import {getWarnList, getWarnNodeList, getWarnNodeListById, createAndUpdateWarn,} from '../../axios/api.js'
  import _debounce from 'lodash.debounce'

  export default {
    inject: ['reload'],
    name: "newRemind",
    created: async function() {
      //获取提醒列表
      let resList = await getWarnList({mark: 1});
      if(resList.status === 1) {
        this.warnList = resList.msg;
      }

      if(this.warnList.length !== 0) {
        let t = this.warnList[0];
        //通过跳转传回的参数id获取已勾选提醒类型
        this.getList(t);
      }


      //获取默认提醒列表
      let params = {};
      let res = await getWarnNodeList(params);
      if(res.status === 1) {
        this.allWarnList = res.msg;
        // this.getSecondList();       /** 特别地：如果已经新增了当前的节点提醒，再次进入新增的时候，如何进行操作，可以重复新增吗？ */
      }
      // console.log(this.createdInfo.warnNodeList);
    },
    methods: {

      initial() {
        this.checkList = [];
        this.checkList1 = [];
        this.checkList2 = [];
        this.createdInfo = {
          warnNodeList: [],
          id: '',
        };
        this.defaults = false;
        this.title = '';
        this.warnListType = '';
      },

//获取已勾选的列表项
      async getList(val) {
        this.checkList = []; this.checkList1 = []; this.checkList2 = [];
        this.warnListType = val.id;
        this.createdInfo.id = val.id;
        this.title = val.warnName;
        this.defaults = !!val.isDefaults;
        let hasCheck = await getWarnNodeListById({id: val.id});
        if(hasCheck.status === 1) {
          this.hasCheckList = hasCheck.msg;
          if(this.hasCheckList) {
            if(this.hasCheckList.event) {
              for(let item of this.hasCheckList.event) {
                this.checkList.push(item.warnNode);
              }
            }

            if(this.hasCheckList.node) {
              for(let item of this.hasCheckList.node) {
                this.checkList1.push(item.warnNode);
              }
            }

            if(this.hasCheckList.reject) {
              for(let item of this.hasCheckList.reject) {
                this.checkList2.push(item.warnNode);
              }
            }
            //获取已勾选的提醒的id
            this.changeLabelToId(0,this.checkList);
            this.changeLabelToId(1,this.checkList1);
            this.changeLabelToId(2,this.checkList2);
          }
        }
      },

// //修改提醒类型，获取修改后需要提交的所有勾选的提醒
//       showCheckList(type, val) {
//         this.changeLabelToId(type,val);
//       },

      /** 转换label为id */
      changeLabelToId(type,val) {
        let t = [],list = [];list[type] = [];
        if (type === 0) {
          t = this.allWarnList.event;
        } else if (type === 1) {
          t = this.allWarnList.node;
        } else {
          t = this.allWarnList.reject;
        }
        for(let i=0; i<val.length; i++) {
          for(let item of t) {
            if(val[i] === item.warnNode) {
              list[type][i] = {id: item.id};
            }
          }
        }
        if(type === 0) {
          this.list0 = [...list[0]];
        }else if(type === 1){
          this.list1 = [...list[1]];
        }else {
          this.list2 = [...list[2]];
        }
        this.createdInfo.warnNodeList = [...this.list0, ...this.list1, ...this.list2];
        // console.log(this.createdInfo.warnNodeList);
      },

//创建或修改提醒
      newWarn: _debounce(async function() {
        if(this.title) {
          this.changeLabelToId(0,this.checkList);
          this.changeLabelToId(1,this.checkList1);
          this.changeLabelToId(2,this.checkList2);
          let params = this.createdInfo;
          if(this.defaults === true) {
            params.isDefaults = 1;
          }else {
            params.isDefaults = 0;
          }
          params.warnName = this.title;
          let res = await createAndUpdateWarn(params);
          if(res.status === 1) {
            this.$message({showClose: true, type: 'success', message:'创建或修改成功！'})
          }
          // this.$router.push('/settings');
          // this.reload();
          let warnList = await getWarnList({mark: 1});
          if(warnList.status === 1) {
            this.warnList = warnList.msg;
            if(params.isDefaults === 1) {
              this.getList(this.warnList[0]);
            } else {
              this.getList(this.warnList[1]);
            }
          }
        } else {
          Message({showClose: 'true', type: 'error', message: '提醒名称是必填项！'})
        }
      },2000, {
        'maxWait': 500,
        'leading': true,
        'trailing': false,
      }),
    },
    data () {

      return {
        //提醒设置
        warnList: [],

        //当前提醒的类型
        warnListType: '',

        //标题
        title: '',
        //是否设置为默认设置
        defaults: false,
        //默认提醒方式
        radio: "1",
        //节点种类列表
        allWarnList: {
          event: [],
          node: [],
          reject: [],
        },

        //新增自定义提醒下拉列表数据
        newWarnList: [],
        // props: {
        //   children: 'nodes'
        // },

        //级联选择器
        cascaderValue: [], //其值是一个数组

        //已勾选提醒类型
        hasCheckList: {
          event: [],
          node: [],
          reject: [],
        },
        //将已勾选的打勾
        checkList: [],
        checkList1: [],
        checkList2: [],

        //转换已勾选的label为id
        createdInfo: {
          warnNodeList: [],
        },
        list0: [],
        list1: [],
        list2: [],

        dialogFormVisible: false,
        form: {},
        formLabelWidth: '120px',
      }
    }
  }
</script>

<style scoped>
  .el-checkbox-group{font-size:unset !important;}
  //修改新增节点弹框下拉弹出项 padding 间距  --- 不起作用
  .el-cascader-menu{min-width:220px;}

  .el-row.dashed{border-bottom:1px dashed #ddd !important;}
  .system .el-row.dashed:last-child{border-bottom:none !important;}
  .self .el-row.dashed:last-child{border-bottom:none !important;}
  .el-col { min-height:32px; }
</style>
