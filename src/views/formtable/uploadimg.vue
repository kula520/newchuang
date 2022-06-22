<template>
    <div>
        <el-form-item label="图片">
            <el-upload
                class="avatar-uploader"
                style="height:150px;overflow:hidden;"
                :action="upLoadUrl"
                :headers="{
                    Authorization : cookieVal,
                }"
                name="file"
                ref="fileList"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                :on-exceed="onExceed"
                multiple
                :limit='10'
                :show-file-list='false'
                >
                <div class="uploadImgBtn">+</div>
            </el-upload>
            <ul class="uploadList">
                <li v-for="(item,i) in fileList" :key="i">
                    <span class="deleteIcon" @click="handleRemove(i)"><i class="el-icon-close"></i></span>
                    <img  @click="handlePictureCardPreview(i)" :src="item.url" alt="">
                </li>
            </ul>
            <el-dialog :visible.sync="dialogVisible" :append-to-body="true">
                <div class="popImgsCont">
                    <div class="popImges">
                        <div @click="prevHandle"><i class="iconL el-icon-arrow-left"></i></div>
                        <div @click="nextHandle"><i class="iconR el-icon-arrow-right"></i></div>
                    </div>
                    <img width="100%" height="auto" :src="dialogImageUrl" alt="">
                </div>
            </el-dialog>
        </el-form-item>
    </div>
</template>
<script>
export default {
  name: 'uploadImg',
  data () {
    return {
      upLoadUrl: '',
      cookieVal: '',
      // 上传图片
      dialogImageUrl: '',
      dialogVisible: false,
      imageUrl: '',
      imgNum: '',
      
    }
  },
  props: {
    title: '',
    fileList: [],
    disabd: false
  },
  created () {
    let that = this
    let local = localStorage.getItem('cookiesDatas')
    let cookiesDatas = JSON.parse(local)
    that.upLoadUrl = that.$store.state.baseImgUrl
    that.cookieVal = cookiesDatas.UserToken
  },
  methods: {
    // 上传图片
    handleAvatarSuccess (res, file) {
      let that = this
      let fileList = that.fileList
      if (fileList.length <= 10) {
        let imgData = res.data
        that.imageUrl = URL.createObjectURL(file.raw)
        fileList.push(imgData)
      } else {
        that.$message.error('图片最多上传10张!')
      }
    },
    onExceed (file) {
      let that = this
      let len = that.fileList.length
      if (len >= 10) {
        that.$message.error('图片最多上传10张!')
        return false
      }
      if (file.length >= 10) {
        that.$message.error('图片最多上传10张!')
        return false
      }
    },
    beforeAvatarUpload (file) {
      let that = this
      const isLt2M = file.size / 1024 / 1024 < 20
      if (!isLt2M) {
        that.$message.error('上传图片大小不能超过 20MB!')
      }
      return isLt2M
    },
    handleRemove (i) {
      let that = this
      let fileList = that.fileList
      that.$confirm('确定删除该图片？', '删除图片', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        fileList.splice(i, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        that.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handlePictureCardPreview (i) {
      let that = this
      let fileList = that.fileList
      that.imgNum = i
      that.dialogImageUrl = fileList[i].url
      that.dialogVisible = true
    },
    nextHandle () {
      let that = this
      let fileList = that.fileList
      let len = fileList.length - 1
      if (that.imgNum < len) {
        that.imgNum = that.imgNum + 1
        that.dialogImageUrl = fileList[that.imgNum].url
      } else {
        that.dialogImageUrl = fileList[len].url
      }
    },
    prevHandle () {
      let that = this
      let fileList = that.fileList
      if (that.imgNum > 0) {
        that.imgNum = that.imgNum - 1
        that.dialogImageUrl = fileList[that.imgNum].url
      } else {
        that.dialogImageUrl = fileList[0].url
      }
    }
  },
  watch: {
    fileList (val) {
      this.$emit('uploadImgLists', val)
    }
  }
}
</script>
<style>
.uploadImgBtn{width:148px;height:148px;text-align:center;line-height:148px;border:1px dashed #0190e3;
    color:#0190e3;float:left;margin:0 8px 0 0;border-radius:6px;
}
.popImgsCont{padding:20px 0 0;}
.popImgsCont .popImges{display:none;}
.popImgsCont:hover .popImges{display:block;}
.popImges .iconL,.popImges .iconR{position:absolute;top:45%;z-index:999;display:block;
  height:60px;width:60px;line-height:60px;text-align:center;font-size:18px;
  border-radius:50%;background-color:#fff;color:#0190e3;cursor:pointer;opacity:0.5;
}
.popImges .iconL{left:30px;}
.popImges .iconR{right:30px;}
.uploadList li{width:148px;height:148px;text-align:center;line-height:148px;border:1px dashed #0190e3;
    color:#0190e3;float:left;margin:0 8px 8px 0;border-radius:6px;position:relative;overflow:hidden;cursor:pointer;}
.uploadList li .deleteIcon{display:block;width:20px;height:20px;text-align:center;color:#fff;
    background-color:#000000;line-height:20px;font-size:12px;cursor:pointer;
    position:absolute;top:0;right:0;z-index:9;}
.uploadList li img{width:100%;height:100%;}
.avatar-uploader{width:150px;float:left;margin-right:10px;}
</style>
