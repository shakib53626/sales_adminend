<script setup>
import { ref } from 'vue';
import { useCommonStores, useNotification, useRole } from '@/stores'
import { useRoute, useRouter } from 'vue-router';

const commonStores = useCommonStores();
const route        = useRoute();
const router       = useRouter();
const notification = useNotification();

const name     = ref('');
const status   = ref('active');
const itemCode = ref('');
const stock    = ref('');
const unite    = ref('');
const price    = ref('');
const errors   = ref();

const submit = async() =>{
    const formData = new FormData();
    formData.append('name', name.value);
    formData.append('status', status.value);
    formData.append('item_code', itemCode.value);
    formData.append('stock', stock.value);
    formData.append('unite', unite.value);
    formData.append('unite_price', price.value);

    const res = await commonStores.insert('/admin/subjects', formData);
    if(res?.success){
        router.push({name:'item-list'});
        notification.Success("Item Created Successfully");
    }else{
        errors.value = res.errors;
    }
    
}

</script>

<template>
    <div class="body-area">
        <div class="row">
            <div class="col-md-12">
                <div class="page-title">
                    <div class="d-flex justify-content-between align-items-center">
                        <h4>{{ route.meta?.title }}</h4>
                        <div>
                            <router-link :to="{ name: 'item-list' }" class="btn btn-add ms-2"><i
                                    class="fa-solid fa-arrow-left"></i> Back
                            </router-link>
                        </div>
                    </div>
                    <hr>
                </div>
            </div>
            <div class="col-md-12 add-permission-area">
                <div class="card p-0">
                    <div class="row p-4">
                        <div class="col-md-6">
                            <div class="form-group mb-4">
                                <label for="username">Item Name <span class="text-danger"> * </span></label>
                                <input type="text" id="username" placeholder="Item Name" class="form-control" v-model="name">
                                <span class="errors">
                                    <span class="text-danger" v-for="(error, index) in errors?.name" :key="index">{{ error }}</span>
                                </span>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group mb-4">
                                <label for="subject_code">Item Code <span class="text-danger"> * </span></label>
                                <input type="text" id="subject_code" placeholder="Item Code " class="form-control" v-model="itemCode">
                                <span class="errors">
                                    <span class="text-danger" v-for="(error, index) in errors?.item_code" :key="index">{{ error }}</span>
                                </span>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group mb-4">
                                <label for="unite">Unite <span class="text-danger"> * </span></label>
                                <input type="text" id="unite" placeholder="Unite " class="form-control" v-model="unite">
                                <span class="errors">
                                    <span class="text-danger" v-for="(error, index) in errors?.unite" :key="index">{{ error }}</span>
                                </span>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group mb-4">
                                <label for="stock">Stock <span class="text-danger"> * </span></label>
                                <input type="number" id="stock" placeholder="Stock " class="form-control" v-model="stock">
                                <span class="errors">
                                    <span class="text-danger" v-for="(error, index) in errors?.stock" :key="index">{{ error }}</span>
                                </span>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group mb-4">
                                <label for="price">Unite Price <span class="text-danger"> * </span></label>
                                <input type="number" id="price" placeholder="Unite Price " class="form-control" v-model="price">
                                <span class="errors">
                                    <span class="text-danger" v-for="(error, index) in errors?.price" :key="index">{{ error }}</span>
                                </span>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group mb-4">
                                <label for="status">Status</label>
                                <select id="status" class="form-control" v-model="status">
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                                <span class="errors">
                                    <span class="text-danger" v-for="(error, index) in errors?.status" :key="index">{{ error }}</span>
                                </span>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="d-flex justify-content-end">
                                <button class="btn btn-add" @click="submit" v-if="commonStores.loading"><i class="fa-solid fa-spinner fa-spin"></i> Loading....</button>
                                <button class="btn btn-add" @click="submit" v-else><i class="fa-solid fa-plus"></i> Add Item </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.add-permission-area{
    width: 100%;
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.add-permission-area .card{
    width: 800px;
}
.form-group label{
    font-weight: 700;
    margin-bottom: 5px;
}

</style>