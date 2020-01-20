<template>
    <div class="table" v-loading="loading" element-loading-text="加载中">
        <div class="container">
            <div class="container-title">文章列表</div>
            <div class="mgb20">

                <router-link :to="{path:'article'}"><el-button type="primary" style="margin-bottom:20px;float: left">+文章新增</el-button></router-link>
                <el-input v-model="title" @change="search" placeholder="输入文章名称按回车键搜索" clearable="true" style="float: left"></el-input>
                   <el-row :gutter="20" style="float: right"></el-row>
                <!-- <el-row :gutter="20" style="float: right">
                    <el-col :span="7" offset="1">
                        <el-input v-model="nick_name" @change="search" placeholder="输入名称按回车键搜索" clearable="true"></el-input>
                    </el-col>
                 
                </el-row> -->
            </div>
            <el-table :data="tableData" border size="medium" ref="multipleTable" stripe>
                    <el-table-column prop="id" label="ID" align="center" width="100px"></el-table-column>
                <el-table-column prop="admin_name" label="作者" align="center"></el-table-column>
                <!-- <el-table-column prop="channel_name" label="渠道联系人" align="center"></el-table-column> -->
                <!-- <el-table-column prop="preview_content" label="内容" align="center" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span v-html="scope.row.preview_content">{{scope.row.preview_content}}</span>
                　　</template>
                </el-table-column> -->
                <el-table-column prop="title" label="标题" align="center"></el-table-column>
                <el-table-column prop="type" label="类型" align="center"></el-table-column>
                <el-table-column prop="origin" label="文章来源" align="center"></el-table-column>
                <el-table-column prop="create_time" label="创建时间" align="center"></el-table-column>
                <el-table-column label="操作" align="center" width="300">
                    <template slot-scope="scope">
                        <router-link :to="{path:'article',query:{id:scope.row.id}}">
                            <el-button size="mini">
                                编辑
                            </el-button>
                        </router-link>
                        <el-button size="mini"  @click="handleEdit(scope.row)">删除</el-button>
                        <router-link target="_blank" :to="{path:'/preview',query:{id:scope.row.id}}">
                            <!-- <el-button size="mini">
                                    预览
                                </el-button> -->
                        </router-link>
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
            this.$get('articles?fields=title,admin_name,id,origin,type,create_time&status=1&sort=-id').then((res) => {
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
            this.$get('articles?fields=title,admin_name,id,origin,type,create_time&status=1&sort=-id', {
                page: val,
                title: this.title?this.title:'',
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