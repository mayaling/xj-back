<template>
    <div class="table" v-loading="loading" element-loading-text="加载中">
        <div class="container">
            <div class="container-title">评论列表</div>
            <!-- <div class="mgb20">
                <router-link :to="{path:'addcanal'}"><el-button type="primary">+新增评论</el-button></router-link>
                <el-row :gutter="20" style="float: right">
                        <el-col :span="6">
                                <el-select v-model="status" placeholder="请选择状态" @change="search1" clearable="true">
                                        <el-option label="已下架" value="0"></el-option>
                                        <el-option label="已上架" value="1"></el-option>
                                      </el-select>
                        </el-col>
                        <el-col :span="6">
                                <el-input v-model.trim="p_name" placeholder="请输入名称" @change="search1" @keyup.enter.native="search" clearable="true"></el-input>
                        </el-col>
                        <el-col :span="6">
                                <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
                        </el-col>
                      </el-row>

            </div> -->
            <el-table :data="tableData" border size="medium" ref="multipleTable"  stripe>
                <el-table-column prop="nick_name" label="评论用户" align="center"></el-table-column>
                <el-table-column prop="content" label="评论内容" align="center"></el-table-column>
                <el-table-column prop="radio_name" label="所属电台" align="center"></el-table-column>
                <el-table-column prop="create_time" label="创建时间" align="center"></el-table-column> -->
                <el-table-column prop="del" label="状态" align="center">
                        <template slot-scope="scope">
                            <span  @click="handleStatus(scope.$index,scope.row)" style="width: 40px;height: 40px;">
                                <i v-if="!scope.row.del" class="el-icon-check"></i>
                                <i v-if="scope.row.del" class="el-icon-close"></i>
                            </span>
                        </template>
                </el-table-column>
                <!-- <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" @click="checkdetail(scope,row)">点击查看评论详情</el-button>
                     
                        <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
                            <el-table :data="commentdetaildata">
                                <el-table-column property="date" label="日期" width="150"></el-table-column>
                                <el-table-column property="name" label="姓名" width="200"></el-table-column>
                                <el-table-column property="address" label="地址"></el-table-column>
                            </el-table>
                        </el-dialog>
                    </template>
                  
                </el-table-column> -->
                <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" @click="checkdetail(scope,row)">点击查看评论详情</el-button>
                            <el-dialog title="评论详情" :visible.sync="dialogTableVisible">
                                <el-row :gutter="20" style="margin-bottom: 20px;" class="showtable">
                                    <el-col :span="8">
                                        <el-card shadow="hover">
                                          评论人: <span>{{commentdata.from_name}}</span>
                                        </el-card>
                                    </el-col>
                                    <el-col :span="16">
                                      <el-card shadow="hover">
                                          评论内容:<span>{{commentdata.content}}</span>
                                      </el-card>
                                    </el-col>
                                  </el-row>
                                  <template v-for="item in commentdetaildata">
                                    <el-row :gutter="20" style="margin-bottom: 20px;" class="showtable">
                                        <el-col :span="8">
                                            <el-card shadow="hover">
                                              <span> {{item.from_name}}</span>
                                              评论了
                                              <span> {{item.to_name}}</span>
                                            </el-card>
                                        </el-col>
                                        <el-col :span="16">
                                          <el-card shadow="hover">
                                              评论内容: <span>{{item.content}}</span>
                                          </el-card>
                                        </el-col>
                                      </el-row>
                                  </template>
                            </el-dialog>
                        </template>
                      
                    </el-table-column>
            </el-table>
<div class="pagination">
    <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :page-count="pages">
    </el-pagination>
</div>
</div>
</div>
</template>


<script>
// import VueClipboard from 'vue-clipboard2'

    export default {
        name: 'teacher',
        data() {
            return {
                commentdata:"",
                commentdetaildata:"",
                commentdetaildata:"",
                dialogTableVisible: false,
                p_name:"",
                status:"",
                value1: "",
                value2: "",
                tableData: [],

                 // 默认显示第几页
                 currentPage:1,
                // 总条数，根据接口获取数据长度(注意：这里不能为空)
                totalCount:1,
                // 个数选择器（可修改）
                pageSizes:[3,5,10,20],
                // 默认每页显示的条数（可修改）
                PageSize:5,
                cur_page: 1,
                channelurl:"c.sshua.com",
                pages: 0,
                s_student: '',
                s_school: '',
                s_grade: '',
                s_klass: '',
                // loading: true,
                region: "",
                region1: "",
                tableData:"",
            }
        },
        created() {
            this.getlistdata()
        },
        computed: {

        },
        methods: {
            checkdetail(scope,row){
                this.dialogTableVisible = true;
                this.$get('radio-comments/'+scope.row.id).then((res) => {
                    console.log(res)
                
                    if(res.code===1){
                        this.commentdetaildata = res.info.list
                        this.commentdata = res.info.info
                        // this.tableData = res.info.items;
                        // this.pages = res.info._meta.pageCount;
                    }else{
                        this.$message.error('数据加载失败');
                    }
                    this.loading = false
                }).catch( () => {
                    this.loading = false
                })
            },
            getcommentdetaildata(scope,row){
                this.$get('radio-comments/:'+scope.id).then((res) => {
                    console.log(res)
                //     if(res.code===1){
                //         this.tableData = res.info.items;
                //         this.pages = res.info._meta.pageCount;
                //     }else{
                //         this.$message.error('数据加载失败');
                //     }
                //     this.loading = false
                // }).catch( () => {
                //     this.loading = false
                })
            },
            getlistdata(){
                this.$get('radio-comments?sort=-id&is_child=0').then((res) => {
                    console.log(res)
                    if(res.code===1){
                        this.tableData = res.info.items;
                        this.pages = res.info._meta.pageCount;
                    }else{
                        this.$message.error('数据加载失败');
                    }
                    this.loading = false
                }).catch( () => {
                    this.loading = false
                })
            }, 
            // 分页导航
            handleCurrentChange(val) {
                this.loading = true
                this.$get('radio-comments?sort=-id&is_child=0', {
                    page: val,
                    status: this.status?this.status:'',
                    name:this.p_name?this.p_name:''
                }).then((res) => {
                    if (res.code === 1) {
                        this.tableData = JSON.parse(JSON.stringify(res.info.items))
                        this.pages = res.info._meta.pageCount;
                    } else {
                        this.$message.error('数据加载失败');
                    }
                    this.loading = false
                }).catch(() => {
                    this.loading = false
                })
            },

            // 搜索
            search() {
                this.loading = true
                this.$get('radio-comments?sort=-id&is_child=0', {
                    status: this.status?this.status:'',
                    name:this.p_name?this.p_name:''
                }).then((res) => {
                    if (res.code === 1) {
                        this.tableData = JSON.parse(JSON.stringify(res.info.items))
                        this.pages = res.info._meta.pageCount;
                    } else {
                        this.$message.error('数据加载失败');
                    }
                    this.loading = false
                }).catch(() => {
                    this.loading = false
                })
            },
            search1() {
                this.loading = true
                this.$get('radio-comments?sort=-id&is_child=0', {
                    status: this.status?this.status:'1',
                    name:this.p_name?this.p_name:''
                }).then((res) => {
                    if (res.code === 1) {
                        this.tableData = JSON.parse(JSON.stringify(res.info.items))
                        this.pages = res.info._meta.pageCount;
                    } else {
                        this.$message.error('数据加载失败');
                    }
                    this.loading = false
                }).catch(() => {
                    this.loading = false
                })
            },
             onCopy(e) {
                 this.$message({
                    message:"复制链接成功",
                    type: 'success'
                });
            },
            onError(e) {
                console.log(e);
            },
            copy(){
                var clipboard = new Clipboard('.tag-read')
                clipboard.on('success', e => {
                  console.log('复制成功')
                  // 释放内存
                  clipboard.destroy()
                })
                clipboard.on('error', e => {
                  // 不支持复制
                  console.log('该浏览器不支持自动复制')
                  // 释放内存
                  clipboard.destroy()
                })
            },
            openimg(){
                console.log(111)
            },
            handleStatus(index,row){
                row.del = !row.del;
                if(row.del == false){
                    row.del = 0
                }else{
                    row.del = 1
                }
                this.$put('radio-comments/'+row.id, {
                    del: row.del,
                }).then((res) => {
                    this.loading = false
                    this.search1()
                    // this.handleEdit()
                    // this.getlistdata()
                }).catch(() => {
                    this.loading = false
                })
            },
            handleEdit(scope,row){
                // console.log(scope)
                this.$del('article-comments?sort=-id&is_child=0/'+scope.id, {
                }).then((res) => {
                    if (res.code === 1) {
                        this.$message({
                            message:"删除成功",
                            type: 'success'
                        });
                        this.getlistdata();
                    } else {
                        this.$message.error('数据加载失败');
                    }
                    this.loading = false
                }).catch(() => {
                    this.loading = false
                })
            }
        }
    }
</script>

<style scoped>
.el-icon-check{
    color:#1f9e27;
    font-weight:800;
    font-size:1.5rem;
}
.el-icon-close{
    color:#d81e06;
    font-weight:800;
    font-size:1.5rem;
}
</style>