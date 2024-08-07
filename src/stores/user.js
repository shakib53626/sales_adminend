import { defineStore } from 'pinia';
import axiosInstance from '@/service/axiosService';

export const useUser = defineStore("user", {
    state:() => ({
        loading      : false,
        addLoading   : false,
        deleteLoading: false,
     }),

    //  persist: true,

     getters:{},

     actions:{
        async getUsers(){
            this.loading = true;
            try {
                const res = await axiosInstance.get('/admin/users');
                if(res.status === 200){
                    return res.data;
                }
            } catch (error) {
                console.log(error);
            }finally{
                this.loading = false;
            }
        }, 

        async insertUser(formData){
            this.addLoading = true;
            try {
                const res = await axiosInstance.post('/admin/users', formData);
                if(res.data?.success){
                    return res.data;
                }else{
                    return res.data
                }
            } catch (error) {
                if(error.response?.data){
                    return error.response?.data;
                }
                
            }finally{
                this.addLoading = false;
            }
        }, 

        async getUserDetailInfo(userId){
            try {
                const res = await axiosInstance.get(`/admin/users/${userId}`);
                if(res.data?.success){
                    return res.data;
                }
            } catch (error) {
                console.log(error);
                
            }
        }, 

        async updateUser(userId, formData){
            this.loading = true;
            try {
                const res = await axiosInstance.post(`/admin/users/${userId}`, formData);
                if(res.status === 200){
                    return res.data;
                }else{
                    return res.data;
                }
            } catch (error) {
                if(error.response?.data){
                    return error.response?.data;
                }
            }finally{
                this.loading = false;
            }
        },

        async destroy(userId){
            this.deleteLoading = userId;
            try {
                const res = await axiosInstance.delete(`/admin/users/${userId}`);
                if(res.data?.success){
                    return res.data;
                }
            } catch (error) {
                console.log(error);
            }finally{
                this.deleteLoading = false;
            }
        }
     },

})
