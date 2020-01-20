<template>
  <div class="table" v-loading="loading" element-loading-text="加载中">
      <div class="container">
          <div class="container-title">犀金用户列表</div>
          <div class="mgb20">
              <!-- <el-button type="primary" icon="el-icon-search">导出</el-button> -->
              <el-row style="float: left;margin-bottom:20px;">
                      <!-- <el-col :span="3">
                          <el-select v-model="channel" placeholder="渠道" @change="search" clearable="true" >
                              <template  v-for="item in channeldata">
                                  <el-option :label="item.name" :value="item.id"></el-option>
                              </template>
                          </el-select>
                      </el-col> -->
                      <el-col :span="6" offset="1">
                              <el-select v-model="status" placeholder="用户状态" @change="search" clearable="true">
                                  <el-option label="正常" value="1"></el-option>
                                  <el-option label="仅自己可见" value="2"></el-option>
                                  <el-option label="禁用" value="0"></el-option>
                              </el-select>
                          </el-col>
                          <el-col :span="6" offset="1">
                              <el-input v-model="nick_name" @change="search" placeholder="输入名称按回车键搜索" clearable="true"></el-input>
                            </el-col>
                          <!-- <el-col :span="3" offset="1"><el-input v-model.trim="p_phone" placeholder="用户手机号" @change="search" @keyup.enter.native="search"  clearable="true"></el-input></el-col> -->
                          <el-col :span="8" offset="1">
                                  <el-date-picker v-model="time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"  format="yyyy 年 MM 月 dd 日"
                                  value-format="yyyy-MM-dd" @change="search"></el-date-picker>
                              </el-col>
                      <!-- <el-col :span="2" offset="1"><el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button></el-col> -->

                  </el-row>
          </div>
          <el-table :data="tableData" border size="medium" ref="multipleTable">
              <el-table-column prop="id" label="用户ID" align="center"></el-table-column>
              <el-table-column prop="nick_name" label="用户名" align="center" ></el-table-column>
              <el-table-column prop="mobile" label="手机号" align="center" ></el-table-column>
              <el-table-column prop="active" label="是否激活" align="center"></el-table-column>
              <!-- <el-table-column prop="active_time" label="激活时间" align="center"></el-table-column> -->
              <el-table-column prop="register_time" label="注册时间" align="center"></el-table-column>
              <el-table-column prop="last_login_time" label="最近打开时间" align="center" ></el-table-column>
              <!-- <el-table-column prop="device_id" label="设备号" align="center"></el-table-column> -->
              <!-- <el-table-column prop="" label="版本号" align="center"></el-table-column> -->
              <el-table-column prop="os" label="设备系统" align="center"></el-table-column>

              <!-- <el-table-column prop="channel_name" label="渠道" align="center"></el-table-column> -->
              <el-table-column prop="register_ip" label="IP" align="center">
              <!-- <template slot-scope="scope">
                  <span>{{scope.row.register_ip}}</span>
              </template> -->
              </el-table-column>
              <el-table-column label="查看" align="center">
                  <template slot-scope="scope">
                      <!-- <router-link :to="{path:'active',query:{row:scope.row}}">
                          <el-button size="mini" style="margin-top:10px">
                              活跃日期
                          </el-button>
                      </router-link> -->
                      <el-button size="mini" style="margin-top:10px">
                          活跃日期
                      </el-button>
                  </template>
              </el-table-column>
              <!-- <el-table-column prop="status" label="状态" align="center"></el-table-column> -->
              <el-table-column label="状态" align="center">
                  <template slot-scope="{row}">
                    <el-tag :type="row.status | statusFilter">
                      {{ row.status }}
                    </el-tag>
                  </template>
                </el-table-column>
              <el-table-column label="操作" align="center" prop="status" width="300">
                  <template slot-scope="{row}">
                      <el-button v-if="row.status!='1'" size="mini" type="success" @click="handleModifyStatus(row,'正常')">
                        正常
                      </el-button>
                      <el-button v-if="row.status!='2'" size="mini" @click="handleModifyStatus(row,'发布仅自己可见')">
                        发布仅自己可见
                      </el-button>
                      <el-button v-if="row.status!='0'" size="mini" type="danger" @click="handleModifyStatus(row,'禁用')">
                        禁用
                      </el-button>
                    </template>
                  <!-- <template slot-scope="scope">
                          <span  @click="handleStatus(scope.$index,scope.row)">
                              <el-button type="success" v-if="scope.row.status===1">正常</el-button>
                              <el-button v-if="scope.row.status===2">仅自己可见</el-button>
                          </span>
                          <el-button type="danger" plain @click="cancel">禁用</el-button>
                      <div  @click="handleStatus">
                        <span v-if="">{{scope.row.status}}</span>
                        <el-select placeholder="请选择" v-model="scope.row.status" @change="handelchangestatus(scope,row)">
                            <el-option>禁用</el-option>
                            <el-option>正常</el-option>
                            <el-option>发布仅自己可见</el-option>
                        </el-select>
                      </div>
                  </template> -->
                <!-- <template slot-scope="scope">
                  <el-select v-model="scope" placeholder="请选择">
                    <el-option v-for="item in statusdata" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </template> -->
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
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  data() {
      return {
        nick_name:"",
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
          pages: 0,
          s_student: '',
          s_school: '',
          s_grade: '',
          s_klass: '',
          // loading: true,
          active: "",
          channel:"",
          channeldata:"",
          time:"",
          p_phone:'',
          start_time:"",
          end_time:"",
          statusdata:[
            {
              id:0,
              value:"禁用"
            },
            {
              id:1,
              value:"正常"
            },{
              id:2,
              value:"发布仅自己可见"
            }
          ],
          importanceOptions: [1, 2, 3],
          // calendarTypeOptions,
          sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
          statusOptions: ['正常', '发布仅自己可见', '禁用'],
          showReviewer: false,
          temp: {
            id: undefined,
            importance: 1,
            remark: '',
            timestamp: new Date(),
            title: '',
            type: '',
            // status: 'published'
          },
          dialogFormVisible: false,
          dialogStatus: '',
          textMap: {
            update: 'Edit',
            create: 'Create'
          },
      }
  },
  created() {
      this.getlistdata();
  },
  mounted() {
      
  },
  computed: {

  },
  methods: {
      getlistdata(){
          this.$get('users?sort=-id').then((res) => {
              console.log(res)
              // console.log(this.$options.methods.numberToIp(2147483647)); 
              //     console.log(111)
              //     console.log(this.$options.methods.getchanneldata()); 
              if(res.code===1){
                  this.tableData = res.info.items;
                  this.pages = res.info._meta.pageCount;
                  // this.numberToIp(2147483647)
                  // console.log(this.numberToIp(2147483647))
                  
                //   for (var i = 0; i < this.tableData.length; i++) {
                //       if (this.tableData[i].active == 0||this.tableData[i].active == null) {
                //           this.tableData[i].active = '未激活'
                //       } else if(this.tableData[i].active == 2) {
                //           this.tableData[i].active = '自然用户'
                //       }else{
                //           this.tableData[i].active = ' 已激活'
                //       }
                //   }
                  for (var i = 0; i < this.tableData.length; i++) {
                      if (this.tableData[i].os == 1) {
                          this.tableData[i].os = 'Android'
                      } else if(this.tableData[i].os == 2){
                          this.tableData[i].os = 'IOS'
                      }else if(this.tableData[i].os == 3){
                          this.tableData[i].os = 'Web'
                      }else if(this.tableData[i].os == 4){
                          this.tableData[i].os = '其他'
                      }else{
                          this.tableData[i].os = '其他'
                      }
                  }
                  for (var i = 0; i < this.tableData.length; i++) {
                      if (this.tableData[i].status == 0) {
                          this.tableData[i].status = '禁用'
                      } else if(this.tableData[i].status == 1){
                          this.tableData[i].status = '正常'
                      }else{
                          this.tableData[i].status = '发布仅自己可见'
                      }
                  }
                  
                  
                  // this.numberToIp(2147483647)
                  // for(var i=0;i< this.channeldata.length;i++){
                  //     // numberToIp(this.channeldata[i].register_ip)
                  // }
              }else{
                  this.$message.error('数据加载失败');
              }
              this.loading = false
          }).catch( () => {
              this.loading = false
          })
      }, 
    //   handleStatus(index,row){
    //     // row.status = !row.status;
    //     // console.log(row.status)
    //     if(row.status == true){
    //         row.status = 1
    //     }else{
    //         row.status = 2
    //     }
    //     this.$put('users/'+row.id, {
    //         status: row.status,
    //     }).then((res) => {
    //         this.loading = false
    //         // this.search1()
    //     }).catch(() => {
    //         this.loading = false
    //     })
    // },
    handleModifyStatus(row, status) {
      // this.$message({
      //   message: '操作Success',
      //   type: 'success'
      // })
      row.status = status
      if(row.status==='禁用') {
          this.status=0
        } else if(row.status==='正常'){
          this.status=1
        }else{
          this.status=2
        }
        if(this.status == 0){
            this.$prompt('请输入禁用原因', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            }).then(({ value }) => {
                this.$put('users/'+row.id, {
                status: 0,
                cause_of_violation:value
            }).then((res) => {
                this.loading = false
                // this.search1()
            }).catch(() => {
                this.loading = false
            })
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
        }else{
            this.$put('users/'+row.id, {
                status: this.status,
            }).then((res) => {
                this.loading = false
                // this.search1()
            }).catch(() => {
                this.loading = false
            })
        }
        



    },
    // cancel() {
    //     this.$prompt('请输入禁用理由', '提示', {
    //       confirmButtonText: '确定',
    //       cancelButtonText: '取消',
    //     }).then(({ value }) => {
    //       this.$put('users/'+row.id, {
    //           status: 0,
    //       }).then((res) => {
    //           this.loading = false
    //           // this.search1()
    //       }).catch(() => {
    //           this.loading = false
    //       })
    //     }).catch(() => {
    //       this.$message({
    //         type: 'info',
    //         message: '取消输入'
    //       });       
    //     });
    //   },
      // handelchangestatus(){
      //   this.$put('users',{
      //     id:scope.row.id
      //   }).then((res) => {
      //         console.log(res)
      //         if(res.code===1){
      //             this.channeldata = res.info.items;
                
      //         }else{
      //             this.$message.error('数据加载失败');
      //         }
      //         this.loading = false
      //     }).catch( () => {
      //         this.loading = false
      //     })
      // },
      handelchangestatus(scope,row){
          console.log(scope)
          this.$put('users/'+scope.row.id,{
            status:1
          }).then((res) => {
              // console.log(res)
              // if(res.code===1){
              //     this.$message({
              //         message:"删除成功",
              //         type: 'success'
              //     });
              //     this.loading = true;
              //     this.getlistdata()
              //     // this.tableData = JSON.parse(JSON.stringify(res.info.items))
              //     console.log(this.tableData )
              // }else{
              //     this.$message.error('数据加载失败');
              // }
              this.loading = false
          }).catch( () => {
              this.loading = false
          })
      },
      getchanneldata(){
          this.$get('channels?sort=-id').then((res) => {
              console.log(res)
              if(res.code===1){
                  this.channeldata = res.info.items;
                
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
          this.$get('users', {
              page: val,
              // channel_id: this.channel?this.channel:'',
              active:this.active?this.active:'',
              status:this.status?this.status:'',
              start_time:this.start_time?this.start_time:'',
              end_time:this.end_time?this.end_time:'',
              mobile:this.p_phone?this.p_phone:'',
          }).then((res) => {
              if (res.code === 1) {
                  this.tableData = JSON.parse(JSON.stringify(res.info.items))
                  this.pages = res.info._meta.pageCount;
                //   for (var i = 0; i < this.tableData.length; i++) {
                //       if (this.tableData[i].active == 0||this.tableData[i].active == null) {
                //           this.tableData[i].active = '未激活'
                //       } else if(this.tableData[i].active == 2) {
                //           this.tableData[i].active = '自然用户'
                //       }else{
                //           this.tableData[i].active = ' 已激活'
                //       }
                //   }
                  for (var i = 0; i < this.tableData.length; i++) {
                      if (this.tableData[i].os == 0) {
                          this.tableData[i].os = 'Android'
                      } else if(this.tableData[i].os == 1){
                          this.tableData[i].os = 'IOS'
                      }else if(this.tableData[i].os == 2){
                          this.tableData[i].os = 'Web'
                      }else if(this.tableData[i].os == 4){
                          this.tableData[i].os = '其他'
                      }else{
                          this.tableData[i].os = ''
                      }
                  }
                  for (var i = 0; i < this.tableData.length; i++) {
                      if (this.tableData[i].status == 0) {
                          this.tableData[i].status = '禁用'
                      } else if(this.tableData[i].status == 1){
                          this.tableData[i].status = '正常'
                      }else{
                          this.tableData[i].status = '发布仅自己可见'
                      }
                  }
                  // this.pages = res.data.pages;
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
          console.log(this.start_time)
          console.log(this.time)
          this.$get('users?sort=-id', {
              // channel_id: this.channel?this.channel:'',
              active:this.active?this.active:'',
              status:this.status?this.status:'',
              nick_name:this.nick_name?this.nick_name:'',
              // start_time:this.start_time?this.start_time:'',
              // end_time:this.end_time?this.end_time:'',
              // mobile:this.p_phone?this.p_phone:'',
              start_time:this.time?this.time[0]:'',
              end_time:this.time?this.time[1]+' '+'23:59:59':'',
          }).then((res) => {
              console.log(res)
              if (res.code === 1) {
                  this.tableData = JSON.parse(JSON.stringify(res.info.items))
                  this.pages = res.info._meta.pageCount;
                  // this.$router.push({path: 'userlist', query: {active:this.tableData.active,os:this.tableData.os}});
                  for (var i = 0; i < this.tableData.length; i++) {
                      if (this.tableData[i].active == 0||this.tableData[i].active == null) {
                          this.tableData[i].active = '未激活'
                      } else if(this.tableData[i].active == 2) {
                          this.tableData[i].active = '自然用户'
                      }else{
                          this.tableData[i].active = ' 已激活'
                      }
                  }
                  for (var i = 0; i < this.tableData.length; i++) {
                      if (this.tableData[i].os == 0) {
                          this.tableData[i].os = 'Android'
                      } else if(this.tableData[i].os == 1){
                          this.tableData[i].os = 'IOS'
                      }else if(this.tableData[i].os == 2){
                          this.tableData[i].os = 'Web'
                      }else if(this.tableData[i].os == 4){
                          this.tableData[i].os = '其他'
                      }else{
                          this.tableData[i].os = ''
                      }
                  }
                  for (var i = 0; i < this.tableData.length; i++) {
                      if (this.tableData[i].status == 0) {
                          this.tableData[i].status = '禁用'
                      } else if(this.tableData[i].status == 1){
                          this.tableData[i].status = '正常'
                      }else{
                          this.tableData[i].status = '发布仅自己可见'
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
  }
}
</script>

<style scoped>

</style>