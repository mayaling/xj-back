<template>
    <div class="table" v-loading="loading" element-loading-text="加载中">
        <div class="container">
            <div class="container-title">推送管理</div>
            <div class="mgb20">
                <router-link :to="{path:'editpush'}"><el-button type="primary">+新增推送</el-button></router-link>
            </div>
            <el-table :data="tableData" border size="medium" ref="multipleTable"  stripe>
                    <!-- <el-table-column prop="sort_num" label="排序" align="center"></el-table-column> -->
                    <el-table-column prop="id" label="ID" align="center"></el-table-column>
                    <el-table-column prop="desc" label="文案" align="center"></el-table-column>
                    <el-table-column prop="icon" label="icon" align="center">
                    　  <template slot-scope="scope">
                    　　　　<img :src="scope.row.icon" width="40" height="40" class="head_pic"/>
                    　　</template>
                    </el-table-column>
                    <el-table-column prop="url" label="链接" align="center"></el-table-column>
                <!-- <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.row)">删除</el-button>
                    </template>
                </el-table-column> -->
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
                this.$get('informs').then((res) => {
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
                this.$get('informs', {
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
                this.$get('informs', {
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
            openimg(){
                console.log(111)
            },
            handleEdit(scope,row){
                // console.log(scope)
                this.$del('informs/'+scope.id, {
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