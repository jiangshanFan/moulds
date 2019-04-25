<template>
  <div id="roleIntroduce">
    <el-table :data="tableData.content" border style="width: 100%;margin-top:10px;" header-cell-class-name="header_cell table_header_shadow" tooltip-effect="light">
      <el-table-column fixed type="index" width="60" label="序号" :index="(index) => this.$indexS(index, currentPage, size)" align="center"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="120" show-overflow-tooltip align="center"></el-table-column>

      <el-table-column label="角色说明" show-overflow-tooltip>
        <template slot-scope="scope">
          <div v-html="scope.row.roleRemark"></div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "roleIntroduce",
    created() {

    },
    data() {
      return {
        currentPage: 1,
        size: 10,
        tableData: {
          content: [
            {
              roleName: '超级管理员',
              roleRemark: `
<pre>
企业信息共享系统：<b>所有权限</b>
信息发布平台：<b>所有权限</b>
</pre>`,
            },
            {
              roleName: '项目经理',
              roleRemark: `
<pre>
企业信息共享系统：<b> 查看项目项目详细信息，管理项目节点，处理各种表格，管理送样走模物流信息，接收系统提示项目异常。查看客户反馈并回复客户。</b>
信息发布平台：<b>查看项目介绍</b>
</pre>`,
            },
            {
              roleName: '项目工程师',
              roleRemark: `
<pre>
企业信息共享系统：<b>查看项目项目详细信息，管理项目节点，处理各种表格，管理送样走模物流信息，接收系统提示项目异常。</b>
信息发布平台：<b>查看项目介绍</b>
</pre>`,
            },
            {
              roleName: '项目文员',
              roleRemark: `
<pre>
企业信息共享系统：<b>管理用户、创建并分配项目，管理合同评审表、工程任务书。</b>
信息发布平台：<b>无</b>
</pre>`,
            },
            {
              roleName: '项目主管',
              roleRemark: `
<pre>
企业信息共享系统：<b>查看项目项目详细信息，管理项目节点，处理各种表格，管理送样走模物流信息，接收系统提示项目异常。查看客户反馈并回复客户。</b>
信息发布平台：<b>查看项目介绍</b>
</pre>`,
            },
            {
              roleName: '项目总监',
              roleRemark: `
<pre>
企业信息共享系统：<b>所有权限</b>
信息发布平台：<b>所有权限</b>
</pre>`,
            },
            {
              roleName: '客户',
              roleRemark: `
<pre>
企业信息共享系统：<b>无</b>
信息发布平台：<b>所有权限</b>
</pre>`,
            },
            {
              roleName: '物流管理员',
              roleRemark: `
<pre>
企业信息共享系统：<b>管理送样走模物流信息</b>
信息发布平台：<b>查看项目介绍</b>
</pre>`,
            },
          ],
        }
      }
    },
  }
</script>

<style scoped>
  @import "../../style/common.css";
</style>
