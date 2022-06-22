<template>
    <div>
        <el-form-item :label="title">
          <el-date-picker style="width:100%"
            :disabled='disabd'
            v-model="signing_time"
            :picker-options="pickerOptions0"
            type="date"
            @change="timerChange"
            placeholder="选择日期"
            format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
    </div>
</template>
<script>
export default {
  name: 'inputs',
  data () {
    return {      
      pickerOptions0: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      }
    }
  },
  props: {
    title: '',
    signing_time: '',
    disabd: false
  },
  methods: {
    timerChange (val) {
      var date = val
      var YY = date.getFullYear() + '-'
      var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate())
      this.signing_time = YY + MM + DD
    }
  },
  watch: {
    signing_time (val) {
      this.$emit('timesVals', val)
    },
    disabd (val) {
      // console.log(val)
    }
  }
}
</script>
