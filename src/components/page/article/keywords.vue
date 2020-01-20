<template>
        <div class="table" v-loading="loading" element-loading-text="加载中">
            <div class="container">
                <div class="container-title">标签管理</div>
                <div class="mgb20">
                    <router-link :to="{path:'editkeywords'}"><el-button type="primary">+新增标签</el-button></router-link>
                    <el-row :gutter="20" style="float: right">
                            <!-- <el-col :span="6">
                                    <el-select v-model="status" placeholder="请选择状态" @change="search1" clearable="true">
                                            <el-option label="已下架" value="0"></el-option>
                                            <el-option label="已上架" value="1"></el-option>
                                          </el-select>
                            </el-col> -->
                            <el-col :span="14">
                                    <el-input v-model.trim="p_keyword" placeholder="请输入关键字搜索" @change="search1" @keyup.enter.native="search" clearable="true"></el-input>
                            </el-col>
                            <el-col :span="6">
                                    <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
                            </el-col>
                          </el-row>
    
                </div>
                <el-table :data="tableData" border size="medium" ref="multipleTable"  stripe>
                    <el-table-column prop="name" label="标签列表" align="center"></el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <router-link :to="{path:'editkeywords',query:{id:scope.row.id}}">
                                <el-button size="mini">
                                   编辑
                                </el-button>
                            </router-link>
                            <el-button size="mini" @click="handleEdit(scope.row)">删除</el-button>
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
                    dialogVisible: false,
                    p_keyword:"",
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
                getlistdata(){
                    this.$get('labels').then((res) => {
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
                    this.$get('labels', {
                        page: val,
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
                    this.$get('labels', {
                        name:this.p_keyword?this.p_keyword:''
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
                    this.$get('labels', {
                        name:this.p_keyword?this.p_keyword:''
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
                handleEdit(scope,row){
                    // console.log(scope)
                    this.$del('labels/'+scope.id, {
                    }).then((res) => {
                        if (res.code === 1) {
                            this.$message({
                                message:"删除成功",
                                type: 'success'
                            });
                            this.getlistdata();
                        } else {
                            this.$message.error(res.message);
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