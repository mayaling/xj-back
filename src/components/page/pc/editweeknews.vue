<template>
        <div class="table" v-loading="loading" element-loading-text="加载中">
            <div class="container">
                <div class="container-title">资讯编辑</div>
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="6">

                            <el-form :model="form" ref="form"  class="item-add-list" enctype="multipart/form-data" :rules="rules">
                                <!-- <el-form-item label="请输入排序:" prop="sort" >
                                    <el-input v-model.trim="form.sort" type="text"></el-input>
                                    <span>数字越小排序越靠前</span>
                                </el-form-item> -->
                                <el-form-item label="请输入标题:" prop="title" >
                                    <el-input v-model.trim="form.title" type="text"></el-input>
                                </el-form-item>
                                <el-form-item label="请输入内容:" prop="content" >
                                    <el-input v-model.trim="form.content" type="text" placeholder="请输入概述" ></el-input>
                                </el-form-item>
                                <el-button v-if="!tableData" type="primary" @click="onSubmit('form')" style='margin-top:40px'>提交</el-button>
                                <el-button v-if="tableData" type="primary" @click="onEdit('form')" style='margin-top:40px'>保存</el-button>
                                <router-link :to="{path:'weeknews'}"><el-button type="primary">取消</el-button></router-link>
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
        export default {
            name: 'addadmin',
            data() {
                var re = /^.{1,400}$/
                var descRule = (rule, value, callback) => {
                    if (!re.test(value)) {
                        callback(new Error('最多输入200个字符'));
                    } else {
                        callback();
                    }
                };
                return {
                    uploadurl:"http://service.xykj1.com/",
                    // uploadurl:"http://service.xykj1.com/",
                    showweb:false,
                    showid:false,
                    imageList:"",
                    imageurl1:"",
                    typedata:[{
                        id:0,
                        name:"文章"
                    },{
                        id:1,
                        name:"电台"
                    }],
                    form: {
                        title:"",
                        sort:"",
                        content:"",

                    },
                    id:'',
                    data:"",
                    content:"",
                    rules: {
                        content: [{
                            required: true,
                            validator: descRule,
                            trigger: 'blur'
                        }],
                    }
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
                    this.$get('week-news/'+this.id,).then((res) => {
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
                            this.$post('week-news', {
                                title:this.form.title,
                                content:this.form.content,
                                // sort:this.form.sort,
                            }).then((res) => {
                                console.log(res)
                                if(res.code === 1){
                                    this.$message({
                                        message: res.message,
                                        type: 'success'
                                    });
                                    this.$router.push("/weeknews")
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
                            this.$put('week-news/'+this.id, {
                                title:this.form.title,
                                content:this.form.content,
                                // sort:this.form.sort,
                            }).then((res) => {
                                if(res.code === 1){
                                    this.$message({
                                        message: res.message,
                                        type: 'success'
                                    });
                                    this.$router.push("/weeknews")
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
                }
            }
        }
    </script>


    <style scoped>

    </style>
