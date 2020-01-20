<template>
    <div class="table" v-loading="loading" element-loading-text="加载中">
     我是首页
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
        // this.getlistdata()
     
    },
    computed: {

    },
    methods: {
        getlistdata(){
            this.$get('product/today-list?sort=-id').then((res) => {
                console.log(res)
                if(res.code===1){
                    this.tableData = res.info;
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