<template>
    <div class="table" v-loading="loading" element-loading-text="加载中">
        <div class="container">
            <div class="container-title">创业bang列表</div>
            <div class="mgb20">
                <router-link :to="{path:'editbang'}"><el-button type="primary">+新增bang</el-button></router-link>
                <!-- <el-button size="mini" type="primary" icon="el-icon-plus" @click="addtype">
                    新增类型
                </el-button> -->
            </div>
            <el-table :data="tableData" border size="medium" ref="multipleTable"  stripe>
                <!-- <el-table-column prop="background_image" label="创业背景图" align="center"></el-table-column> -->
                  <!-- <el-table-column prop="background_image" label="创业背景图" align="center">
                　  <template slot-scope="scope">
                　　　　<img :src="scope.row.background_image" width="40" height="40" class="head_pic"/>
                　　</template>
                </el-table-column> -->
                <el-table-column prop="city_name" label="城市" align="center"></el-table-column>
                <el-table-column prop="type_name" label="创业类型" align="center"></el-table-column>
                <el-table-column prop="area" label="领域" align="center"></el-table-column>
                <el-table-column prop="end_time" label="结束时间" align="center"></el-table-column>
                <el-table-column prop="description" label="描述" align="center"></el-table-column>
                <el-table-column label="是否私有" align="center">
                    <template slot-scope="{row}">
                        <el-tag :type="!row.is_pri | statusFilter">
                        {{ row.is_pri }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="pic_list" label="图片" >
                　  <template slot-scope="scope">
                　　　　<img v-for="(item,index) in scope.row.pic_list" :src="item" width="50" height="50" class="head_pic" style="padding:10px;cursor:pointer;" @click="lookbgimg(item,index)" />
                        <el-dialog title="图片" :visible.sync="dialogTableVisible" width="20%" style="margin-top: 15vh;">
                    　　　　<img :src="bigimg" style="width:100%;height:100%;" />
                        </el-dialog>
                　　</template>
                   
                </el-table-column> 
                
                <!-- <el-table-column prop="is_pri" label="状态" align="center">
                    <template slot-scope="scope">
                        <span  @click="handleStatus(scope.$index,scope.row)" style="width: 40px;height: 40px;">
                            <i v-if="scope.row.status" class="el-icon-check"></i>
                            <i v-if="!scope.row.status" class="el-icon-close"></i>
                        </span>
                    </template>
                </el-table-column> -->
                <!-- <el-table-column prop="pic_list" label="图片" align="center">
                　  <template slot-scope="scope">
                　　　　<img :src="scope.row.items" width="40" height="40" class="head_pic"/>
                　　</template>
                </el-table-column> -->
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <router-link :to="{path:'editbang',query:{id:scope.row.id}}">
                            <el-button size="mini" type="primary" icon="el-icon-edit">
                               编辑
                            </el-button>
                        </router-link>
                        <!-- <el-button size="mini" type="primary" icon="el-icon-edit" @click="edittype(scope,row)"> 
                            编辑
                        </el-button> -->
                        <el-button size="mini" type="danger" icon="el-icon-delete" @click="handleEdit(scope.row)">删除</el-button>
                        <!-- <template slot-scope="{row}">
                            <el-button v-if="row.is_pri!='1'" size="mini" type="success" @click="handleModifyStatus(row,'正常')">
                                正常
                            </el-button>
                            <el-button v-if="row.is_pri!='0'" size="mini" @click="handleModifyStatus(row,'发布仅自己可见')">
                            发布仅自己可见
                            </el-button>
                        </template>
                      -->
                        <!-- <el-button size="mini" type="success" icon="el-icon-view" @click="handlepri(scope.row)">私有</el-button> -->
                    </template>
                </el-table-column>
                <el-table-column label="私有设置" align="center" prop="is_pri" width="300">
                    <template slot-scope="{row}">
                        <el-button v-if="row.is_pri!='1'" size="mini"  icon="el-icon-view" type="success" @click="handleModifyStatus(row,'正常')" >
                            正常
                        </el-button>
                        <el-button v-if="row.is_pri!='0'" size="mini"  icon="el-icon-view" @click="handleModifyStatus(row,'私有')" >
                            私有
                        </el-button>
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
        filters: {
            statusFilter(is_pri) {
            const statusMap = {
                published: 'success',
                draft: 'info',
                deleted: 'danger'
            }
            return statusMap[is_pri]
            },
            typeFilter(type) {
            return calendarTypeKeyValue[type]
            }
        },
        data() {
            return {
                bigimg:"",
                dialogTableVisible:false,
                visible:false,
                dialogVisible: false,
                is_pri:"",
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
            lookbgimg(item,index){
                this.bigimg = item
                console.log(this.bigimg)
                this.dialogTableVisible = true
            },
            getlistdata(){
                this.$get('businesses').then((res) => {
                    console.log(res)
                    if(res.code===1){
                        this.tableData = res.info.items;
                        this.pages = res.info._meta.pageCount;
                        for (var i = 0; i < this.tableData.length; i++) {
                            if (this.tableData[i].is_pri == 0) {
                                this.tableData[i].is_pri = '正常'
                            } else{
                                this.tableData[i].is_pri = '私有'
                            }
                        }
                      
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
                this.$get('businesses', {
                    page: val,
                }).then((res) => {
                    if (res.code === 1) {
                        this.tableData = JSON.parse(JSON.stringify(res.info.items))
                        this.pages = res.info._meta.pageCount;
                        for (var i = 0; i < this.tableData.length; i++) {
                            if (this.tableData[i].is_pri == 0) {
                                this.tableData[i].is_pri = '正常'
                            } else{
                                this.tableData[i].is_pri = '私有'
                            }
                        }
                    } else {
                        this.$message.error('数据加载失败');
                    }
                    this.loading = false
                }).catch(() => {
                    this.loading = false
                })
            },
            handleEdit(scope,row){
                console.log(scope)
                this.$del('businesses/'+scope.id, {
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
            handlepri(scope,row){
                this.$confirm('是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        this.$post('business/set-private', {
                            id:scope.id,
                            is_pri:scope.is_pri
                        }).then((res) => {
                            if (res.code === 1) {
                                this.$message({
                                    message:"成功",
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
                    }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消私有'
                    });          
                });
               
            },
            handleModifyStatus(row, is_pri) {
                console.log(row)
                row.is_pri = is_pri
                if(row.is_pri==='正常') {
                    this.is_pri = 0
                }else{
                    this.is_pri = 1
                }
                this.$confirm('是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        this.$post('business/set-private', {
                            id:row.id,
                            is_pri:this.is_pri
                        }).then((res) => {
                            if (res.code === 1) {
                                this.$message({
                                    message:"设置成功",
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
                    }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消设置'
                    });          
                });
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