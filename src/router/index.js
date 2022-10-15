import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Welcome from '../views/home/Welcome.vue'
import Category from '../views/home/Category.vue'
import Article2 from '../views/home/Article2.vue'
import Log from '../views/home/Log.vue'
import Clocklog from '../views/home/Clocklog.vue'
import ArticleDetail from '../views/home/ArticleDetail/ArticleDetail.vue'
import My from '../views/home/my/My.vue'
import MyUser from '../views/home/my/MyUser.vue'
import MyAvatar from '../views/home/my/MyAvatar.vue'
import MyArticle from '../views/home/my/MyArticle.vue'
import MyAuthentication from '../views/home/my/MyAuthentication.vue'
import MyComment from '../views/home/my/MyComment.vue'
import NotFound from '../views/NotFound.vue'
import Friend from '../views/home/Friend.vue'
const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/register',
        name: 'register',
        component: Register
    },
    {
        path: '/home',
        name: 'home',
        component: Home,
        redirect: '/welcome',
        children: [
            {path: '/welcome', name: 'welcome', component: Welcome},
            {path: '/category', name: 'category', component: Category},
            {path: '/article2', component: Article2},
            {path: '/log', component: Log},
            {path: '/clocklog', component: Clocklog},
            {path: '/articleDetail/:id', name: 'ArticleDetail', component: ArticleDetail},
            {
                path: '/my',
                name: 'My',
                component: My,
                redirect: '/my/myUser',
                children: [
                    {path: '/my/myUser', name: 'MyUser', component: MyUser},
                    {path: '/my/myAvatar', name: 'MyAvatar', component: MyAvatar},
                    {path: '/my/myArticle', name: 'MyArticle', component: MyArticle},
                    {path: '/my/myAuthentication', name: 'MyAuthentication', component: MyAuthentication},
                    {path: '/my/myComment', name: 'MyComment', component: MyComment},
                ]
            },
            {
                path: '/friend',
                name: 'friend',
                component: Friend
                // redirect: '/friend/friend',
                // children: [
                //     {path: '/my/myUser', name: 'MyUser', component: MyUser},
                //     {path: '/my/myAvatar', name: 'MyAvatar', component: MyAvatar},
                //     {path: '/my/myArticle', name: 'MyArticle', component: MyArticle},
                //     {path: '/my/myAuthentication', name: 'MyAuthentication', component: MyAuthentication},
                //     {path: '/my/myComment', name: 'MyComment', component: MyComment},
                // ]
            },
        ]
    },
    {
        path: '/:pathMatch(.*)',
        component: NotFound
    }


]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    // if (to.path === '/login') return next()
    // if (to.path === '/reg') return next()
    // let tokenStr = window.sessionStorage.getItem('token')
    // if (!tokenStr) return next('/login')
    next()
})
export default router
