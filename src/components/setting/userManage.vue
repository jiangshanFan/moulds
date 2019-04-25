<template>
    <div id="userManage">
      <!--<el-button type="primary" size="mini" @click="$goback">返回</el-button>-->
      <!-- 搜索 -->
      <div class="section-search mb20 mt20">
        <el-row class="mb20">
          <el-col :span="24">
            <div class="fl mr20">
              <span>用户角色：</span>
              <el-select v-model="search.role" filterable clearable>
                <el-option v-for="item in search.optionsRole" :key="item.id" :label="item.roleName" :value="item.id"></el-option>
              </el-select>
            </div>
            <div class="fl mr20">
              <span>账户名称：</span>
              <el-input v-model="search.accountName" style="width:auto;"></el-input>
            </div>
            <div class="fl mr20">
              <span>用户名称：</span>
              <el-input v-model="search.userName" style="width:auto;"></el-input>
            </div>
            <el-button type="primary" icon="el-icon-search" class="fl" @click="searchList(search)"></el-button>
          </el-col>
        </el-row>
        <hr>
      </div>

      <el-button type="primary" round size="mini" @click="handleClick({},'0')">添加账户</el-button>
      <div class="allocated mt20" style="padding-left:30px;">
        <el-table :data="tableData.content" border style="width: 100%;margin-top:30px;" header-cell-class-name="header_cell table_header_shadow">
          <el-table-column fixed="left" type="index" width="50" label="序号" :index="(index) => this.$indexS(index, currentPage, size)"></el-table-column>
          <el-table-column prop="accountName" label="账户名称" width="120"></el-table-column>
          <el-table-column label="用户角色" width="120">
            <template slot-scope="scope">
              <div>{{scope.row.role != null ? scope.row.role.roleName : ''}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态" width="120">
            <template slot-scope="scope">
              <el-select v-model="scope.row.status" placeholder="请选择" size="small" @change="changeStatus(scope.row)"> <!-- v-model的值与：value值一致，显示值为label值 -->
                <el-option v-for="item in options" :key="item.status" :label="item.label" :value="item.status"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="userName" label="用户名称" width="100"></el-table-column>
          <el-table-column prop="workNo" label="工号（选填）" width="120"></el-table-column>
          <el-table-column prop="organize" label="公司/部门" width="100" show-overflow-tooltip></el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="100"></el-table-column>
          <el-table-column prop="area" label="所属区域/国家" width="120"></el-table-column>
          <el-table-column prop="mobile" label="手机号码" width="120"></el-table-column>
          <el-table-column prop="mail" label="邮箱" show-overflow-tooltip></el-table-column>
          <el-table-column fixed="right" label="操作" width="90" align="center">
            <template slot-scope="scope">
              <el-button class="button-small" @click="handleClick(scope.row,'1')" size="mini" type="primary" icon="el-icon-edit" plain title="编辑"></el-button>
              <el-button class="button-small" @click="deleteUser(scope.row)" size="mini" type="primary" icon="el-icon-delete" plain title="删除"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination fr ovw-h">
        <el-pagination @size-change="" @current-change="handleCurrentChange"
                       :current-page="currentPage" :page-size="size"
                       layout="total, prev, pager, next"
                       :total="tableData.totalCount" v-if="tableData.totalCount">
        </el-pagination>
      </div>

      <!-- Form -->
      <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="50%" center @close="cancelAdd">
        <hr>
        <el-form :model="form" status-icon :rules="rules" ref="ruleForm" label-width="130px" label-position="right" class="mt20">
          <el-form-item prop="accountName" label="账户名称：">
            <el-input v-model="form.accountName" placeholder="请输入账户"></el-input>
          </el-form-item>
          <el-form-item prop="userName" label="用户名称：">
            <el-input v-model="form.userName" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <!--<el-form-item label="密码：" prop="password">-->
            <!--<el-input type="password" v-model="form.password" autocomplete="off"></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="确认密码：" prop="checkPass">-->
            <!--<el-input type="password" v-model="form.checkPass" autocomplete="off"></el-input>-->
          <!--</el-form-item>-->
          <el-form-item label="用户角色：" prop="role.id" :rules="[{ required: true, message: '该项不能为空！', trigger: 'change' }]">
            <el-select v-model="form.role.id" placeholder="请选择">
              <el-option v-for="item in search.optionsRole" :key="item.id" :label="item.roleName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="工号：" prop="workNo" :rules="[{ required: true, max: 10, message: '不能超过十个字符！', trigger: ['blur', 'change'] }]" v-if="form.role.id !== 5">
            <el-input v-model="form.workNo" placeholder="请输入工号" :disabled="form.role.id === 5"></el-input>
          </el-form-item>

          <el-form-item label="所属区域/国家：" prop="area" :rules="[{ required: true, max: 50, message: '该项不能为空！', trigger: 'change' }]">
            <el-input v-model="form.area" placeholder="请输入区域/国家"></el-input>
          </el-form-item>
          <el-form-item label="公司名称/部门：" prop="organize" :rules="[{ required: true, max: 50, message: '该项不能为空！', trigger: 'change' }]">
            <el-input v-model="form.organize" placeholder="请输入公司/部门"></el-input>
          </el-form-item>
          <!-- 手机号码和邮箱 -->
          <el-form-item label="手机号码：" prop="mobile" :rules="[{ required: true, min:11, max: 11, message: '请输入11位手机号码', trigger: 'change' }]">
            <el-input type="age" v-model="form.mobile" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="mail" label="邮箱：" :rules="[{ required: true, message: '请输入邮箱地址', trigger: 'blur' },{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }]">
            <el-input v-model="form.mail"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="userOperation(form)">确 定</el-button>
          <el-button @click="dialogFormVisible = false">取 消</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
  import { Message } from 'element-ui';
  /** 导入api.js */
  import {getUserList,getRoleList,updateStatus,updateUser,addUser,deleteUser} from '../../axios/api.js'
    export default {
      name: "userManage",
      created: async function () {
        this.getUserLists();
        /** 获取角色列表 */
        let resRole = await getRoleList();
        console.log(resRole);
        this.search.optionsRole = resRole.msg;
      },
      methods: {
        async getUserLists() {
          /** 根据条件查询用户列表 */
          let params = {
            page: 1,
            size: this.size,
          };
          let res = await getUserList(params);
          for(let item of res.msg.content) {
            console.log(item);
            let time = this.$format(item.createTime);
            item.createTime = time;
          }
          this.tableData = res.msg;
        },

        //打开弹框
        handleClick(row, type) {
          this.dialogFormVisible = true;
          if(row !== null && row !== undefined && JSON.stringify(row) !== '{}') { //判断row 参数是否为空对象
            this.form = row;
            if(!this.form.role) {
              this.form.role = {id: null};
            }
            this.flag = 1;
          }else{
            this.form = {role: {id:''}};
            this.flag = 0;
          }
          this.form.entrance = type;
          this.dialogTitle = type === '0'? '添加用户' : '修改用户';
          console.log(row);
          // this.$refs.ruleForm.clearValidate(); //放在这里，刚进来的时候this.$refs.ruleForm是不存在的
        },

        //删除用户
        async deleteUser(row) {
          let res = await deleteUser({userId: row.userId});
          if (res.status === 1) {
            Message({showClose: true, type: 'success', message: "删除用户成功！"});
            this.getUserLists();
          }
        },

        //按条件搜索列表信息
        async searchList(search) {
          let params = {
            page: 1,
            size: this.size,
          };
          if(search.role !== '') {
            params.roleId = search.role;
          }
          if(search.accountName !== '') {
            params.accountNo = search.accountName;
          }
          if(search.userName !== '') {
            params.userName = search.userName;
          }
          console.log(params);
          let res = await getUserList(params);
          for(let item of res.msg.content) {
            console.log(item);
            let time = this.$format(item.createTime);
            item.createTime = time;
          }
          this.tableData = res.msg;
        },
        //改变账户状态
        async changeStatus(row) {
          let params = {
            userId: row.userId,
            status: row.status,
          };
          let res = await updateStatus(params);
          if(res.status === 1) {
            this.$message({
              showClose: true,
              message: '修改成功',
              type: 'success',
              center: true
            });
          }
        },

        //取消或者关闭弹框时清空校验信息
        cancelAdd() {
          this.$refs.ruleForm.clearValidate();
        },

        //添加用户或修改用户
        userOperation(form) {
          this.$refs.ruleForm.validate(async (valid) => {
            if (valid) {
              if((form.role.id !== 5 && form.workNo) || form.role.id === 5) {
                // alert('submit!');
                let params = form;
                let res;
                if(form.entrance === '0') {
                  res = await addUser(params);
                }else {
                  res = await updateUser(params);
                }
                if(this.flag === 0) {
                  this.currentPage = 1;
                }
                let paramsUser = {
                  page: this.currentPage,
                  size: this.size,
                };
                if(this.search.role !== '') {
                  paramsUser.roleId = this.search.role;
                }
                if(this.search.accountName !== '') {
                  paramsUser.accountNo = this.search.accountName;
                }
                if(this.search.userName !== '') {
                  paramsUser.userName = this.search.userName;
                }
                let resUser = await getUserList(paramsUser);
                if(resUser.status === 1) {
                  Message({showClose: true, type: 'success', message: '添加或修改用户成功！'})
                }
                for(let item of resUser.msg.content) {
                  console.log(item);
                  let time = this.$format(item.createTime);
                  item.createTime = time;
                }
                this.tableData = resUser.msg;
                this.dialogFormVisible = false;
              } else if(form.role.id !== 5) {
                Message({showClose: true, type: 'error', message: '请填写工号！'});
              }
            } else {
              Message({showClose: true, type: 'error', message: '请仔细检查是否填写正确！'});
              return false;
            }
          });
        },


        // async handleSizeChange(val) {
        //   let params = {
        //       page: val,
        //       size: val,
        //     },
        //     res = await getUserList(params); // async和await需要同步使用
        //   for(let item of res.msg.content) {
        //     console.log(item);
        //     let time = this.$format(item.createTime);
        //     item.createTime = time;
        //   }
        //   this.tableData = res.msg;
        //   console.log(`每页 ${val} 条`);
        // },
        async handleCurrentChange(val) {
          this.currentPage = val;
          let params = {
            page: val,
            size: this.size,
          },
          res = await getUserList(params); // async和await需要同步使用
          for(let item of res.msg.content) {
            console.log(item);
            let time = this.$format(item.createTime);
            item.createTime = time;
          }
          this.tableData = res.msg;
          console.log(`当前页: ${val}`);
        },
        submit(params) {
          this.dialogFormVisible = false
          // this.tableData.splice(0,0,{ ----新增
          //   phone: '15275051135',
          //   email:'45@1.co',
          // })
          // this.tableData = this.tableData.slice(0,10)
          console.log(params);
        },
      },
      data () {
        let validateAccount = (rule, value, callback) => {
          if(!value) {
            callback(new Error('账户名称不能为空！'))
          } else if (/^\w+$/.test(value)) {
            callback();
          } else {
            callback(new Error('请正确填写，支持英文大小写、数字和下划线_，20字以内'));
          }
        };

        return {
          currentPage: 1,
          size: 5,
          //弹框
          dialogFormVisible: false,
          flag: 0,
          dialogTitle: '',
          form: {role: {roleName:''},entrance: 0,}, //添加账户以及编辑账户入口对象
          rules: {
            accountName: [
              { required: true, validator: validateAccount, trigger: 'change' },
              { required: true, min: 6, max: 20, trigger: 'change', message: '请控制在6~20个字符以内!'},
            ],
            userName: [
              { required: true, max: 20, trigger: 'change', message: '请控制在20个字符以内，但不能为空!'},
            ],
          },

          //搜索模块
          search: {
            role: '',
            optionsRole: [],
            accountName: '',
            optionsAccountName: [],
            userName: '',
            optionsUserName: [],
          },
          //表格数据入口
          tableData: [],
          //表格中状态列
          options: [
            {status: 1, label: '已启用'},
            {status: 0, label: '已停用'},
          ]
        }
      }
    }
</script>

<style lang="scss" scoped>
  .button-small.el-button--mini {
    padding: 3px !important;
  }
</style>
