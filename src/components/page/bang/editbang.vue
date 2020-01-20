<template>
        <div class="container">
          <div class="container-title">新增bang</div>	
            <el-form :model="form" ref="form" enctype="multipart/form-data" :rules="rules" class="item-add-list">
                <el-form-item  prop="u_id" label="请输入用户id">
                    <el-input v-model.trim="form.u_id" type="text" placeholder="请输入用户id" ></el-input>
                </el-form-item>	 
                <el-form-item label="创业背景图:" prop="bg">
                    <el-button type="text" @click="dialogTableVisible = true">选择创业背景图</el-button>
                    <el-dialog title="选择图片" :visible.sync="dialogTableVisible">
                        <div class="bglist">
                            <template v-for="(item,index) in bgimg" >
                                <img :src="item.img_url" alt="" style="width: 100px;height: 100px;" @click="handelbg(item,index)">
                            </template>
                        </div>
                    </el-dialog>
                    <p>
                        <img :src="bg" alt="" v-model.trim="form.b_id" style="width: 200px;height: 200px;">     
                    </p>
                    <p v-if="this.id">
                        <img :src="form.background_image" alt="" v-model.trim="form.b_id" style="width: 200px;height: 200px;">     
                    </p>
                </el-form-item>
                <el-form-item label="城市:" prop="city_name">
                    <template>
                        <el-select
                            v-model="form.c_id"
                            filterable
                            remote
                            reserve-keyword
                            placeholder="搜索地点"
                            :remote-method="remoteMethod"
                            :loading="loading" @change="search">
                            <el-option v-for="item in citydata" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </template>
                </el-form-item>

                <el-form-item  prop="t_id" label="请选择类型">
                    <el-select v-model="form.t_id" placeholder="请选择类型" v-loadmore="loadMore" filterable>
                            <template v-for="item in typedata">
                                <el-option :key="item.id" :label="item.name" :value="item.id"></el-option>
                            </template>
                    </el-select>
                </el-form-item>	
                <el-form-item  prop="area" label="请输入领域">
                    <el-input v-model.trim="form.area" type="text" placeholder="请输入领域" ></el-input>
                </el-form-item>	 
                <el-form-item  prop="end_time" label="请选择结束日期">
                        <el-date-picker
                        v-model="form.end_time"
                        type="month"
                        placeholder="请选择结束日期">
                      </el-date-picker>
                </el-form-item>	 	
                <el-form-item  prop="description" label="请输入概述">
                    <el-input v-model.trim="form.description" type="text" placeholder="请输入概述" ></el-input>
                </el-form-item>	 	
                <el-form-item prop="fileList1" ref="uploadElemet">
                    <el-upload class="upload-demo1" :on-preview="handlePreview1" :file-list="fileList1" list-type="picture" :http-request="uploadfile" :on-remove="handleRemove1"  :on-change="handleChange1" show-file-list="true"> 
                    <el-button size="small" type="primary">点击上传图片</el-button>
                    <!-- <span>(尺寸600*600)</span> -->
                    </el-upload>
                    <el-input v-show="false" v-model.trim="imageurl1"></el-input>
                    <img v-if="imageshow1" :src="form.image" alt="" style="width: 100px;height: 100px;">
                </el-form-item>
            </el-form>
            <el-button type="primary" v-if="!tableData" @click="onSubmit('form')" >提交</el-button>
            <el-button type="primary" v-if="tableData" @click="onEdit('form')" >保存</el-button>
            <!-- <el-button type="primary" @click="onSubmit('form')" style='margin-top:40px'>确认添加</el-button> -->
            <router-link :to="{path:'banglist'}"><el-button type="primary">取消</el-button></router-link>
            </div>
        </div>
    </template>
    
    <script>
      export default {
        name: 'addproject',
        data() {
            var re = /^.{1,20}$/
            var descRule = (rule, value, callback) => {
                if (!re.test(value)) {
                    callback(new Error('最多输入40个字符'));
                } else {
                    callback();
                }
            }; 
          return {
            uploadurl:"http://service.xykj1.com/",
            dialogTableVisible: false,
            hideUpload: false,
            limitCount:1,  	
            bgimg:"",
            bg:"",
            citydata:"",
            imageList:"",
            imageurl1:"",
            form: {
                u_id:"",
                area:"",
                type:"",
                city:"",
                b_id: "",
                c_id: "",
                t_id: "",
                area: "",
                end_time: "",
                description: "",
                pics:[],
                end_time:"",
            },
            typedata:"",
            id:"",
            res:"",
            deletpics:[],
            fileList1:[],
            // fileList1:[{url:"https://xijin.oss-cn-shanghai.aliyuncs.com/others/2019-09-17/rb9kdQT_5Zp5T_X0K4ZAz2OB80RCp72b.png"},{url:"https://xijin.oss-cn-shanghai.aliyuncs.com/others/2019-09-17/rb9kdQT_5Zp5T_X0K4ZAz2OB80RCp72b.png"}]

            // rules: {
            //     desc: [{
            //         required: true,
            //         validator: descRule,
            //         trigger: 'blur'
            //     }],
            //     title: [{
            //         required: true,
            //         message: "不可为空",
            //         trigger: 'blur'
            //     }],
            //     origin: [{
            //         required: true,
            //         message: "不可为空",
            //         trigger: 'blur'
            //     }],
            //     creater: [{
            //         required: true,
            //         message: "不可为空",
            //         trigger: 'blur'
            //     }],
            //     type: [{
            //         required: true,
            //         message: "不可为空",
            //         trigger: ['blur','change']
            //     }],
            // }
          }
        },
        created(){
          this.id = this.$route.query.id
          if(this.id){
              this.getlistdata()
          }
          this.gettypedata()
          this.getbgimg()
        },
        mounted() {
            // for(var i in this.imageList1){
            //     this.deletpics.push({
            //         url:this.imageList1[i]
            //     }) 
            //     console.log(this.deletpics)
            //     this.imageList1 = this.deletpics
            // }
        },
        computed: {
        },
        // components: { Tinymce, MDinput, Upload, Sticky, Warning, CommentDropdown, PlatformDropdown, SourceUrlDropdown },
        methods: {
            getbgimg(){
                this.$get('business-backgrounds?sort=sort_num').then((res) => {
                    console.log(res)
                    if(res.code===1){
                        this.bgimg = res.info.items
                        console.log(this.bgimg)
                    }else{
                        this.$message.error('数据加载失败');
                    }
                    this.loading = false
                }).catch( () => {
                    this.loading = false
                })
            },
            // 远程搜索
            remoteMethod(query) {
                // console.log(query)
                if (query !== '') {
                    this.loading = true;
                    setTimeout(() => {
                        this.loading = false;
                        this.$get('cities?name='+query).then((res) => {
                            if(res.code === 1){
                                this.citydata = res.info.items
                            }else{
                                this.$message.error(res.msg);
                            }
                            this.loading = false
                        }).catch(() => {this.loading = false})
                        // this.getcitydata()
                        // this.options = this.list.filter(item => {
                        // return item.label.toLowerCase()
                        //     .indexOf(query.toLowerCase()) > -1;
                        // });
                    }, 200);
                } else {
                    this.citydata = [];
                }
            },
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
                this.$get('business-types').then((res) => {
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
            loadMore() {
                var _this = this;
                if(_this.page != _this.pageCount){
                    _this.page++;
                    this.$get('article-types?is_del=0&page='+_this.page).then((res) => {
                        if (res.code === 1) {
                            for(var i=0;i<res.info.items.length;i++){
                                _this.typedata.push(res.info.items[i])
                            }
                        } else {
                            this.$message.error('数据获取失败');
                        }
                        }).catch(() => {
                        this.loading = false
                    })
                }else{
                    _this.page = _this.pageCount
                    return;
                }
    　　　　},
            // 编辑进来的内容
          getlistdata(){
            this.$get('businesses/'+this.id).then((res) => {
                console.log(res)
                if(res.code===1){
                    this.tableData = res.info;
                    // console.log(typeof(res.info.pic_list))
                    for(var i in res.info.pic_list){
                        this.fileList1.push({
                            url:res.info.pic_list[i],
                            name:res.info.pic_list[i].substring(res.info.pic_list[i].lastIndexOf("/" )+ 1),
                        }) 
                    }
                    // this.fileList1 = [{url:"https://xijin.oss-cn-shanghai.aliyuncs.com/others/2019-09-17/rb9kdQT_5Zp5T_X0K4ZAz2OB80RCp72b.png"},{url:"https://xijin.oss-cn-shanghai.aliyuncs.com/others/2019-09-17/rb9kdQT_5Zp5T_X0K4ZAz2OB80RCp72b.png"}]
                 
                }else{
                    this.$message.error('数据加载失败');
                }
                this.form = this.tableData;
                this.loading = false
            }).catch( () => {
                this.loading = false
            })
          },
            onEditorChange({ editor, html, text }) {
              this.content = html;
          },  
                 
           //提交数据
           onSubmit(formName) {
                for(var i in  this.fileList1){
                    this.deletpics.push(this.fileList1[i].url)
                }
                console.log(this.deletpics)
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log(this.form.label_id_list)
                        // console.log(this.form.label_id_list)
                        this.$post('businesses', {
                            u_id:this.form.u_id,
                            b_id:this.form.b_id,
                            c_id:this.form.c_id,
                            t_id:this.form.t_id,
                            area:this.form.area,
                            end_time:this.form.end_time,
                            description:this.form.description,
                            pics:this.deletpics,
                        }).then((res) => {
                            console.log(res)
                            if(res.code === 1){
                                this.$message({
                                    message: res.message,
                                    type: 'success'
                                });
                                this.$router.push("/banglist")
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
            // 编辑
            onEdit(formName) {
                for(var i in  this.fileList1){
                    this.deletpics.push(this.fileList1[i].url)
                }
                console.log(this.deletpics)
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$put('businesses/'+this.id, {
                            b_id:this.form.b_id,
                            c_id:this.form.c_id,
                            t_id:this.form.t_id,
                            area:this.form.area,
                            end_time:this.form.end_time,
                            description:this.form.description,
                            pics:this.deletpics
                        }).then((res) => {
                            console.log(res)
                            if(res.code === 1){
                                this.$message({
                                    message: res.message,
                                    type: 'success'
                                });
                                this.$router.push("/banglist")
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
            uploadfile ( file ) {
                // 用于显示图片
                // this.imageUrl1 = URL.createObjectURL(file.file);
                //保存一份文件信息，用于上传
                this.fileData = file.file;
                console.log(this.fileData)
                var formData = new FormData();  
                formData.append("file", this.fileData);
                axios({
                    method: 'post',
                    url: this.uploadurl+'generals/upload-file-and-to-aliyun_oss',
                    data: formData,
                    config: { headers: {'Content-Type': 'multipart/form-data' , 'Authorization': 'Bearer ' + localStorage.getItem('token')}}
                })
                .then((response)=>{
                        if(response.data.code==1){
                            const img =  response.data.info.url
                            // console.log(img)
                            this.fileList1.push({
                                name:img.substring(img.lastIndexOf("/" )+ 1),
                                url:img
                            })
                            console.log(this.fileList1)
                            // for(var i in this.fileList1){
                            //     console.log(i)
                            //     console.log(this.fileList1[i].url)
                            //     this.deletpics.push(this.fileList1[i].url)
                            // }
                            console.log(this.deletpics)
                            // console.log(typeof(this.fileList1))
                            this.$message({
                                message: "上传成功",
                                type: 'success'
                            });
                        }else{
                            this.$message.error(response.data.message);
                        }
                }).catch((response)=>{
                    this.$message.error(response.message);
                });                               
            },    
            // imgChange(file, fileList1){
            //     this.hideUpload = fileList1.length >= this.limitCount;
            //     if(fileList1){
            //         this.$refs['uploadElemet'].clearValidate();
            //     }
            // },
            // handleRemove1(file, fileList1) {
            //     console.log(typeof(fileList1))
            //     let index = fileList1.indexOf(file)
            //     console.log(index)
            //     fileList1 = this.form.pics
            //     console.log(file, fileList1);
                
            //     if(file.uid){
            //         this.deletpics.push(parseInt(file.uid))
            //     }
            //     fileList1.splice(index,1)
            //     console.log(fileList1)
            //     // this.pics = fileList1
            //     // this.hideUpload1 = fileList1.length >= this.limitCount;
            // },  
            handleRemove1(file, fileList1) {
                // fileList1
                console.log(fileList1)
                // fileList1 = this.fileList1
                // for(var i in fileList1){
                //     console.log(fileList1[i].url)
                //     this.form.pics.push(fileList1[i].url)
                // }
                // console.log(this.form.pics)
                // localStorage.setItem("delimgurl",fileList1)
                this.fileList1 = fileList1
            },  
            handleChange1(file, fileList1) {
                fileList1 = this.fileList1
                console.log(fileList1)
                this.fileList1 = fileList1
                // if(localStorage.getItem("delimgurl")){
                //     this.imageurl1 = localStorage.getItem("delimgurl")
                //     console.log(this.imageurl1 )
                // }else{
                //     this.imageurl1 = this.fileList1
                //     console.log(this.imageurl1 )
                // }
                // console.log(this.fileList1)
                // console.log(fileList1)
                // fileList1= this.fileList1
                // fileList1 = this.fileList1
                // console.log(this.fileList1)
                // console.log(typeof(this.fileList1))
                // // fileList1 = this.fileList1
                // console.log(fileList1)
                // for(var i in  this.fileList1){
                //     this.                                             m                                                                                                                                                                                                                                                       form.pics.push(this.fileList1[i].url)
                //     // this.deletpics.push(fileList1[i].url)
                // }
                // console.log(this.form.pics)
            }, 
            // handlePreview1(file,fileList1){
            //     // fileList1 = this.fileList1
            //     // for(var i in  fileList1){
            //     //     this.form.pics.push(fileList1[i].url)
            //     // }
            //     // console.log(fileList1)
            // },
            handelbg(item,index){
                console.log(item)
                // this.b_id = item.id.toString()
                this.form.b_id = item.id
                console.log(this.form.b_id)
                this.bg = item.img_url
                this.dialogTableVisible = false;
            }
        }
      }
    </script>
    
    <style  >

    .bglist{
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
    }
    .bglist img{
        cursor: pointer;
        padding:10px;
    }
    </style>
    