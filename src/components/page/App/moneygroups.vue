<template>
        <div class="table" v-loading="loading" element-loading-text="加载中">
            <div class="container">
                <div class="container-title">圈子管理</div>
                <el-table :data="tableData" border size="medium" ref="multipleTable" stripe>
                        <el-table-column prop="id" label="ID" align="center" width="100px"></el-table-column>
                    <!-- <el-table-column prop="admin_name" label="作者" align="center"></el-table-column> -->
                    <!-- <el-table-column prop="channel_name" label="渠道联系人" align="center"></el-table-column> -->
                    <!-- <el-table-column prop="preview_content" label="内容" align="center" :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                            <span v-html="scope.row.preview_content">{{scope.row.preview_content}}</span>
                    　　</template>
                    </el-table-column> -->
                    <el-table-column prop="u_id" label="用户id" align="center"></el-table-column>
                    <el-table-column prop="announcement" label="公告" align="center"></el-table-column>
                    <el-table-column prop="description" label="描述" align="center"></el-table-column>
                    <!-- <el-table-column prop="im_group_id" label="群租id" align="center"></el-table-column> -->
                    <el-table-column prop="name" label="名称" align="center"></el-table-column>
                    <el-table-column prop="nums" label="群人数" align="center"></el-table-column>
                    <el-table-column prop="upvote_nums" label="点赞人数" align="center"></el-table-column>
                    <el-table-column prop="create_time" label="创建时间" align="center"></el-table-column>
                    <el-table-column prop="status" label="状态" align="center">
                            <template slot-scope="scope">
                                <span  @click="handleStatus(scope.$index,scope.row)" style="width: 40px;height: 40px;">
                                    <i v-if="scope.row.status" class="el-icon-check"></i>
                                    <i v-if="!scope.row.status" class="el-icon-close"></i>
                                </span>
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
            // order用于排序
            getlistdata(){
                this.$get('make-money-groups').then((res) => {
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
                this.$put('make-money-groups/'+row.id, {
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
                this.$del('make-money-groups/'+scope.id, {
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
                this.$get('make-money-groups', {
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