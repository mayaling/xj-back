<template>
	<div class="container">
      <div class="container-title">新增文章</div>	
        <el-form :model="form" ref="form" enctype="multipart/form-data" :rules="rules" class="item-add-list">
          <el-form-item  prop="title">
              <el-input v-model.trim="form.title" type="text" placeholder="请输入标题"></el-input>
            </el-form-item>	 
            <el-form-item  prop="author">
                <el-input v-model.trim="form.author" type="text" placeholder="请输入作者"></el-input>
              </el-form-item>	
              <el-form-item  prop="desc">
                    <!-- <el-input type="text"  placeholder="请输入概述" v-model.trim="form.desc" maxlength="20" show-word-limit></el-input> -->
                    <el-input v-model.trim="form.desc" type="text" placeholder="请输入概述"></el-input>
              </el-form-item>	 
            <el-form-item  prop="orgin">
                    <el-input v-model.trim="form.origin" type="text" placeholder="请输入文章来源"></el-input>
                  </el-form-item>	
                  <!-- <el-form-item prop="imageList" ref="uploadElemet">
                    <el-upload
                    class="upload-demo1"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :file-list="fileList"
                    list-type="picture"
                    :http-request="uploadfile">
                    <el-button size="small" type="primary">点击上传封面图片</el-button>
                  </el-upload>
                  </el-form-item>    -->
                  <el-form-item prop="imageList" ref="uploadElemet">
                    <el-upload class="upload-demo1" :on-preview="handlePreview1" :on-remove="handleRemove1"   :file-list="fileList1" list-type="picture" :on-change="handleChange1" :http-request="uploadfile"> 
                    <el-button size="small" type="primary">点击上传封面图片</el-button>
                    </el-upload>
                    <el-input v-show="false" v-model.trim="imageurl1"></el-input>
                    <img v-if="imageshow" :src="form.preview_image" alt="" style="width: 100px;height: 100px;">
                </el-form-item>
            <el-form-item  prop="content">
                <el-upload class="upload-demo" :on-preview="handlePreview" :on-remove="handleRemove"  :file-list="fileList" list-type="picture" :on-change="handleChange" :http-request="addAttachment" :on-success="handleSuccess"> 
                    <el-button size="small" id="upload" type="primary" style="margin-bottom: 10px;">点击上传图片</el-button>
                </el-upload>  
                   <quill-editor class="editor" ref="QuillEditor" v-model="form.content" :options="editorOption" ></quill-editor>
                   <!-- <p v-html="form.content">{{form.content}}</p> -->
             </el-form-item>
        </el-form>
        <el-button type="primary" v-if="!tableData" @click="onSubmit('form')" >提交</el-button>
        <el-button type="primary" v-if="tableData" @click="onEdit('form')" >保存</el-button>
        <!-- <el-button type="primary" @click="onSubmit('form')" style='margin-top:40px'>确认添加</el-button> -->
        <router-link :to="{path:'articlelist'}"><el-button type="primary">取消</el-button></router-link>
		</div>
	</div>
</template>

<script>
  // import Tinymce from '../common/Tinymce/index.vue'
	import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import 'quill/dist/quill.bubble.css';
    import { quillEditor } from 'vue-quill-editor';	
    import { addQuillTitle } from './quill-title.js'

      // 工具栏配置
      const toolbarOptions = [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
    
      [{'header': 1}, {'header': 2}],               // custom button values
      [{'list': 'ordered'}, {'list': 'bullet'}],
      [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
      [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
      [{'direction': 'rtl'}],                         // text direction
    
      [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
      [{'header': [1, 2, 3, 4, 5, 6, false]}],
    
      [{'color': []}, {'background': []}],          // dropdown with defaults from theme
      [{'font': []}],
      [{'align': []}],
      ['link', 'image', 'video'],
      ['clean']                                         // remove formatting button
    ]



  export default {
    name: 'addproject',
    components:{quillEditor},
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
          editorOption: {
              placeholder: '请输入文章内容',
              modules: {
                  toolbar: {
                      container: toolbarOptions,  // 工具栏
                      handlers: {
                          'image': function (value) {
                              if (value) {
                                // console.log(document.querySelector('.el-upload'))
                                  document.querySelector('#upload').click()
                                  // alert('自定义图片')
                              } else {
                                  this.quill.format('image', false);
                              }
                          }
                      }
                  }
              }
          } ,  
        hideUpload: false,
        limitCount:1,  	
        form:{
          content: '',
          key:"",
          id:"",
          tiny:"",
          chilid:"",
          tinychild:"",
          parentId:"",
          name:"",
          age:"",
          amt:"",
          packgeintro:"",
          description:"",
          detail:"",
          school_age:"",
          file:[],
          orgin:"",
          preview_image:"",
          author:"",
          desc:""
        },
        id:"",
        res:"",
        imageList:"",
        imageurl1:"",
        rules: {
            desc: [{
                required: true,
                validator: descRule,
                trigger: 'blur'
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
    },
    mounted() {
        addQuillTitle();
    },
    computed: {
        editor() {
            return this.$refs.myQuillEditor.quill
        }
    },
    // components: { Tinymce, MDinput, Upload, Sticky, Warning, CommentDropdown, PlatformDropdown, SourceUrlDropdown },
    methods: {
        // 编辑进来的内容
      getlistdata(){
        this.$get('articles/'+this.id).then((res) => {
            console.log(res)
            if(res.code===1){
                this.tableData = res.info;
                console.log( this.tableData)
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
       // 自定义上传方法
       addAttachment ( file ) {
        // 用于显示图片
        this.imageUrl = URL.createObjectURL(file.file);
        console.log( this.imageUrl )
        //保存一份文件信息，用于上传
        this.fileData = file.file;
        console.log( this.fileData)
        var formData = new FormData();  
        formData.append("file", this.fileData);
        axios({
            method: 'post',
            url: 'http://47.103.61.179:1081/generals/upload-file-and-to-aliyun_oss?type=article',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' , 'Authorization': 'Bearer ' + localStorage.getItem('token')}}
          })
          .then((response)=>{
                console.log(response)
                if(response.data.code==1){
                    this.imageurl = response.data.info.url;
                    this.res = response.data.info.url;
                    console.log(this.res)
                    this.$message({
                            message: "上传成功",
                            type: 'success'
                        });
                        // 获取富文本组件实例
                      let quill = this.$refs.QuillEditor.quill
                      console.log(quill)
                      // 如果上传成功
                       // 获取光标所在位置
                       let length = quill.getSelection().index;
                          // 插入图片，res为服务器返回的图片链接地址
                          quill.insertEmbed(length, 'image', this.res)
                          // 调整光标到最后
                          quill.setSelection(length + 1)
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
                    url: 'http://47.103.61.179:1081/generals/upload-file-and-to-aliyun_oss?type=article',
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
       //提交数据
       onSubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$post('articles', {
                       title:this.form.title,
                       content:this.form.content,
                       origin:this.form.origin,
                       preview_image:this.imageurl1,
                       author:this.form.author,
                       desc:this.form.desc
                    }).then((res) => {
                        console.log(res)
                        if(res.code === 1){
                            this.$message({
                                message: res.message,
                                type: 'success'
                            });
                            this.$router.push("/articlelist")
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
                    this.$put('articles/'+this.id, {
                       title:this.form.title,
                       content:this.form.content,
                       origin:this.form.origin,
                       preview_image:this.imageurl1?this.imageurl1:this.tableData.preview_image,
                       author:this.form.author,
                       desc:this.form.desc
                    }).then((res) => {
                        console.log(res)
                        if(res.code === 1){
                            this.$message({
                                message: res.message,
                                type: 'success'
                            });
                            this.$router.push("/articlelist")
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

<style  >
.handle-box { margin-bottom: 20px;}
.handle-select {width: 120px;}
.handle-input {width: 300px;display: inline-block;}
.del-dialog-cnt{font-size: 16px; text-align: center;}
.el-icon-edit-outline{color:#ffc966; font-size:24px; margin-right:10px;}
.el-icon-info{color:#448eff; font-size:24px;}

</style>
<style>
.item-title{ height:42px; background:#f6f6f6; margin-bottom:20px;}
.item-title span{ font-size:14px; color:#666; height:22px; line-height:22px;display:block; margin:10px 0 0 20px; border-left:5px solid #ff7070; padding-left:10px;}
.upload-demo{
  display: none;
}
.ql-toolbar.ql-snow + .ql-container.ql-snow{
    height: 800px!important;
}

</style>
