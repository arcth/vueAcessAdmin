export default[{
    path:'/',
    name:'首页',
    component:(resolve) => require(['../views/index'], resolve),
    children:[{
        path:'/roles',
        name:'角色管理',
        meta:{
            name:'角色管理'
        },
        component:(resolve) => require(['../views/shop/index'],resolve),
        children:[{
          path:'addRoles',
          name:'添加角色',
          meta:{},
          component:(resolve) => require(['../views/shop/add'],resolve)
        }]
    },{
        path:'/shop',
        name:'商品管理',
        meta:{
            name:'商品管理'
        },
        component:(resolve) => require(['../views/shop/index'],resolve)
    }]
}]
