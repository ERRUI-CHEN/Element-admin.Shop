import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */

// constantRouterMap：主要是通用部分，每个用户都有的页面
export const constantRoutes = [{
        path: '/login',
        component: () =>
            import ('@/views/login/index'),
        hidden: true
    },

    {
        path: '/404',
        component: () =>
            import ('@/views/404'),
        hidden: true
    },

    {
        path: '/',
        component: Layout,
        redirect: '/home',
        children: [{
            path: 'home',
            name: 'home',
            component: () =>
                import ('@/views/home/index'),
            meta: { title: '首页', icon: 'dashboard' }
        }]
    },

    {
        path: '/users',
        component: Layout,
        redirect: '/users/index',
        name: 'users',
        meta: { title: '用户', icon: 'user' },
        children: [{
            path: 'editor',
            name: 'users_editor',
            component: () =>
                import ('@/views/users/editor'),
            meta: { title: '编辑信息', icon: 'form' }
        }]
    },



    {
        path: '/goods',
        component: Layout,
        redirect: '/goods/goodslist',
        name: 'invest',
        meta: {
            title: '商品',
            icon: 'strikethrough'
        },
        children: [{
                path: 'goodslist',
                component: () =>
                    import ('@/views/goods/goodslist'), // Parent router-view
                name: 'areaInvest',
                meta: { title: '商品列表', icon: 'form' },
            },
            {
                path: 'goodclass',
                name: 'goodclass',
                component: () =>
                    import ('@/views/goods/goodclass/index'),
                meta: { title: '商品分类', icon: 'product-cate' }
            },
            {
                path: 'addGoodClass',
                name: 'addGoodClass',
                component: () =>
                    import ('@/views/goods/goodclass/add'),
                meta: { title: '添加商品分类' },
                hidden: true
            },
            {
                path: 'updateGoodClass',
                name: 'updateGoodClass',
                component: () =>
                    import ('@/views/goods/goodclass/edit'),
                meta: { title: '修改商品分类' },
                hidden: true
            },
            {
                path: 'addgoods',
                component: () =>
                    import ('@/views/goods/addgoods'),
                meta: { title: '添加商品', icon: 'form' }
            },
            {
                path: 'editgoods',
                hidden: true,
                component: () =>
                    import ('@/views/goods/editgoods'),
                meta: { title: '编辑商品', icon: 'form' }
            }
        ]
    },

    {
        path: '/order',
        component: Layout,
        redirect: '/order/orderlist',
        name: 'order',
        meta: {
            title: '订单',
            icon: 'file-text'
        },
        children: [{
                path: 'orderlist',
                component: () =>
                    import ('@/views/order/orderlist'), // Parent router-view
                name: 'order_list',
                meta: { title: '订单列表', icon: 'eye' },
            },
            {
                path: 'orderdetail',
                component: () =>
                    import ('@/views/order/orderdetail'), // Parent router-view
                name: 'order_detail',
                meta: { title: '订单详情', icon: 'eye' },
                hidden: true
            },
            {
                path: 'returngoods',
                component: () =>
                    import ('@/views/order/returngoods'),
                name: 'return_goods',
                meta: {
                    title: '退货申请列表',
                    icon: 'form'
                }
            }
        ]
    },
    {
        path: '/coupon',
        component: Layout,
        redirect: '/coupon',
        children: [
            {
            path: 'coupon',
            name: 'coupon',
            component: () =>
                import ('@/views/coupon/index'),
            meta: { title: '优惠券管理', icon: 'dashboard' }
            },
            {
                path: 'add',
                name: 'add',
                component: () =>
                    import ('@/views/coupon/add'),
                meta: { title: '添加', icon: 'dashboard' },
                hidden:true
            }
          
        ]
    },
    // 404 page must be placed at the end !!!
    { path: '*', redirect: '/404', hidden: true }
]

// asyncRouterMap：需要进行权限过滤的页面
export const asyncRoutes = [{
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
        title: 'Permission',
        icon: 'tree',
        roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [{
            path: 'page',
            component: () =>
                import ('@/views/permission/page'),
            name: 'PagePermission',
            meta: {
                title: 'Page Permission',
                roles: ['admin'] // or you can only set roles in sub nav
            }
        },
        {
            path: 'directive',
            component: () =>
                import ('@/views/permission/directive'),
            name: 'DirectivePermission',
            meta: {
                title: 'Directive Permission'
                    // if do not set roles, means: this page does not require permission
            }
        }
    ]
}]

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router