export default[{
    path:'/',
    name:'首页',
    component:(resolve) => require(['../views/index'], resolve),
    children:[{
        path:'/system',
        name:'系统管理',
        meta:{
            name:'系统管理',
            icon:'user',
            code:'10-10'
        },
        component:(resolve) => require(['../views/shop/index'],resolve),
        children:[
            {
              path:'user',
              name:'用户管理',
              meta:{
                  name:'用户管理',
                  code:'10-10-10'
              },
              component:(resolve) => require(['../views/shop/add'],resolve)
            },
            {
                path:'role',
                name:'角色管理',
                meta:{
                    name:'角色管理',
                    code:'10-10-11'
                },
                component:(resolve) => require(['../views/shop/cc'],resolve)
            }
            
        ]
    },{
        path:'/goods',
        name:'商品管理',
        meta:{
            name:'商品管理'
        },
        component:(resolve) => require(['../views/shop/cc'],resolve)
    }]
},
    {
        path:'/404',
        name:'404',
        component:(resolve) => require(['../views/user/index'], resolve),
    }
]
