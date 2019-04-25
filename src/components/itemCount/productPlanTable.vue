<template>
  <div id="productPlanTable">
    <el-button type="primary" plain @click="$goback" class="el-button_plain_mini">返回</el-button>

    <div id="allInfo">
      <h2 class="tc fwb border_solid_bottom_c lh40">加工进度计划表</h2>
      <el-row :gutter="10" type="flex">
        <el-col>模具编号：<strong>{{basicInfo.mouldNo}}</strong></el-col>
        <el-col class="out" :title="basicInfo.partName">制品名称：<strong>{{basicInfo.partName}}</strong></el-col>
        <el-col>项目名称：<strong>{{basicInfo.projectName}}</strong></el-col>
        <el-col>客户名称：<strong>{{basicInfo.customerUserName}}</strong></el-col>
        <el-col>项目经理：<strong>{{basicInfo.projectManager}}</strong></el-col>
      </el-row>
      <div class="mt20">
        <el-button type="primary" plain @click="$goto('productPlanTableEdit')">进度设置</el-button>
        <el-button type="primary" plain @click="export_excel">加工进度计划表导出</el-button>
      </div>

      <el-table class="mt20" cell-class-name="cCell" :data="gTable.items" border :max-height="mh" style="width: 100%;" :span-method="objectSpanMethod" v-if="datas.length && gTable.items">
        <el-table-column align="center" fixed prop="nodeName" label="工序" width="180" :resizable="false"></el-table-column>

        <el-table-column v-for="(item,index) in ticks" align="center" :key="index" :label="item" width="120" :resizable="false">
          <template slot-scope="scope">
            <div id="ganttes" :style="ganttes"></div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import { Message } from 'element-ui';
  /** 导入api.js */
  import {queryProcessDetailsByMouldCode, processDetailsExport} from '../../axios/api.js'

  import Vue from 'vue'
  import G2 from '@antv/g2'
  Vue.use(G2)
  export default {
    name: "productPlanTable",
    created() {
      this.basicInfo = this.$store.getters.itemCheck_item;
      console.log(this.basicInfo);
      this.getInfo();
    },
    methods: {
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        // console.log('%c合并信息:','font-size:30px',row); && this.gTable[index].items.length > 2
        if (columnIndex === 1 && rowIndex === 0) {
          return {
            rowspan: this.gTable.items.length,
            colspan: this.ticks.length,
          };
        } else if(columnIndex !== 0){
          return {
            rowspan: 0,
            colspan: 0
          };
        }
        // else if (rowIndex === 0 && columnIndex === 0){
        //   return {
        //     rowspan: 3,
        //     colspan: 1
        //   }
        // }
      },

      //导出表格
      async export_excel() {
        let res = await processDetailsExport({mouldNo:this.$store.getters.itemCheck_item.mouldNo}, this.$store.getters.itemCheck_item); //返回一个Promise对象
        console.log(res);
      },

      //获取图标信息
      async getInfo () {
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


        let res = await queryProcessDetailsByMouldCode({mouldCode: this.basicInfo.mouldNo});
        if(res.status === 1) {
          this.info = res.msg;

          this.gTable = res.msg;

          console.log(this.info);
          this.datas = this.info.items;
          this.times = {startTime: this.info.earliestDate, endTime: this.info.latestDate};

          let tickInterval = 24*60*60*1000;

          if(this.info.earliestDate && this.info.latestDate) {
            let s = new Date(this.info.earliestDate);
            let e = new Date(this.info.latestDate);
            let startYear = s.getFullYear();
            let endYear = e.getFullYear();
            let min = getDays(s, 0);
            let max = getDays(e, 1);
            let cha = (max - min) / tickInterval;

            if(cha > 630) {
              min = new Date(startYear + '-01-01').getTime();
              max = new Date(endYear + '-12-31').getTime();
              for (let i3 = startYear; i3 <= endYear; i3++) {
                this.ticks.push(`${i3}年1月`, `${i3}年2月`,`${i3}年3月`,`${i3}年4月`,`${i3}年5月`,`${i3}年6月`,`${i3}年7月`,`${i3}年8月`,`${i3}年9月`,`${i3}年10月`,`${i3}年11月`,`${i3}年12月`);
              }

            } else if(cha > 90) {
              for(let i = min; i < max; i += 7*tickInterval) {
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
                  var now = new Date(self.$format(i));
                  var str = now.getFullYear()+"-"+((now.getMonth()+1)<10?"0":"")+(now.getMonth()+1)+"-"+(now.getDate()<10?"0":"")+now.getDate();
                  var year = now.getFullYear();
                  var month =((now.getMonth()+1)<10?"0":"")+(now.getMonth()+1);
                  var date=(now.getDate()<10?"0":"")+now.getDate();
                  // this.date2=str;
                  var ttwo=year.toString().substring(2,year.length);
                  lot=ttwo+month+date;
                  value = getWeekNumber(year,month,date);
                })();

                this.ticks.push('W' + value);
              }
            }else {
              for(let i = min; i < max; i += tickInterval) {
                this.ticks.push(this.$format(i));
              }
            }
            console.log(this.ticks);
          }



          let self = this; //再setTimeout中的this对象会指向当前函数，而不是全局的this
          setTimeout(function () { //创建延时，因为创建图表入口时，无法找到，必须先创建入口，才能再渲染图表
            /*-- 创建图表 --*/
            let chart = new G2.Chart({
              container: 'ganttes',
              width: 1000,
              height: 280,
              padding: [0, 0, 0, 0],
            });
            self.$chartInit(chart, self.datas, self.times, 0);
            chart.render();

            let shSize = screen.availHeight - 400;
            console.log(shSize);
            //表格最大高度
            self.tableH = shSize;
          },200)
        }
      }
    },

    computed: { //已在data中定义无须在此处声明
      mh: function () {
        return Number(this.tableH);
      }
    },

    data() {
      return {
        ticks: [],
        gTable: [

        ],
        tableH: '',

        ganttes: '',

        //跳转传递的参数
        basicInfo: {},

        info: {},

        datas: [],  //数据来源data
        datasKeys: [],
        times: {}, //数据时间跨度集合
      }
    }
  }
</script>

<style scoped>

</style>
