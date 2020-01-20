<template>
        <div class="table" v-loading="loading" element-loading-text="加载中">
            <div class="container">
                <div class="container-title">名片管理</div>
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="6">
                           
                            <el-form :model="form" ref="form" :rules="rules" class="item-add-list">
                                <el-form-item label="排序:" prop="sort_num">
                                    <el-input v-model.trim="form.sort_num" type="text"></el-input>
                                    <span>数字越小排序越靠前</span>
                                </el-form-item>
                                <!-- <el-form-item prop="imageList" ref="uploadElemet">
                                    <el-upload class="upload-demo1" :on-preview="handlePreview1" :on-remove="handleRemove1"   :file-list="fileList1" list-type="picture" :on-change="handleChange1" :http-request="uploadFile"> 
                                    <el-button size="small" type="primary" @click="submit">点击上传背景图</el-button>
                                    <span>(尺寸600*600)</span>
                                    </el-upload>
                                    <el-input v-show="false" v-model.trim="imageurl1"></el-input>
                                    <img v-if="imageshow" :src="form.img_url" alt="" style="width: 100px;height: 100px;">
                                </el-form-item> -->
                                <el-form-item prop="imageList" ref="uploadElemet">
                                    <el-upload class="upload-demo1" :on-preview="handlePreview1" :on-remove="handleRemove1"   :file-list="fileList1" list-type="picture" :on-change="handleChange1" :http-request="uploadfile"> 
                                    <el-button size="small" type="primary">点击上传背景图</el-button>
                                    <span>(尺寸690*600)</span>
                                    </el-upload>
                                    <el-input v-show="false" v-model.trim="imageurl1"></el-input>
                                    <img v-if="imageshow" :src="form.img_url" alt="" style="width: 100px;height: 100px;">
                                </el-form-item>
                                <el-button v-if="!tableData" type="primary" @click="onSubmit('form')" style='margin-top:40px'>提交</el-button>
                                <el-button v-if="tableData" type="primary" @click="onEdit('form')" style='margin-top:40px'>保存</el-button>
                                <router-link :to="{path:'businesscard'}"><el-button type="primary">取消</el-button></router-link>
                                <!-- <el-button @click="resetForm('form')">重置</el-button> -->
                        </el-form>
                    </el-col>
                    <el-col :span="6"></el-col>
                    <el-col :span="6"></el-col>
                    </el-row>
                
            </div>
        </div>
    </template>
    
    <script>
        // let OSS = require('ali-oss');
        export default {
            name: 'addadmin',
            data() {
                return {
                    uploadurl:"http://service.xykj1.com/",
                    showweb:false,
                    showid:false,
                    imageList:"",
                    imageurl1:"",
                    ossdata:"",
                    form: {
                        name: "",
                        password: "",
                        status: "",
                        type: "",
                        article_id:"",
                        web_url:"",
                        url:"",
                        sort_num:'',
                    },
                    id:'',
                    data:"",
                }
            },
            created() {
                this.id = this.$route.query.id
                // this.row = this.$route.query.row
                // console.log(this.row)
                if(this.id){
                    this.getformdata()
                    this.imageshow = true;
                }
                // this.getossdata()
            },
            computed: {
    
            },
            methods: {
                checktype(){
                    if(this.form.type === 2){
                        this.showweb = true;
                        this.showid= false;
                    }else{
                        this.showid= true;
                        this.showweb = false;
                    }
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
                        url: this.uploadurl+'generals/upload-file-and-to-aliyun_oss?type=bang',
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
                // 编辑进来获取表单的内容
                getformdata(){
                    this.$get('business-card-backgrounds/'+this.id,).then((res) => {
                        console.log(res)
                        if(res.code===1){
                            this.tableData = res.info;
                            if(this.tableData.type === 2){
                                this.showweb = true
                            }else{
                                this.showid = true
                            }
                            this.form = this.tableData;
                            this.loading = false
                        }else{
                            this.$message.error('数据加载失败');
                        }
                    }).catch( () => {
                        this.loading = false
                    })
                },
                //提交数据
                onSubmit(formName) {
                    this.$refs[formName].validate((valid) => {
                        if (valid) {
                            this.$post('business-card-backgrounds', {
                                img_url:this.imageurl1?this.imageurl1:this.tableData.img_url,
                                sort_num:this.form.sort_num,
                            }).then((res) => {
                                console.log(res)
                                if(res.code === 1){
                                    this.$message({
                                        message: res.message,
                                        type: 'success'
                                    });
                                    this.$router.push("/businesscard")
                                }else{
                                    if(!res.info.name){
                                        this.$message.error(res.message);
                                    }else{
                                        this.$message.error(res.info.name[0]);
                                    }
                                }
                            })
                        } else {
                            this.$message.error("请完善红色提醒内容");
                            return false;
                        }
                    });
                    // this.$emit('closedialog');  
                },
                // 保存编辑
                onEdit(formName) {
                    console.log(this.form)
                    this.$refs[formName].validate((valid) => {
                        if (valid) {
                            this.$put('business-card-backgrounds/'+this.id, {
                                img_url:this.imageurl1?this.imageurl1:this.tableData.img_url,
                                sort_num:this.form.sort_num,
                            }).then((res) => {
                                if(res.code === 1){
                                    this.$message({
                                        message: res.message,
                                        type: 'success'
                                    });
                                    this.$router.push("/businesscard")
                                }else{
                                    this.$message.error(res.message);
                                }
                            })
                        } else {
                            return false;
                        }
                    });
                    // this.$emit('closedialog');  
                },
                resetForm(formName) {
                    this.$refs[formName].resetFields();
                },
                imgChange(file, fileList1){
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
    
    </style>