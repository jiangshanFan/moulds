import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const state = {   //要设置的全局访问的state对象     //要设置的初始属性值
  //login获取token
  token: '',
  username: '',
  isLogin: '',
  userLoginVO: {},
  //登录界面隐藏部分ui
  app_visible: false,

  //简介详情
  newTec_detail: 0,

  //反馈列表跳转详情时传递的参数信息
  feedback_detailInfo: {},

  //采购统计跳转查看不合格报告详情
  reportData: {},

  //是否显示返回
  testMould_ifAll: true,
  sampleCount_ifAll: true,
  warn_ifAll: true,


  /** 项目查看@fjs */
  //切换展示方式
  itemCheck_change: true,
  //试模统计
  itemCheck_testMouldDetail: {},
  //采购进度统计列表跳转详情
  itemCheck_report: {},
  //项目查看--跳转页面传递整个项目信息
  itemCheck_item: '',
  //项目节点管理--跳转加工进度计划表页面传递整个项目信息
  projectsPointManage_item: '',


  /** 项目信息--客户@fjs */
  //项目统计信息--跳转详情传参
  customItems_detail: {},
  //项目进度详情--点击查看传递类型
  customItems_detailType: {type: 1, detail: {}},

  /** 提醒@fjs */
  //修改提醒时获取当前提醒的内容
  warn_change: {},

  /** 项目查看（多模号）传递参数到项目查看详情@fjs */
  //跳转项目查看详情时传递的参数
  projects_info: {},

  //跳转工程任务书详情时传递的参数
  projectInfoDetail: {},

  //跳转工程任务书详情时传递的参数
  projectInfoDetailEdit: {},

  /** 表格管理--销售计划表@fjs */
  salePlan: {},
};


const getters = {   //实时监听state值的变化(最新状态)
  //承载变化的 token 的值
  getToken(state) {return state.token},
  //承载变化的 userLoginVO 的值
  userLoginVO(state) {return state.userLoginVO},

  //承载变化的 username 的值
  getUsername(state) {return state.username},
  //承载变化的 username 的值
  getIsLogin(state) {return state.isLogin},
//承载变化的 feedback_detailInfo 的值
  getFeedbackDetailInfo(state) {return state.feedback_detailInfo},
//承载变化的 reportData 的值
  getReportData(state) {return state.reportData},

//承载变化的 newTec_detail 的值
  newTec_detail(state) {return state.newTec_detail},
  //承载变化的 testMould_ifAll 的值
  testMould_ifAll(state) {return state.testMould_ifAll},
  //承载变化的 sampleCount_ifAll 的值
  sampleCount_ifAll(state) {return state.sampleCount_ifAll},
  //承载变化的 warn_ifAll 的值
  warn_ifAll(state) {return state.warn_ifAll},
//承载变化的 app_visible 的值
  app_visible(state) {return state.app_visible},

  /** 项目查看@fjs */
  //承载变化的 itemCheck_change 的值
  itemCheck_change(state) {return state.itemCheck_change},
  //承载变化的 itemCheck_testMouldDetail 的值
  itemCheck_testMouldDetail(state) {return state.itemCheck_testMouldDetail},
  //承载变化的 itemCheck_report 的值
  itemCheck_report(state) {return state.itemCheck_report},
  //承载变化的 itemCheck_item 的值
  itemCheck_item(state) {return state.itemCheck_item},
  //承载变化的 projectsPointManage_item 的值
  projectsPointManage_item(state) {return state.projectsPointManage_item},

  /** 项目信息--客户@fjs */
  //承载变化的 customItems_detail 的值
  customItems_detail(state) {return state.customItems_detail},
  //承载变化的 customItems_detailType 的值
  customItems_detailType(state) {return state.customItems_detailType},

  /** 提醒@fjs */
  //承载变化的 warn_change 的值
  warn_change(state) {return state.warn_change},

  /** 项目查看（多模号）传递参数到项目查看详情@fjs */
  //承载变化的 projects_info 的值
  projects_info(state) {return state.projects_info},

  //承载变化的 projectInfoDetail 的值
  projectInfoDetail(state) {return state.projectInfoDetail},

  //承载变化的 projectInfoDetailEdit 的值
  projectInfoDetailEdit(state) {return state.projectInfoDetailEdit},

  /** 表格管理--销售计划表@fjs */
  //承载变化的 salePlan 的值
  salePlan(state) {return state.salePlan},
};


const mutations = {//自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
  //改变 token
  token(state,item) {state.token = item;},
  //改变 userLoginVO
  userLoginVO(state,item) {state.userLoginVO = item;},

  //改变 username
  username(state,item) {state.username = item;},
  //改变 username
  isLogin(state,item) {state.isLogin = item;},
  //改变 feedback_detailInfo
  feedbackDetailInfo(state,item) {state.feedback_detailInfo = item;},
  //改变 report
  reportData(state,item) {state.reportData = item;},
  //改变 newTec_detail
  newTec_detail(state,item) {state.newTec_detail = item;},
  //改变 testMould_ifAll
  testMould_ifAll(state,item) {state.testMould_ifAll = item;},
  //改变 sampleCount_ifAll
  sampleCount_ifAll(state,item) {state.sampleCount_ifAll = item;},
  //改变 warn_ifAll
  warn_ifAll(state,item) {state.warn_ifAll = item;},
//改变 app_visible
  app_visible(state,item) {state.app_visible = item;},

  /** 项目查看@fjs */
  //改变 itemCheck_change
  itemCheck_change(state,item) {state.itemCheck_change = item;},
  //改变 itemCheck_testMouldDetail
  itemCheck_testMouldDetail(state,item) {state.itemCheck_testMouldDetail = item;},
  //改变 itemCheck_report
  itemCheck_report(state,item) {state.itemCheck_report = item;},
  //改变 itemCheck_item
  itemCheck_item(state,item) {state.itemCheck_item = item;},
  //改变 projectsPointManage_item
  projectsPointManage_item(state,item) {state.projectsPointManage_item = item;},

  /** 项目信息--客户@fjs */
  //改变 customItems_detail
  customItems_detail(state,item) {state.customItems_detail = item;},
  //改变 customItems_detailType
  customItems_detailType(state,item) {state.customItems_detailType = item;},

  /** 提醒@fjs */
  //改变 warn_change
  warn_change(state,item) {state.warn_change = item;},

  /** 项目查看（多模号）传递参数到项目查看详情@fjs */
  //改变 projects_info
  projects_info(state,item) {state.projects_info = item;},

  //改变 projectInfoDetail
  projectInfoDetail(state,item) {state.projectInfoDetail = item;},

  //改变 projectInfoDetailEdit
  projectInfoDetailEdit(state,item) {state.projectInfoDetailEdit = item;},

  /** 表格管理--销售计划表@fjs */
  //改变 salePlan
  salePlan(state,item) {state.salePlan = item;},
};


const actions = {//同上注释，item 为要变化的形参
  //异步触发改变 token
  getNewToken(context,item){context.commit('token',item)},
  //异步触发改变 userLoginVO
  userLoginVO(context,item){context.commit('userLoginVO',item)},

  //异步触发改变 username
  getNewUsername(context,item){context.commit('username',item)},
  //异步触发改变 isLogin
  getNewIsLogin(context,item){context.commit('isLogin',item)},
  //异步触发改变 feedback_detailInfo
  getNewFeedbackDetailInfo(context,item){context.commit('feedbackDetailInfo',item)},
  //异步触发改变 reportData
  getNewReportData(context,item){context.commit('reportData',item)},
  //异步触发改变 newTec_detail
  newTec_detail(context,item){context.commit('newTec_detail',item)},
  //异步触发改变 testMould_ifAll
  testMould_ifAll(context,item){context.commit('testMould_ifAll',item)},
  //异步触发改变 sampleCount_ifAll
  sampleCount_ifAll(context,item){context.commit('sampleCount_ifAll',item)},
  //异步触发改变 warn_ifAll
  warn_ifAll(context,item){context.commit('warn_ifAll',item)},
//异步触发改变 app_visible
  app_visible(context,item){context.commit('app_visible',item)},

  /** 项目查看@fjs */
  //异步触发改变 itemCheck_change
  itemCheck_change(context,item){context.commit('itemCheck_change',item)},
  //异步触发改变 itemCheck_testMouldDetail
  itemCheck_testMouldDetail(context,item){context.commit('itemCheck_testMouldDetail',item)},
  //异步触发改变 itemCheck_report
  itemCheck_report(context,item){context.commit('itemCheck_report',item)},
  //异步触发改变 itemCheck_item
  itemCheck_item(context,item){context.commit('itemCheck_item',item)},
  //异步触发改变 projectsPointManage_item
  projectsPointManage_item(context,item){context.commit('projectsPointManage_item',item)},

  /** 项目信息--客户@fjs */
  //异步触发改变 customItems_detail
  customItems_detail(context,item){context.commit('customItems_detail',item)},
  //异步触发改变 customItems_detailType
  customItems_detailType(context,item){context.commit('customItems_detailType',item)},

  /** 提醒@fjs */
  //异步触发改变 warn_change
  warn_change(context,item){context.commit('warn_change',item)},

  /** 项目查看（多模号）传递参数到项目查看详情@fjs */
  //异步触发改变 projects_info
  projects_info(context,item){context.commit('projects_info',item)},

  //异步触发改变 projectInfoDetail
  projectInfoDetail(context,item){context.commit('projectInfoDetail',item)},

  //异步触发改变 projectInfoDetailEdit
  projectInfoDetailEdit(context,item){context.commit('projectInfoDetailEdit',item)},

  /** 表格管理--销售计划表@fjs */
  //异步触发改变 salePlan
  salePlan(context,item){context.commit('salePlan',item)},
};


const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});
export default store;
