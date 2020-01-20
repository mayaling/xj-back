<template>
        <div class="table" v-loading="loading" element-loading-text="加载中">
            <div class="container">
                <div class="container-title">新增类型</div>
                <el-form :model="form" ref="form" :rules="rules" class="item-add-list">
                    <el-row type="flex" class="row-bg" justify="space-around">
                        <el-col :span="6">
                            <el-form-item label="类型名称:" prop="at_name">
                                <el-input v-model.trim="form.at_name" type="text"></el-input>
                            </el-form-item>
                            <el-form-item label="描述:" prop="topic_des">
                                <el-input v-model.trim="form.topic_des" type="text"></el-input>
                            </el-form-item>
                            <el-form-item label="权重:" prop="weight">
                                <el-input v-model.trim="form.weight" type="text"></el-input>
                                <span>数值越大，排序越靠前</span>
                            </el-form-item>
                            <el-form-item prop="imageList" ref="uploadElemet">
                                <el-upload class="upload-demo1" :on-preview="handlePreview1" :on-remove="handleRemove1"   :file-list="fileList1" list-type="picture" :on-change="handleChange1" :http-request="uploadfile"> 
                                <el-button size="small" type="primary">点击上传图片</el-button>
                                <span>(尺寸600*600)</span>
                                </el-upload>
                                <el-input v-show="false" v-model.trim="imageurl1"></el-input>
                                <img v-if="imageshow1" :src="form.image" alt="" style="width: 100px;height: 100px;">
                            </el-form-item>
                        <el-button type="primary" v-if="!tableData" @click="onSubmit('form')" style='margin-top:40px'>确认添加</el-button>
                        <el-button type="primary" v-if="tableData" @click="onEdit('form')" style='margin-top:40px'>保存</el-button>
                        <!-- <el-button @click="resetForm('form')">重置</el-button> -->
                        <router-link :to="{path:'type'}"><el-button type="primary">取消</el-button></router-link>

                        </el-col>
                        <el-col :span="6"></el-col>
                        <el-col :span="6"></el-col>
                    </el-row>
                </el-form>
    </div>
    </div>
    </template>
    
    <script>
        export default {
            name: 'addcanaluser',
            data() {
                // var re = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(198)|(199)|(166)|(165)|(146)|(148))+\d{8})$/;
                var re = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
                // var amtRule = (rule, value, callback) => {
                //     if (!re.test(value)) {
                //         callback(new Error('请输入正确的格式'));
                //     } else {
                //         callback();
                //     }
                // };
                return {
                    uploadurl:"http://service.xykj1.com/",
                    imageList:"",
                    imageurl1:"",
                    form: {
                        at_name: "",
                        password: "",
                        type: "3",
                        status: "",
                        amt: "",
                        memo: "",
                        topic_des:"",
                        weight:0,
                    },
                    statusdata:[{
                        id:1,
                        name:"启动"
                    },
                    {
                        id:0,
                        name:"关闭"
                    }],
                    id:'',
                    tableData:'',
                    rules: {
                        at_name: [{
                            required: true,
                            message: '不可为空！',
                            trigger: 'blur'
                        }],
                        // password: [{
                        //     required: true,
                        //     message: '不可为空！',
                        //     trigger: 'blur'
                        // }],
                        type: [{
                            required: true,
                            message: '不可为空！',
                            trigger: 'blur'
                        }],
                        status: [{
                            required: true,
                            message: '不可为空！',
                            trigger: ['blur',"change"]
                        }],
                        expDate: [{
                            required: true,
                            message: '不可为空！',
                            trigger: 'blur'
                        }],
                    }
                }
            },
            created() {
                this.id = this.$route.query.id
                if(this.id){
                    this.getformdata()
                    this.imageshow1 = true;
                }
            },
            computed: {
    
            },
            methods: {
                 // 编辑进来获取表单的内容
                 getformdata(){
                    this.$get('article-types/'+this.id,).then((res) => {
                        console.log(res)
                        if(res.code===1){
                            this.tableData = res.info;
                            console.log(this.tableData)
                        //    if(this.tableData.status == 1){
                        //     this.tableData.status = "开启"
                        //    }else{
                        //     this.tableData.status = "关闭"
                        //    }
                        }else{
                            this.$message.error('数据加载失败');
                        }
                        this.form = this.tableData;
                        this.loading = false
                    }).catch( () => {
                        this.loading = false
                    })
                },
                //提交数据
                onSubmit(formName) {
                    
                    this.$refs[formName].validate((valid) => {
                        if (valid) {
                            this.$post('article-types', {
                                at_name: this.form.at_name,
                                image:this.imageurl1,
                                topic_des:this.form.topic_des,
                                weight:this.form.weight
                            }).then((res) => {
                                console.log(res)
                                if(res.code === 1){
                                    this.$message({
                                        message: res.message,
                                        type: 'success'
                                    });
                                    this.$router.push("/type")
                                }else{
                                    this.$message.error(res.message);

                                    // if(!res.info.name){
                                    //     this.$message.error(res.message);
                                    // }else{
                                    //     this.$message.error(res.info.name[0]);
                                    // }
                                }
                            })
                        } else {
                            this.$message.error("请完善红色提示内容");
                            return false;
                        }
                    });
                    // this.$emit('closedialog');  
                },
                onEdit(formName) {
                    this.$refs[formName].validate((valid) => {
                        if (valid) {
                            this.$put('article-types/'+this.id, {
                                at_name: this.form.at_name,
                                image:this.imageurl1?this.imageurl1:this.tableData.image,
                                topic_des:this.form.topic_des,
                                weight:this.form.weight
                            }).then((res) => {
                                console.log(res)
                                if(res.code === 1){
                                    this.$message({
                                        message: res.message,
                                        type: 'success'
                                    });
                                    this.$router.push("/type")
                                }else{
                                    if(!res.info.name){
                                        this.$message.error(res.message);
                                    }else{
                                        this.$message.error(res.info.name[0]);
                                    }
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
                        url: this.uploadurl+'generals/upload-file-and-to-aliyun_oss',
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
                    this.hideUpload = fileList1.length >= this.limitCount;
                    if(fileList1){
                        this.$refs['uploadElemet'].clearValidate();
                    }
                },
                handleRemove1(file, fileList1) {
                    console.log(file, fileList1);
                    this.hideUpload1 = fileList1.length >= this.limitCount;
                },  
                handleChange1(file, fileList1) {
                    console.log(111)
                    this.fileList1 = fileList1.slice(-1);
                    this.imageshow1 = false;
                    console.log(this.imageshow)
                },  

            }
        }
    </script>
    
    
    <style scoped>
    
    </style>