import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
Vue.use(Router)

let baseRoute = [{
    path:'/login',
    name:'login',
    component:(resolve)=>require(['../views/login'],resolve)
}]
let router = new Router({
    routes:baseRoute
})
router.beforeEach((to,from,next)=>{
    let routerName = to.meta.name || to.name;
    window.document.title = (routerName ? routerName : 'vueAdmin');
    next();
})
export default router;
// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'HelloWorld',
//       component: HelloWorld
//     }
//   ]
// })
