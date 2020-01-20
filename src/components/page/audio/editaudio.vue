<template>
        <div class="table" v-loading="loading" element-loading-text="加载中">
            <div class="container">
             
                <div class="container-title">时间轴编辑</div>
                <div class="mgb20">
                    <el-button type="primary" @click="editaudio()">+添加时间轴</el-button>
                    <el-dialog title="添加时间轴" :visible.sync="dialogFormVisible" :close-on-click-modal="false"  @close='closeDialog'>
                        <!-- <el-form :model="form" ref="form" enctype="multipart/form-data" :rules="rules" class="item-add-list">
                            <el-form-item label="时间" :label-width="formLabelWidth">
                                <el-input v-model="form.at" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="标题" :label-width="formLabelWidth">
                                <el-input v-model="form.title" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="内容" :label-width="formLabelWidth">
                                <el-input v-model="form.content" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="外链" :label-width="formLabelWidth">
                                <el-input v-model="form.quote_href" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-form> -->
                        <!-- <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogFormVisible = false">取 消</el-button>
                            <el-button type="primary" @click="onSubmit('form')">确 定</el-button>
                        </div> -->

                        <el-form :model="form" ref="form" enctype="multipart/form-data" :rules="rules" class="item-add-list">
                            <el-form-item label="时间" :label-width="formLabelWidth">
                                <el-input v-model="form.at" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="标题" :label-width="formLabelWidth">
                                <el-input v-model="form.title" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="内容" :label-width="formLabelWidth">
                                <el-input v-model="form.content" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="外链" :label-width="formLabelWidth">
                                <el-input v-model="form.quote_href" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item prop="imageList" ref="uploadElemet">
                                <el-upload class="upload-demo1" :on-preview="handlePreview1" :on-remove="handleRemove1"   :file-list="fileList1" list-type="picture" :on-change="handleChange1" :http-request="uploadfile"> 
                                <el-button size="small" type="primary">点击上传封面图片</el-button>
                                </el-upload>
                                <el-input v-show="false" v-model.trim="imageurl1"></el-input>
                                <img v-if="imageshow" :src="form.image" alt="" style="width: 100px;height: 100px;">
                            </el-form-item>
                            
                        </el-form>
                       
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogFormVisible = false">取 消</el-button>
                            <!-- <router-link :to="{path:'radiobalnk',query: {radio:this.radio,cur_page:this.cur_page,radio_id:this.radio_id}}"><el-button type="primary" @click="onSubmit('form')" v-if="!this.flag">确 定</el-button></router-link> -->
                            <el-button type="primary" @click="onSubmit('form')" v-if="!this.flag">确 定</el-button>
                            <el-button type="primary" @click="onSubmit1('form')" v-if="this.flag">保存</el-button>
                        </div>
                    </el-dialog>
                    <!-- <router-link :to="{path:'editbanner'}"><el-button type="primary">+添加时间轴</el-button></router-link> -->
                </div>
                <el-table :data="tableData" border size="medium" ref="multipleTable"  stripe>
                    <el-table-column prop="at" label="时间" align="center"></el-table-column>
                    <el-table-column prop="content" label="内容" align="center"></el-table-column>
                    <el-table-column prop="title" label="标题" align="center"></el-table-column>
                    <el-table-column prop="quote_href" label="外链" align="center"></el-table-column>
                    <el-table-column prop="image" label="图片" align="center">
                    　<template slot-scope="scope">
                    　　　　<img :src="scope.row.image" width="40" height="40" class="head_pic"/>
                    　　</template>
                    </el-table-column>
                    <!-- <el-table-column prop="preview_image" label="封面图片" align="center">
                    　<template slot-scope="scope">
                    　　　　<img :src="scope.row.preview_image" width="40" height="40" class="head_pic"/>
                    　　</template>
                    </el-table-column> -->
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button size="mini"  @click="handleEdit(scope,row)">编辑</el-button>
                            <!-- <router-link :to="{path:'editaudio',query:{id:scope.row.id}}">
                                <el-button size="mini">
                                   编辑
                                </el-button>
                            </router-link> -->
                            <el-button size="mini" @click="handleDel(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>

    <div class="pagination">
        <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :page-count="pages" :page-size="10">
        </el-pagination>

        <el-row style="margin-top: 100px;">
            <el-col :span="4">
                <el-popover
                placement="top-start"
                trigger="hover" :disabled="true">
                <!-- <div style="text-align: center">
                    <el-progress 
                    color="#67C23A"
                    type="circle" 
                    :percentage="music.volume"></el-progress><br>
                    <el-button 
                    @click="changeVolume(-10)"
                    icon="el-icon-minus" 
                    circle></el-button>
                    <el-button 
                    @click="changeVolume(10)"
                    icon="el-icon-plus" 
                    circle></el-button>
                </div> -->
                <el-button 
                @click="play"
                id="play"
                slot="reference"
                :icon="music.isPlay?'el-icon-refresh':'el-icon-caret-right'" 
                circle></el-button>
                </el-popover>
            </el-col>
            <el-col :span="14"  style="padding-left: 20px">
                <el-slider
                @change="changeTime"
                :format-tooltip="formatTime"
                :max="music.maxTime"
                v-model="music.currentTime" 
                style="width: 100%;"></el-slider>
            </el-col>
            <el-col :span="6" style="padding: 9px 0px 0px 10px;color:#909399;font-size: 13px">
                {{formatTime(music.currentTime)}}/{{formatTime(music.maxTime)}}
            </el-col>
        </el-row>
        <!-- <audio ref="music" loop autoplay>  -->
        <audio ref="music" loop> 
            <source :src="radio" >
        </audio>
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
                    flag:false,
                    id:"",
                    time:"",
                    time1:"",
                    dialogFormVisible:false,
                    music:{
                        isPlay:false,
                        currentTime:0,
                        maxTime:0,
                        volume:100
                    },
                    radio:"",
                    dialogVisible: false,
                    p_name:"",
                    status:"",
                    value1: "",
                    value2: "",
                    tableData: [],
                    imageList:"",
                    hideUpload: false,
                    limitCount:1,  	
                    uploadurl:"http://service.xykj1.com/",
                    // uploadurl:"https://api.xykj1.com/",
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
                    form: {
                        at: 0,
                        quote_href: '',
                        title: '',
                        content:"",
                    },
                    radio_id:"",
                    fileList1:[],
                }
            },
            created() {
                this.radio_id = this.$route.query.id
                this.radio = this.$route.query.music
                this.cur_page = this.$route.query.music
                if(this.radio_id){
                    this.getlistdata()

                }
                // if(this.time1){
                //     this.imageshow = true;
                // }
            },
            computed: {
                
            },
            mounted() {
                this.$nextTick(()=>{
                    setInterval(this.listenMusic,1000)
                })
            },
            methods: {
                getlistdata(){
                    this.$get('radio-shafts?per-page=10',{
                        radio_id:this.radio_id,
                        page:this.cur_page
                    }).then((res) => {
                        console.log(res)
                        if(res.code===1){
                            this.tableData = res.info.items;
                            this.pages = res.info._meta.pageCount;
                            for(var i =0;i<this.tableData.length;i++){
                                this.tableData[i].at = this.formatTime(this.tableData[i].at)
                            }
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
                    this.$get('radio-shafts?per-page=10', {
                        page: val,
                        radio_id:this.radio_id
                        // status: this.status?this.status:'',
                    }).then((res) => {
                        // this.cur_page = page
                        if (res.code === 1) {
                            this.tableData = JSON.parse(JSON.stringify(res.info.items))
                            this.pages = res.info._meta.pageCount;
                            this.cur_page = res.info._meta.currentPage;
                            console.log(this.cur_page)
                            for(var i =0;i<this.tableData.length;i++){
                                this.tableData[i].at = this.formatTime(this.tableData[i].at)
                            }
                           
                        } else {
                            this.$message.error('数据加载失败');
                        }
                        this.loading = false
                    }).catch(() => {
                        this.loading = false
                    })
                },
                listenMusic(){
                    if(!this.$refs.music){
                        return
                    }
                    if(this.$refs.music.readyState){
                        this.music.maxTime = this.$refs.music.duration
                    }
                    this.music.isPlay=!this.$refs.music.paused
                    this.music.currentTime = this.$refs.music.currentTime
                    // if(!this.time1){
                    //     this.form.at =  this.formatTime(this.music.currentTime)
                    // }else{
                    //     this.form.at =  this.formatTime(this.time1)
                    // }
                    this.form.at =  this.formatTime(this.music.currentTime)
                    this.time = Math.ceil(this.$refs.music.currentTime)
                },
                play(){
                    if(this.$refs.music.paused){
                        this.$refs.music.play()
                    }else{
                        this.$refs.music.pause()
                    }
                    this.music.isPlay=!this.$refs.music.paused
                    this.$nextTick(()=>{
                        document.getElementById('play').blur()
                    })
                },
                changeTime(time){
                    this.$refs.music.currentTime = time
                    // this.form.at = this.$refs.music.currentTime
                    // this.time = this.$refs.music.currentTime
                },
                changeVolume(v){
                    this.music.volume += v 
                    if(this.music.volume>100){
                    this.music.volume = 100
                    }
                    if(this.music.volume<0){
                    this.music.volume = 0
                    }
                    this.$refs.music.volume = this.music.volume/100
                },
                formatTime(time){
                    let it = parseInt(time)
                    let m = parseInt(it/60)
                    let s = parseInt(it%60)
                    return (m<10?"0":"")+parseInt(it/60)+":"+(s<10?"0":"")+parseInt(it%60)
                },
                editaudio(){
                    this.dialogFormVisible = true
                },
                // 提交数据
                onSubmit(formName) {
                    this.$refs[formName].validate((valid) => {
                        if (valid) {
                            this.$post('radio-shafts', {
                                radio_id:this.radio_id,
                                at:this.time,
                                title:this.form.title,
                                content:this.form.content,
                                quote_href:this.form.quote_href,
                                image:this.imageurl1,
                            }).then((res) => {
                                console.log(res)
                                if(res.code === 1){
                                    this.$message({
                                        message: res.message,
                                        type: 'success'
                                    });
                                    this.getlistdata()
                                    this.dialogFormVisible = false
                                    this.form.title = ''
                                    this.form.content = ''
                                    this.form.quote_href = ''
                                    // this.form = ""
                                    // this.$router.push("/articlelist")
                                }else{
                                    if(!res.info.name){
                                        this.$message.error(res.message);
                                    }else{
                                        this.$message.error(res.info.name[0]);
                                    }
                                }
                            })
                        } else {
                            this.$message.error(" 请完善红色提示内容");
                            return false;
                        }
                    });
                },
                onSubmit1(formName) {
                    this.$refs[formName].validate((valid) => {
                        if (valid) {
                            this.$put('radio-shafts/'+this.id, {
                                radio_id:this.radio_id,
                                at:this.time,
                                title:this.form.title,
                                content:this.form.content,
                                quote_href:this.form.quote_href,
                                image:this.imageurl1?this.imageurl1:this.tableData.image,
                            }).then((res) => {
                                console.log(res)
                                if(res.code === 1){
                                    this.$message({
                                        message: res.message,
                                        type: 'success'
                                    });
                                    this.getlistdata()
                                    this.dialogFormVisible = false
                                    this.form.title = ''
                                    this.form.content = ''
                                    this.form.quote_href = ''
                                    this.imageUrl1 = ''
                                    this.flag = false
                                    // this.form = ""
                                    // this.$router.push("/articlelist")
                                }else{
                                    if(!res.info.name){
                                        this.$message.error(res.message);
                                    }else{
                                        this.$message.error(res.info.name[0]);
                                    }
                                }
                            })
                        } else {
                            this.$message.error(" 请完善红色提示内容");
                            return false;
                        }
                    });
                },
                closeDialog(){
                    this.form.title = ''
                    this.form.content = ''
                    this.form.quote_href = ''
                    this.form.image = ''
                    // this.imageUrl1 = ''
                    this.fileList1 = []
                    this.flag = false
                },
                handleEdit(scope,row){
                    // console.log(scope)
                    this.flag = true
                    this.imageshow = true
                    console.log(scope)
                    // this.imageUrl1 = ''
                    this.fileList1 = []
                    this.dialogFormVisible = true
                    this.time1 = scope.row.at
                    this.form.title = scope.row.title
                    this.form.content = scope.row.content
                    this.form.quote_href = scope.row.quote_href
                    this.form.at = scope.row.at
                    this.id = scope.row.id
                    this.form.image = scope.row.image
                    this.fileList1 = []
                    // this.$get('radio-shafts/'+scope.id).then((res) => {
                    //     if (res.code === 1) {
                    //         console.log(res)
                    //     } else {
                    //         this.$message.error('数据加载失败');
                    //     }
                    //     this.loading = false
                    // }).catch(() => {
                    //     this.loading = false
                    // })
                    
                },
                handleDel(scope,row){
                    // console.log(scope)
                    this.$del('radio-shafts/'+scope.id, {
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
                   // 封面图片上传
                uploadfile ( file ) {
                    // 用于显示图片
                    this.imageUrl1 = URL.createObjectURL(file.file);
                    //保存一份文件信息，用于上传
                    this.fileData = file.file;
                    console.log( this.fileData)
                    var formData = new FormData();  
                    formData.append("file", this.fileData);
                    axios({
                        method: 'post',
                        url: this.uploadurl+'generals/upload-file-and-to-aliyun_oss?type=article',
                        data: formData,
                        config: { headers: {'Content-Type': 'multipart/form-data' , 'Authorization': 'Bearer ' + localStorage.getItem('token')}}
                    })
                    .then((response)=>{
                            console.log(response)
                            if(response.data.code==1){
                                this.imageurl1 = response.data.info.url;
                                this.$message({
                                        message: "上传成功",
                                        type: 'success'
                                    });
                            }else{
                                this.$message.error(response.data.message);
                                // if(response.info.image){
                                //     this.$message.error(response.data.info.image[0]);
                                // }else{
                                //     this.$message.error(response.data.message);
                                // }
                            }
                    }).catch((response)=>{
                        this.$message.error(response.message);
                    });                               
                }, 
                imgChange(file, fileList1){
                    console.log(fileList1)
                    this.hideUpload = fileList1.length >= this.limitCount;
                    if(fileList1){
                        this.$refs['uploadElemet'].clearValidate();
                    }
                },
                handleRemove1(file, fileList1) {
                    console.log(file, fileList1);
                    this.hideUpload = fileList1.length >= this.limitCount;
                },
                // handlePictureCardPreview(file) {
                //     this.dialogImageUrl = file.url;
                //     this.dialogVisible = true;
                // },
                handleChange1(file, fileList1) {
                    console.log(111)
                    this.fileList1 = fileList1.slice(-1);
                    this.imageshow = false;
                    console.log(this.imageshow)
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