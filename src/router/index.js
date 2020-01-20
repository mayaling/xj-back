//import Vue from 'vue';
//import Router from 'vue-router';

Vue.use(VueRouter);

export default new VueRouter({
    //mode:'history',
    //base:'/dist/',
    routes: [{
            path: '/',
            redirect: '/Dashboard'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: 'home' },
            children: [{
                    path: '/Dashboard',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: { title: '首页', admin: true }
                },
                {
                    path: '/articlelist',
                    component: resolve => require(['../components/page/article/articlelist.vue'], resolve),
                    meta: { title: '文章列表', admin: true }
                }, {
                    path: '/comment',
                    component: resolve => require(['../components/page/article/comment.vue'], resolve),
                    meta: { title: '评论列表', admin: true }
                }, {
                    path: '/replylist',
                    component: resolve => require(['../components/page/article/replylist.vue'], resolve),
                    meta: { title: '回复列表', admin: true }
                }, {
                    path: '/article',
                    component: resolve => require(['../components/page/article/editarticle.vue'], resolve),
                    meta: { title: '新增文章', admin: true }
                },{
                    path: '/type',
                    component: resolve => require(['../components/page/article/type.vue'], resolve),
                    meta: { title: '类型管理', admin: true }
                },{
                    path: '/edittype',
                    component: resolve => require(['../components/page/article/edittype.vue'], resolve),
                    meta: { title: '新增类型', admin: true }
                },{
                    path: '/keywords',
                    component: resolve => require(['../components/page/article/keywords.vue'], resolve),
                    meta: { title: '关键字管理', admin: true }
                },{
                    path: '/editkeywords',
                    component: resolve => require(['../components/page/article/editkeywords.vue'], resolve),
                    meta: { title: '新增关键词', admin: true }
                },{
                    path: '/tinymce',
                    component: resolve => require(['../components/page/Tinymce/index.vue'], resolve),
                    meta: { title: '新增文章', admin: true }
                },{
                    path: '/articlelisttest',
                    component: resolve => require(['../components/page/article/articlelisttest.vue'], resolve),
                    meta: { title: '富文本测试', admin: true }
                },{
                    path: '/userlist',
                    component: resolve => require(['../components/page/user/userlist.vue'], resolve),
                    meta: { title: '用户列表', admin: true }
                },{
                    path: '/suit',
                    component: resolve => require(['../components/page/user/suit.vue'], resolve),
                    meta: { title: '马甲用户', admin: true }
                },{
                    path: '/feedback',
                    component: resolve => require(['../components/page/user/feedback.vue'], resolve),
                    meta: { title: '马甲用户', admin: true }
                },{
                    path: '/liuyan',
                    component: resolve => require(['../components/page/user/liuyan.vue'], resolve),
                    meta: { title: '马甲用户', admin: true }
                },{
                    path: '/banner',
                    component: resolve => require(['../components/page/App/banner.vue'], resolve),
                    meta: { title: 'banner管理', admin: true }
                },{
                    path: '/activity',
                    component: resolve => require(['../components/page/App/activity.vue'], resolve),
                    meta: { title: '活动管理', admin: true }
                },{
                    path: '/editactivity',
                    component: resolve => require(['../components/page/App/editactivity.vue'], resolve),
                    meta: { title: '活动管理', admin: true }
                },
                {
                    path: '/moneygroups',
                    component: resolve => require(['../components/page/App/moneygroups.vue'], resolve),
                    meta: { title: '圈子管理', admin: true }
                },  {
                    path: '/moneygrouptype',
                    component: resolve => require(['../components/page/App/moneygrouptype.vue'], resolve),
                    meta: { title: '领域管理', admin: true }
                },  {
                    path: '/editmoneygrouptype',
                    component: resolve => require(['../components/page/App/editmoneygrouptype.vue'], resolve),
                    meta: { title: '领域管理', admin: true }
                }, {
                    path: '/editbanner',
                    component: resolve => require(['../components/page/App/editbanner.vue'], resolve),
                    meta: { title: '领域管理', admin: true }
                }, {
                    path: '/businesscard',
                    component: resolve => require(['../components/page/App/businesscard.vue'], resolve),
                    meta: { title: '名片管理', admin: true }
                },{
                    path: '/editbusinesscard',
                    component: resolve => require(['../components/page/App/editbusinesscard.vue'], resolve),
                    meta: { title: '名片管理', admin: true }
                },{
                    path: '/editbusinesscard',
                    component: resolve => require(['../components/page/App/editbusinesscard.vue'], resolve),
                    meta: { title: '名片管理', admin: true }
                },{
                    path: '/appclick',
                    component: resolve => require(['../components/page/App/appclick.vue'], resolve),
                    meta: { title: 'app点击', admin: true }
                },{
                    path: '/articletype',
                    component: resolve => require(['../components/page/App/articletype.vue'], resolve),
                    meta: { title: '文章专题', admin: true }
                },{
                    path: '/editarticletype',
                    component: resolve => require(['../components/page/App/editarticletype.vue'], resolve),
                    meta: { title: '编辑文章专题', admin: true }
                },{
                    path: '/interest',
                    component: resolve => require(['../components/page/App/interest.vue'], resolve),
                    meta: { title: '权益列表', admin: true }
                },{
                    path: '/editinterest',
                    component: resolve => require(['../components/page/App/editinterest.vue'], resolve),
                    meta: { title: '权益列表', admin: true }
                },{
                    path: '/interesttype',
                    component: resolve => require(['../components/page/App/interesttype.vue'], resolve),
                    meta: { title: '权益列表', admin: true }
                },{
                    path: '/editinteresttype',
                    component: resolve => require(['../components/page/App/editinteresttype.vue'], resolve),
                    meta: { title: '权益列表', admin: true }
                },{
                    path: '/interestcard',
                    component: resolve => require(['../components/page/App/interestcard.vue'], resolve),
                    meta: { title: '权益列表', admin: true }
                },{
                    path: '/editinterestcard',
                    component: resolve => require(['../components/page/App/editinterestcard.vue'], resolve),
                    meta: { title: '权益列表', admin: true }
                },{
                    path: '/violation',
                    component: resolve => require(['../components/page/user/violation.vue'], resolve),
                    meta: { title: '违规用户', admin: true }
                },{
                    path: '/bangtype',
                    component: resolve => require(['../components/page/bang/bangtype.vue'], resolve),
                    meta: { title: 'bang类型', admin: true }
                },{
                    path: '/editbangtype',
                    component: resolve => require(['../components/page/bang/editbangtype.vue'], resolve),
                    meta: { title: 'bang类型', admin: true }
                },{
                    path: '/bangbackimg',
                    component: resolve => require(['../components/page/bang/bangbackimg.vue'], resolve),
                    meta: { title: 'bang类型', admin: true }
                },{
                    path: '/editbackimg',
                    component: resolve => require(['../components/page/bang/editbackimg.vue'], resolve),
                    meta: { title: 'bang类型', admin: true }
                },{
                    path: '/upload',
                    component: resolve => require(['../components/page/bang/upload.vue'], resolve),
                    meta: { title: 'bang类型', admin: true }
                },{
                    path: '/editbackimg',
                    component: resolve => require(['../components/page/bang/editbackimg.vue'], resolve),
                    meta: { title: 'bang类型', admin: true }
                },{
                    path: '/bangbanner',
                    component: resolve => require(['../components/page/bang/bangbanner.vue'], resolve),
                    meta: { title: 'bang轮播', admin: true }
                },{
                    path: '/push',
                    component: resolve => require(['../components/page/bang/push.vue'], resolve),
                    meta: { title: '推送', admin: true }
                },{
                    path: '/banglist',
                    component: resolve => require(['../components/page/bang/banglist.vue'], resolve),
                    meta: { title: '推送', admin: true }
                },{
                    path: '/editbang',
                    component: resolve => require(['../components/page/bang/editbang.vue'], resolve),
                    meta: { title: '推送', admin: true }
                },{
                    path: '/editpush',
                    component: resolve => require(['../components/page/bang/editpush.vue'], resolve),
                    meta: { title: '推送', admin: true }
                },{
                    path: '/editbangbanner',
                    component: resolve => require(['../components/page/bang/editbangbanner.vue'], resolve),
                    meta: { title: '编辑bang轮播', admin: true }
                },{
                    path: '/replylist',
                    component: resolve => require(['../components/page/replylist.vue'], resolve),
                    meta: { title: '今日实时', admin: true }
                }, {
                    path: '/preview',
                    component: resolve => require(['../components/page/preview.vue'], resolve)
                },{
                    path: '/channelhistory',
                    component: resolve => require(['../components/page/statistics/channelhistory.vue'], resolve),
                    meta: { title: '渠道历史', admin: true }
                },{
                    path: '/audiolist',
                    component: resolve => require(['../components/page/audio/audiolist.vue'], resolve),
                    meta: { title: '电台列表', admin: true }
                },{
                    path: '/editaudio',
                    component: resolve => require(['../components/page/audio/editaudio.vue'], resolve),
                    meta: { title: '电台列表', admin: true }
                },{
                    path: '/addaudio',
                    component: resolve => require(['../components/page/audio/addaudio.vue'], resolve),
                    meta: { title: '电台列表', admin: true }
                },{
                    path: '/radiobalnk',
                    component: resolve => require(['../components/page/audio/blank.vue'], resolve),
                    meta: { title: '电台列表', admin: true }
                },
                {
                    path: '/audiocommentslist',
                    component: resolve => require(['../components/page/audio/audiocommentslist.vue'], resolve),
                    meta: { title: '电台列表', admin: true }
                },
                {
                    path: '/pc',
                    component: resolve => require(['../components/page/pc/pc.vue'], resolve),
                    meta: { title: 'pc管理列表', admin: true }
                },  {
                    path: '/weeknewslogo',
                    component: resolve => require(['../components/page/pc/weeknewslogo.vue'], resolve),
                    meta: { title: 'pc资讯图管理', admin: true }
                },
                {
                    path: '/editweeknewslogo',
                    component: resolve => require(['../components/page/pc/editweeknewslogo.vue'], resolve),
                    meta: { title: 'pc资讯图管理', admin: true }
                },
                {
                    path: '/weeknews',
                    component: resolve => require(['../components/page/pc/weeknews.vue'], resolve),
                    meta: { title: 'pc管理列表', admin: true }
                },
                {
                    path: '/editweeknews',
                    component: resolve => require(['../components/page/pc/editweeknews.vue'], resolve),
                    meta: { title: 'pc管理列表', admin: true }
                },
                {
                    path: '/editpc',
                    component: resolve => require(['../components/page/pc/editpc.vue'], resolve),
                    meta: { title: 'pc管理列表', admin: true }
                },
                {
                    path: '/editpcbanner',
                    component: resolve => require(['../components/page/pc/editpcbanner.vue'], resolve),
                    meta: { title: 'pc管理列表', admin: true }
                },
                {
                    path: '/indexbanner',
                    component: resolve => require(['../components/page/pc/indexbanner.vue'], resolve),
                    meta: { title: 'pc管理列表', admin: true }
                },
                {
                    path: '/editindexbanner',
                    component: resolve => require(['../components/page/pc/editindexbanner.vue'], resolve),
                    meta: { title: 'pc管理列表', admin: true }
                },  {
                    path: '/pcbangbaner',
                    component: resolve => require(['../components/page/pc/pcbangbaner.vue'], resolve),
                    meta: { title: 'pc管理列表', admin: true }
                },
                {
                    path: '/editpcbangbanner',
                    component: resolve => require(['../components/page/pc/editpcbangbanner.vue'], resolve),
                    meta: { title: 'pc管理列表', admin: true }
                },

            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },

        {
            path: '/index',
            component: resolve => require(['../components/page/index.vue'], resolve),
            meta: { title: '首页' }
        },
        {
            path: '/404',
            component: resolve => require(['../components/page/404.vue'], resolve)
        },
        {
            path: '/403',
            component: resolve => require(['../components/page/403.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
