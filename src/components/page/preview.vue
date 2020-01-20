<template>
        <div class="container">
          <div class="container-title">文章预览</div>	
            <el-form :model="form" ref="form" enctype="multipart/form-data" :rules="rules" class="item-add-list">
              <el-form-item  prop="title">
                  <el-input v-model.trim="form.title" type="text" placeholder="请输入标题"></el-input>
                </el-form-item>	 
                <el-form-item  prop="orgin">
                        <el-input v-model.trim="form.orgin" type="text" placeholder="请输入文章来源"></el-input>
                      </el-form-item>	   
              <el-form-item  prop="content">
                  <el-upload class="upload-demo" :on-preview="handlePreview" :on-remove="handleRemove"  :file-list="fileList" list-type="picture" :on-change="handleChange" :http-request="addAttachment" :on-success="handleSuccess"> 
                      <el-button size="small" type="primary" style="margin-bottom: 10px;">点击上传图片</el-button>
                      </el-upload>  
                       <quill-editor class="editor" ref="QuillEditor" v-model="form.content" :options="editorOption" ></quill-editor>
                       <!-- <p v-html="form.content">{{form.content}}</p> -->
            </el-form-item>
      
              <!-- <el-form-item prop="content" style="margin-bottom: 30px;">
                <Tinymce ref="editor" v-model="form.content" :height="400" />
              </el-form-item> -->
      
                    
            </el-form>
            </div>
        </div>
    </template>
    
    <script>
      // import Tinymce from '../common/Tinymce/index.vue'
        import 'quill/dist/quill.core.css';
        import 'quill/dist/quill.snow.css';
        import 'quill/dist/quill.bubble.css';
        import { quillEditor } from 'vue-quill-editor';	
    
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
                                      document.querySelector('.el-upload').click()
                                      // alert('自定义图片')
                                  } else {
                                      this.quill.format('image', false);
                                  }
                              }
                          }
                      }
                  }
              } ,    	
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
              orgin:""
              },
              id:"",
              res:"",
          }
        },
        created(){
          this.id = this.$route.query.id
          if(this.id){
              this.getlistdata()
          }
        },
        computed: {
            editor() {
                return this.$refs.myQuillEditor.quill
            }
        },
        // components: { Tinymce, MDinput, Upload, Sticky, Warning, CommentDropdown, PlatformDropdown, SourceUrlDropdown },
        methods: {
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
                url: 'http://47.103.61.179:1081/upload-to-aliyun_oss?type=article',
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
           //提交数据
           onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$post('articles', {
                           title:this.form.title,
                           content:this.form.content,
                           orgin:this.form.orgin
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
                        return false;
                    }
                });
            },
            // 编辑
            onEdit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$put('articles', {
                           title:this.form.title,
                           content:this.form.content,
                           orgin:this.form.orgin
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
                        return false;
                    }
                });
            },
        }
      }
    </script>
    
    <style scoped>
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
    
    
    </style>
    