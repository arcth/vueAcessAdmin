import Vue from 'vue'
import iView from 'iview';
import Router from 'vue-router'
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
    iView.LoadingBar.start();
    window.document.title = (routerName ? routerName : '');
    next();
})
router.afterEach(() => {
    iView.LoadingBar.finish();
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
