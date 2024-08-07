import { defineStore } from "pinia";
import axiosInstance from '@/service/axiosService';

export const useCommonStores = defineStore("commonStores", {
  state: () =>({
      loading      : false,
  }),

  actions: {

    async insert(api, data){
      this.loading = true;
      try {
        const res = await axiosInstance.post(api, data);
        if(res?.data?.success){
          return res.data
        }
      } catch (error) {
        if(error?.response?.data){
            return error?.response?.data;
        }
      }finally{
        this.loading = false;
      }
    },

    async singleData(api){
      try {
        const res = await axiosInstance.get(api);
        if(res?.data?.success){
          return res.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    
    async update(api, formData){
      
      this.loading = true;
      try {
        const res = await axiosInstance.post(api, formData);
        if(res?.data?.success){
          return res.data;
        }
      } catch (error) {
        if(error?.response?.data){
            return error?.response?.data;
        }
      }finally{
        this.loading = false;
      }
    },

    async getDataList(api, data){
      this.loading = true;
      try {
        const res = await axiosInstance.get(api, data);
        if(res?.data?.success){
          return res?.data;
        }
      } catch (error) {
        if(error?.response?.data){
          return error?.response?.data;
        }
      }finally{
        this.loading = false;
      }
    },

    async destroy(api){
      try {
          const res = await axiosInstance.delete(api);
          if(res.data?.success){
              return res.data;
          }
      } catch (error) {
          console.log(error);
      }
    },

    async restore(api){
      try {
        const res = await axiosInstance.put(api);
        if(res?.data?.success){
          return res?.data;
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
})