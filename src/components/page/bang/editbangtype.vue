<template>
    <div class="table" v-loading="loading" element-loading-text="加载中">
        <div class="container">
            <div class="container-title">新增banner</div>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="6">
                        <el-form :model="form" ref="form" :rules="rules" class="item-add-list">
                            <el-form-item prop="imageList" ref="uploadElemet">
                                <el-upload class="upload-demo1" :on-preview="handlePreview1" :on-remove="handleRemove1"   :file-list="fileList1" list-type="picture" :on-change="handleChange1" :http-request="uploadfile"> 
                                <el-button size="small" type="primary">点击上传类型页logo</el-button>
                                <span>(尺寸156*40)</span>
                                </el-upload>
                                <el-input v-show="false" v-model.trim="imageurl1"></el-input>
                                <img v-if="imageshow1" :src="form.logo" alt="" style="width: 100px;height: 100px;">
                            </el-form-item>
                            <el-form-item prop="imageList" ref="uploadElemet">
                                <el-upload class="upload-demo2" :on-preview="handlePreview1" :on-remove="handleRemove2"   :file-list="fileList2" list-type="picture" :on-change="handleChange2" :http-request="uploadfile1"> 
                                <el-button size="small" type="primary">点击上传首页logo</el-button>
                                <span>(尺寸104*104)</span>
                                </el-upload>
                                <el-input v-show="false" v-model.trim="imageurl2"></el-input>
                                <img v-if="imageshow2" :src="form.index_logo" alt="" style="width: 100px;height: 100px;">
                            </el-form-item>
                            <el-form-item prop="imageList" ref="uploadElemet">
                                <el-upload class="upload-demo3" :on-preview="handlePreview1" :on-remove="handleRemove3"   :file-list="fileList3" list-type="picture" :on-change="handleChange3" :http-request="uploadfile2"> 
                                <el-button size="small" type="primary">点击上传内页logo</el-button>
                                <span>(尺寸104*104)</span>
                                </el-upload>
                                <el-input v-show="false" v-model.trim="imageurl3"></el-input>
                                <img v-if="imageshow3" :src="form.info_logo" alt="" style="width: 100px;height: 100px;">
                            </el-form-item>
                            <el-button v-if="!tableData" type="primary" @click="onSubmit('form')" style='margin-top:40px'>提交</el-button>
                            <el-button v-if="tableData" type="primary" @click="onEdit('form')" style='margin-top:40px'>保存</el-button>
                            <router-link :to="{path:'bangtype'}"><el-button type="primary">取消</el-button></router-link>
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
            // var re = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(198)|(199)|(166)|(165)|(146)|(148))+\d{8})$/;
            var re = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
            var amtRule = (rule, value, callback) => {
                if (!re.test(value)) {
                    callback(new Error('请输入正确的格式'));
                } else {
                    callback();
                }
            };
            return {
                uploadurl:"http://service.xykj1.com/",
                showweb:false,
                showid:false,
                imageList:"",
                imageurl1:"",
                imageurl2:"",
                imageurl3:"",
                form: {
                    name: "",
                    password: "",
                    status: "",
                    type: "",
                    article_id:"",
                    web_url:"",
                    logo:"",
                    index_logo:"",
                    info_logo:"",
                },
                typedata:[{
                    id:0,
                    name:"图文"
                },
                {
                    id:2,
                    name:"外链"
                },
               ],
                statusdata:[{
                    id:1,
                    name:"开启"
                },
                {
                    id:0,
                    name:"关闭"
                }],
                tableData:"",
                id:'',
                data:"",
                rules: {
                    name: [{
                        required: true,
                        message: '不可为空！',
                        trigger: 'blur'
                    }],
                    // password: [{
                    //     required: true,
                    //     message: '不可为空！',
                    //     trigger: 'blur'
                    // }],
                    status: [{
                        required: true,
                        message: "不可为空！",
                        trigger: ['blur','change']
                    }],
                    type: [{
                        required: true,
                        message: '不可为空！',
                        trigger: ['blur','change']
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
                this.imageshow1 = true;
                this.imageshow2 = true;
                this.imageshow3 = true;

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
            uploadfile1 ( file ) {
                // 用于显示图片
                this.imageUrl2 = URL.createObjectURL(file.file);
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
                            this.imageurl2 = response.data.info.url;
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
            uploadfile2 ( file ) {
                // 用于显示图片
                this.imageUrl3 = URL.createObjectURL(file.file);
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
                            this.imageurl3 = response.data.info.url;
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
                this.$get('business-types/'+this.id,).then((res) => {
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
                        this.$post('business-types', {
                            type:this.form.type,
                            url:this.imageurl1,
                            web_url:this.form.web_url?this.form.web_url:"",
                            article_id:this.form.article_id?this.form.article_id:0
                        }).then((res) => {
                            console.log(res)
                            if(res.code === 1){
                                this.$message({
                                    message: res.message,
                                    type: 'success'
                                });
                                this.$router.push("/bangtype")
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
                // console.log(this.imageurl2)
                // console.log(this.imageurl3)
                console.log(this.form)
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log(this.tableData)
                        this.$put('business-types/'+this.id, {
                            logo:this.imageurl1?this.imageurl1:this.tableData.logo,
                            index_logo:this.imageurl2?this.imageurl2:this.tableData.index_logo,
                            info_logo:this.imageurl3?this.imageurl3:this.tableData.info_logo,
                        }).then((res) => {
                            if(res.code === 1){
                                this.$message({
                                    message: res.message,
                                    type: 'success'
                                });
                                this.$router.push("/bangtype")
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
                this.hideUpload1 = fileList1.length >= this.limitCount;
            },
            handleRemove2(file, fileList2) {
                console.log(file, fileList2);
                this.hideUpload2 = fileList2.length >= this.limitCount;
            },
            handleRemove3(file, fileList3) {
                console.log(file, fileList3);
                this.hideUpload3 = fileList3.length >= this.limitCount;
            },
            // handlePictureCardPreview(file) {
            //     this.dialogImageUrl = file.url;
            //     this.dialogVisible = true;
            // },
            handleChange1(file, fileList1) {
                console.log(111)
                this.fileList1 = fileList1.slice(-1);
                this.imageshow1 = false;
                console.log(this.imageshow)
            },
            handleChange2(file, fileList2) {
                console.log(111)
                this.fileList2 = fileList2.slice(-1);
                this.imageshow2 = false;
                console.log(this.imageshow)
            },
            handleChange3(file, fileList3){
                console.log(111)
                this.fileList3 = fileList3.slice(-1);
                this.imageshow3 = false;
                console.log(this.imageshow)
            }
        }
    }
</script>


<style scoped>

</style>