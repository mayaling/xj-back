<template>
        <div class="container">
                <div class="container-title">新增文章</div>	
                  <el-form :model="form" ref="form" enctype="multipart/form-data" :rules="rules" class="item-add-list">
                    <el-form-item  prop="title">
                        <el-input v-model.trim="form.title" type="text" placeholder="请输入标题"></el-input>
                      </el-form-item>	 
                      <!-- <el-form-item  prop="author">
                          <el-input v-model.trim="form.author" type="text" placeholder="请输入作者"></el-input>
                        </el-form-item>	 -->
                        <el-form-item  prop="desc">
                              <!-- <el-input type="text"  placeholder="请输入概述" v-model.trim="form.desc" maxlength="20" show-word-limit></el-input> -->
                              <el-input v-model.trim="form.desc" type="text" placeholder="请输入概述"></el-input>
                        </el-form-item>	 
                      <el-form-item  prop="orgin">
                              <el-input v-model.trim="form.origin" type="text" placeholder="请输入文章来源"></el-input>
                            </el-form-item>
                            <el-form-item  prop="creater">
                                  <el-input v-model.trim="form.creater" type="text" placeholder="请输入用户ID"></el-input>
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
                          <!-- <el-upload class="upload-demo" :on-preview="handlePreview" :on-remove="handleRemove"  :file-list="fileList" list-type="picture" :on-change="handleChange" :http-request="addAttachment" :on-success="handleSuccess"> 
                              <el-button size="small" id="upload" type="primary" style="margin-bottom: 10px;">点击上传图片</el-button>
                          </el-upload>   -->
                          <!-- <Tinymce ref="editor" v-model="form.content" height="400" /> -->
                          <div :class="{fullscreen:fullscreen}" class="tinymce-container" :style="{width:containerWidth}" >
                                <textarea :id="tinymceId" class="tinymce-textarea"  v-model="form.content"/>
                                <div class="editor-custom-btn-container">
                                  <editorImage color="#1890ff" class="editor-upload-btn" @successCBK="imageSuccessCBK" />
                                </div>
                              </div>
                             <!-- <quill-editor class="editor" ref="QuillEditor" v-model="form.content" :options="editorOption" ></quill-editor> -->
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
      /**
       * docs:
       * https://panjiachen.github.io/vue-element-admin-site/feature/component/rich-editor.html#tinymce
       * 
       * 
       */
      import editorImage from '../Tinymce/components/EditorImage.vue'

    //   import Tinymce from '@/components/Tinymce'
      
      import plugins from '../Tinymce/plugins.js'

    //   import toolbar from './toolbar'

      import toolbar from '../Tinymce/toolbar.js'

    //   import load from './dynamicLoadScript'

      import load from '../Tinymce/dynamicLoadScript.js'

      
      
      // why use this cdn, detail see https://github.com/PanJiaChen/tinymce-all-in-one
      const tinymceCDN = 'https://cdn.jsdelivr.net/npm/tinymce-all-in-one@4.9.3/tinymce.min.js'
      
      export default {
        name: 'Tinymce',
        components: { editorImage },
        props: {
          id: {
            type: String,
            default: function() {
              return 'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')
            }
          },
          value: {
            type: String,
            default: ''
          },
          toolbar: {
            type: Array,
            required: false,
            default() {
              return []
            }
          },
          menubar: {
            type: String,
            default: 'file edit insert view format table'
          },
          height: {
            type: [Number, String],
            required: false,
            default: 360
          },
          width: {
            type: [Number, String],
            required: false,
            default: 'auto'
          }
        },
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
            hideUpload: false,
            hasChange: false,
            hasInit: false,
            tinymceId: this.id,
            fullscreen: false,
            languageTypeList: {
              'en': 'en',
              'zh': 'zh_CN',
              'es': 'es_MX',
              'ja': 'ja'
            },
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
                desc:"",
                creater:""
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
        computed: {
          containerWidth() {
            const width = this.width
            if (/^[\d]+(\.[\d]+)?$/.test(width)) { // matches `100`, `'100'`
              return `${width}px`
            }
            return width
          }
        },
        watch: {
          value(val) {
            if (!this.hasChange && this.hasInit) {
              this.$nextTick(() =>
                window.tinymce.get(this.tinymceId).setContent(val || ''))
            }
          }
        },
        mounted() {
          this.init()
        },
        activated() {
          if (window.tinymce) {
            this.initTinymce()
          }
        },
        deactivated() {
          this.destroyTinymce()
        },
        destroyed() {
          this.destroyTinymce()
        },
        methods: {
          init() {
            // dynamic load tinymce from cdn
            load(tinymceCDN, (err) => {
              if (err) {
                this.$message.error(err.message)
                return
              }
              this.initTinymce()
            })
          },
          initTinymce() {
            const _this = this
            window.tinymce.init({
              selector: `#${this.tinymceId}`,
              language: this.languageTypeList['en'],
              height: this.height,
              body_class: 'panel-body ',
              object_resizing: false,
              toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar,
              menubar: this.menubar,
              plugins: plugins,
              end_container_on_empty_block: true,
              powerpaste_word_import: 'clean',
              code_dialog_height: 450,
              code_dialog_width: 1000,
              advlist_bullet_styles: 'square',
              advlist_number_styles: 'default',
              imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
              default_link_target: '_blank',
              link_title: false,
              nonbreaking_force_tab: true, // inserting nonbreaking space &nbsp; need Nonbreaking Space Plugin
              init_instance_callback: editor => {
                if (_this.value) {
                  editor.setContent(_this.value)
                }
                _this.hasInit = true
                editor.on('NodeChange Change KeyUp SetContent', () => {
                  this.hasChange = true
                  this.$emit('input', editor.getContent())
                })
              },
              setup(editor) {
                editor.on('FullscreenStateChanged', (e) => {
                  _this.fullscreen = e.state
                })
              }
              // 整合七牛上传
              // images_dataimg_filter(img) {
              //   setTimeout(() => {
              //     const $image = $(img);
              //     $image.removeAttr('width');
              //     $image.removeAttr('height');
              //     if ($image[0].height && $image[0].width) {
              //       $image.attr('data-wscntype', 'image');
              //       $image.attr('data-wscnh', $image[0].height);
              //       $image.attr('data-wscnw', $image[0].width);
              //       $image.addClass('wscnph');
              //     }
              //   }, 0);
              //   return img
              // },
              // images_upload_handler(blobInfo, success, failure, progress) {
              //   progress(0);
              //   const token = _this.$store.getters.token;
              //   getToken(token).then(response => {
              //     const url = response.data.qiniu_url;
              //     const formData = new FormData();
              //     formData.append('token', response.data.qiniu_token);
              //     formData.append('key', response.data.qiniu_key);
              //     formData.append('file', blobInfo.blob(), url);
              //     upload(formData).then(() => {
              //       success(url);
              //       progress(100);
              //     })
              //   }).catch(err => {
              //     failure('出现未知问题，刷新页面，或者联系程序员')
              //     console.log(err);
              //   });
              // },
            })
          },
          destroyTinymce() {
            const tinymce = window.tinymce.get(this.tinymceId)
            if (this.fullscreen) {
              tinymce.execCommand('mceFullScreen')
            }
      
            if (tinymce) {
              tinymce.destroy()
            }
          },
          setContent(value) {
            window.tinymce.get(this.tinymceId).setContent(value)
          },
          getContent() {
            window.tinymce.get(this.tinymceId).getContent()
          },
          imageSuccessCBK(arr) {
            const _this = this
            arr.forEach(v => {
              window.tinymce.get(_this.tinymceId).insertContent(`<img class="wscnph" src="${v.url}" >`)
            })
          },
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
                            this.$post('articlesl', {
                            title:this.form.title,
                            content:this.form.content,
                            origin:this.form.origin,
                            preview_image:this.imageurl1,
                            status:0,
                            //    author:this.form.author,
                            desc:this.form.desc,
                            creater:this.form.creater
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
                            //    author:this.form.author,
                            desc:this.form.desc,
                            creater:this.form.creater
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
      
      <style scoped>
      .tinymce-container {
        position: relative;
        line-height: normal;
      }
      .tinymce-container>>>.mce-fullscreen {
        z-index: 10000;
      }
      .tinymce-textarea {
        visibility: hidden;
        z-index: -1;
      }
      .editor-custom-btn-container {
        position: absolute;
        right: 4px;
        top: 4px;
        /*z-index: 2005;*/
      }
      .fullscreen .editor-custom-btn-container {
        z-index: 10000;
        position: fixed;
      }
      .editor-upload-btn {
        display: inline-block;
      }
      </style>
      