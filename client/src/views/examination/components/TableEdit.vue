<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="预约单位" prop="unit">
        <el-input v-model.trim="form.unit" autocomplete="off" placeholder="请输入预约单位"></el-input>
      </el-form-item>
      <el-form-item label="预约时间" prop="date">
        <el-date-picker
          v-model="form.date"
          value-format="yyyy-MM-dd hh:mm:ss"
          type="datetime"
          placeholder="请选择预约时间"
          style="width: 100%">
        </el-date-picker>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { doEdit } from "@/api/examination";

export default {
  name: "TableEdit",
  data() {
    return {
      form: {
        unit: "",
        date: "",
      },
      rules: {
        unit: [{ required: true, trigger: "blur", message: "请输入预约单位" }],
        date: [{ required: true, trigger: "blur", message: "请选择预约时间" }],
      },
      title: "审核",
      id: null,
      dialogFormVisible: false,
      row: {}
    };
  },
  created() {},
  methods: {
    showEdit(row) {
      this.id = row.id;
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
          doEdit({ id: this.id, ...this.form }).then((res) => {
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
  },
};
</script>
