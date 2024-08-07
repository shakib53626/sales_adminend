import { defineStore }  from 'pinia';
import   axiosInstance  from '@/service/axiosService';
import { useToken }     from '@/stores'

export const useAuth = defineStore("auth", {
    state:() => ({
        user          : {},
        loading       : false,
        isLoggedIn    : false,
        logoutLoading : false,
        authPermission: {},
     }),

     persist:['user', 'isLoggedIn', 'authPermission'],

     getters:{
        getUser:(state) => {
            return state.user?.data;
        },
        getAuthStatus: (state) => {
            return state.isLoggedIn;
        }
     },

     actions:{
        async login(data){
            this.loading = true;
            const token = useToken();
            try {
                const res = await axiosInstance.post('/admin/login', data);
                if(res.data?.success){
                    this.user = res.data?.result?.user
                    token.setToken(res.data?.result?.token)
                    this.isLoggedIn = true;
                    this.authenticateUserPermission();
                    return res.data;
                }else{
                    return res.data;
                }
            } catch (error) {
                if(error.response.data){
                    return error.response.data;
                }
            }finally{
                this.loading = false;
            }
        },

        async logout(){
            const token = useToken();
            this.logoutLoading = true;
            try {
                const res = await axiosInstance.post('/admin/logout');
                if(res.data?.success){
                    token.removeToken();
                    this.$reset();
                    return res.data;
                }
            } catch (error) {
                if(error.response){
                    this.$reset();
                    return error.response;
                }
            }finally{
                this.logoutLoading = false;
            }
        },

        async authenticateUserPermission(){
            try {
                const res = await axiosInstance.get('/admin/users/permission');
                if(res.data?.success){
                    this.authPermission = res?.data?.result?.roles[0]?.permissions;
                    return res?.data?.result?.roles[0]?.permissions;
                }
            } catch (error) {
                if(error.response?.status == 401 || error.response?.status == 500){
                    return error.response;
                }
            }
        }
     },

})
