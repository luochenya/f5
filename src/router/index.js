import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/index',
    component: () => import('./../views/home'),
    children: [
      {
        path: '/index',
        name: 'index',
        redirect: '/pushInformation',
        // redirect: '/memberCenter',
        component: () => import('./../views/home/index'),
        children: [{
          path: '/pushInformation',
          name: 'pushInformation',
          component: () => import('./../views/home/components/pushInformation')
        },
        {
          path: '/selectedArticleClassification',
          name: 'selectedArticleClassification',
          meta: { title: '應用安全' },
          component: () => import('./../views/home/components/selectedArticleClassification')
        },
        {
          path: '/theLatestNews', // 最新消息
          name: 'theLatestNews',
          meta: { title: '最新消息' },
          component: () => import('./../views/home/components/theLatestNews')
        },
        {
          path: '/theLatestNewsDetails', // 最新消息詳情
          name: 'theLatestNewsDetails',
          meta: { title: '最新消息' },
          component: () => import('./../views/home/components/theLatestNewsDetails')
        },
        {
          path: '/selectedArticlesList', // 首頁精選文章列表
          name: 'selectedArticlesList',
          meta: { title: '精選文章' },
          component: () => import('./../views/home/components/selectedArticlesList')
        },
        {
          path: '/articlesDetails', // 首頁精選文章詳情
          name: 'articlesDetails',
          component: () => import('./../views/home/components/articlesDetails')
        },
        {
          path: '/selectedArticleDetails/:id', // 精選文章詳情
          name: 'selectedArticleDetails',
          component: () => import('./../views/home/components/selectedArticleDetails')
        }
        ]
      },
      {
        path: '/login',
        name: 'login',
        meta: { showNavBar: true },
        component: () => import('./../views/login')
      },
      {
        path: '/forgetPassword',
        name: 'forgetPassword',
        meta: { showNavBar: true },
        component: () => import('./../views/forgetPassword')
      },
      {
        path: '/reset',
        name: 'reset',
        meta: { showNavBar: true },
        component: () => import('./../views/resetPassword')
      },
      {
        path: '/register',
        name: 'register',
        meta: { showNavBar: true },
        component: () => import('./../views/registerMember')
      },
      {
        path: '/downloads', // 下載專區
        name: 'downloads',
        meta: { title: '下載專區' },
        component: () => import('./../views/downloads')
      },
      {
        path: '/memberCenter', // 會員中心
        name: 'memberCenter',
        component: () => import('./../views/memberCenter')
      },
      {
        path: '/myPublishedArticles', // 我發表的文章
        name: 'myPublishedArticles',
        component: () => import('./../views/myPublishedArticles')
      },
      {
        path: '/projectReview', // 專案審核
        name: 'projectReview',
        meta: { title: '專案審核' },
        component: () => import('./../views/projectReview')
      },
      {
        path: '/history', // 歷程記錄
        name: 'history',
        meta: { title: '歷程記錄', showNavBarTow: true },
        component: () => import('./../views/history')
      },
      {
        path: '/projectReviewDetails', // 專案審核详情
        name: 'projectReviewDetails',
        meta: { title: '詳細資料', showNavBarTow: true },
        component: () => import('./../views/projectReviewDetails')
      },
      {
        path: '/projectRegistration', // 專案注册
        name: 'projectRegistration',
        meta: { title: '專案注册', showNavBarTow: true },
        component: () => import('./../views/projectRegistration')
      },
      {
        path: '/historyRegistration', // 專案注册歷程記錄
        name: 'historyRegistration',
        meta: { title: '歷程記錄', showNavBarTow: true },
        component: () => import('./../views/projectRegistration/historyRegistration')
      },
      {
        path: '/projectReviewDetail', // 專案注册详情
        name: 'projectReviewDetail',
        meta: { title: '詳細資料', showNavBarTow: true },
        component: () => import('./../views/projectRegistration/projectReviewDetail')
      },
      {
        path: '/projectApplication', // 專案注册申請
        name: 'projectApplication',
        meta: { title: '申請', showNavBarTow: true },
        component: () => import('./../views/projectRegistration/projectApplication')
        // children: [{
        //   path: '/toApplyFora',
        //   name: 'toApplyFora',
        //   meta: { showNavBarTow: true, keepAlive: true },
        //   component: () => import('./../views/projectRegistration/toApplyForA')
        // },
        // {
        //   path: '/toApplyForb',
        //   name: 'toApplyForb',
        //   meta: { showNavBarTow: true, keepAlive: true },
        //   component: () => import('./../views/projectRegistration/toApplyForB')
        // },
        // {
        //   path: '/toApplyForc',
        //   name: 'toApplyForc',
        //   meta: { showNavBarTow: true, keepAlive: true },
        //   component: () => import('./../views/projectRegistration/toApplyForC')
        // },
        // {
        //   path: '/toApplyFord',
        //   name: 'toApplyFord',
        //   meta: { showNavBarTow: true, keepAlive: true },
        //   component: () => import('./../views/projectRegistration/toApplyForD')
        // }
        // ]
      },
      {
        path: '/publishedAnArticle', // 發表文章
        name: 'publishedAnArticle',
        meta: { title: '發表文章', showNavBarTow: true },
        component: () => import('./../views/publishedAnArticle')
      }

    ]
  }

]

const router = new VueRouter({
  // mode: 'history',
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  //     next()  放行    next('/login')  强制跳转
  if (to.path === '/login') return next()
  if (to.path === '/forgetPassword') return next()
  if (to.path === '/register') return next()
  if (to.path === '/reset') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})
router.afterEach((to, from, next) => { window.scrollTo(0, 0) })
export default router
