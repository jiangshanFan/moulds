<template>
  <div id="machine">
    <el-button type="primary" size="mini" @click="$goback">返回</el-button>
    <!-- 基本信息和发布统计 -->
    <div class="info">
      <el-row style="font-size:16px;font-weight:bold;" class="mt20 mb20"><el-tag>基本信息：</el-tag></el-row>
      <el-row :gutter="10" type="flex" justify="space-around" style="padding-left:20px;">
        <el-col class="ovw-h" :span="6">
          <p class="fl">图片：</p>
          <p class="fl" style="width:calc(100% - 100px)"><img :src="item.imgUrl" alt="图例" style="height:77px;width:auto !important"></p>
        </el-col>
        <el-col :span="6">
          <p>项目名称：{{item.projectName}}</p>
          <p>客户名称：{{item.customerUserName}}</p>
        </el-col>
        <el-col :span="6">
          <p class="out" :title="item.partName">制品名称：{{item.partName}}</p>
          <p>制品尺寸：{{item.partNo}}</p>
        </el-col>
        <el-col :span="6">
          <p>模具编号：{{item.mouldNo}}</p>
        </el-col>
      </el-row>
      <hr>
      <!-- 发布统计 -->
      <el-row style="font-size:16px;font-weight:bold;" class="mt20 mb20">
        <el-tag>加工统计：</el-tag>
      </el-row>

      <el-row style="padding-left:20px;">加工零件总数:{{publish.itemPartTotal}}</el-row>
      <el-row :gutter="10" style="padding-left:20px;line-height:40px;">
        <el-col :span="6">已加工完成零件：{{publish.itemPartFinishMath}}</el-col>
        <el-col :span="6">加工中零件：{{publish.itemPartMachiningMath}}</el-col>
        <!--<el-col :span="6">委外加工零件：{{publish.itemPartOutsourcingMath}}</el-col>-->
        <el-col :span="6">预计加工完成时间：{{publish.planCompletionTime?$format(new Date(publish.planCompletionTime).getTime()): ''}}</el-col>
        <el-col :span="6"><span style="padding-right:10px;">不合格零件：{{publish.unqualifiedMath?publish.unqualifiedMath : '0'}}个</span></el-col> <!-- <el-button type="plain" size="mini" @click="goto">查看</el-button> -->
      </el-row>
      <hr>
    </div>

    <!-- Tn -->
    <div class="tn" style="padding:40px;">
      <div class="node mt20" v-for="(item,index) in datasKeys" :key="index">
        <el-tag>{{item}}进度查看:</el-tag>
        <div>
          <p v-if="!datas[item].length" style="padding-left:150px;">暂时没有相关数据！</p>
          <el-table class="mt20" cell-class-name="cCell" :data="gTable[index].items" border :max-height="mh" style="width: 100%;" :span-method="objectSpanMethod" v-if="datas[item].length && gTable[index].items">
            <el-table-column align="center" fixed prop="nodeName" label="工序" width="180" :resizable="resize"></el-table-column>

            <el-table-column v-for="(i,ind) in ticks[index]" align="center" :key="ind" :label="i" width="120" :resizable="resize">
              <template slot-scope="scope">
                <div :id="item" :style="ganttes"></div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Message } from 'element-ui';
  /** 导入api.js */
  import {queryItemPartCountByMouldCode, queryItemPartAttributeByMouldCodeBasis} from '../../axios/api.js'

  import Vue from 'vue'
  import G2 from '@antv/g2'
  Vue.use(G2)
  export default {
    name: "machine",
    created: async function() {
      //获取跳转传递回来的参数信息
      //获取头部的基本信息
      this.item = this.$store.getters.itemCheck_item;

      //发布统计信息接口调用
      let res = await queryItemPartCountByMouldCode({mouldCode: this.item.mouldNo,});
      if(res.status === 1) {
        this.publish = res.msg;
      }
    },
    methods: {
      goto () {
        this.$router.push('/machineBad');
      },

      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        // console.log('%c合并信息:','font-size:30px',row); && this.gTable[index].items.length > 2

        let index = row.itemAndPlanCodeName;
        if(this.gTable[index]) {
          if (columnIndex === 1 && rowIndex === 0) {
            return {
              rowspan: this.gTable[index].items.length,
              colspan: this.ticks[index].length,
            };
          } else if(columnIndex !== 0){
            return {
              rowspan: 0,
              colspan: 0
            };
          } else if (rowIndex === 0 && columnIndex === 0 && this.gTable[index].items.length === 2 && !this.gTable[index].items[1].nodeName){
            return {
              rowspan: 2,
              colspan: 1
            }
          }
        }
      },
    },

    // beforeRouteLeave (to, from, next) {
    //   // 导航离开该组件的对应路由时调用
    //   // 可以访问组件实例 `this`
    //   if(to.path !== '/machineBad') {
    //     this.$store.dispatch('itemCheck_item',{});
    //   }
    //   console.log(to.path);
    //   next();
    // },

    async beforeMount() {
      //进度表数据'MBS180001'
      // let res1 = await queryItemPartAttributeByMouldCodeBasis({mouldCode: this.item.mouldNo});
      // if(res1.status === 1) {
      //   this.mapInfo = res1.msg;
      //   console.log(this.mapInfo);
      //   for(let i=0; i<this.mapInfo.length; i++) {
      //     if(this.mapInfo[i].items) {
      //       this.datas[this.mapInfo[i].nodeName] = this.mapInfo[i].items;
      //     }else {
      //       this.datas[this.mapInfo[i].nodeName] = [];
      //     }
      //     this.times[i] = {startTime: this.mapInfo[i].earliestDate, endTime: this.mapInfo[i].latestDate};
      //     this.datasKeys = Object.keys(this.datas);
      //     if(this.datas[this.mapInfo[i].nodeName]) {
      //       for(let item of this.datas[this.mapInfo[i].nodeName]) {
      //         item.status = 0;
      //       }
      //     }
      //   }
      // }
    },

    async mounted () {
      /**
       * 获取某周的起始天和终止天
       *
       * @param {Date} dateVal
       * @param {Number} flag
       */
      function getDays(dateVal, flag) {
        let s = dateVal.getDay() || 7, interval = 24*60*60*1000;
        let t = (s - 1) * interval,y = (7 - s) * interval;
        let newDateVal;
        if(flag === 0) {
          newDateVal = new Date(dateVal).getTime() - t;
        }else {
          newDateVal = new Date(dateVal).getTime() + y;
        }
        return newDateVal;
      }



      //进度表数据
      let res1 = await queryItemPartAttributeByMouldCodeBasis({mouldCode: this.item.mouldNo});
      if(res1.status === 1 && res1.msg.length) {
        this.mapInfo = res1.msg;

        this.gTable = res1.msg;

        console.log(this.mapInfo);
        for (let i = 0; i < this.mapInfo.length; i++) {
          if(this.mapInfo[i].items) {
            this.datas[this.mapInfo[i].nodeName] = this.mapInfo[i].items;
          }else {
            this.datas[this.mapInfo[i].nodeName] = [];
          }

          this.times[i] = {startTime: this.mapInfo[i].earliestDate, endTime: this.mapInfo[i].latestDate};
          this.datasKeys = Object.keys(this.datas);
          if(this.datas[this.mapInfo[i].nodeName]) {
            for(let item of this.datas[this.mapInfo[i].nodeName]) {
              item.status = 0;
            }
          }

          if(this.gTable[i].items) {
            if(this.gTable[i].items.length < 2) {
              this.gTable[i].items = [...this.gTable[i].items, {nodeName: ''}, ]
            }
          }

          let tick = [];
          let tickInterval = 24*60*60*1000;
          if(this.mapInfo[i].earliestDate && this.mapInfo[i].latestDate) {
            let s = new Date(this.mapInfo[i].earliestDate);
            let e = new Date(this.mapInfo[i].latestDate);
            let startYear = s.getFullYear();
            let endYear = e.getFullYear();
            let min = getDays(s, 0);
            let max = getDays(e, 1);
            let cha = (max - min) / tickInterval;

            if(cha > 630) {
              min = new Date(startYear + '-01-01').getTime();
              max = new Date(endYear + '-12-31').getTime();
              for (let i3 = startYear; i3 <= endYear; i3++) {
                tick.push(`${i3}年1月`, `${i3}年2月`,`${i3}年3月`,`${i3}年4月`,`${i3}年5月`,`${i3}年6月`,`${i3}年7月`,`${i3}年8月`,`${i3}年9月`,`${i3}年10月`,`${i3}年11月`,`${i3}年12月`);
              }

            } else if(cha > 90) {
              for(let i2 = min; i2 < max; i2 += 7*tickInterval) {
                let value,self = this;
                /**
                 * 判断年份是否为润年
                 *
                 * @param {Number} year
                 */
                function isLeapYear(year) {
                  return (year % 400 === 0) || (year % 4 === 0 && year % 100 !== 0);
                }
                /**
                 * 获取某一年份的某一月份的天数
                 *
                 * @param {Number} year
                 * @param {Number} month
                 */
                function getMonthDays(year, month) {
                  return [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month] || (isLeapYear(year) ? 29 : 28);
                }

                /**
                 * 获取某年的某天是第几周
                 * @param {Number} y
                 * @param {Number} m
                 * @param {Number} d
                 * @returns {Number}
                 */
                function getWeekNumber(y, m, d) {
                  var now = new Date(y, m - 1, d),
                    year = now.getFullYear(),
                    month = now.getMonth(),
                    days = now.getDate();
//那一天是那一年中的第多少天
                  for (var i = 0; i < month; i++) {
                    days += getMonthDays(year, i);
                  }

//那一年第一天是星期几
                  var yearFirstDay = new Date(year, 0, 1).getDay() || 7;

                  var week = null;
                  if (yearFirstDay === 1) {
                    week = Math.ceil(days / 7);
                  } else {
                    days -= (7 - yearFirstDay + 1);
                    week = Math.ceil(days / 7);
                  }
                  week = (week<10?"0":"")+ week;
                  return week;
                }
                var lot;
                (function loaddate(){
                  var now = new Date(self.$format(i2));
                  var str = now.getFullYear()+"-"+((now.getMonth()+1)<10?"0":"")+(now.getMonth()+1)+"-"+(now.getDate()<10?"0":"")+now.getDate();
                  var year = now.getFullYear();
                  var month =((now.getMonth()+1)<10?"0":"")+(now.getMonth()+1);
                  var date=(now.getDate()<10?"0":"")+now.getDate();
                  // this.date2=str;
                  var ttwo=year.toString().substring(2,year.length);
                  lot=ttwo+month+date;
                  value = getWeekNumber(year,month,date);
                })();

                tick.push('W' + value);
              }
            }else {
              for(let i1 = min; i1 < max; i1 += tickInterval) {
                tick.push(this.$format(i1));
              }
            }
            this.ticks.push(tick);
            console.log(this.ticks);
          } else {
            this.ticks[i] = [];
          }

        }
        let l = Object.keys(this.datas).length;
        let self = this; //再setTimeout中的this对象会指向当前函数，而不是全局的this
        setTimeout(function () { //创建延时，因为创建图表入口时，无法找到，必须先创建入口，才能再渲染图表
          for (let j = 0; j < l; j++) {
            if(self.datas[self.datasKeys[j]].length) {
              /*-- 创建图表 --*/
              let chart = new G2.Chart({
                container: self.datasKeys[j],
                width: 1000,
                height: 280,
                padding: [0, 0, 0, 0],
              });
              console.log(self.datasKeys[j]);
              self.$chartInit(chart, self.datas[self.datasKeys[j]], self.times[j],0);
              chart.render();
              let shSize = screen.availHeight - 400;
              console.log(shSize);

              // self.$refs[self.datasKeys[j]][0].style = {
              //   maxHeight: shSize,
              //   width: '100%',
              //   overflow: 'auto',
              //   paddingBottom: '30px',
              // }

              // self.ganttes = {
              //   maxHeight: shSize + 'px',
              //   width: '100%',
              //   overflow: 'auto',
              //   paddingBottom: '30px',
              // }

              //表格最大高度
              self.tableH = shSize;

              // self.ganttes.maxHeight = shSize;

              // console.log(self.$refs[self.datasKeys[j]][0]);
            }
          }
        },200);
      }else if(!res1.msg.length) {
        Message({showClose: true, type: 'warning', message: '暂时没有加工/精修进度表的相关数据！'})
      }
    },

    computed: { //已在data中定义无须在此处声明
      mh: function () {
        return Number(this.tableH);
      }
    },

    data () {
      return {
        ticks: [],
        gTable: [

        ],
        tableH: '',
        resize: false,

        ganttes: {},
        //跳转页面传递回来的参数信息
        item: {},

        //发布统计信息
        publish: {},

        //进度表数据
        mapInfo: [],
        datas: {},  //数据来源data
        datasKeys: [],
        times: [], //数据时间跨度集合

        radio: '',
        radio1: '',
      }
    }
  }
</script>

<style scoped>

</style>
