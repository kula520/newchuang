<template>
    <div>
        <el-form-item :label="title">
          <el-input :type="inptType" v-model="inputTest" :disabled='disabd' :maxlength="maxNum" placeholder="请输入"></el-input>
        </el-form-item>
    </div>
</template>
<script>
export default {
  name: 'inputs',
  data () {
    return {
    }
  },
  props: {
    title: '',
    inputTest: '',
    maxNum: 60,
    inptType: 'text',
    disabd: false
  },
  watch: {
    inputTest (val) {
      if (val != undefined) {
        this.$emit('inputVals', val)
      }
    },
    disabd (val) {
      // console.log(val)
    }
  }
}
</script>
