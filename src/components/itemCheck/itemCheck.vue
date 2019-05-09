<template>
    <div id="itemCheck">
      <el-button type="primary" plain @click="$goto('/projectsPointManage')" class="el-button_plain_mini">返回</el-button>
      <!-- 搜索 -->
      <div class="section-search mb20 mt20">
        <el-row>
          <div class="fl mr100" style="line-height:28px;">
            <span class="fwb" style="color:#1B7CE2;">项目名称：{{this.$store.getters.projects_info.projectName}}</span>
          </div>
          <div class="fl mr20 mb20">
            <span>模具阶段：</span>
            <el-select v-model="project.projectStage" placeholder="请选择" clearable size="mini">
              <el-option v-for="item in options.projectStage" :key="item.id" :label="item.label" :value="item.id"></el-option>
            </el-select>
          </div>
          <div class="fl mr20 mb20">
            <span>模具状态：</span>
            <el-select v-model="project.status" placeholder="请选择" clearable size="mini">
              <el-option v-for="item in options.status" :key="item.id" :label="item.label" :value="item.id"></el-option>
            </el-select>
          </div>

          <div class="fl mr20 mb20">
            <span>模具编号：</span>
            <el-input v-model="value1" clearable size="mini" style="width:calc(100% - 100px);"></el-input>
          </div>
          <div class="fl mr20 mb20">
            <span>制品名称：</span>
            <el-input v-model="value2" clearable size="mini" style="width:calc(100% - 100px);"></el-input>
          </div>
          <el-button type="primary" size="mini" icon="el-icon-search" class="fl" @click="searchCheck"></el-button>

        </el-row>
        <hr>
      </div>

      <!-- 添加和项目统计 -->
      <el-row>
        <el-col :span="12" class="mt20">
          <el-button type="plain" size="small" @click="$goto('/projectsPointManage')">项目总进度计划表</el-button>
          <!--<el-button type="plain" size="small" @click="$goto('/itemCount')">项目状态查看</el-button>-->
          <el-button type="primary" size="small" @click="itemCheck_change">切换展示方式</el-button>
        </el-col>
        <!-- 状态图例 -->
        <el-col :span="12" class="legend mt20">
          <span class="emergency posr">紧急</span>
          <span class="delay posr">已延期</span>
          <span class="normal posr">正常</span>
          <span class="parsed posr">已暂停</span>
          <span class="cancel posr">已取消</span>
        </el-col>
      </el-row>
      <!-- 项目列表 -->
      <div class="itemList mt20" id="itemList">
        <!-- 单列模式 -->
        <div v-if="this.$store.getters.itemCheck_change">
          <!-- 紧急  v-if="items.content.URGENT"-->
          <div class="content" style="padding:0 5px;box-sizing:border-box;">
            <el-row :class="[item.status.toLowerCase(),{mb20: true}]" :gutter="20" style="border:1px solid #aaa;" v-for="(item,index) in items.content" :key="item.status.toLowerCase()+index">
                <el-col :span="4" class="color">
                  <el-row><img :src="item.imgUrl" alt="图片"></el-row>
                  <el-row class="mt20 mb20">
                    <!--<el-col style="font-weight:bold;margin-top:10px;">{{item.mouldNo}}<el-button type="primary" icon="el-icon-edit" size="small" class="fr" @click="goto('/itemAdd',item)"></el-button></el-col>-->
                    <!--<el-col class="out" style="font-size:12px;" :title="item.partName">{{item.partName}}</el-col>-->
                    <!--<el-col>项目名：{{item.projectName}}</el-col>-->
                    <el-col>
                      <span>提醒：</span>
                      <el-select v-model="item.warnId" placeholder="请选择" size="mini" style="width:calc(100% - 60px);line-height:36px;" @change="updateWarnId(item.warnId,item)">
                        <el-option v-for="item in options.warnList" :key="item.id" :label="item.warnName" :value="item.id"></el-option>
                      </el-select>
                    </el-col>
                    <el-col>
                      <span>阶段：</span>
                      <el-select v-model="item.projectStage" placeholder="请选择" size="mini" style="width:calc(100% - 60px);line-height:36px;" @change="update(item.projectStage,'',item)">
                        <el-option v-for="item in options.projectStage" :key="item.id" :label="item.label" :value="item.id"></el-option>
                      </el-select>
                    </el-col>
                    <el-col>
                      <span>状态：</span>
                      <el-select v-model="item.status" placeholder="请选择" size="mini" style="width:calc(100% - 60px);line-height:36px;" @change="update('',item.status,item)">
                        <el-option v-for="item in options.status" :key="item.id" :label="item.label" :value="item.id"></el-option>
                      </el-select>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="20" style="padding:10px;">
                  <el-row :gutter="30">
                    <el-col :span="12" style="margin:10px 0;">
                      <el-row type="flex" justify="space-between">
                        <el-col class="out" style="font-weight:bold;" :title="'模具编号：'+ item.mouldNo +',制品名称：' + item.partName">模具编号：{{item.mouldNo}} 制品名称：{{item.partName}}</el-col>
                        <el-col :span="6"><el-button class="fr" type="plain" size="small" @click="goto('/itemAdd',item)">基本信息编辑</el-button></el-col>
                      </el-row>
                    </el-col>
                  </el-row>

                  <el-row :gutter="30">
                    <el-col :span="12" class="info">
                      <el-row type="flex" justify="space-between">
                        <el-col class="out" :title="'最新节点：'+item.projectNode +'，下一节点：'+ item.nextNode +'，T1：'+ item.expectT1Time">最新节点：{{item.projectNode}}，下一节点：{{item.nextNode}}，T1：{{item.expectT1Time}}</el-col>
                        <el-col :span="6"><el-button class="fr" type="plain" size="small" @click="goto('/point',item)">节点管理</el-button></el-col>
                      </el-row>

                      <el-row type="flex" justify="space-between">
                        <el-col class="out" :title="'设计最新动态：'+item.designTrends">设计最新动态：{{item.designTrends}}</el-col>
                        <el-col :span="6"><el-button class="fr" type="plain" size="small" @click="goto('/designProgress',item)">设计查看</el-button></el-col>
                      </el-row>

                      <el-row type="flex" justify="space-between">
                        <el-col class="out" :title="`加工/精修：未完成${item.projectStatistics?item.projectStatistics.unfinishedCount :0}、不合格${item.projectStatistics?item.projectStatistics.processRejectCount:0}`">
                          加工/精修：未完成{{item.projectStatistics?item.projectStatistics.unfinishedCount :0}}件、
                          不合格{{item.projectStatistics?item.projectStatistics.processRejectCount:0}}件
                        </el-col>
                        <el-col :span="6"><el-button class="fr" type="plain" size="small" @click="goto('/machine',item)">加工/精修查看</el-button></el-col>
                      </el-row>

                      <el-row type="flex" justify="space-between">
                        <el-col class="out" :title="`送样：时间 ${item.projectStatistics?item.projectStatistics.time: ''}，地点 ${item.projectStatistics?item.projectStatistics.position: ''}`">送样：{{item.projectStatistics?item.projectStatistics.time?item.projectStatistics.time: '暂无':''}}&nbsp&nbsp{{item.projectStatistics?item.projectStatistics.position?item.projectStatistics.position: '':''}}</el-col>
                        <el-col :span="6"><el-button class="fr" type="plain" size="small" @click="goto('/sampleCount',item)">送样查看</el-button></el-col>
                      </el-row>
                    </el-col>

                    <el-col :span="12" class="info">
                      <el-row type="flex" justify="space-between">
                        <el-col>新提醒：<span>{{item.projectStatistics? item.projectStatistics.warnCount : 0}}个</span></el-col>
                        <el-col :span="6"><el-button class="fr" type="plain" size="small" @click="goto('/noticeSingle',item)">提醒查看</el-button></el-col>
                      </el-row>

                      <el-row type="flex" justify="space-between">
                        <el-col class="out" :title="`采购：未完成${item.projectStatistics?item.projectStatistics.buyCount:0}、长周期${item.projectStatistics?item.projectStatistics.longPeriodCount:0}、不合格${item.projectStatistics?item.projectStatistics.buyRejectCount:0}件`">
                          采购：未完成{{item.projectStatistics?item.projectStatistics.buyCount:0}}件、
                          长周期{{item.projectStatistics?item.projectStatistics.longPeriodCount:0}}件、
                          不合格{{item.projectStatistics?item.projectStatistics.buyRejectCount:0}}件
                        </el-col>
                        <el-col :span="6"><el-button class="fr" type="plain" size="small" @click="goto('/purchase',item)">采购查看</el-button></el-col>
                      </el-row>

                      <el-row type="flex" justify="space-between">
                        <el-col>PDCA报告</el-col>
                        <el-col :span="6"><el-button class="fr" type="plain" size="small" @click="$clip(item.projectStatistics?item.projectStatistics.pdcaReport:'')">PDCA报告查看</el-button></el-col>
                      </el-row>

                      <el-row type="flex" justify="space-between">
                        <el-col>走模：走模开始时间<span>{{item.projectStatistics?item.projectStatistics.shipmentMouldStartTime?item.projectStatistics.shipmentMouldStartTime: '暂无':''}}</span></el-col>
                        <el-col :span="6"><el-button class="fr" type="plain" size="small" @click="goto('/send',item)">走模查看</el-button></el-col>
                      </el-row>
                    </el-col>
                  </el-row>
                  <!-- 项目描述 -->
                  <el-row>
                    <el-col style="line-height:40px;">
                      <span>当前项目描述：</span>
                      <el-button type="primary" size="mini" @click="handleClick(item)">添加描述</el-button>
                    </el-col>
                    <el-col :span="24"><el-input type="textarea" :autosize="{ minRows: 5, maxRows: 5}" v-model="item.projectDescribe.projectDescribe" resize="none" readonly></el-input></el-col>
                  </el-row>
                </el-col>
              </el-row>
          </div>
        </div>


        <!-- 两列模式 -->
        <div v-if="!this.$store.getters.itemCheck_change">
          <!-- 紧急 -->
          <div class="content" style="padding:0 5px;box-sizing:border-box;">
            <el-row :gutter="10">
              <el-col :span="12" v-for="(item,index) in items.content" :key="item.status.toLowerCase()+index">
                <el-row :class="[item.status.toLowerCase(),{mb20: true}]" style="border:1px solid #aaa;">
                  <el-col :span="8" class="color">
                    <el-row><img :src="item.imgUrl" alt="项目图片缺失" style="max-height:100px;"></el-row>
                    <el-row class="mt20 mb20">
                      <!--<el-col>项目名：{{item.projectName}}</el-col>-->
                      <el-col>
                        <span>提醒：</span>
                        <el-select v-model="item.warnId" placeholder="请选择" size="mini" style="width:calc(100% - 60px);line-height:36px;" @change="">
                          <el-option v-for="item in options.warnList" :key="item.id" :label="item.warnName" :value="item.id"></el-option>
                        </el-select>
                      </el-col>
                      <el-col>
                        <span>阶段：</span>
                        <el-select v-model="item.projectStage" placeholder="请选择" size="mini" style="width:calc(100% - 60px);line-height:36px;" @change="update(item.projectStage,'',item)">
                          <el-option v-for="item in options.projectStage" :key="item.id" :label="item.label" :value="item.id"></el-option>
                        </el-select>
                      </el-col>
                      <el-col>
                        <span>状态：</span>
                        <el-select v-model="item.status" placeholder="请选择" size="mini" style="width:calc(100% - 60px);line-height:36px;" @change="update('',item.status,item)">
                          <el-option v-for="item in options.status" :key="item.id" :label="item.label" :value="item.id"></el-option>
                        </el-select>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="16" style="padding:10px;">
                    <el-row :gutter="30">
                      <el-col :span="24" class="info">
                        <el-row type="flex" justify="space-between">
                          <el-col class="out" style="font-weight:bold;margin:10px 0;" :title="'模具编号：'+ item.mouldNo +',制品名称：' + item.partName">模具编号：{{item.mouldNo}} 制品名称：{{item.partName}}</el-col>
                          <el-col :span="12"><el-button class="fr" type="plain" size="small" @click="goto('/itemAdd',item)">基本信息编辑</el-button></el-col>
                        </el-row>

                        <el-row type="flex" justify="space-between">
                          <el-col class="out" :title="'最新节点：'+item.projectNode +'，下一节点：'+ item.nextNode +'，T1：'+ item.expectT1Time">最新节点：{{item.projectNode}}，下一节点：{{item.nextNode}}，T1：{{item.expectT1Time}}</el-col>
                          <el-col :span="12"><el-button class="fr" type="plain" size="small" @click="goto('/point',item)">节点管理</el-button></el-col>
                        </el-row>

                        <el-row type="flex" justify="space-between">
                          <el-col>新提醒：<span>{{item.projectStatistics? item.projectStatistics.warnCount : 0}}个</span></el-col>
                          <el-col :span="12"><el-button class="fr" type="plain" size="small" @click="goto('/noticeSingle',item)">提醒查看</el-button></el-col>
                        </el-row>
                        <el-row type="flex" justify="space-between">
                          <el-col class="out" :title="'设计最新动态：'+item.designTrends">设计最新动态：{{item.designTrends}}</el-col>
                          <el-col :span="12"><el-button class="fr" type="plain" size="small" @click="goto('/designProgress',item)">设计查看</el-button></el-col>
                        </el-row>
                        <el-row type="flex" justify="space-between">
                          <el-col class="out" :title="`采购：未完成${item.projectStatistics?item.projectStatistics.buyCount:0}、长周期${item.projectStatistics?item.projectStatistics.longPeriodCount:0}、不合格${item.projectStatistics?item.projectStatistics.buyRejectCount:0}件`">
                            采购：未完成{{item.projectStatistics?item.projectStatistics.buyCount:0}}件、
                            长周期{{item.projectStatistics?item.projectStatistics.longPeriodCount:0}}件、
                            不合格{{item.projectStatistics?item.projectStatistics.buyRejectCount:0}}件
                          </el-col>
                          <el-col :span="12"><el-button class="fr" type="plain" size="small" @click="goto('/purchase',item)">采购查看</el-button></el-col>
                        </el-row>
                        <el-row type="flex" justify="space-between">
                          <el-col class="out" :title="`加工/精修：未完成${item.projectStatistics?item.projectStatistics.unfinishedCount :0}、不合格${item.projectStatistics?item.projectStatistics.processRejectCount:0}`">
                            加工/精修：未完成{{item.projectStatistics?item.projectStatistics.unfinishedCount :0}}件、
                            不合格{{item.projectStatistics?item.projectStatistics.processRejectCount:0}}件
                          </el-col>
                          <el-col :span="12"><el-button class="fr" type="plain" size="small" @click="goto('/machine',item)">加工/精修查看</el-button></el-col>
                        </el-row>

                        <el-row type="flex" justify="space-between">
                          <el-col>PDCA报告：</el-col>
                          <el-col :span="12"><el-button class="fr" type="plain" size="small" @click="">PDCA报告查看</el-button></el-col>
                        </el-row>

                        <el-row type="flex" justify="space-between">
                          <el-col class="out" :title="`送样：时间 ${item.projectStatistics?item.projectStatistics.time: ''}，地点 ${item.projectStatistics?item.projectStatistics.position: ''}`">送样：{{item.projectStatistics?item.projectStatistics.time?item.projectStatistics.time: '暂无':''}}&nbsp&nbsp{{item.projectStatistics?item.projectStatistics.position?item.projectStatistics.position: '':''}}</el-col>
                          <el-col :span="12"><el-button class="fr" type="plain" size="small" @click="goto('/sampleCount',item)">送样查看</el-button></el-col>
                        </el-row>

                        <el-row type="flex" justify="space-between">
                          <el-col>走模：走模开始时间<span>{{item.projectStatistics?item.projectStatistics.shipmentMouldStartTime?item.projectStatistics.shipmentMouldStartTime: '暂无':''}}</span></el-col>
                          <el-col :span="12"><el-button class="fr" type="plain" size="small" @click="goto('/send',item)">走模查看</el-button></el-col>
                        </el-row>
                      </el-col>

                    </el-row>

                  </el-col>
                  <!-- 项目描述 -->
                  <el-col style="padding:10px;box-sizing:border-box;" :span="24">
                    <el-col style="line-height:40px;">
                      <span>当前项目描述：</span>
                      <el-button type="primary" size="mini" @click="handleClick(item)">添加描述</el-button>
                    </el-col>
                    <el-col :span="24"><el-input type="textarea" :autosize="{ minRows: 5, maxRows: 5}" v-model="item.projectDescribe.projectDescribe" resize="none" readonly></el-input></el-col>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </div>

        <!-- 分页 -->
        <div class="pagination fr ovw-h">
          <el-pagination @current-change="handleCurrentChange"
                         :current-page="currentPage" :page-size="size"
                         layout="total, prev, pager, next"
                         :total="items.totalCount" v-if="items.totalCount">
          </el-pagination>
        </div>

        <!-- 项目描述弹框 -->
        <el-dialog title="项目描述" :visible.sync="dialogDescriptionVisible">
          <hr>
          <!-- 前期添加的描述列表 -->
          <el-row class="descriptionList mb20" style="line-height:24px;padding:0 20px;max-height:300px;overflow-y: scroll;" v-if="formDescription.list.length">
            <el-col :span="24" v-for="i in formDescription.list" :key="i.id">
              <el-col :span="24">{{i.createTime}}</el-col>
              <el-col :span="24" style="padding:0 20px;">{{i.projectDescribe}}</el-col>
            </el-col>
          </el-row>
          <!-- 新增项目描述 -->
          <el-form :model="newDescription">
            <el-form-item label="新增：" label-width="60px">
              <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 5}" v-model="newDescription.projectDescribe" maxlength="100" resize="none" autofocus="true"></el-input>
              <span style="font-size:6px;float:right;">最多输入100个字</span>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogDescriptionVisible = false">取 消</el-button>
            <el-button type="primary" @click="addNewDescription(newDescription,formDescription)">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
</template>

<script>
  import { Message, Loading } from 'element-ui';
  import vm from '../../main.js'
  /** 导入api.js */
  import {addOrUpdateProjectDescribe, getProjectDescribeList, getProjectViewList, updateProjectStatusAndStage, getProjectStatusList,
    getProjectStrageList,getWarnList,updateWarnByMouldAndUser} from '../../axios/api.js'

  export default {
    name: "itemCheck",
    created: async function () {
      // let loading = Loading.service({
      //   target: 'itemList',
      //   text: '拼命加载中',
      //   spinner: 'el-icon-loading',
      //   background: 'rgba(0, 0, 0, 0.8)',
      // });

      //提醒列表
      let warnList = await getWarnList();
      this.options.warnList = warnList.msg;
      //项目阶段、项目状态下拉列表请求
      let stage = await getProjectStrageList();
      this.options.projectStage = this.$objToOthers(stage.msg);
      let status = await getProjectStatusList();
      this.options.status = this.$objToOthers(status.msg);

      // this.value1 = this.$store.getters.itemCheck_item.mouldNo;
      //项目列表接口调用
      this.getProjectViewList();
    },
    mounted() {

    },

    methods: {
//编辑项目传递模号参数
      goto(router,item) {
        item.mark = 2;
        this.$store.dispatch('itemCheck_item',item);
        console.dir(`${item}`);
        this.$router.push(router);
      },

      //接口调用方法
      async getProjectViewList() {
        let loading = Loading.service({
          target: 'itemList',
          text: '拼命加载中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.8)',
        });

        let params = {
          page: this.currentPage,
          size:this.size,
          projectNo: this.$store.getters.projects_info.projectNumber,
        };

        if(this.value1) {
          params.mouldNo = this.value1;
        }
        if(this.value2) {
          params.partName = this.value2;
        }
        if(this.project.projectStage) {
          params.stage = this.project.projectStage;
        }
        if(this.project.status) {
          params.status = this.project.status;
        }
        let res = await getProjectViewList(params);
        if(res.status === 1) {
          // this.items = res.msg;
          loading.close();
          /** 改变数据结构，对于item.projectDescribe === null的时候进行处理 */
          this.changeObj(res.msg);
          if(JSON.stringify(this.items.content) === '{}') {
            this.$message({showClose: true, type: 'warning', message: '暂无数据！'})
          }
        }else {
          loading.close();
        }
      },

//项目阶段以及项目状态更新
      async update(stage,status,item) {
        let params = {mouldNo: item.mouldNo};
        if(stage) {
          params.stage = stage;
        }
        if(status) {
          params.status = status;
        }
        let res = await updateProjectStatusAndStage(params);
        if(res.status === 1) {
          this.$message({showClose: true, type: 'success', message: '更新成功！'});
          this.getProjectViewList();
        }
      },

//项目提醒更新
      async updateWarnId(warnId,item) {
        let params = {mouldNo: item.mouldNo};
        if(warnId) {
          params.warnId = warnId;
        }

        let res = await updateWarnByMouldAndUser(params);
        if(res.status === 1) {
          this.$message({showClose: true, type: 'success', message: '更新成功！'});
          this.getProjectViewList();
        }
      },

//新增项目描述
      async addNewDescription(form,item) {
        let params = {
          mouldNo: item.mouldNo,
          projectDescribe: form.projectDescribe
        };
        let res = await addOrUpdateProjectDescribe(params);
        if(res.status === 1) {
          this.getProjectViewList();
          this.newDescription.projectDescribe = '';
          this.dialogDescriptionVisible = false;
        }
      },

//搜索按钮调用接口数据
      async searchCheck() {
        this.getProjectViewList();
      },

//切换展示方式
      itemCheck_change() {
        this.$store.dispatch('itemCheck_change',!this.$store.getters.itemCheck_change);
      },

//点击页码调用项目列表接口数据
      async handleCurrentChange(val) {
        this.currentPage = val;
        this.getProjectViewList();
        console.log(`当前页: ${val}`);
      },

//点击添加描述按钮，传递模号，请求项目描述列表接口数据
      async handleClick(item) {
        //项目描述列表
        let description = await getProjectDescribeList({mouldNo: item.mouldNo});
        if(description.status === 1) {
          this.formDescription.list = description.msg;
          this.formDescription.mouldNo = item.mouldNo;
          this.dialogDescriptionVisible = true;
        }
      },

      /** 改变数据结构，对于item.projectDescribe === null的时候进行处理 */
      changeObj(obj) {
        let arr = [];
        for(let i in obj.content) {
          for(let item of obj.content[i]) {
            if(!item.projectDescribe) {
              item.projectDescribe = {};
            }
          }
          if(i === 'URGENT') {
            arr[0] = obj.content[i];
          }else if(i === 'DELAY') {
            arr[1] = obj.content[i];
          }else if(i === 'NORMAL') {
            arr[2] = obj.content[i];
          }else if(i === 'SUSPENSION') {
            arr[3] = obj.content[i];
          }else if(i === 'CANCEL') {
            arr[4] = obj.content[i];
          }
        }
        // console.log('%c数组信息：','font-size:20px;color:red', arr.flat(0));
        // this.items.content = [...arr.flat(1)];
        for(let item of arr) {
          this.items.content = [...this.items.content,...item]
        }
        console.log(this.items.content)
        this.items.totalCount = obj.totalCount;
        console.log('%cITEMS信息:','font-size:20px;color:red',this.items.content);
      },
    },

    data () {
      return {
        //加载动画
        loading: true,

        size: 6,

        //项目列表
        items: {
          content:[
          ],
        },

        //搜索
        value: '',
        value1: '',
        value2: '',

        //项目阶段、状态等options
        options: {
          projectStage: [],
          status: [],
          warnList: [],
        },

        //项目信息
        project: {},

        //项目描述列表信息
        formDescription: {
          mouldNo: '',
          projectDescribe: '',
          list: [],
        },
        newDescription: {},

        //弹框是否可见
        dialogDescriptionVisible: false,

        currentPage: 1,

        show: '',
      }
    },
  }
</script>

<style scoped>
  @import "../../style/common.css";
  .urgent .color .el-col,.delay .color .el-col, .suspension .color .el-col { line-height:26px; color: #fff;}
  .urgent .color {
    background-color:#E51C23;padding:10px;box-sizing:border-box;
  }
  .delay .color {
    background-color:#FFC10F;padding:10px;box-sizing:border-box;
  }
  .suspension .color {
    background-color:#9936E6;padding:10px;box-sizing:border-box;
  }
  .cancel .color {
    background-color:#ccc;padding:10px;box-sizing:border-box;
  }
  .normal .color .el-col, .cancel .color .el-col{line-height:26px;}
  .normal .color{border-right: 1px solid #ccc; border-bottom: 1px solid #ccc;padding:10px;box-sizing:border-box;}
  .info .el-row{align-items:center;}
  .info .el-col{ line-height:30px;}

  /*小按钮*/
  .el-button--small, .el-button--small.is-round{padding:5px 15px !important;}

  /*小下拉框*/
  .el-input--small .el-input__inner{height:24px !important;line-height:24px !important;}

  //解决横向滚动条的出现问题
  .content {
    padding: 0 5px;
    box-sizing:border-box;
  }
</style>
