<template>
	<div class="container">
      <div class="container-title">新增文章</div>
        <el-form :model="form" ref="form" enctype="multipart/form-data" :rules="rules" class="item-add-list">
          <el-form-item  prop="title" label="请输入标题">
              <el-input v-model.trim="form.title" type="text" placeholder="请输入标题"></el-input>
            </el-form-item>
            <!-- <el-form-item  prop="author">
                <el-input v-model.trim="form.author" type="text" placeholder="请输入作者"></el-input>
              </el-form-item>	 -->
              <el-form-item  prop="desc" label="请输入概述">
                    <!-- <el-input type="text"  placeholder="请输入概述" v-model.trim="form.desc" maxlength="20" show-word-limit></el-input> -->
                    <el-input v-model.trim="form.desc" type="text" placeholder="请输入概述" ></el-input>
              </el-form-item>
            <el-form-item  prop="origin" label="请输入文章来源">
                    <el-input v-model.trim="form.origin" type="text" placeholder="请输入文章来源"></el-input>
                  </el-form-item>
                  <el-form-item  prop="creater" label="请输入用户ID">
                        <el-input v-model.trim="form.creater" type="text" placeholder="请输入用户ID"></el-input>
                      </el-form-item>
                      <el-form-item  prop="type" label="请选择类型">
                        <el-select v-model="form.type" placeholder="请选择类型" v-loadmore="loadMore" filterable>
                                <template v-for="item in typedata">
                                    <el-option :key="item.id" :label="item.at_name" :value="item.at_id"></el-option>
                                </template>
                        </el-select>
                        </el-form-item>
                        <el-form-item  prop="type" label="请选择是否精选">
                            <el-select v-model="form.premium" placeholder="请选择是否精选" filterable>
                                    <template v-for="item in premiumdata">
                                        <el-option :key="item.id" :label="item.name" :value="item.id"></el-option>
                                    </template>
                            </el-select>
                        </el-form-item>
                        <el-form-item  prop="label_id_list" label="请选择标签">
                            <el-select v-model="form.label_id_list" multiple filterable allow-create default-first-option placeholder="请选择文章标签" @change="addkeywords">
                                <el-option v-for="item in keywordsdata" :key="item.id" :label="item.name" :value="item.name"></el-option>
                            </el-select>
                            <!-- <el-select
                            v-model="value10"
                            multiple
                            filterable
                            allow-create
                            default-first-option
                            placeholder="请选择文章标签">
                            <el-option
                              v-for="item in options5"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select> -->
                            <!-- <el-select v-model="form.label_id_list" placeholder="请选择标签" v-loadmore="loadMore" multiple filterable>
                                <template v-for="item in keywordsdata">
                                    <el-option :key="item.id" :label="item.name" :value="item.id"></el-option>
                                </template>
                            </el-select> -->
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
   Vue.directive('loadmore', {
　　　　bind(el, binding) {

　　　　// 获取element-ui定义好的scroll盒子
　　　　const SELECTWRAP_DOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap');

　　　　SELECTWRAP_DOM.addEventListener('scroll', function() {

        /*
        * scrollHeight 获取元素内容高度(只读)
        * scrollTop 获取或者设置元素的偏移值,常用于, 计算滚动条的位置, 当一个元素的容器没有产生垂直方向的滚动条, 那它的scrollTop的值默认为0.
        * clientHeight 读取元素的可见高度(只读)
        * 如果元素滚动到底, 下面等式返回true, 没有则返回false:
        * ele.scrollHeight - ele.scrollTop === ele.clientHeight;
        */
    　　　　const CONDITION = this.scrollHeight - this.scrollTop <= this.clientHeight;

    　　　　if(CONDITION) {
    　　　　　　binding.value();
    　　　　}
    　　　});
    　　}
    })

  // import Tinymce from '../common/Tinymce/index.vue'
	import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import 'quill/dist/quill.bubble.css';
    import { quillEditor } from 'vue-quill-editor';
    import { addQuillTitle } from '../quill-title.js'

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
              },
              them: 'snow',
              readOnly:true,
          } ,
        hideUpload: false,
        limitCount:1,
        form:{
          label_id_list:"",
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
          origin:"",
          preview_image:"",
          author:"",
          desc:"",
          creater:"",
          type:"",
          ak_id_list:"",
          premium:0,
        },
        keywordsdata:"",
        typedata:"",
        id:"",
        res:"",
        imageList:"",
        imageurl1:"",
        uploadurl:"http://service.xykj1.com/",
        premiumdata:[{
            id:0,
            name:"非精选",
        },{
            id:1,
            name:"精选",
        }],
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
      this.gettypedata()
      this.getkeywordsdata()
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
        addkeywords(){
            this.$post('labels', {
                name: this.form.label_id_list,
            }).then((res) => {
                console.log(res)
                if(res.code === 1){
                    // this.getkeywordsdata()
                    this.$message({
                        message: res.message,
                        type: 'success'
                    });
                    // this.$router.push("/keywords")
                }else{
                    this.$message.error(res.message);
                }
            })
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
            this.$get('article-types?is_del=0').then((res) => {
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
        this.$get('articles/'+this.id+'?expand=label_id_list').then((res) => {
            console.log(res)
            if(res.code===1){
                this.tableData = res.info.items[0];
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
            url: this.uploadurl+'generals/upload-file-and-to-aliyun_oss?type=article',
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
                    url: this.uploadurl+'generals/upload-file-and-to-aliyun_oss?type=article',
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
                    console.log(this.form.label_id_list)
                    // console.log(this.form.label_id_list)
                    this.$post('articles', {
                       title:this.form.title,
                       content:this.form.content,
                       origin:this.form.origin,
                       preview_image:this.imageurl1,
                       label_id_list:this.form.label_id_list,
                       status:0,
                       type:this.form.type,
                    //    author:this.form.author,
                        premium:this.form.premium,
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
                    //    status:0,
                       title:this.form.title,
                       content:this.form.content,
                       origin:this.form.origin,
                       type:this.form.type,
                       label_id_list:this.form.label_id_list,
                       preview_image:this.imageurl1?this.imageurl1:this.tableData.preview_image,
                       premium:this.form.premium,
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
