<template>
    <div class="table" v-loading="loading" element-loading-text="加载中">
        <div class="container">
            <div class="container-title">APP点击统计</div>
            <!-- <div class="mbg20">
                <el-row :gutter="40" class="panel-group">
                    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
                          <div class="card-panel-icon-wrapper icon-people">
                            </div>
                        <div class="card-panel-description">
                            <div class="card-panel-text">
                                总用户人数
                            </div>
                            <div class="card-panel-text">
                                {{listdata.article}}
                              </div>
                        </div>

                      </div>
                    </el-col>
                    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                      <div class="card-panel" @click="handleSetLineChartData('messages')">
                        <div class="card-panel-icon-wrapper icon-message">
                        </div>
                        <div class="card-panel-description">
                            <div class="card-panel-text">
                                今日新增用户数
                            </div>
                            <div class="card-panel-text">
                              {{listdata.business}}
                            </div>
                        </div>
                      </div>
                    </el-col>
                    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                      <div class="card-panel" @click="handleSetLineChartData('purchases')">
                        <div class="card-panel-icon-wrapper icon-money">
                        </div>
                        <div class="card-panel-description">
                            <div class="card-panel-text">
                                今日产品UV
                            </div>
                            <div class="card-panel-text">
                              {{listdata.make_money_group}}
                            </div>
                        </div>
                      </div>
                    </el-col>
                    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
                        <div class="card-panel-icon-wrapper icon-shopping">
                        </div>
                        <div class="card-panel-description">
                            <div class="card-panel-text">
                                新客UV
                            </div>
                            <div class="card-panel-text">
                              {{listdata.radio}}
                            </div>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
            </div> -->


            <div>
                <el-row>
                    <el-col :span="12">
                        <div style="display: flex;justify-content: flex-start;margin-bottom: 20px;">
                            <el-badge :value="listdata.article" class="item" style="margin-right: 50px;;">
                                <el-button size="medium">文章</el-button>
                              </el-badge>
                              <el-badge :value="listdata.business" class="item" style="margin-right: 50px;;">
                                <el-button size="medium">创业bang</el-button>
                              </el-badge>
                              <el-badge :value="listdata.radio" class="item" type="primary" style="margin-right: 50px;;">
                                <el-button size="medium">电台</el-button>
                              </el-badge>
                              <el-badge :value="listdata.make_money_group" class="item" type="warning" style="margin-right: 50px;;">
                                <el-button size="medium">赚钱圈</el-button>
                              </el-badge>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <el-row >
                            <el-col :span="6">
                                <div class="block">
                                    <el-date-picker
                                      v-model="month"
                                      type="month"
                                      placeholder="请选择月份" @change="search()"  value-format="yyyy-MM">
                                    </el-date-picker>
                                  </div>
                            </el-col>
                            <el-col :span="6">
                                <div class="block">
                                    <el-date-picker
                                      v-model="date"
                                      type="date"
                                      placeholder="选择日期" @change="search()"  value-format="yyyy-MM-dd">
                                    </el-date-picker>
                                  </div>
                            </el-col>
                            <el-col :span="6">
                                <el-select v-model="type" clearable placeholder="请选择"  @change="search()">
                                    <el-option
                                      v-for="item in options"
                                      :key="item.value"
                                      :label="item.label"
                                      :value="item.value">
                                    </el-option>
                                  </el-select>
                            </el-col>
                            <el-col :span="6"></el-col>
                          </el-row>
                    </el-col>
                  </el-row>
            </div>
            <!-- <div style="display: flex;justify-content: flex-start;margin-bottom: 20px;">
                <el-badge :value="listdata.article" class="item" style="margin-right: 50px;;">
                    <el-button size="medium">文章</el-button>
                  </el-badge>
                  <el-badge :value="listdata.business" class="item" style="margin-right: 50px;;">
                    <el-button size="medium">创业bang</el-button>
                  </el-badge>
                  <el-badge :value="listdata.radio" class="item" type="primary" style="margin-right: 50px;;">
                    <el-button size="medium">电台</el-button>
                  </el-badge>
                  <el-badge :value="listdata.make_money_group" class="item" type="warning" style="margin-right: 50px;;">
                    <el-button size="medium">赚钱圈</el-button>
                  </el-badge>
            </div> -->
            <!-- <div class="mgb20">

                <el-row >
                    <el-col :span="6">
                        <div class="block">
                            <el-date-picker
                              v-model="value4"
                              type="month"
                              placeholder="请选择月份">
                            </el-date-picker>
                          </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="block">
                            <el-date-picker
                              v-model="value1"
                              type="date"
                              placeholder="选择日期">
                            </el-date-picker>
                          </div>
                    </el-col>
                    <el-col :span="6"></el-col>
                    <el-col :span="6"></el-col>
                  </el-row>
            </div> -->
            <el-table :data="tableData" border size="medium" ref="multipleTable"  stripe>
                <el-table-column prop="id" label="id" align="center"></el-table-column>
                <el-table-column prop="article" label="文章" align="center"></el-table-column>
                <el-table-column prop="business" label="创业bang" align="center"></el-table-column>
                <el-table-column prop="make_money_group" label="赚钱圈" align="center"></el-table-column>
                <el-table-column prop="radio" label="电台" align="center"></el-table-column>
                <el-table-column prop="time" label="时间" align="center"></el-table-column>

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
                options: [{
                value: '0',
                label: '未去重'
                }, {
                value: '1',
                label: '已去重'
                }],
                type:"",
                month:"",
                date:"",
                dialogVisible: false,
                p_name:"",
                status:"",
                value1: "",
                value2: "",
                tableData: [],
                listdata:"",

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
                this.$get('click-statistics/get-data?type=0').then((res) => {
                    console.log(res)
                    if(res.code===1){
                        this.tableData = res.info.items;
                        this.listdata = res.info.extra[0]
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
                this.$put('click-statistics/get-data?type=0 /'+row.id, {
                    status: row.status,
                    time:this.month?this.month:this.date
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
                this.$get('click-statistics/get-data?type=0', {
                    page: val,
                    time:this.month?this.month:this.date,
                    type:this.type?this.type:""
                }).then((res) => {
                    if (res.code === 1) {
                        this.tableData = JSON.parse(JSON.stringify(res.info.items))
                        this.listdata = res.info.extra[0]
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
                this.$get('click-statistics/get-data', {
                    time:this.month?this.month:this.date,
                    type:this.type?this.type:""
                }).then((res) => {
                    if (res.code === 1) {
                        this.tableData = JSON.parse(JSON.stringify(res.info.items))
                        this.listdata = res.info.extra[0]
                        this.pages = res.info._meta.pageCount;
                    } else {
                        this.$message.error('数据加载失败');
                    }
                    this.loading = false
                }).catch(() => {
                    this.loading = false
                })
            },
            search1() {
                this.loading = true
                this.$get('click-statistics/get-data?type=0', {
                    time:this.date
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
            search2() {
                this.loading = true
                this.$get('click-statistics/get-data', {
                    type:this.type
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
                this.$del('click-statistics/get-data?type=0/'+scope.id, {
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
