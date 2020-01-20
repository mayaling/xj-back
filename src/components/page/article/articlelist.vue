<template>
    <div class="table" v-loading="loading" element-loading-text="加载中">
        <div class="container">
            <div class="container-title">文章列表</div>
            <div class="mgb20">
                <router-link target="_blank" :to="{path:'article'}"><el-button type="primary" style="margin-bottom:20px;float: left">+文章新增</el-button></router-link>
                <el-row style="float: right">
                    <el-col :span="8">
                        <el-input v-model="title" @change="search" placeholder="输入文章标题按回车键搜索" clearable="true" style="float: left"></el-input>
                    </el-col>
                    <el-col :span="8">
                        <el-select v-model="typename" placeholder="请选择类型" v-loadmore="loadMore" filterable  @change="search" clearable="true">
                            <template v-for="item in typedata">
                                <el-option :key="item.id" :label="item.at_name" :value="item.at_id"></el-option>
                            </template>
                        </el-select>
                    </el-col>
                    <el-col :span="8">
                        <el-select v-model="lable"  placeholder="请选择文章标签"  @change="search" clearable="true">
                            <el-option v-for="item in keywordsdata" :key="item.id" :label="item.name" :value="item.id" ></el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <!-- <el-row :gutter="20" style="float: right">
                    <el-col :span="7" offset="1">
                        <el-input v-model="nick_name" @change="search" placeholder="输入名称按回车键搜索" clearable="true"></el-input>
                    </el-col>
                 
                </el-row> -->
            </div>
            <el-table :data="tableData" border size="medium" ref="multipleTable" stripe>
                    <el-table-column prop="id" label="ID" align="center" width="100px"></el-table-column>
                <!-- <el-table-column prop="admin_name" label="作者" align="center"></el-table-column> -->
                <!-- <el-table-column prop="channel_name" label="渠道联系人" align="center"></el-table-column> -->
                <!-- <el-table-column prop="preview_content" label="内容" align="center" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span v-html="scope.row.preview_content">{{scope.row.preview_content}}</span>
                　　</template>
                </el-table-column> -->
                <el-table-column prop="title" label="标题" align="center"></el-table-column>
                <el-table-column prop="type_name" label="类型" align="center"></el-table-column>
                <el-table-column prop="origin" label="文章来源" align="center"></el-table-column>
                <el-table-column prop="create_time" label="创建时间" align="center"></el-table-column>
                <el-table-column prop="status" label="状态" align="center">
                        <template slot-scope="scope">
                            <span  @click="handleStatus(scope.$index,scope.row)" style="width: 40px;height: 40px;">
                                <i v-if="scope.row.status" class="el-icon-check"></i>
                                <i v-if="!scope.row.status" class="el-icon-close"></i>
                            </span>
                        </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="300">
                    <template slot-scope="scope">
                        <router-link target="_blank" :to="{path:'article',query:{id:scope.row.id}}">
                            <el-button size="mini" type="primary" icon="el-icon-plus">
                                编辑
                            </el-button>
                        </router-link>
                        <el-button size="mini" type="primary" icon="el-icon-edit"  @click=addcomment(scope,row)>
                            评论
                        </el-button>
                        <el-dialog title="添加评论" :visible.sync="dialogFormVisible" width="25%">
                            <el-form :model="form1">
                                <el-form-item label="用户ID" :label-width="formLabelWidth">
                                    <el-input v-model="form1.user_id" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="评论内容" :label-width="formLabelWidth">
                                        <el-input v-model="form1.content" autocomplete="off"></el-input>
                                    </el-form-item>
                            </el-form>
                            <div slot="footer" class="dialog-footer">
                                <el-button @click="dialogFormVisible = false">取 消</el-button>
                                <el-button type="primary" @click="checkcomment(scope,row)">确 定</el-button>
                            </div>
                        </el-dialog>
                        <!-- <el-button size="mini"  @click="handleEdit(scope.row)">删除</el-button> -->
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
        this.gettypedata()
        this.getkeywordsdata()
    },
    computed: {

    },
    methods: {
        getkeywordsdata(){
            this.$get('labels').then((res) => {
                console.log(res)
                if(res.code===1){
                    this.keywordsdata = res.info.items;
                    this.pages = res.info._meta.pageCount;
                }else{
                    this.$message.error('数据加载失败');
                }
                this.loading = false
            }).catch( () => {
                this.loading = false
            })
        },
        gettypedata(){
            this.$get('article-types?is_del=0').then((res) => {
                console.log(res)
                if(res.code===1){
                    this.typedata = res.info.items;
                    this.pages = res.info._meta.pageCount;
                }else{
                    this.$message.error('数据加载失败');
                }
                this.loading = false
            }).catch( () => {
                this.loading = false
            })
        },
        // 新增评论
        addcomment(scope,row){
          this.dialogFormVisible = true;
            this.article_id = scope.row.id
        },
        checkcomment(scope,row){
            console.log(scope.row.id)
            this.$post('article-comments', {
                user_id:this.form1.user_id,
                content:this.form1.content,
                article_id:this.article_id
                // status: row.status,
            }).then((res) => {
                // this.loading = false
                this.dialogFormVisible = false;
                // this.handleEdit()
                // this.getlistdata()
            }).catch(() => {
                this.loading = false
            })
        },
        // order用于排序
        getlistdata(){
            this.$get('articles?fields=title,admin_name,id,origin,type_name,create_time,status&sort=-id').then((res) => {
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
            this.$put('articles/'+row.id, {
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
            this.$del('articles/'+scope.id, {
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
            this.$get('articles?fields=title,admin_name,id,origin,type_name,create_time,status&sort=-id', {
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