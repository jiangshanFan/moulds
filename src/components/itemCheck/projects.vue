<template>
    <div id="projects">
      <!-- 搜索 -->
      <div class="section-search mb20">
        <el-row>
          <el-col :span="24">
            <div class="fl mr20">
              <span class="w100">项目名称：</span>
              <el-input v-model="value" clearable style="width:calc(100% - 100px);"></el-input>
            </div>
            <el-button type="primary" icon="el-icon-search" class="fl" @click="searchCheck"></el-button>
          </el-col>
        </el-row>
        <hr>
      </div>


      <!-- 项目信息 -->
      <div class="project_info">
        <div class="project_type">
          <el-button type="plain" size="small" :class="{project_info_button: stage === 'ing'}" @click="loadingProject('ing')">项目进行中</el-button>
          <el-button type="plain" size="small" :class="{project_info_button: stage === 'mould_move'}" @click="loadingProject('mould_move')">走模完成项目</el-button>
          <el-button type="plain" size="small" :class="{project_info_button: stage === 'finish'}" @click="loadingProject('finish')">已完成项目</el-button>


          <!-- 状态图例-start -->
          <el-col :span="12" class="fr">
            <!--<el-button type="plain" size="small" style="background-color:#5677FC;color:#fff;" class="fl">项目状态查看</el-button>-->
            <div class="legend fl">
              <span class="emergency posr">紧急</span>
              <span class="delay posr">已延期</span>
              <span class="normal posr">正常</span>
              <span class="parsed posr">已暂停</span>
              <span class="cancel posr">已取消</span>
            </div>

          </el-col>
          <!-- 状态图例-end -->
        </div>

        <!-- 项目内容-start -->
        <el-row :gutter="10" class="mt20">
          <el-col :span="6" v-for="(item,index) in items.content" :key="index">
            <div :class="[item.status,'mb20']" @click="projectsDetail(item)">
              <p class="important_info f16 out" :title="item.projectName">{{item.projectName}}</p>
              <p class="important_info f14" style="font-weight:bold;">（{{item.projectNumber}}）</p>
              <p><span class="mr20">模具数量：{{item.mouldCodeNum}}个</span><span>进行中：{{item.deplayIngNum}}个</span></p>
              <p><span class="mr20">走模完成：{{item.mouldFinish}}个</span><span>已完结：{{item.projectMooldFinish}}个</span></p>
            </div>
          </el-col>
        </el-row>
        <el-pagination @current-change="handleCurrentChange"
                       :current-page="currentPage" :page-size="size"
                       layout="total, prev, pager, next"
                       :total="items.totalCount" v-if="items.totalCount">
        </el-pagination>
        <!-- 项目内容-end -->
      </div>
    </div>
</template>

<script>
  import { Message, Loading } from 'element-ui';
  /** 导入api.js */
  import {projectInfoSeeList,} from '../../axios/api.js'

  export default {
    name: "projects",
    created: async function () {
//加载调用接口数据
      this.api();
    },
    methods: {
      //接口调用
      async api(val) {
        let params = {
          page: this.currentPage,
          size: this.size,
        };
        if(this.stage && !val) {
          params.projectStage = this.stage;
        }
        if(this.value) {
          params.projectName = this.value;
        }
        let res = await projectInfoSeeList(params);
        if(res.status === 1) {
          this.items = res.msg;
          if(!this.items.content.length) {
            this.stage = '';
            Message({showClose: true, type: 'warning', message: '没有查询到相关数据！'})
          }
          if(this.value && this.items.content.length) {
            this.stage = this.items.content[0].projectStage;
            if(this.items.content.length > 1 && this.flag === 0) {
              this.api();//解决搜索出来有多个相同的项目名称
              this.flag += 1;
            }
          }
        }
      },

      //搜索
      searchCheck() { //请注意队列问题
        if(this.value) {
          this.flag = 0;
          this.api(this.value);

        }else{
          // Message({showClose: true, type: 'warning', message: '请先输入项目名称！'})
          this.stage = 'ing';
          this.api();
        }
      },

      //点击页码调用数据
      handleCurrentChange(val) {
        this.currentPage = val;
        this.api();
      },

      //点击按钮加载不同状态的项目
      loadingProject(val) {
        this.currentPage = 1;
        this.stage = val;
        this.api();
      },

      //点击项目跳转项目查看详情
      projectsDetail(item) {
        this.$store.dispatch('projects_info',item);
        this.$router.push({name: 'projectsPointManage'});
      },
    },
    data() {
      return {
        //搜索
        value: '',
        stage: 'ing',

        flag: 0,


        //列表数据
        items: {content:[],},
        currentPage: 1,
        size: 12,
      }
    }
  }
</script>

<style scoped>
  @import "../../style/common.css";
</style>
