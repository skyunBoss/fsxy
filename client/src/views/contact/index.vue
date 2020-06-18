<template>
  <div class="table-container">
    <byui-query-form>
      <byui-query-form-left-panel>
        <el-button icon="el-icon-plus" type="primary" @click="handleAdd"
          >添加
        </el-button>
        <el-button icon="el-icon-delete" type="danger" @click="handleDelete"
          >删除
        </el-button>
      </byui-query-form-left-panel>
      <byui-query-form-right-panel>
        <el-form
          ref="form"
          :model="queryForm"
          :inline="true"
          @submit.native.prevent
        >
          <el-form-item>
            <el-input v-model="queryForm.keyword" placeholder="请输入关键字搜索" />
          </el-form-item>
          <el-form-item>
            <el-button
              icon="el-icon-search"
              type="primary"
              native-type="submit"
              @click="handleQuery"
              >查询
            </el-button>
          </el-form-item>
        </el-form>
      </byui-query-form-right-panel>
    </byui-query-form>

    <el-table
      ref="tanle"
      v-loading="listLoading"
      :data="list"
      :element-loading-text="elementLoadingText"
    >
      <el-table-column label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="label" label="标签"></el-table-column>
      <el-table-column prop="value" label="内容"></el-table-column>
      <el-table-column
        label="时间"
        prop="updated_at"
        width="210"
      ></el-table-column>
      <el-table-column label="操作" width="180px" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" @click="handleEdit(scope.row)"
            >编辑
          </el-button>
          <el-button type="text" @click="handleDelete(scope.row)"
            >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :background="background"
      :current-page="queryForm.currentPage"
      :layout="layout"
      :page-size="queryForm.pageSize"
      :total="total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    ></el-pagination>
    <table-edit ref="edit" @fetchData="fetchData"></table-edit>
  </div>
</template>

<script>
import { getList, doDelete } from "@/api/contact";
import TableEdit from "./components/TableEdit";
export default {
  name: "ContactList",
  components: {
    TableEdit,
  },
  data() {
    return {
      list: [],
      listLoading: true,
      layout: "total, sizes, prev, pager, next, jumper",
      total: 0,
      background: true,
      elementLoadingText: "正在加载...",
      queryForm: {
        currentPage: 1,
        pageSize: 10,
        keyword: "",
      },
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    handleAdd() {
      this.$refs["edit"].showEdit();
    },
    handleEdit(row) {
      this.$refs["edit"].showEdit(row);
    },
    handleDelete(row) {
      this.$baseConfirm("你确定要删除当前项吗", null, () => {
        doDelete({ id: row.id }).then((res) => {
            this.$baseMessage(res.msg, "success");
            this.fetchData();
        });
      });
    },
    handleSizeChange(val) {
      this.queryForm.pageSize = val;
      this.fetchData();
    },
    handleCurrentChange(val) {
      this.queryForm.currentPage = val;
      this.fetchData();
    },
    handleQuery() {
      this.queryForm.currentPage = 1;
      this.fetchData();
    },
    fetchData() {
      this.listLoading = true;
      getList(this.queryForm).then(({ data }) => {
        this.list = data.list;
        this.total = data.total;
        this.listLoading = false;
      });
    },
  },
};
</script>
