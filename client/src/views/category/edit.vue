<template>
  <div class="editor-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="分类标题" prop="title">
        <el-col :span="6">
            <el-input v-model="form.title" maxlength="20" placeholder="请输入分类标题"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="分类描述" prop="desc">
        <el-col :span="6">
            <el-input v-model="form.desc" type="textarea" maxlength="30" placeholder="请输入分类标题"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="分类封面" prop="cover">
        <el-upload
            class="avatar-uploader"
            action="/api/upload"
            :headers="{
                accessToken: $baseAccessToken() 
            }"
            :show-file-list="false"
            :on-success="handleSuccess"
            :before-upload="beforeUpload">
            <img v-if="form.cover" :src="form.cover" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">建议上传102*87尺寸</div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getCategoryDetail, doCategoryAdd, doCategoryEdit } from "@/api/article";

export default {
  name: "CategoryEdit",
  data() {
    return {
      form: {
        title: "",
        desc: "",
        cover: ""
      },
      rules: {
        title: [
          {
            required: true,
            message: "请输分类标题",
            trigger: "blur",
          },
        ],
        desc: [
          {
            required: true,
            message: "请输入分类描述",
            trigger: "blur",
          },
        ],
        cover: [
          {
            required: true,
            message: "请选择分类封面",
            trigger: "change",
          },
        ],
      }
    };
  },
  created() {
      const { id } = this.$route.query;
      id && this.fetchData(id);
  },
  methods: {
    fetchData(id) {
      getCategoryDetail({ id }).then(({ data }) => {
        Object.keys(this.form).forEach(item => {
            this.form[item] = data[item];
        });
      });
    },
    handleSuccess(res, file) {
      this.form.cover = res.data;
    },
    beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 或者 PNG 格式!');
      }

      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }

      return isJPG && isLt2M;
    },
    onEditorBlur(quill) {
      // 失去焦点事件

      this.$refs.form.validateField("content", (errorMsg) => {
        this.borderColor = "#dcdfe6";
        if (errorMsg) {
          this.borderColor = "#F56C6C";
        }
      });
    },
    onEditorChange({ quill, html, text }) {
      // 内容改变事件
      this.form.content = html;
    },
    handleSave() {
      const { id } = this.$route.query;

      this.$refs["form"].validate((valid) => {
        this.$refs.form.validateField("content", (errorMsg) => {
          this.borderColor = "#dcdfe6";
          if (errorMsg) {
            this.borderColor = "#F56C6C";
          }
        });
        if (valid) {
          this.getDoAction({ ...this.form, id }).then(res => {
              this.$baseMessage(res.msg, "success");
              this.$router.push("/article");
          });
        } else {
          return false;
        }
      });
    },
    getDoAction(data) {
      const { action } = this.$route.params;
    
      return action === "add" ? doCategoryAdd(data) : doCategoryEdit(data);
    }
  },
};
</script>
<style lang="scss">
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
