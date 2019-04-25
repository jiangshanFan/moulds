/** api-doc*/
import $ajax from './request'
import vm from '../main.js'
// let mark;
// if(vm) {
//   mark = vm.$store.getters.itemCheck_item.mark;
// }
//--此处根据method方法改变：method === 'post'? data : params;
console.log($ajax)

/**
 * login-controller -------------- 用户管理
 * @fjs
 * */
//根据查询条件获取用户列表
export const login = data => {return $ajax({url: '/api/login', method: 'post', data: data,})};
//删除用户
export const deleteUser = data => {return $ajax({url: '/api/user/user/deleteUser', method: 'get', params: data,})};

//根据查询条件获取用户列表
export const loginOut = data => {return $ajax({url: '/api/login/loginOut', method: 'post', data: data,})};


/**
 * user-controller -------------- 用户管理
 * @fjs
 * */
//根据查询条件获取用户列表
export const getUserList = data => {return $ajax({url: '/api/user/getUserList', method: 'get', params: data,})};
//获取搜索框中的用户角色列表
export const getRoleList = data => {return $ajax({url: '/api/user/getRoleList', method: 'get', params: data,})};
//更新用户账户状态：已启用，已停用
export const updateStatus = data => {return $ajax({url: '/api/user/updateStatus', method: 'post', data: data,})};
//更新用户信息
export const updateUser = data => {return $ajax({url: '/api/user/updateUser', method: 'post', data: data, meta: 1,})};
//添加用户
export const addUser = data => {return $ajax({url: '/api/user/addUser', method: 'post', data: data, meta: 1,})};

//修改密码
export const changePwd = data => {return $ajax({url: '/api/user/changePwd', method: 'post', data: data,})};

//修改邮箱和联系方式
export const updateUserInfo = data => {return $ajax({url: '/api/user/updateUserInfo', method: 'post', data: data, meta: 1,})};


/**
 *  project-see-controller -------------- 新增/修改项目
 *  @fjs
 *  */
//根据模号获取项目基本信息
export const getMouldBasicInfo = data => {return $ajax({url: '/api/project/getMouldBasicInfo', method: 'get', params: data,})};
//获取项目节点管理列表
export const getProjectNodeManageList = data => {return $ajax({url: '/api/project/getProjectNodeManageList', method: 'get', params: data,})};
//获取项目状态下拉列表项
export const getProjectStatusList = data => {return $ajax({url: '/api/project/getProjectStatusList', method: 'get', params: data,})};
//获取项目阶段下拉列表项
export const getProjectStrageList = data => {return $ajax({url: '/api/project/getProjectStrageList', method: 'get', params: data,})};
//新增、修改项目节点（新增/修改项目------项目节点管理）
export const addProjectNodeManage = data => {return $ajax({url: '/api/project/addProjectNodeManage', method: 'post', data: data, meta: 1,})};
//更新项目（项目查看详情编辑按钮进入）
export const updateProjectInfo = data => {return $ajax({url: '/api/project/addOrUpdateProjectInfo?mark=2', method: 'post', data: data, meta: 1,})};
//更新项目（项目节点管理详情按钮进入）
export const updateProjectInfoDetail = data => {return $ajax({url: '/api/project/addOrUpdateProjectInfo?mark=3', method: 'post', data: data, meta: 1,})};

//手动添加创建项目
export const addProjectInfo = data => {return $ajax({url: '/api/project/addOrUpdateProjectInfo', method: 'post', data: data, meta: 1,})};

//创建新的项目或更新项目--在调用更新设计加工进度接口
export const queryProjectInformationByMouldCodeNew = data => {return $ajax({url: '/api/getPmSystemItemPart/queryProjectInformationByMouldCodeNew', method: 'get', params: data,})};

//项目描述添加或更新（新增/修改项目以及项目查看2）
export const addOrUpdateProjectDescribe = data => {return $ajax({url: '/api/project/addOrUpdateProjectDescribe', method: 'post', data: data, meta: 1,})};

//项目描述列表获取（新增/修改项目以及项目查看2）
export const getProjectDescribeList = data => {return $ajax({url: '/api/project/getProjectDescribeList', method: 'get', params: data,})};
//项目提醒修改
export const updateWarnByMouldAndUser = data => {return $ajax({url: '/api/project/updateWarnByMouldAndUser', method: 'post', data: data,})};


/**
 * project-see-controller -------------- 项目分配
 * @fjs
 * */
//获取项目分配列表（可通过搜索条件查询）
export const getProjectAllotList = data => {return $ajax({url: '/api/project/getProjectAllotList', method: 'get', params: data,})};
//编辑并更新项目分配
export const updateProjectAllot = data => {return $ajax({url: '/api/project/updateProjectAllot', method: 'post', data: data, meta: 1,})};
//编辑弹框中的角色下拉列表信息
export const getUserListByRoleType = data => {return $ajax({url: '/api/project/getUserListByRoleType', method: 'get', params: data,})};


/**
 * PM-system-controller -------------- 项目统计模块
 * @fjs
 * */
//设计节点相关信息
export const pmProjectPlanInformationQueryAndInsert = data => {return $ajax({url: '/api/webService/pmProjectPlanInformationQueryAndInsert', method: 'get', params: data,})};
//根据调试次数和模号获取零件属性进度信息
export const queryItemPartAttributeByTryCountAndMouldCode = data => {return $ajax({url: '/api/webService/queryItemPartAttributeByTryCountAndMouldCode', method: 'get', params: data,})};
//根据调试次数和模号查询设计节点进度信息
export const queryProjectPlanInformationeByTryCountAndMouldCode = data => {return $ajax({url: '/api/webService/queryProjectPlanInformationeByTryCountAndMouldCode', method: 'get', params: data,})};

//根据调试次数和模号查询设计节点进度信息
export const getProjectStatistics = data => {return $ajax({url: '/api/projectInfo/getProjectStatistics', method: 'get', params: data,})};

//根据调试次数和模号查询设计节点进度信息
export const queryItemPartCountByMouldCode = data => {return $ajax({url: '/api/getPmSystemItemPart/queryItemPartCountByMouldCode', method: 'get', params: data,})};

/**
 *  feed-back-controller -------------- 反馈模块
 *  @fjs
 *  */
//新增反馈（添加反馈页面）
export const addFeedBack = data => {return $ajax({url: '/api/feedBack/addFeedBack', method: 'post', data: data, meta: 1,})};
//添加反馈（反馈详情（客户页面传递mark=1））
export const againAddFeedBack = data => {return $ajax({url: '/api/feedBack/againAddFeedBack?mark=1', method: 'post', data: data, meta: 1,})};
//添加反馈（反馈详情（工程师页面不传递mark））
export const againAddFeedBackInner = data => {return $ajax({url: '/api/feedBack/againAddFeedBack', method: 'post', data: data, meta: 1,})};

//获取反馈列表（反馈信息（工程师页面））
export const getFeedBack2List = data => {return $ajax({url: '/api/feedBack/getFeedBack2List', method: 'get', params: data,})};
//获取反馈详情列表（反馈详情）
export const getFeedBackDetailList = data => {return $ajax({url: '/api/feedBack/getFeedBackDetailList', method: 'get', params: data,})};
//获取反馈列表（反馈信息（客户页面））
export const getFeedBackList = data => {return $ajax({url: '/api/feedBack/getFeedBackList', method: 'get', params: data,})};


/**
 *  erp-purchase-controller -------------- erp系统采购数据
 *  @fjs
 *  */
//采购长周期
export const erpLongTimeMessage = data => {return $ajax({url: '/api/erpInformationProcess/erpLongTimeMessage', method: 'get', params: data,})};
//采购计划时间未到厂
export const erpNoArrivedTimeMessage = data => {return $ajax({url: '/api/erpInformationProcess/erpNoArrivedTimeMessage', method: 'get', params: data,})};
//采购委外单
export const erpOutsourcingListTimeMessage = data => {return $ajax({url: '/api/erpInformationProcess/erpOutsourcingListTimeMessage', method: 'get', params: data,})};
//采购已入库
export const getWarehousedPurchaseInformation = data => {return $ajax({url: '/api/erpInformationProcess/getWarehousedPurchaseInformation', method: 'get', params: data,})};
//主料
export const purchaseIngredientsInformation = data => {return $ajax({url: '/api/erpInformationProcess/purchaseIngredientsInformation', method: 'get', params: data,})};

//采购不合格报告
export const selectUnqualifiedFormByMouldCode = data => {return $ajax({url: '/api/erpInformationProcess/selectUnqualifiedFormByMouldCode', method: 'get', params: data,})};

//采购统计--发布统计信息
export const getCountPurchase = data => {return $ajax({url: '/api/erpInformationProcess/getCountPurchase', method: 'get', params: data,})};


/**
 * oa-system-controller -------------- 不合格报告查看
 * @fjs
 * */
//根据模号查询不合格报告
// export const oaUnqualifiedForm = data => {return $ajax({url: '/api/oaWebService/oaUnqualifiedForm', method: 'post', params: data,})};
//根据传入的数据提供不合格报告(1代表制程）--加工进度
export const oaUnqualifiedFormByResource = data => {return $ajax({url: '/api/oaWebService/oaUnqualifiedFormByResource', method: 'get', params: data,})};



/**
 * project-see-controller -------------- 项目查看
 * @fjs
 * */
//项目查看
export const getProjectViewList = data => {return $ajax({url: '/api/project/getProjectViewList', method: 'get', params: data,})};

//项目查看--状态以及阶段更新
export const updateProjectStatusAndStage = data => {return $ajax({url: '/api/project/updateProjectStatusAndStage', method: 'post', data: data,})};

//项目查看--设计发布统计信息
export const getDesignStatisticsInfoByMouldNo = data => {return $ajax({url: '/api/project/getDesignStatisticsInfoByMouldNo', method: 'get', params: data,})};

// //项目查看--加工进度中的发布统计信息
// export const queryItemPartCountByMouldCode = data => {return $ajax({url: '/api/webService/queryItemPartCountByMouldCode', method: 'get', params: data,})};

//项目信息--加工进度表格数据
export const queryItemPartMouldCode = data => {return $ajax({url: '/api/getPmSystemItemPart/queryItemPartMouldCode', method: 'get', params: data,})};



//试模
export const getTestMouldInfoList = data => {return $ajax({url: '/api/testMould/getTestMouldInfoList', method: 'get', params: data,})};
//送样/走模统计--添加
export const addSampleMoveMould = data => {return $ajax({url: '/api/sample/addSampleMoveMould', method: 'post', data: data, meta: 1,})};
//送样/走模统计--获取--(走模查看按钮传递mark=2)
export const getSampleMoveMouldList = data => {return $ajax({url: '/api/sample/getSampleMoveMouldList', method: 'get', params: data,})};
//送样/走模统计--更新时间，位置及相关信息
export const addPositionInfo = data => {return $ajax({url: '/api/sample/addPositionInfo', method: 'post', data: data, meta: 1,})};

/** 旧的接口 */
//加工进度表数据接口
export const queryItemPartAttributeByMouldCodeNew = data => {return $ajax({url: '/api/webService/queryItemPartAttributeByMouldCodeNew', method: 'get', params: data,})};

//设计进度表数据接口
export const queryProjectPlanInformatinByMouldCodeNew = data => {return $ajax({url: '/api/webService/queryProjectPlanInformatinByMouldCodeNew', method: 'get', params: data,})};
/** 新的接口 */
//加工进度表数据接口
export const queryItemPartAttributeByMouldCodeBasis = data => {return $ajax({url: '/api/getPmSystemItemPart/queryItemPartAttributeByMouldCodeBasis', method: 'get', params: data,})};
//设计进度表数据接口
export const queryProjectPlanInformatinByMouldCode = data => {return $ajax({url: '/api/getPmSystemItemPart/queryProjectPlanInformatinByMouldCode', method: 'get', params: data,})};

/**
 * project-see-controller -------------- 项目信息相关（客户）
 * @fjs
 * */
//获取项目图纸列表
export const getDrawingList = data => {return $ajax({url: '/api/projectInfo/getDrawingList', method: 'get', params: data,})};
//获取项目详细列表
export const getProjectInfoList = data => {return $ajax({url: '/api/projectInfo/getProjectInfoList', method: 'get', params: data,})};
//获取项目进度详情
export const getProjectProgressInfo = data => {return $ajax({url: '/api/projectInfo/getProjectProgressInfo', method: 'get', params: data,})};
//获取送样和走模信息
export const getSampleMoveMouldLists = data => {return $ajax({url: '/api/projectInfo/getSampleMoveMouldList', method: 'get', params: data,})};
//获取试模详情
export const getTestMouldDetail = data => {return $ajax({url: '/api/projectInfo/getTestMouldDetail', method: 'get', params: data,})};

//加工零件表格数据详情--弹框数据
export const queryItemByPartId = data => {return $ajax({url: '/api/getPmSystemItemPart/queryItemByPartId', method: 'get', params: data,})};


/**
 * warn-controller -------------- 提醒相关
 * @fjs
 * */
//获取提醒列表--配置管理中的提醒设置项
export const getWarnList = data => {return $ajax({url: '/api/warn/getWarnList', method: 'get', params: data,})};
//创建或修改设置
export const createAndUpdateWarn = data => {return $ajax({url: '/api/warn/createAndUpdateWarn', method: 'post', data: data, meta: 1,})};
//获取提醒默认节点类型以及新增节点提醒
export const getWarnNodeList = data => {return $ajax({url: '/api/warn/getWarnNodeList', method: 'get', params: data,})};

//获取提醒默认节点类型以及新增节点提醒
export const getWarnNodeListById = data => {return $ajax({url: '/api/warn/getWarnNodeListById', method: 'get', params: data,})};
//获取提醒默认节点类型以及新增节点提醒
export const getWarnProjectAbnormalReminder = data => {return $ajax({url: '/api/warn/getWarnProjectAbnormalReminder', method: 'get', params: data,})};
//获取项目状态变更提醒
export const getProjectStatisticsChange = data => {return $ajax({url: '/api/warn/getProjectStatisticsChange', method: 'get', params: data,})};


/**
 * 项目查看--修改后是一个项目中有多个模号的
 * @fjs
 * @param：page-页码，size-个数，
 * */
export const projectInfoSeeList = data => {return $ajax({url: '/api/projectInfo/projectInfoSeeList', method: 'get', params: data,})};

export const getProjectSchedule = data => {return $ajax({url: '/api/project/getProjectSchedule', method: 'get', params: data,})};


// /**           --------------------------------------------------------------提交表单对于导入导出文件没有用，需要额外处理二进制流文件
//  * 总进度导入
//  * @fjs
//  * @param: 文件格式限制.xlsx
//  * */
// export const projectRateImport = data => {return $ajax({url: '/api/project/import/projectRateImport', method: 'post', data: data,})};
//
/**
 * 总进度导出
 * @fjs
 * @param: 文件格式限制.xlsx
 * */
export const projectRateExport = (data,arg) => {return $ajax({url: '/api/project/export/projectRateExport', method: 'get', params: data, responseType: 'blob', args: arg,})};

/**
 * 工程任务书导出
 * @fjs
 * @param: 文件格式限制.xlsx
 * */
export const engineeringTaskBookExport = (data,arg) => {return $ajax({url: '/api/project/export/engineeringTaskBookExport', method: 'get', params: data, responseType: 'blob', args: arg, })};


/**
 * 合同评审表管理和工程任务书管理
 * @fjs
 * @param:
 * page
 * size
 * projectName
 * contractNo
 * createTime1:中国标准时间类型
 * createTime2:中国标准时间类型
 * */
export const queryContractInformation = data => {return $ajax({url: '/api/project/import/queryContractInformation', method: 'get', params: data, })};

export const queryProjectInformation = data => {return $ajax({url: '/api/project/import/queryProjectInformation', method: 'get', params: data, })};


/**
 * 工程任务书-详情中的表格数据
 * @fjs
 * @param:
 * page
 * size
 * id:工程任务书管理列表项的id
 * */
export const queryProjectInformationDetails = data => {return $ajax({url: '/api/project/import/queryProjectInformationDetails', method: 'get', params: data, })};


/**
 * 工程任务书-详情中的表单数据修改并保存
 * @fjs
 * @param:
 * page
 * size
 * id:工程任务书管理列表项的id
 * */
export const updateProjectInformationDetails = data => {return $ajax({url: '/api/project/updateProjectInformationDetails', method: 'post', data: data, meta: 1,})};

/**
 * 工程任务书-详情中的表格中的编辑跳转页面点击保存
 * @fjs
 * @param: application/json
 * */
export const updateProjectInformation = data => {return $ajax({url: '/api/project/updateProjectInformation', method: 'post', data: data, meta: 1,})};

export const queryProcessDetailsByMouldCode = data => {return $ajax({url: 'api/getPmSystemItemPart/queryProcessDetailsByMouldCode', method: 'get', params: data,})};

/**
 * 不合格零件
 * @fjs
 * @param: application/json
 * */
export const queryFuzzyUnqualifiedForm = data => {return $ajax({url: '/api/oaWebService/queryFuzzyUnqualifiedForm', method: 'get', params: data,})};

/**
 * 加工进度计划表
 * @fjs
 * @param {Object} data
 * */
//表格数据
export const queryProcessDetailsByMouldCodeAndBigTypeCode = data => {return $ajax({url: 'api/getPmSystemItemPart/queryProcessDetailsByMouldCodeAndBigTypeCode', method: 'get', params: data,})};
//删除新增工序
export const deleteProcessDetails = data => {return $ajax({url: '/api/getPmSystemItemPart/deleteProcessDetails', method: 'post', data: data,})};
//修改工序顺序
export const changeOrderProcessDetails = data => {return $ajax({url: '/api/getPmSystemItemPart/changeOrderProcessDetails', method: 'post', data: data,})};
//新增工序
export const insertProcessDetails = data => {return $ajax({url: '/api/getPmSystemItemPart/insertProcessDetails', method: 'post', data: data, meta: 1,})};
//加工节点设置编辑
export const updateProcessDetails = data => {return $ajax({url: '/api/getPmSystemItemPart/updateProcessDetails', method: 'post', data: data, meta: 1,})};
//导出Excel
export const processDetailsExport = (data,arg) => {return $ajax({url: '/api/getPmSystemItemPart/export/processDetailsExport', method: 'get', params: data, responseType: 'blob', args: arg,})};
//加工进度表首页
export const queryProcessTable = data => {return $ajax({url: '/api/getPmSystemItemPart/queryProcessTable', method: 'get', params: data,})};

/**
 * 销售计划表
 * @fjs
 * @param {Object} data
 * */
//销售计划表表格数据
export const getSalePlanList = data => {return $ajax({url: 'api/sale/getSalePlanList', method: 'post', data: data,})};
//编辑销售计划表信息更新
export const updateSalePlan = data => {return $ajax({url: '/api/sale/updateSalePlan', method: 'post', data: data,meta: 1,})};
//销售计划表导出
export const salesPlanDetailsExport = data => {return $ajax({url: '/api/sale/export/salesPlanDetailsExport', method: 'get', params: data, responseType: 'blob',exportType: 1,})};
