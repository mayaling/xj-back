<template>
        <div class="table" v-loading="loading" element-loading-text="加载中">
            <div class="container">
                <div class="container-title">电台列表</div>
                <div class="mgb20">
                    <router-link :to="{path:'addaudio'}" target="_blank"><el-button type="primary" >+新增电台</el-button></router-link>
                </div>
                <el-table :data="tableData" border size="medium" ref="multipleTable"  stripe>
                        <el-table-column prop="id" label="电台id" align="center"></el-table-column>
                        <!-- <el-table-column prop="origin" label="来源" align="center"></el-table-column> -->
                        <el-table-column prop="title" label="标题" align="center"></el-table-column>
                        <el-table-column prop="desc" label="描述" align="center"></el-table-column>
                        <el-table-column prop="radio_url" label="电台链接" align="center"></el-table-column>
                        <el-table-column prop="preview_image" label="封面图片" align="center">
                        　<template slot-scope="scope">
                        　　　　<img :src="scope.row.preview_image" width="40" height="40" class="head_pic"/>
                        　　</template>
                        </el-table-column>
                    <el-table-column prop="status" label="状态" align="center">
                            <template slot-scope="scope">
                                <span  @click="handleStatus(scope.$index,scope.row)" style="width: 40px;height: 40px;">
                                    <i v-if="scope.row.status" class="el-icon-check"></i>
                                    <i v-if="!scope.row.status" class="el-icon-close"></i>
                                </span>
                            </template>
                    </el-table-column>
                    <!-- <el-table-column prop="del" label="状态" align="center">
                            <template slot-scope="scope">
                                <span  @click="handleStatus(scope.$index,scope.row)" style="width: 40px;height: 40px;">
                                    <i v-if="scope.row.del" class="el-icon-check"></i>
                                    <i v-if="!scope.row.del" class="el-icon-close"></i>
                                </span>
                            </template>
                    </el-table-column> -->
                    <el-table-column label="操作" align="center" width=400>
                        <template slot-scope="scope">
                            <router-link :to="{path:'addaudio',query:{id:scope.row.id}}" target="_blank">
                                <el-button size="mini">
                                    编辑
                                </el-button>
                            </router-link>
                            <router-link :to="{path:'editaudio',query:{id:scope.row.id,music:scope.row.radio_url}}" target="_blank">
                                <el-button size="mini">
                                   编辑时间轴
                                </el-button>
                            </router-link>
                            <el-button size="mini" type="primary" icon="el-icon-edit"  @click=addcomment(scope,row)>
                                评论
                            </el-button>
                            <el-dialog title="添加评论" :visible.sync="dialogFormVisible" width="25%" :close-on-click-modal="false"  @close='closeDialog'>
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
                            <!-- <el-button size="mini" @click="handleEdit(scope.row)">删除</el-button> -->
                        </template>
                    </el-table-column>
                </el-table>
    <div class="pagination">
        <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :page-count="pages"   :page-size="10">
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
                    dialogFormVisible: false,
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
                    // pageSizes:10,
                    // 默认每页显示的条数（可修改）
                    PageSize:10,
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
                    form1:{
                        user_id:"",
                        content:""
                    },
                    radio_id:"",

                }
            },
            created() {
                this.getlistdata()
            },
            computed: {
    
            },
            methods: {
                getlistdata(){
                    this.$get('radios?per-page=10').then((res) => {
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
                  //  改变状态
                handleStatus(index,row){
                    row.status = !row.status;
                    if(row.status == false){
                        row.status = 0
                    }else{
                        row.status = 1
                    }
                    this.$put('radios/'+row.id, {
                        status: row.status,
                    }).then((res) => {
                        this.loading = false
                        // this.search1()
                        // this.handleEdit()
                        // this.getlistdata()
                    }).catch(() => {
                        this.loading = false
                    })
                },
                // 分页导航
                handleCurrentChange(val) {
                    this.loading = true
                    this.$get('radios?per-page=10', {
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
                    this.$get('radios', {
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
                    this.$del('radios/'+scope.id, {
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
                },
                // 新增评论
                addcomment(scope,row){
                    this.dialogFormVisible = true;
                    this.radio_id = scope.row.id
                },
                checkcomment(scope,row){
                    console.log(scope.row.id)
                    this.$post('radio-comments', {
                        user_id:this.form1.user_id,
                        content:this.form1.content,
                        radio_id:this.radio_id
                        // status: row.status,
                    }).then((res) => {
                        // this.loading = false
                        this.dialogFormVisible = false;
                        if(res.code === 1){
                            this.$message({
                                message:"添加成功",
                                type: 'success'
                            });
                        }
                        // this.handleEdit()
                        // this.getlistdata()
                    }).catch(() => {
                        this.loading = false
                    })
                },
                closeDialog(){
                   this.form1 = {}
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