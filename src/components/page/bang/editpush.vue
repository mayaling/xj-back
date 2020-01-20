<template>
    <div class="container">
      <div class="container-title">推送编辑</div>	
        <el-form :model="form" ref="form" enctype="multipart/form-data" :rules="rules" class="item-add-list">
          <el-form-item  prop="dc_id" label="请输入产品ID">
              <el-input v-model.trim="form.dc_id" type="text" placeholder="请输入产品ID"></el-input>
            </el-form-item>	 
            <!-- <el-form-item  prop="author">
                <el-input v-model.trim="form.author" type="text" placeholder="请输入作者"></el-input>
              </el-form-item>	 -->
              <el-form-item  prop="url" label="请输入URL">
                    <!-- <el-input type="text"  placeholder="请输入概述" v-model.trim="form.desc" maxlength="20" show-word-limit></el-input> -->
                    <el-input v-model.trim="form.url" type="text" placeholder="请输入URL" ></el-input>
              </el-form-item>	 
                <el-form-item  prop="title" label="请输入产品名称">
                    <el-input v-model.trim="form.title" type="text" placeholder="请输入产品名称"></el-input>
                </el-form-item>	
                <el-form-item  prop="desc" label="请输入文案">
                    <el-input v-model.trim="form.desc" type="text" placeholder="请输入文案"></el-input>
                </el-form-item>
                <el-form-item label="类型">
                    <el-select v-model="form.type" placeholder="请选择类型">
                        <template  v-for="item in typedata">
                            <el-option
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </template>
                    </el-select>
                </el-form-item>
                <el-form-item prop="imageList" ref="uploadElemet">
                    <el-upload class="upload-demo1" :on-preview="handlePreview1" :on-remove="handleRemove1"   :file-list="fileList1" list-type="picture" :on-change="handleChange1" :http-request="uploadfile"> 
                    <el-button size="small" type="primary">点击上传图片</el-button>
                    <span>(尺寸600*600)</span>
                    </el-upload>
                    <el-input v-show="false" v-model.trim="imageurl1"></el-input>
                    <img v-if="imageshow1" :src="form.icon" alt="" style="width: 100px;height: 100px;">
                </el-form-item>
        </el-form>
        <el-button type="primary" v-if="!tableData" @click="onSubmit('form')" >提交</el-button>
        <el-button type="primary" v-if="tableData" @click="onEdit('form')" >保存</el-button>
        <!-- <el-button type="primary" @click="onSubmit('form')" style='margin-top:40px'>确认添加</el-button> -->
        <router-link :to="{path:'push'}"><el-button type="primary">取消</el-button></router-link>
        </div>
    </div>
</template>

<script>

  export default {
    name: 'addproject',
    data() {
        // var re = /^[\u4e00-\u9fa5]{1,20}$/
        // var re = /^[\u4E00-\u9FA5a-zA-Z0-9_]{1,20}$/
        var re = /^.{1,20}$/
        // var re =  /^[\u4e00-\u9fffa-zA-Z]{1,20}$/;
        // var re = //
        // var re = /^[\u4E00-\u9FA5a-zA-Z]{0,40}/
        var descRule = (rule, value, callback) => {
            if (!re.test(value)) {
                callback(new Error('最多输入40个字符'));
            } else {
                callback();
            }
        }; 
      return {
        hideUpload: false,
        limitCount:1,  	
        form:{
            dc_id:"",
            title:"",
            desc:"",
            icon:"",
            url:"",
            type:"",
        },
        keywordsdata:"",
        typedata:[{
                name:"贷超",
                id:1
            },{
                name:"电台",
                id:2
            }],
        id:"",
        res:"",
        imageList:"",
        imageurl1:"",
        uploadurl:"http://service.xykj1.com/",
        rules: {
            desc: [{
                required: true,
                validator: descRule,
                trigger: 'blur'
            }],
            title: [{
                required: true,
                message: "不可为空",
                trigger: 'blur'
            }],
            origin: [{
                required: true,
                message: "不可为空",
                trigger: 'blur'
            }],
            creater: [{
                required: true,
                message: "不可为空",
                trigger: 'blur'
            }],
            type: [{
                required: true,
                message: "不可为空",
                trigger: ['blur','change']
            }],
           
        }
      }
    },
    created(){
      this.id = this.$route.query.id
      if(this.id){
          this.getlistdata()
          this.imageshow = true;
      }
    //   this.gettypedata()
    //   this.getkeywordsdata()
    },
    mounted() {
    },
    computed: {
   
    },
    methods: {
        // 编辑进来的内容
      getlistdata(){
        this.$get('activities/'+this.id).then((res) => {
            console.log(res)
            if(res.code===1){
                this.tableData = res.info;
                // console.log(typeof(this.tableData.label_id_list))
                // this.tableData.label_id_list = JSON.parse(this.tableData.label_id_list)
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
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log(this.form.label_id_list)
                    // console.log(this.form.label_id_list)
                    this.$post('informs', {
                        dc_id:this.form.dc_id,
                        title:this.form.title,
                        desc:this.form.desc,
                        icon:this.imageurl1,
                        url:this.form.url,
                        type:this.form.type
                    }).then((res) => {
                        console.log(res)
                        if(res.code === 1){
                            this.$message({
                                message: res.message,
                                type: 'success'
                            });
                            this.$router.push("/push")
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
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$put('activities/'+this.id, {
                        activity_time:this.form.activity_time,
                        activity_time_end:this.form.activity_time_end,
                        title:this.form.title,
                        preview_image:this.imageurl1?this.imageurl1:this.tableData.preview_image,
                        content:this.form.content,
                        location:this.form.location,
                        price:this.form.price,
                        user_id:this.form.user_id,
                        type:this.form.type
                    }).then((res) => {
                        console.log(res)
                        if(res.code === 1){
                            this.$message({
                                message: res.message,
                                type: 'success'
                            });
                            this.$router.push("/push")
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

<style  >

</style>
