<script setup>
import { ref } from 'vue';
import { useCommonStores, useNotification, useRole } from '@/stores'
import { useRoute, useRouter } from 'vue-router';

const commonStores = useCommonStores();
const route        = useRoute();
const router       = useRouter();
const notification = useNotification();

const name        = ref('');
const orderNumber = ref('');
const orderDate   = ref('');
const warehouse   = ref('dhaka');
const remarks     = ref('');
const customer    = ref('');
const cartonBonus = ref('');
const type1       = ref('cash');
const type2       = ref('regular');
const errors      = ref();

const submit = async() =>{
    const formData = new FormData();
    formData.append('order_number', orderNumber.value);
    formData.append('order_date', orderDate.value);
    formData.append('warehouse', warehouse.value);
    formData.append('remarks', remarks.value);
    formData.append('customer', customer.value);
    formData.append('carton_bonus', cartonBonus.value);
    formData.append('type_1', type1.value);
    formData.append('type_2', type2.value);

    const res = await commonStores.insert('/admin/orders', formData);
    if(res?.success){        
        router.push({name:'update-sales-order', params: {id: res?.result?.id } });
        notification.Success("Order Created Successfully");
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
                            <router-link :to="{ name: 'unfinished-orders' }" class="btn btn-add ms-2"><i
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
                                <label for="order_number">Order Number <span class="text-danger"> * </span></label>
                                <input type="number" id="order_number" placeholder="Order Number" class="form-control" v-model="orderNumber">
                                <span class="errors">
                                    <span class="text-danger" v-for="(error, index) in errors?.order_number" :key="index">{{ error }}</span>
                                </span>
                            </div>
                            <div class="form-group mb-4">
                                <label for="orderDate">Order Date <span class="text-danger"> </span></label>
                                <input type="date" id="orderDate" class="form-control" v-model="orderDate">
                                <span class="errors">
                                    <span class="text-danger" v-for="(error, index) in errors?.order_date" :key="index">{{ error }}</span>
                                </span>
                            </div>
                            <div class="form-group mb-4">
                                <label for="warehouse">Warehouse <span class="text-danger"> </span></label>
                                <select id="warehouse" class="form-control" v-model="warehouse">
                                    <option value="chattogram">Chattogram Factory</option>
                                    <option value="dhaka">Dhaka Factory</option>
                                    <option value="gazipur">Gazipur</option>
                                    <option value="cumilla">Cumilla</option>
                                </select>
                                <span class="errors">
                                    <span class="text-danger" v-for="(error, index) in errors?.warehouse" :key="index">{{ error }}</span>
                                </span>
                            </div>
                            <div class="form-group mb-4">
                                <label for="remarks">Remarks <span class="text-danger"> </span></label>
                                <input type="text" id="remarks" class="form-control" v-model="remarks">
                                <span class="errors">
                                    <span class="text-danger" v-for="(error, index) in errors?.remarks" :key="index">{{ error }}</span>
                                </span>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group mb-4">
                                <label for="customer">Customer <span class="text-danger"> * </span></label>
                                <input type="test" id="customer" placeholder="Enter Customer" class="form-control" v-model="customer">
                                <span class="errors">
                                    <span class="text-danger" v-for="(error, index) in errors?.customer" :key="index">{{ error }}</span>
                                </span>
                            </div>
                            <div class="form-group mb-4">
                                <label for="bonus">Carton Bonus (%) <span class="text-danger"> </span></label>
                                <input type="number" id="bonus" class="form-control" v-model="cartonBonus">
                                <span class="errors">
                                    <span class="text-danger" v-for="(error, index) in errors?.carton_bonus" :key="index">{{ error }}</span>
                                </span>
                            </div>
                            <div class="form-group mb-4">
                                <label for="type1">Sales Type 1 <span class="text-danger"> </span></label>
                                <select id="type1" class="form-control" v-model="type1">
                                    <option value="cash">Cash</option>
                                    <option value="online">Online</option>
                                </select>
                                <span class="errors">
                                    <span class="text-danger" v-for="(error, index) in errors?.type1" :key="index">{{ error }}</span>
                                </span>
                            </div>
                            <div class="form-group mb-4">
                                <label for="type2">Sales Type 2 <span class="text-danger"> </span></label>
                                <select id="type2" class="form-control" v-model="type2">
                                    <option value="regular">Regular</option>
                                    <option value="ordinary">Ordinary</option>
                                </select>
                                <span class="errors">
                                    <span class="text-danger" v-for="(error, index) in errors?.type2" :key="index">{{ error }}</span>
                                </span>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="d-flex justify-content-end">
                                <button class="btn btn-add" @click="submit" v-if="commonStores.loading"><i class="fa-solid fa-spinner fa-spin"></i> Loading....</button>
                                <button class="btn btn-add" @click="submit" v-else> Initialize Sales Order </button>
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