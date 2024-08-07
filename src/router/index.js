import NProgress from 'nprogress'
import {createRouter, createWebHistory} from 'vue-router'
import { useAuth } from '@/stores'

import { 

  Index, Login, ChangePassword, PermissionsList, PermissionAdd, PermissionEdit, RolesList, RoleAdd, UsersList, UserAdd, UserEdit,

  SubjectList, SubjectAdd, SubjectEdit,

  NewSalesOrder, EditSalesOrder, UnfinishedOrderList, UnapprovedOrderList


} from '@/views'

const routes =[	

    { path: '/',                        name: 'dashboard',               component: Index,               meta: { title: 'Dashboard',                    requiresAuth : true } },
    { path: '/login',                   name: 'login',                   component: Login,               meta: { title: 'Login',                        guest : true } },
    { path: '/change-password',         name: 'change-password',         component: ChangePassword,      meta: { title: 'Change Your Password',         requiresAuth : true } },

    { path: '/permission-list',     name: 'permission-list', component: PermissionsList,  meta: { title: 'All Permission List',  requiresAuth : true } },
    { path: '/permission-add',      name: 'permission-add',  component: PermissionAdd,    meta: { title: 'Add A New Permission', requiresAuth : true } },
    { path: '/permission-edit/:id', name: 'permission-edit', component: PermissionEdit,   meta: { title: 'Edit Permission',      requiresAuth : true } },

    { path: '/roles-list', name: 'roles-list', component: RolesList,  meta: { title: 'All Roles List', requiresAuth : true } },
    { path: '/role-add',   name: 'role-add',   component: RoleAdd,    meta: { title: 'Add A New Role', requiresAuth : true } },
    
    { path: '/users-list',    name: 'users-list', component: UsersList,  meta: { title: 'All Users List',         requiresAuth : true } },
    { path: '/user-add',      name: 'user-add',   component: UserAdd,    meta: { title: 'Create a new User',      requiresAuth : true } },
    { path: '/user-edit/:id', name: 'user-edit',  component: UserEdit,   meta: { title: 'Edit User Information',  requiresAuth : true } },
    
    { path: '/item-list',    name: 'item-list',   component: SubjectList,   meta: { title: 'All Items List',         requiresAuth : true } },
    { path: '/item-add',      name: 'item-add',   component: SubjectAdd,    meta: { title: 'Create a new Item',      requiresAuth : true } },
    { path: '/item-edit/:id', name: 'item-edit',  component: SubjectEdit,   meta: { title: 'Edit Item Information',  requiresAuth : true } },

    { path: '/new-sales-order',        name: 'new-sales-order',     component: NewSalesOrder,    meta: { title: 'Add a new Sales Order',  requiresAuth : true } },
    { path: '/update-sales-order/:id', name: 'update-sales-order',  component: EditSalesOrder,   meta: { title: 'Edit Sales Order',       requiresAuth : true } },
    { path: '/unfinished-orders', name: 'unfinished-orders',  component: UnfinishedOrderList,   meta: { title: 'Unfinished Orders List',       requiresAuth : true } },
    { path: '/unapproved-orders', name: 'unapproved-orders',  component: UnapprovedOrderList,   meta: { title: 'Unapproved Orders List',       requiresAuth : true } },
    

  ];


const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
    // always scroll to top
    return { top: 0, behavior:"smooth" }
  },
})

const DEFAULT_TITLE = "404";
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || DEFAULT_TITLE;
  NProgress.start();
  const auth = useAuth();
  if(to.matched.some((record) => record.meta.requiresAuth)){
    if(!auth.getAuthStatus){
      next({name:"login"});
    }else{
      next();
    }
  }else if(to.matched.some((record) => record.meta.guest)){
    if(auth.getAuthStatus){
      next({name:"dashboard"});
    }else{
      next();
    }
  }else{
    next();
  }
})
router.afterEach(() => {
  NProgress.done()
})

export default router;