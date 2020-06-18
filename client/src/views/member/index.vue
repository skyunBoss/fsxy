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
            <el-input v-model="queryForm.keyword" placeholder="请输入用户名搜索" />
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
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column label="性别">
        <template slot-scope="scope">
          {{ scope.row.sex === 1 ? "男" : "女" }}
        </template>
      </el-table-column>
      <el-table-column prop="job" label="工种"></el-table-column>
      <el-table-column prop="seniority" label="工龄"></el-table-column>
      <el-table-column prop="department" label="科室"></el-table-column>
      <el-table-column prop="company" label="公司"></el-table-column>
      <el-table-column
        label="出生年月"
        prop="birthday"
        width="210"
      ></el-table-column>
      <el-table-column
        label="时间"
        prop="updated_at"
        width="210"
      ></el-table-column>
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
  </div>
</template>

<script>
import { getList } from "@/api/member";
export default {
  name: "MemberList",
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
