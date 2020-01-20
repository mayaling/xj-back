<template>
    <div class="table" v-loading="loading" element-loading-text="加载中">
        <div class="container">
            <div class="container-title">产品每日统计</div>
            <div class="mgb20">
                          <router-link :to="{path:'Dashboard'}"><el-button type="primary">查看今日实时</el-button></router-link>
                          <router-link :to="{path:'channeldaylog'}"><el-button type="primary">查看过往数据</el-button></router-link>
                          <!-- <el-button type="primary" icon="el-icon-search"  @click="search()" style="float:right;margin-left: 20px;">搜索</el-button> -->

                          <!-- <el-date-picker v-model="time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"  format="yyyy 年 MM 月 dd 日"
                          value-format="yyyy-MM-dd" @change="search"></el-date-picker>
                          <el-row :gutter="20" style="float: right">
                                <el-col :span="6">
                                       
                                </el-col>
                             
                                <el-col :span="6">
                                </el-col>
                              </el-row> -->
                </div>
            <el-table :data="tableData" border size="medium" ref="multipleTable" stripe>
                    <el-table-column prop="product_id" label="ID" align="center" width="50"></el-table-column>
                    <el-table-column prop="product_name" label="产品名称" align="center"></el-table-column>
                    <el-table-column label="UV" align="center">
                            <el-table-column prop="uv" label="注册按钮点击UV" align="center"></el-table-column>
                            <el-table-column prop="uv_total" label="注册按钮点击累积UV" align="center"></el-table-column>
                    </el-table-column>
                    <el-table-column label="PV" align="center">
                            <el-table-column prop="pv" label="注册按钮点击PV" align="center"></el-table-column>
                            <el-table-column prop="pv_total" label="注册按钮点击累积PV" align="center"></el-table-column>
                    </el-table-column>
                <el-table-column prop="date" label="日期" align="center"></el-table-column>
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
        getlistdata(){
            this.$get('product/day-list?sort=-id').then((res) => {
                console.log(res)
                if(res.code===1){
                    this.tableData = res.info.items;
                    console.log( this.tableData)
                }else{
                    this.$message.error('数据加载失败');
                }
                this.loading = false
            }).catch( () => {
                this.loading = false
            })
        },
        open() {
            this.$prompt('请输入充值金额', '', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            // inputPattern: /[1-9]+[0-9]*/,
            // inputErrorMessage: '充值金额格式不正确'
            }).then(({ value }) => {

                // 发送请求到后台充值

            // this.$message({
            //     type: 'success',
            //     message: '你的邮箱是: ' + value
            // });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消输入'
                });       
            });
        },
        handleCheck(index, row) {
            row.hot = !row.hot;
            if(row.hot == false){
                row.hot = 0
            }else{
                row.hot = 1
            }
            this.$put('products/'+row.id, {
                hot: row.hot,
            }).then((res) => {
                this.loading = false
            }).catch(() => {
                this.loading = false
            })
        },
        handleStatus(index,row){
            row.status = !row.status;

            if(row.status == false){
                row.status = 0
            }else{
                row.status = 1
            }
            this.$put('products/'+row.id, {
                status: row.status,
            }).then((res) => {
                this.loading = false
            }).catch(() => {
                this.loading = false
            })
        },
        // 分页导航
        handleCurrentChange(val) {
            this.loading = true
            this.$get('students', {
                pageNum: val,
                studentName: this.s_student
            }).then((res) => {
                if (res.code === 0) {
                    this.tableData = JSON.parse(JSON.stringify(res.list))
                    this.pages = res.pages;
                    for (var i = 0; i < this.tableData.length; i++) {
                        if (this.tableData[i].sex) {
                            this.tableData[i].sex = '女'
                        } else {
                            this.tableData[i].sex = '男'
                        }
                    }
                } else {
                    this.$message.error('学生加载失败');
                }
                this.loading = false
            }).catch(() => {
                this.loading = false
            })
        },

        // 搜索
        search() {
            this.loading = true
            this.$get('products', {
                status: this.status?this.status:'',
                name:this.name?this.name:''
            }).then((res) => {
                if (res.code === 1) {
                    this.tableData = JSON.parse(JSON.stringify(res.info.items))
                    // for (var i = 0; i < this.tableData.length; i++) {
                    //     if (this.tableData[i].sex) {
                    //         this.tableData[i].sex = '女'
                    //     } else {
                    //         this.tableData[i].sex = '男'
                    //     }
                    // }
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