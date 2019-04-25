import Vue from 'vue'
import VueRouter from 'vue-router'
import '../main'
import introduce from '../components/introduces/introduce'
// import newTec from '../components/introduces/newTec'
// import list from '../components/feedbacks/list'
// import detail from '../components/feedbacks/detail'
// import add from '../components/feedbacks/add'
//
// import itemFeedback from '../components/itemFeedback/itemFeedback'
// import itemFeedbackDetail from '../components/itemFeedback/itemFeedbackDetail'
//
// import settings from '../components/setting/settings'
// import remind from '../components/setting/remind'
// import itemsAllocation from '../components/setting/itemsAllocation'
// import userManage from '../components/setting/userManage'
//
// import itemInfo from '../components/customItems/itemInfo'
// import itemProgress from '../components/customItems/itemProgress'
// import itemProgressDetail from '../components/customItems/itemProgressDetail'
//
// import itemCount from '../components/itemCount/itemCount'
// import point from '../components/itemCount/point'
// import designProgress from '../components/itemCount/designProgress'
// import purchase from '../components/itemCount/purchase'
// import report from '../components/itemCount/report'
// import testMould from '../components/itemCount/testMould'
// import testMouldDetail from '../components/itemCount/testMouldDetail'
// import machine from '../components/itemCount/machine'
// import productPlanTable from '../components/itemCount/productPlanTable'
// import productPlanTableEdit from '../components/itemCount/productPlanTableEdit'
//
// import machineBad from '../components/itemCount/machineBad'
import sampleCountSingle from '../components/itemCount/sampleCountSingle'
// import send from '../components/itemCount/send'
//
// import itemCheck from '../components/itemCheck/itemCheck'
// import itemAdd from '../components/itemCheck/itemAdd'
import projects from '../components/itemCheck/projects'
// import projectsPointManage from '../components/itemCheck/projectsPointManage'
//
// import notice from '../components/itemCheck/notice'
// import noticeLeader from '../components/itemCheck/noticeLeader'
// import projectsNew from '../components/projectsNew/projectsNew'
// import contract from '../components/projectsNew/contract'
import projectInfo from '../components/projectsNew/projectInfo'
// import projectInfoDetail from '../components/projectsNew/projectInfoDetail'
// import projectInfoDetailEdit from '../components/projectsNew/projectInfoDetailEdit'
//
// import login from '../components/login'



// const introduce = () => import('../components/introduces/introduce');
const newTec = () => import('../components/introduces/newTec');
const list = () => import('../components/feedbacks/list');
const detail = () => import('../components/feedbacks/detail');
const add = () => import('../components/feedbacks/add');

const itemFeedback = () => import('../components/itemFeedback/itemFeedback');
const itemFeedbackDetail = () => import('../components/itemFeedback/itemFeedbackDetail');


const settings = () => import('../components/setting/settings');
const roleIntroduce = () => import('../components/setting/roleIntroduce');
const remind = () => import('../components/setting/remind');
const newRemind = () => import('../components/setting/newRemind');
const itemsAllocation = () => import('../components/setting/itemsAllocation');
const userManage = () => import('../components/setting/userManage');

const itemInfo = () => import('../components/customItems/itemInfo');
const itemProgress = () => import('../components/customItems/itemProgress');
const itemProgressDetail = () => import('../components/customItems/itemProgressDetail');

const itemCount = () => import('../components/itemCount/itemCount');
const point = () => import('../components/itemCount/point');
const designProgress = () => import('../components/itemCount/designProgress');
const purchase = () => import('../components/itemCount/purchase');
const report = () => import('../components/itemCount/report');
const testMould = () => import('../components/itemCount/testMould');
const testMouldSingle = () => import('../components/itemCount/testMouldSingle');
const testMouldDetail = () => import('../components/itemCount/testMouldDetail');
const machine = () => import('../components/itemCount/machine');
const productPlanTable = () => import('../components/itemCount/productPlanTable');
const productPlanTableEdit = () => import('../components/itemCount/productPlanTableEdit');
const machineBad = () => import('../components/itemCount/machineBad');
const sampleCount = () => import('../components/itemCount/sampleCount');
const send = () => import('../components/itemCount/send');

const itemCheck = () => import('../components/itemCheck/itemCheck');
const itemAdd = () => import('../components/itemCheck/itemAdd');
const itemAddSingle = () => import('../components/itemCheck/itemAddSingle');
// const projects = () => import('../components/itemCheck/projects');
const projectsPointManage = () => import('../components/itemCheck/projectsPointManage');
const noticeSingle = () => import('../components/itemCheck/noticeSingle');
const notice = () => import('../components/notice/notice');
const noticeLeader = () => import('../components/notice/noticeLeader');
const projectsNew = () => import('../components/projectsNew/projectsNew');
const contract = () => import('../components/projectsNew/contract');
// const projectInfo = () => import('../components/projectsNew/projectInfo');
const projectInfoDetail = () => import('../components/projectsNew/projectInfoDetail');
const projectInfoDetailEdit = () => import('../components/projectsNew/projectInfoDetailEdit');
const login = () => import('../components/login');
const productPlanTableIndex = () => import('../components/itemCount/productPlanTableIndex');
const productPlan = () => import('../components/itemCount/productPlan');
const unqualifiedPart = () => import('../components/itemCheck/unqualifiedPart');

const salePlan = () => import('../components/itemCheck/salePlan/salePlan');
const salePlanIndex = () => import('../components/itemCheck/salePlan/salePlanIndex');
const salePlanEdit = () => import('../components/itemCheck/salePlan/salePlanEdit');



Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'hash',
  methods: {
    back () {
      this.$route.go(-1);
    }
  },
  routes:[
    {
      path: '/login',
      name: 'login',
      meta: {
        unAuth: true, //添加字段，表示进入这个页面不需要登录
      },
      component: login
    },
    {
      path: '/introduce',
      name: 'introduce',
      component: introduce
    },
    {
      path: '/newTec',
      name: 'newTec',
      component: newTec
    },
    {
      path: '/list',
      name: 'list',
      component: list
    },
    {
      path: '/detail',
      name: 'detail',
      component: detail
    },
    {
      path: '/itemFeedback',
      name: 'itemFeedback',
      component: itemFeedback
    },
    {
      path: '/itemFeedbackDetail',
      name: 'itemFeedbackDetail',
      component: itemFeedbackDetail
    },
    {
      path: '/add',
      name: 'add',
      component: add
    },
    {
      path: '/settings',
      name: 'settings',
      component: settings
    },
    {
      path: '/roleIntroduce',
      name: 'roleIntroduce',
      component: roleIntroduce
    },

    {
      path: '/remind',
      name: 'remind',
      component: remind
    },
    {
      path: '/newRemind',
      name: 'newRemind',
      component: newRemind
    },
    {
      path: '/itemsAllocation',
      name: 'itemsAllocation',
      component: itemsAllocation
    },
    {
      path: '/userManage',
      name: 'userManage',
      component: userManage
    },
    {
      path: '/itemInfo',
      name: 'itemInfo',
      component: itemInfo
    },
    {
      path: '/itemProgress',
      name: 'itemProgress',
      component: itemProgress
    },
    {
      path: '/itemProgressDetail',
      name: 'itemProgressDetail',
      component: itemProgressDetail
    },
    {
      path: '/itemCount',
      name: 'itemCount',
      component: itemCount
    },
    {
      path: '/point',
      name: 'point',
      component: point
    },
    {
      path: '/designProgress',
      name: 'designProgress',
      component: designProgress
    },
    {
      path: '/purchase',
      name: 'purchase',
      component: purchase
    },
    {
      path: '/report',
      name: 'report',
      component: report
    },
    {
      path: '/testMould',
      name: 'testMould',
      component: testMould
    },
    {
      path: '/testMouldSingle',
      name: 'testMouldSingle',
      component: testMouldSingle
    },
    {
      path: '/testMouldDetail',
      name: 'testMouldDetail',
      component: testMouldDetail
    },
    {
      path: '/machine',
      name: 'machine',
      component: machine
    },

    {
      path: '/productPlan', component: productPlan,
      children: [
        {
          path: '',
          name: 'productPlan',
          component: productPlanTableIndex,
        },

        {
          path: 'productPlanTable',
          name: 'productPlanTable',
          component: productPlanTable,
        },

        {
          path: 'productPlanTableEdit',
          name: 'productPlanTableEdit',
          component: productPlanTableEdit,
        },
      ]
    },

    {
      path: '/salePlan', component: salePlan,
      children: [
        {
          path: '',
          name: 'salePlan',
          component: salePlanIndex,
        },
        {
          path: 'salePlanEdit',
          name: 'salePlanEdit',
          component: salePlanEdit,
        },
      ]
    },

    {
      path: '/machineBad',
      name: 'machineBad',
      component: machineBad
    },
    {
      path: '/sampleCount',
      name: 'sampleCount',
      component: sampleCount
    },
    {
      path: '/sampleCountSingle',
      name: 'sampleCountSingle',
      component: sampleCountSingle
    },
    {
      path: '/send',
      name: 'send',
      component: send
    },
    {
      path: '/itemCheck',
      name: 'itemCheck',
      component: itemCheck
    },
    {
      path: '/unqualifiedPart',
      name: 'unqualifiedPart',
      component: unqualifiedPart
    },

    {
      path: '/itemAdd',
      name: 'itemAdd',
      component: itemAdd
    },
    {
      path: '/itemAddSingle',
      name: 'itemAddSingle',
      component: itemAddSingle
    },
    {
      path: '/noticeSingle',
      name: 'noticeSingle',
      component: noticeSingle
    },
    {
      path: '/notice',
      name: 'notice',
      component: notice
    },
    {
      path: '/noticeLeader',
      name: 'noticeLeader',
      component: noticeLeader
    },

    //新的项目查看--单个项目下有多个模号
    {
      path: '/projects',
      name: 'projects',
      component: projects
    },

    //新的项目查看--项目节点管理
    {
      path: '/projectsPointManage',
      name: 'projectsPointManage',
      component: projectsPointManage
    },

    //新增项目
    {
      path: '/projectsNew',
      name: 'projectsNew',
      component: projectsNew
    },
    {
      path: '/contract', //-------路径可以自己设置,但是必须带上斜杠/
      name: 'contract',
      component: contract
    },

    {
      path: '/projectInfo',
      name: 'projectInfo',
      component: projectInfo
    },

    {
      path: '/projectInfoDetail',
      name: 'projectInfoDetail',
      component: projectInfoDetail
    },

    {
      path: '/projectInfoDetailEdit',
      name: 'projectInfoDetailEdit',
      component: projectInfoDetailEdit
    },
  ]
});


export default router;
