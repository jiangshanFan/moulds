<template>
    <div id="newTec">
      <el-button type="primary" size="mini" round @click="$goback">返回</el-button>
      <el-row class="mt20">
        <el-col :span="24">
          <div class="grid-content bg-purple-dark" style="text-align:center;">
            <p class="newTec-content" v-if="id===0">
              <img src="../../assets/Laser/laser-01.png" alt="激光雕刻" class="newTec-img">
              <img src="../../assets/Laser/laser-02.png" alt="激光雕刻" class="newTec-img">
              <img src="../../assets/Laser/laser-03.png" alt="激光雕刻" class="newTec-img">
              <img src="../../assets/Laser/laser-04.png" alt="激光雕刻" class="newTec-img">
              <img src="../../assets/Laser/laser-05.png" alt="激光雕刻" class="newTec-img">
              <img src="../../assets/Laser/laser-06.png" alt="激光雕刻" class="newTec-img">
              <img src="../../assets/Laser/laser-07.png" alt="激光雕刻" class="newTec-img">
              <img src="../../assets/Laser/laser-08.png" alt="激光雕刻" class="newTec-img">
            </p>
            <p class="newTec-content" v-if="id===1">
              <img src="../../assets/3D/3D-01.png" alt="3D打印" class="newTec-img">
              <img src="../../assets/3D/3D-02.png" alt="3D打印" class="newTec-img">
              <img src="../../assets/3D/3D-03.png" alt="3D打印" class="newTec-img">
              <img src="../../assets/3D/3D-04.png" alt="3D打印" class="newTec-img">
              <img src="../../assets/3D/3D-05.png" alt="3D打印" class="newTec-img">
              <img src="../../assets/3D/3D-06.png" alt="3D打印" class="newTec-img">
              <img src="../../assets/3D/3D-07.png" alt="3D打印" class="newTec-img">
              <img src="../../assets/3D/3D-08.png" alt="3D打印" class="newTec-img">
              <img src="../../assets/3D/3D-09.png" alt="3D打印" class="newTec-img">
              <img src="../../assets/3D/3D-10.png" alt="3D打印" class="newTec-img">
            </p>
          </div>
        </el-col>
      </el-row>
    </div>
</template>

<script>
    export default {
      name: "newTec",
      data () {
        return {
          id: 0,
        }
      },
      created () {
        this.id = this.$store.getters.newTec_detail;
      },
      methods: {

      }
    }
</script>

<style scoped>
  .newTec-content{
    display: flex;
    justify-content: center;
    padding: 50px;
    box-sizing: border-box;
    text-align:center;
    flex-direction: column;
    align-items: center;
  }
  .newTec-img{
    width:100%;
    display: inline-block;
  }
</style>
