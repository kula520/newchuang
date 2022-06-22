<template>
    <div>
        <el-form-item :label="title" v-if="optionVals == 'value'">
          <el-select clearable style="width:100%" filterable
            v-model="selectVals"
            placeholder="请选择"
            :disabled='disabd'>
            <el-option
              v-for="item in typeData"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="title" v-if="optionVals == 'id'">
          <el-select clearable style="width:100%" filterable
            v-model="selectVals"
            placeholder="请选择"
            :disabled='disabd'>
            <el-option
              v-for="item in typeData"
              :key="item.id"
              :label="item.referred"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="title" v-if="optionVals == 'name'">
          <el-select clearable style="width:100%" filterable
            v-model="selectVals"
            placeholder="请选择"
            :disabled='disabd'>
            <el-option
              v-for="item in typeData"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="title" v-if="optionVals == 'idVal'">
          <el-select clearable style="width:100%" filterable
            v-model="selectVals"
            placeholder="请选择"
            :disabled='disabd'>
            <el-option
              v-for="item in typeData"
              :key="item.id"
              :label="item.id"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
    </div>
</template>
<script>
export default {
  name: 'inputSelect',
  data () {
    return {
    }
  },
  props: {
    title: '',
    selectVals: '',
    typeData: Array,
    disabd: false,
    optionVals: ''
  },
  watch: {
    selectVals (val) {
      if (val != undefined) {
        this.$emit('selectVals', val)
      }
    },
    disabd (val) {
      // console.log(val)
    },
    optionVals (val) {
      // console.log(val)
    }
  }
}
</script>
