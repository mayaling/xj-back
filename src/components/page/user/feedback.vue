<template>
        <div class="table" v-loading="loading" element-loading-text="加载中">
            <div class="container">
                <div class="container-title">反馈列表</div>
               
                <el-table :data="tableData" border size="medium" ref="multipleTable" stripe>
                    <el-table-column prop="id" label="ID" align="center" width="100px"></el-table-column>
                    <el-table-column prop="nick_name" label="昵称" align="center"></el-table-column>
                    <el-table-column prop="content" label="反馈内容" align="center"></el-table-column>
                    <el-table-column prop="mobile" label="手机" align="center"></el-table-column>
                    <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
                    <el-table-column prop="create_time" label="创建时间" align="center"></el-table-column>
                    <el-table-column label="操作" align="center" width="300">
                        <template slot-scope="scope">
                            <el-button size="mini"  @click="handleEdit(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column prop="date" label="日期" align="center"></el-table-column> -->
                </el-table>
    <div class="pagination">
    <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :page-count="pages">
    </el-pagination>
    </div>
    </div>
    </div>
    </template>
    
    
    <script>
    export default {
        name: 'teacher',
        data() {
            return {
                lable:"",
                keywordsdata:"",
                typename:"",
                typedata:"",
                title:"",
                dialogTableVisible: false,
                dialogFormVisible: false,
                value1: "",
                value2: "",
                tableData: [],
                cur_page: 1,
                pages: 0,
                name:"",
                s_student: '',
                s_school: '',
                s_grade: '',
                s_klass: '',
                status:"",
                // loading: true,
                region: "",
                region1: "",
                plusIcon: true,
                form1:{
                    user_id:"",
                    content:""
                },
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                article_id:"",
            }
        },
        created() {
            this.getlistdata()
        },
        computed: {
    
        },
        methods: {
            getlistdata(){
                this.$get('suggestions?sort=-id').then((res) => {
                    console.log(res)
                    if(res.code===1){
                        this.tableData = res.info.items;
                        this.pages = res.info._meta.pageCount;
                        console.log( this.tableData)
                    }else{
                        this.$message.error('数据加载失败');
                    }
                    this.loading = false
                }).catch( () => {
                    this.loading = false
                })
            },
            //  改变状态
            handleStatus(index,row){
                row.status = !row.status;
                if(row.status == false){
                    row.status = 0
                }else{
                    row.status = 1
                }
                this.$put('suggestions/'+row.id, {
                    status: row.status,
                }).then((res) => {
                    this.loading = false
                    this.search1()
                    // this.handleEdit()
                    // this.getlistdata()
                }).catch(() => {
                    this.loading = false
                })
            },
            // hidden作为删除
            handleEdit(scope,row){
                // console.log(scope)
                this.$del('suggestions/'+scope.id, {
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
            },
            // 分页导航
            handleCurrentChange(val) {
                this.loading = true
                this.$get('suggestions?sort=-id', {
                    page: val,
                    title: this.title?this.title:'',
                    type:this.typename?this.typename:"",
                    label_id:this.lable?this.lable:""
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
                this.$get('articles', {
                    title: this.title?this.title:'',
                    type:this.typename?this.typename:"",
                    label_id:this.lable?this.lable:""
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
            }
        }
    }
    </script>
    
    <style>
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
    .el-table .cell.el-tooltip  img{
        width: 50px!important;
        height: 50px!important;
    }
    </style>