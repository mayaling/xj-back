<template>
       
    </template>
    
    <script>
        export default {
            data() {
                return {
                    radio:"",
                    radio_id:"",
                    cur_page:"",
                }
            },
            created() {
                this.radio = this.$route.query.radio
                this.radio_id = this.$route.query.radio_id
                this.cur_page = this.$route.query.cur_page

                this.goback()
            },
            methods: {
                goback(){
                    this.$router.push({path: '/editaudio', query: {radio:this.radio,cur_page:this.cur_page,radio_id:this.radio_id}});
                }
            }
        }
    </script>
          
          