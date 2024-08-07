<script setup>
import { useThemeSetting } from '@/stores'
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const theme = useThemeSetting();
const route = useRoute();
const isOpenSubMenu = ref('');
const openToggle = (menuName) =>{
    if(isOpenSubMenu.value == menuName){
        isOpenSubMenu.value = '';
    }else{
        isOpenSubMenu.value = menuName;
    }
}
</script>

<template>
    <div class="sidebar" :class="{'is-collops-sidebar' : theme.isCollops}">
        <router-link :to="{name:'dashboard'}">
            <div class="sidebar-logo"> <h3 class="text-center text-white" style="font-weight:700;">Sales Module</h3></div>
        </router-link>
        <div class="sidebar-menu mt-4">
            <ul :class="{'is-collops' : theme.isCollops}">
                <li>
                    <router-link :to="{name:'dashboard'}" :class="{ 'active': route.name == 'dashboard' }">
                        <i class="fa-solid fa-chart-bar nav-icon"></i> 
                        <span class="nav-title" v-if="!theme.isCollops">Dashboard</span>
                    </router-link>
                </li>
                <li class="sub-menu-dropdown">
                    <div class="dropdown-title" :class="{ 'dropdown-open': isOpenSubMenu == 'acl' ||
                            route.name == 'permission-list' ||
                            route.name == 'permission-add' ||
                            route.name == 'permission-edit' ||
                            route.name == 'roles-list' ||
                            route.name == 'role-add' ||
                            route.name == 'users-list' ||
                            route.name == 'user-add' ||
                            route.name == 'user-edit'
                    }" @click="openToggle('acl')">
                        <i class="fa-solid fa-people-roof nav-icon"></i> 
                        <span class="nav-title" v-if="!theme.isCollops">ACL Management</span>
                        <span v-if="!theme.isCollops"><i class="fa-solid fa-angle-right toggle-icon"></i></span>
                    </div>

                    <ul v-show="isOpenSubMenu=='acl' ||
                            route.name == 'permission-list' ||
                            route.name == 'permission-add' || 
                            route.name == 'permission-edit' ||
                            route.name == 'roles-list' ||
                            route.name == 'role-add' ||
                            route.name == 'users-list' ||
                            route.name == 'user-add' ||
                            route.name == 'user-edit'
                    ">
                        <li>
                            <router-link :to="{ name: 'users-list' }" :class="{'active': route.name == 'users-list' || route.name == 'user-add' || route.name == 'user-edit'}">
                                <i class="fa-solid fa-circle-half-stroke nav-icon"></i>
                                <span class="nav-title" v-if="!theme.isCollops">Users</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{ name: 'roles-list' }" :class="{'active': route.name == 'roles-list' || route.name == 'role-add'}">
                                <i class="fa-solid fa-circle-half-stroke nav-icon"></i>
                                <span class="nav-title" v-if="!theme.isCollops">User Roles</span>
                            </router-link>
                        </li>
                    </ul>
                </li>
                <li class="sub-menu-dropdown">
                    <div class="dropdown-title" :class="{ 'dropdown-open': isOpenSubMenu == 'order' || route.name == 'new-sales-order' || route.name == 'update-sales-order' || route.name == 'unfinished-orders' || route.name == 'unapproved-orders'
                    }" @click="openToggle('order')">
                    <i class="fa-brands fa-jedi-order nav-icon"></i> 
                        <span class="nav-title" v-if="!theme.isCollops">Sales Order</span>
                        <span v-if="!theme.isCollops"><i class="fa-solid fa-angle-right toggle-icon"></i></span>
                    </div>

                    <ul v-show="isOpenSubMenu=='order' || route.name == 'new-sales-order' || route.name == 'update-sales-order' || route.name == 'unfinished-orders' || route.name == 'unapproved-orders'
                    ">
                        <li>
                            <router-link :to="{ name: 'new-sales-order' }" :class="{'active': route.name == 'new-sales-order' || route.name == 'update-sales-order'}">
                                <i class="fa-solid fa-circle-half-stroke nav-icon"></i>
                                <span class="nav-title" v-if="!theme.isCollops">New Sales Order</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{ name: 'unfinished-orders' }" :class="{'active': route.name == 'unfinished-orders'}">
                                <i class="fa-solid fa-circle-half-stroke nav-icon"></i>
                                <span class="nav-title" v-if="!theme.isCollops">Unfinished Sales Order</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{ name: 'unapproved-orders' }" :class="{'active': route.name == 'unapproved-orders'}">
                                <i class="fa-solid fa-circle-half-stroke nav-icon"></i>
                                <span class="nav-title" v-if="!theme.isCollops">Unapproved Orders</span>
                            </router-link>
                        </li>
                    </ul>
                </li>
                <li>
                    <router-link :to="{name:'item-list'}" :class="{ 'active': route.name == 'item-list' || route.name == 'item-add' || route.name == 'item-edit' }">
                        <i class="fa-solid fa-box nav-icon"></i>
                        <span class="nav-title" v-if="!theme.isCollops">Items</span>
                    </router-link>
                </li>
                <!-- <li>
                    <router-link :to="{name:'student-list'}" :class="{ 'active': route.name == 'student-list' || route.name == 'student-add' || route.name == 'student-edit' }">
                        <i class="fa-solid fa-user-graduate nav-icon"></i>
                        <span class="nav-title" v-if="!theme.isCollops">Students</span>
                    </router-link>
                </li> -->
            </ul>
        </div>
    </div>
</template>


<style scoped>
a{
    text-decoration: none;
}
.sidebar{
    width: 260px;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #1C5990;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 3px 8px;
    transition: 0.5s;
}
.is-collops-sidebar{
    width: 60px;
    transition: 0.5s;
}
.sidebar-logo{
    padding: 10px 15px;
}
.sidebar-logo img{
    max-width: 100%;
}
.sidebar-menu ul{
    margin: 0;
    padding: 10px 20px;
}
.sidebar-menu ul li{
    list-style: none;
    margin-bottom: 5px;
    transition: 0.5s;
}
.sidebar-menu ul li a
{
    padding: 5px 12px;
    width: 100%;
    display: inline-block;
    transition: 0.5s;
}
.sidebar-menu ul li .dropdown-title
{
    padding: 5px 12px;
    width: 100%;
    position: relative;
    cursor: pointer;
}
.toggle-icon{
    position: absolute;
    right: 10px;
    top: 10px;
    color: #fff;
    transition: 0.5s;
}
.sidebar-menu ul li a:hover,
.sidebar-menu ul li a.active{
    background-color: #fff;
    border-radius: 8px;
    cursor: pointer;
    box-shadow: 0 7px 14px 0 rgba(255, 255, 255, 0.425);
    transition: 0.5s;
}
.sidebar-menu ul li a:hover .nav-icon,
.sidebar-menu ul li a:hover .toggle-icon,
.sidebar-menu ul li a.active .nav-icon{
    color: #1C5990;
    transition: 0.5s;
}
.sidebar-menu ul li a:hover .nav-title,
.sidebar-menu ul li a.active .nav-title{
    color: #1C5990;
    transition: 0.5s;
}
.nav-icon{
    color: #fff;
    font-size: 20px;
}
.nav-title{
    color: #fff;
    font-size: 18px;
    padding-left: 10px;
}
.dropdown-open,
.dropdown-title:hover   {
    background-color: #104a7e;
    border-radius: 8px;
    box-shadow: 0 7px 14px 0 rgba(1, 21, 65, 0.425);
}
.sub-menu-dropdown ul{
    margin: 0;
    padding: 0;
    margin-top: 5px;
}
.sub-menu-dropdown .nav-icon, 
.sub-menu-dropdown .nav-title{
    font-size: 16px;
}
.dropdown-open .toggle-icon {
  transform: rotate(90deg);
  transition: 0.5s;
}

.is-collops{
    padding: 10px 8px !important;
}
</style>