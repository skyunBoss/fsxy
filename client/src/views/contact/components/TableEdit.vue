<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="标签" prop="label">
        <el-input v-model.trim="form.label" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="value">
        <el-input v-model.trim="form.value" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { doAdd, doEdit } from "@/api/contact";

export default {
  name: "TableEdit",
  data() {
    return {
      form: {
        label: "",
        value: "",
      },
      rules: {
        label: [{ required: true, trigger: "blur", message: "请输入标签" }],
        value: [{ required: true, trigger: "blur", message: "请输入内容" }],
      },
      title: "",
      dialogFormVisible: false,
    };
  },
  created() {},
  methods: {
    showEdit(row) {
      if (!row) {
        this.title = "添加";
      } else {
        this.title = "编辑";
        this.form = Object.assign({}, row);
      }
      this.dialogFormVisible = true;
    },
    close() {
      this.$refs["form"].resetFields();
      this.form = this.$options.data().form;
      this.dialogFormVisible = false;
      this.$emit("fetchData");
    },
    save() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.getDoAction().then((res) => {
            this.$baseMessage(res.msg, "success");
            this.$refs["form"].resetFields();
            this.dialogFormVisible = false;
            this.$emit("fetchData");
            this.form = this.$options.data().form;
          });
        } else {
          return false;
        }
      });
    },
    getDoAction() {
      return this.title === "添加" ? doAdd(this.form) : doEdit(this.form);
    }
  },
};
</script>
