<template>
  <div class="table-container">
    <byui-query-form>
      <byui-query-form-right-panel :span="6">
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
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="unit" label="预约单位"></el-table-column>
      <el-table-column label="预约表格" width="340">
        <template slot-scope="scope">
          <a :href="scope.row.excel">{{ scope.row.excel }}</a>
        </template>
      </el-table-column>
      <el-table-column label="预约状态">
        <template slot-scope="scope">
          {{ scope.row.status === 1 ? "已审核" : "未审核" }}
        </template>
      </el-table-column>
      <el-table-column
        label="预约时间"
        prop="date"
        width="210"
      ></el-table-column>
      <el-table-column label="操作" width="180px" fixed="right">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status === 0" type="text" @click="handleEdit(scope.row)">
            审核
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
import { getList, doEdit } from "@/api/examination";
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
    handleEdit(row) {
      this.$refs["edit"].showEdit(row);
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
