<template>
    <div id="points">
      <el-button type="primary" size="mini" @click="$goback">返回</el-button>

      <div class="mt20" style="width:50%;margin:0 auto;min-width:960px;">
        <!-- 标题 -->
        <!--<p>默认提醒设置</p>-->
        <div class="ovw-h" style="font-size:16px;font-weight:bold;margin-left:-30px;">
          <span>提醒名称：</span>
          <el-input type="text" v-model="title" maxlength="20" clearable style="width:200px;margin-right:20px;"></el-input>
          <el-checkbox v-model="defaults" label="是否将当前提醒设置为默认提醒"></el-checkbox>
        </div>
        <!-- 系统提醒种类 -->
        <div class="system">
          <el-tag style="margin:20px 0 0 -10px;">系统提醒种类设置</el-tag>
          <el-row style="line-height:32px;margin-top:20px;">
            <el-col :span="14">节点种类：</el-col>
            <el-col :span="10">说明：</el-col>
            <!-- 节点种类列表 -->
            <el-checkbox-group v-model="checkList" @change="showCheckList">
              <el-row class="dashed" v-for="item in allWarnList.default" :key="item.id">
                <el-col :span="14"><el-checkbox :label="item.warnNode"></el-checkbox></el-col>
                <el-col :span="10">{{item.detail}}</el-col>
              </el-row>
            </el-checkbox-group>

          </el-row>
        </div>
        <hr>
        <!-- 自定义节点提醒设置 -->
        <div class="self">
          <el-tag style="margin:20px 20px 0 -10px;">自定义提醒设置</el-tag>
          <el-button type="plain" size="small" class="mb20" @click="dialogFormVisible = true">新增提醒</el-button>
          <el-checkbox-group v-model="checkList1" @change="showCheckList1">
            <el-row :gutter="20" style="line-height:32px;" class="dashed" v-for="item in hasCheckList.custom" :key="item.id">
              <el-col :span="14"><el-checkbox :label="item.warnNode"></el-checkbox></el-col>
              <el-col :span="10">{{item.detail}}</el-col>
            </el-row>
          </el-checkbox-group>
          <!-- 新增提醒弹框 -->
          <el-dialog title="新增提醒" :visible.sync="dialogFormVisible">
            <el-form :model="form">
              <!--<el-form-item label="提醒名称：" :label-width="formLabelWidth">-->
                <!--<el-input v-model="form.name" autocomplete="off"></el-input>-->
              <!--</el-form-item>-->
              <el-form-item label="提醒对应节点" :label-width="formLabelWidth">
                <el-cascader
                  :options="newWarnList"
                  :show-all-levels="false"
                  expand-trigger="hover"
                  v-model="cascaderValue">
                </el-cascader>
              </el-form-item>
              <!--<el-form-item label="提醒时间：" :label-width="formLabelWidth">-->
                <!--<el-row :gutter="10">-->
                  <!--<el-col :span="4">-->
                    <!--<el-select v-model="form.value" placeholder="" style="width:70px;">-->
                      <!--<el-option v-for="item in form.options" :key="item.value" :label="item.label" :value="item.value"></el-option>-->
                    <!--</el-select>-->
                  <!--</el-col>-->
                  <!--<el-col :span="4"><el-input v-model="form.days" autocomplete="off" style="width:calc(100% - 20px);"></el-input><span>天</span></el-col>-->
                  <!--<el-col :span="10">-->
                    <!--<el-time-select v-model="value1" :picker-options="{start: '08:30',step: '00:15',end: '18:30'}" placeholder="选择时间"></el-time-select>-->
                  <!--</el-col>-->
                <!--</el-row>-->
              <!--</el-form-item>-->
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="setNewNode(cascaderValue)">确 定</el-button>
            </div>
          </el-dialog>
        </div>
        <hr>
        <!-- 提醒方式设置 -->
        <div class="methods">
          <el-tag style="margin:20px 20px 10px -10px;">提醒方式设置</el-tag>
          <el-row :gutter="20" style="line-height:32px;">
            <el-col :span="6"><el-radio v-model="radio" label="1">企业微信</el-radio></el-col>
            <el-col :span="6"><el-radio v-model="radio" label="2" disabled>邮箱</el-radio></el-col>
            <el-col :span="6"><el-radio v-model="radio" label="3" disabled>QQ</el-radio></el-col>
            <el-col :span="6"><el-radio v-model="radio" label="4" disabled>微信</el-radio></el-col>
          </el-row>
        </div>

        <el-row :gutter="10" type="flex" justify="center" class="mt20">
          <el-col :span="3"><el-button type="primary" round @click="newWarn">确定</el-button></el-col>
          <el-col :span="3"><el-button type="primary" round>取消</el-button></el-col>
        </el-row>
      </div>

    </div>
</template>

<script>
  import { Message } from 'element-ui';
  /** 导入api.js */
  import {getWarnNodeList, getWarnNodeListById, createAndUpdateWarn,} from '../../axios/api.js'

  export default {
    name: "points",
    created: async function() {
      //标题--从store中获取
      let item = this.$store.getters.warn_change;
      this.title = item.warnName;
      if(item.isDefaults) {
        this.defaults = true;
      }

      //通过跳转传回的参数id获取已勾选提醒类型
      if(item.id) {
        this.createdInfo.id = item.id;
        let hasCheck = await getWarnNodeListById({id: item.id});
        if(hasCheck.status === 1) {
          this.hasCheckList = hasCheck.msg;
          if(this.hasCheckList.default) {
            for(let item of this.hasCheckList.default) {
              this.checkList.push(item.warnNode);
            }
          }

          if(this.hasCheckList.custom) {
            for(let item of this.hasCheckList.custom) {
              this.checkList1.push(item.warnNode);
            }
          }else {
            this.hasCheckList.custom = [];
          }
        }
      }


      //获取默认提醒列表
      let params = {};
      let res = await getWarnNodeList(params);
      if(res.status === 1) {
        this.allWarnList = res.msg;
        this.getSecondList();       /** 特别地：如果已经新增了当前的节点提醒，再次进入新增的时候，如何进行操作，可以重复新增吗？ */
      }

      //获取已勾选的提醒的id
      this.changeLabelToId(0,this.checkList);
      this.changeLabelToId(1,this.checkList1);
      // console.log(this.createdInfo.warnNodeList);
    },
    methods: {
//改变接口数据结构，变更为新增提醒中的下拉列表项所需的数据结构
      async getSecondList () {
        for(let i=0; i < this.allWarnList.custom.length; i++) {
          this.newWarnList[i] = {}; /** 动态定义newWarnList数组中的每一项都是一个单独的对象，然后对这个对象进行赋值，才是有意义的，而不为报错undefined */
          this.newWarnList[i].label = this.allWarnList.custom[i].warnNode;
          this.newWarnList[i].value = this.allWarnList.custom[i].id;
          // console.dir(this.newWarnList);
          let node = await getWarnNodeList({parentId: this.allWarnList.custom[i].id});
          if(node.status === 1) {
            this.newWarnList[i].children = []; /** 定义newWarnList数组中的每一项中有一个对象名为children的数组 */
            for(let j=0; j < node.msg.length; j++) {
              this.newWarnList[i].children[j] = {};
              this.newWarnList[i].children[j].value = node.msg[j].id;
              this.newWarnList[i].children[j].label = node.msg[j].warnNode;
            }
          }
        }
      },

//点击新增提醒弹框的确定按钮在页面上新增一个element
      setNewNode(arr) {
        let label = '';
        for(let item of this.newWarnList) {
          console.log(item);
          let t = arr[arr.length - 2];
          if(item.value === t) {
            let m = item.children;
            for(let i of m) {
              let t1 = arr[arr.length - 1];
              if(i.value === t1) {
                label = i.label;
              }
            }
          }
        }
        this.hasCheckList.custom.push({warnNode: label, id: arr[arr.length - 1],});
        this.checkList1.push(label);
        this.cascaderValue = [];
        this.dialogFormVisible = false;
      },

//修改提醒类型，获取修改后需要提交的所有勾选的提醒
      showCheckList(val) {
        this.changeLabelToId(0,val);
      },

      showCheckList1(val) {
        this.changeLabelToId(1,val);
      },

      /** 转换label为id */
      changeLabelToId(type,val) {
        let t = [],list = [];list[type] = [];
        if(type === 0) {
          t = this.allWarnList.default;
        }else {
          t = this.hasCheckList.custom;
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
        }else {
          this.list1 = [...list[1]];
        }
        this.createdInfo.warnNodeList = [...this.list0, ...this.list1];
        // console.log(this.createdInfo.warnNodeList);
      },

//创建或修改提醒
      async newWarn() {
        this.changeLabelToId(0,this.checkList);
        this.changeLabelToId(1,this.checkList1);
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
        this.$router.push('/settings');
      }

    },
    data () {
      return {
        //标题
        title: '',
        //是否设置为默认设置
        defaults: false,
        //默认提醒方式
        radio: "1",
        //节点种类列表
        allWarnList: {
          default: [],
          custom: [],
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
          default: [],
          custom: [],
        },
        //将已勾选的打勾
        checkList: [],
        checkList1: [],

        //转换已勾选的label为id
        createdInfo: {
          warnNodeList: [],
        },
        list0: [],
        list1: [],

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
