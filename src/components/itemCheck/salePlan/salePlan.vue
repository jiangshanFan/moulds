<template>
  <div id="salePlan">
    <router-view></router-view>
  </div>
</template>

<script>
  import { Message } from 'element-ui'
  /** 导入api.js */
  import {getSalePlanList,salesPlanDetailsExport} from '../../../axios/api.js'
  export default {
    name: "salePlan",
    methods: {

    },
    data() {
      return {

      }
    }
  }
</script>

<style scoped>

</style>
