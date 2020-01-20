<template>
        <div class="table" v-loading="loading" element-loading-text="加载中">
            <div class="container">
                <div class="container-title">类型管理</div>
                <div class="mgb20">
                    <router-link :to="{path:'edittype'}"><el-button type="primary">+新增类型</el-button></router-link>
                    <!-- <el-button size="mini" type="primary" icon="el-icon-plus" @click="addtype">
                        新增类型
                    </el-button> -->
                </div>
                <el-table :data="tableData" border size="medium" ref="multipleTable"  stripe>
                    <el-table-column prop="at_name" label="类型列表" align="center"></el-table-column>
                    <el-table-column prop="topic_des" label="描述" align="center"></el-table-column>
                    <el-table-column prop="weight" label="权重" align="center"></el-table-column>
                    <el-table-column prop="image" label="图片" align="center">
                    　  <template slot-scope="scope">
                    　　　　<img :src="scope.row.image" width="40" height="40" class="head_pic"/>
                    　　</template>
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <router-link :to="{path:'edittype',query:{id:scope.row.at_id}}">
                                <el-button size="mini" type="primary" icon="el-icon-edit">
                                   编辑
                                </el-button>
                            </router-link>
                            <!-- <el-button size="mini" type="primary" icon="el-icon-edit" @click="edittype(scope,row)"> 
                                编辑
                            </el-button> -->
                            <el-button size="mini" type="danger" icon="el-icon-delete" @click="handleEdit(scope.row)">删除</el-button>
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
                    this.$get('article-types?is_del=0').then((res) => {
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
                addtype(){
                    this.$prompt('请输入类型', '新增类型', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        }).then(({ value }) => {
                            this.$post('article-types', {
                                at_name: value,
                            }).then((res) => {
                                console.log(res)
                                if(res.code === 1){
                                    this.$message({
                                        message: res.message,
                                        type: 'success'
                                    });
                                    this.getlistdata()
                                }else{
                                    this.$message.error(res.message);
                                }
                            })
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '取消输入'
                            });       
                    });
                },
                edittype(scope,row){
                    console.log(scope.row.at_name)
                    this.id = scope.row.id
                    this.$prompt('修改类型', '类型编辑', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        }).then(({ value }) => {
                            this.$put('article-types', {
                                at_name: value,
                            }).then((res) => {
                                console.log(res)
                                if(res.code === 1){
                                    this.$message({
                                        message: res.message,
                                        type: 'success'
                                    });
                                    this.getlistdata()
                                }else{
                                    this.$message.error(res.message);
                                }
                            })
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '取消输入'
                            });       
                    });
                },
                // 分页导航
                handleCurrentChange(val) {
                    this.loading = true
                    this.$get('article-types?is_del=0', {
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
                handleEdit(scope,row){
                    // console.log(scope)
                    this.$del('article-types/'+scope.at_id, {
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