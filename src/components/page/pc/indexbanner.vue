<template>
        <div class="table" v-loading="loading" element-loading-text="加载中">
            <div class="container">
                <div class="container-title">首页banner管理</div>
                <!-- <div class="mgb20">
                    <router-link :to="{path:'editindexbanner'}"><el-button type="primary">+新增banner</el-button></router-link>
                </div> -->
                <el-table :data="tableData" border size="medium" ref="multipleTable"  stripe>
                    <el-table-column prop="index_banner_one" label="banner图1" align="center">
                    　  <template slot-scope="scope">
                    　　　　<img :src="scope.row.index_banner_one" width="40" height="40" class="head_pic"/>
                    　　</template>
                    </el-table-column>
                    <el-table-column prop="index_banner_two" label="banner图2" align="center">
                    　  <template slot-scope="scope">
                    　　　　<img :src="scope.row.index_banner_two" width="40" height="40" class="head_pic"/>
                    　　</template>
                    </el-table-column>
                    <el-table-column prop="index_banner_three" label="banner图3" align="center">
                        　  <template slot-scope="scope">
                        　　　　<img :src="scope.row.index_banner_three" width="40" height="40" class="head_pic"/>
                        　　</template>
                        </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <router-link :to="{path:'editindexbanner'}">
                                <el-button size="mini">
                                   编辑
                                </el-button>
                            </router-link>
                            <!-- <el-button size="mini" @click="handleEdit(scope.row)">删除</el-button> -->
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
                }
            },
            created() {
                this.getlistdata()
            },
            computed: {
    
            },
            methods: {
                getlistdata(){
                    this.$get('index-settings').then((res) => {
                        console.log(res)
                        if(res.code===1){
                            this.tableData.push(res.info);
                            console.log(this.tableData)
                        }else{
                            this.$message.error('数据加载失败');
                        }
                        this.loading = false
                    }).catch( () => {
                        this.loading = false
                    })
                }, 
                openimg(){
                    console.log(111)
                },
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