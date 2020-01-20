<template>
    <div class="table" v-loading="loading" element-loading-text="加载中">
        <div class="container">
            <div class="container-title">新增权益卡</div>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="6">

                        <el-form :model="form" ref="form" :rules="rules" class="item-add-list">
                            <el-form-item label="权益卡名称:" prop="name">
                            <el-input v-model.trim="form.name" type="text"></el-input>
                            </el-form-item>
                            <el-form-item label="天数:" prop="days">
                                <el-input v-model.trim="form.days" type="text"></el-input>
                            </el-form-item>
                            <el-form-item label="连续价格:" prop="con_price">
                                <el-input v-model.trim="form.con_price" type="text"></el-input>
                            </el-form-item>
                            <el-form-item label="原价:" prop="pre_price">
                                <el-input v-model.trim="form.pre_price" type="text"></el-input>
                            </el-form-item>
                            <el-form-item label="现价:" prop="now_price">
                                <el-input v-model.trim="form.now_price" type="text"></el-input>
                            </el-form-item>
                            <el-form-item label="sku:" prop="y_sku_id">
                                <el-input v-model.trim="form.y_sku_id" type="text"></el-input>
                            </el-form-item>
                            <el-form-item  prop="status" label="请选择状态">
                                <el-select v-model="form.status" placeholder="请选择状态" v-loadmore="loadMore" filterable>
                                        <template v-for="item in statusdata">
                                            <el-option :key="item.id" :label="item.name" :value="item.id"></el-option>
                                        </template>
                                </el-select>
                                </el-form-item>
                            <el-form-item prop="imageList" ref="uploadElemet">
                                <el-upload class="upload-demo1" :on-preview="handlePreview1" :on-remove="handleRemove1"   :file-list="fileList1" list-type="picture" :on-change="handleChange1" :http-request="uploadfile">
                                <el-button size="small" type="primary">点击上传权益卡图片</el-button>
                                <!-- <span>(尺寸690*320)</span> -->
                                </el-upload>
                                <el-input v-show="false" v-model.trim="imageurl1"></el-input>
                                <img v-if="imageshow" :src="form.pic" alt="" style="width: 100px;height: 100px;">
                            </el-form-item>
                            <el-button v-if="!tableData" type="primary" @click="onSubmit('form')" style='margin-top:40px'>提交</el-button>
                            <el-button v-if="tableData" type="primary" @click="onEdit('form')" style='margin-top:40px'>保存</el-button>
                            <router-link :to="{path:'interestcard'}"><el-button type="primary">取消</el-button></router-link>
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
                // uploadurl:"http://service.xykj1.com/",
                uploadurl:"http://47.103.61.179:1081/",

                showweb:false,
                showid:false,
                imageList:"",
                imageurl1:"",
                form: {
                    name: "",
                    status: "",
                    con_price: "",
                    now_price:"",
                    pre_price:"",
                    y_sku_id:"",
                },
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
                    url: this.uploadurl+'generals/upload-file-and-to-aliyun_oss?type=banner',
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
                this.$get('interest-cards/'+this.id,).then((res) => {
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
                        this.$post('interest-cards', {
                            type:this.form.type,
                            pic:this.imageurl1?this.imageurl1:this.tableData.pic,
                            days:this.form.days,
                            name:this.form.name,
                            status:this.form.status,
                            con_price:this.form.con_price,
                            now_price:this.form.now_price,
                            pre_price:this.form.pre_price,
                            y_sku_id:this.form.y_sku_id,
                        }).then((res) => {
                            console.log(res)
                            if(res.code === 1){
                                this.$message({
                                    message: res.message,
                                    type: 'success'
                                });
                                this.$router.push("/interestcard")
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
                        this.$put('interest-cards/'+this.id, {
                            type:this.form.type,
                            pic:this.imageurl1?this.imageurl1:this.tableData.pic,
                            days:this.form.days,
                            name:this.form.name,
                            status:this.form.status,
                            con_price:this.form.con_price,
                            now_price:this.form.now_price,
                            pre_price:this.form.pre_price,
                            y_sku_id:this.form.y_sku_id,

                        }).then((res) => {
                            if(res.code === 1){
                                this.$message({
                                    message: res.message,
                                    type: 'success'
                                });
                                this.$router.push("/interestcard")
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
