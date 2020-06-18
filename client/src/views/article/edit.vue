<template>
  <div class="editor-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="所属分类" prop="category_id">
        <el-col :span="6">
            <el-select v-model="form.category_id" style="width: 100%;" placeholder="请选择所属分类">
                <el-option
                    v-for="item in categorys"
                    :key="item.id"
                    :label="item.title"
                    :value="item.id" 
                />
            </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="文章标题" prop="title">
        <el-col :span="6">
            <el-input v-model="form.title" maxlength="20" placeholder="请输入文章标题"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <quill-editor
          v-model="form.content"
          :style="{
            height: '400px',
            border: '1px solid ' + borderColor,
          }"
          :options="editorOption"
          @blur="onEditorBlur($event)"
          @change="onEditorChange($event)"
        ></quill-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getCategoryList, getArticleDetail, doArticleAdd, doArticleEdit } from "@/api/article";
import { quillEditor, Quill } from "vue-quill-editor";
import { container, ImageExtend, QuillWatch } from 'quill-image-extend-module';
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

Quill.register('modules/ImageExtend', ImageExtend);

export default {
  name: "ArticleEdit",
  components: { quillEditor },
  data() {
    return {
      borderColor: "#dcdfe6",
      form: {
        category_id: null,
        title: "",
        content: "",
      },
      editorOption: {
        placeholder: "请输入文章内容",
        modules: {
          ImageExtend: {
            name: "img",
            size: 2,
            action: "/api/upload",
            headers: xhr => {
                xhr.setRequestHeader('accessToken', this.$baseAccessToken());
            },
            response: res => {
                return res.data;
            },
          },
          toolbar: {
              container: [
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                [{ size: ["small", false, "large", "huge"] }],
                ["bold", "italic", "underline", "strike"],
                ["blockquote", "code-block"],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ script: "sub" }, { script: "super" }],
                [{ indent: "-1" }, { indent: "+1" }],
                [{ direction: "rtl" }],
                [{ color: [] }, { background: [] }],
                [{ align: [] }],
                ["clean"],
                ["link", "image"],
            ],
            handlers: {
                'image': function () {  // 劫持原来的图片点击按钮事件
                    QuillWatch.emit(this.quill.id)
                }
            }
          },
        },
      },
      rules: {
        category_id: [
          {
            required: true,
            message: "请选择所属分类",
            trigger: "change",
          },
        ],
        title: [
          {
            required: true,
            message: "请输入文章标题",
            trigger: "blur",
          },
        ],
        content: [
          {
            required: true,
            message: "请输入文章内容",
            trigger: "blur",
          },
        ],
      },
      categorys: []
    };
  },
  created() {
      const { id } = this.$route.query;
      this.getCategoryList();
      id && this.fetchData(id);
  },
  methods: {
    fetchData(id) {
      getArticleDetail({ id }).then(({ data }) => {
        Object.keys(this.form).forEach(item => {
            this.form[item] = data[item];
        });
      });
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
    getCategoryList() {
      getCategoryList({ currentPage: 1, pageSize: 30 }).then(({ data }) => {
        this.categorys = data.list;
      });
    },
    getDoAction(data) {
      const { action } = this.$route.params;
    
      return action === "add" ? doArticleAdd(data) : doArticleEdit(data);
    }
  },
};
</script>
