<template>
  <div class="table-container">
    <byui-query-form>
      <byui-query-form-left-panel>
        <router-link to='/category/add'>
          <el-button icon="el-icon-plus" type="primary">
            添加文章分类
          </el-button>
        </router-link>
        <router-link to='/article/add' style="margin-left: 10px;">
          <el-button icon="el-icon-plus" type="primary">
            添加文章
          </el-button>
        </router-link>
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
      ref="table"
      v-loading="listLoading"
      :data="list"
      :element-loading-text="elementLoadingText"
      row-key="id"
      lazy
      :load="load"
      :tree-props="{hasChildren: 'hasChildren'}"
    >
      <el-table-column label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.row.c_id || scope.row.a_id }}
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column label="内容" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.desc || scope.row.content }}
        </template>
      </el-table-column>
      <el-table-column label="封面">
        <template slot-scope="scope">
          <el-image
            v-if="scope.row.cover && imgShow"
            :preview-src-list="imageList"
            :src="scope.row.cover"
          ></el-image>
        </template>
      </el-table-column>
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
  </div>
</template>

<script>
import { getCategoryList, getArticleList, doCategroyDelete, doArticleDelete } from "@/api/article";
export default {
  name: "ArticleList",
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger",
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      imgShow: true,
      list: [],
      imageList: [],
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
      maps: new Map(),
    };
  },
  watch: {
    $route() {
      this.fetchData();
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    handleEdit({ mark, c_id, a_id }) {
      this.$router.push({
        path: mark === "category" ? "/category/edit" : "/article/edit",
        query: {
          id:  mark === "category" ? c_id : a_id
        }
      });
    },
    handleDelete(row) {
      this.$baseConfirm("你确定要删除当前项吗", null, () => {
          if (row.mark === "category") {
            doCategroyDelete({ id: row.c_id }).then((res) => {
              this.$baseMessage(res.msg, "success");
              this.fetchData();
            });
            return;
          }

          doArticleDelete({ id: row.a_id }).then((res) => {
              this.$baseMessage(res.msg, "success");
              this.fetchData();
              const { tree, treeNode, resolve } = this.maps.get(row.category_id); //根据cid取出对应的节点数据  
              this.$set(this.$refs.table.store.states.lazyTreeNodeMap, row.category_id, []); //将对应节点下的数据清空，从而实现数据的重新加载  
              this.load(tree, treeNode, resolve);
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
      getCategoryList(this.queryForm).then(({ data }) => {
        this.list = data.list.map(item => ({ ...item, mark: "category", c_id: item.id, hasChildren: true }));
        const imageList = [];
        data.list.forEach((item, index) => {
          imageList.push(item.cover);
        });
        this.imageList = imageList;
        this.total = data.total;
        this.listLoading = false;
      });
    },
    load(tree, treeNode, resolve) {
      this.maps.set(tree.c_id, { tree, treeNode, resolve });
      getArticleList({ currentPage: 1, pageSize: 30, category_id: tree.c_id }).then(({ data }) => {
        const list = data.list && data.list.filter(item => item.category_id === tree.c_id).map(item => ({ ...item, mark: "article", id: item.id * 1000, a_id: item.id }));

        resolve(list);
      });
    }
  },
};
</script>
