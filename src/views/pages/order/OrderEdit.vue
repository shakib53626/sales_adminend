<script setup>
import { onMounted, ref } from 'vue';
import { useCommonStores, useNotification, useRole } from '@/stores'
import { useRoute, useRouter } from 'vue-router';

const commonStores = useCommonStores();
const route        = useRoute();
const router       = useRouter();
const notification = useNotification();

const orderNumber = ref('');
const orderDate   = ref('');
const warehouse   = ref('dhaka');
const remarks     = ref('');
const customer    = ref('');
const cartonBonus = ref('');
const type1       = ref('cash');
const type2       = ref('regular');
const errors      = ref();
const salesItems  = ref('');
const itemsId     = ref([]);

const dynamicField = ref([]);
const items        = ref([]);

const addField = () =>{
    dynamicField.value.push('');
    items.value.push({quantity : 0, amount : 0});
    itemsId.value.push('');
}

const removeField = (index) =>{
    dynamicField.value.splice(index, 1);
    items.value.splice(index, 1);
    itemsId.value.splice(index, 1);
}

const getItems = async(page=1) =>{
    const res = await commonStores.getDataList('/admin/subjects');
    if(res?.success){
        salesItems.value = res?.result;
        
    }
}

const updateAmount = (index) =>{
    
    items.value[index].amount = items.value[index].unite_price*items.value[index].quantity;
}

const updateItemsData = async(id, index) =>{
    const res = await commonStores.singleData(`/admin/subjects/${id}`);
    if(res?.success){
        items.value[index] = {...res?.result, quantity: 0, amount: 0};        
    }
}

const singleData = async() =>{
    const res = await commonStores.singleData(`/admin/orders/${route.params.id}`);
    if(res.success){
        orderNumber.value = res?.result?.order_number;
        orderDate.value   = res?.result?.order_date;
        warehouse.value   = res?.result?.warehouse;
        remarks.value     = res?.result?.remarks;
        customer.value    = res?.result?.customer;
        cartonBonus.value = res?.result?.carton_bonus;
        type1.value       = res?.result?.type_1;
        type2.value       = res?.result?.type_2;
    }
}

const submit = async() =>{
    console.log(items.value);
    
    const formData = new FormData();
    formData.append('order_number', orderNumber.value);
    formData.append('order_date', orderDate.value);
    formData.append('warehouse', warehouse.value);
    formData.append('remarks', remarks.value);
    formData.append('customer', customer.value);
    formData.append('carton_bonus', cartonBonus.value);
    formData.append('type_1', type1.value);
    formData.append('type_2', type2.value);

    let i = 0;
    for(const item of items.value){
        formData.append(`items[${i}][order_id]`, route.params.id);
        formData.append(`items[${i}][item_id]`, item?.id);
        formData.append(`items[${i}][quantity]`, item?.quantity);
        formData.append(`items[${i}][amount]`, item?.amount);
        i++;
    }
    formData.append('_method', 'put');

    const res = await commonStores.update(`/admin/orders/${route.params.id}`, formData);
    if(res?.success){        
        // router.push({name:'unfinished-orders'});
        notification.Success("Order Updated Successfully");
    }else{
        errors.value = res.errors;
    }
    
}

onMounted(() => {
    singleData();
    addField();
    getItems();
})
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
                <div class="card p-4" style="width:100%">
                    <div class="row m-auto p-4" style="width:800px;">
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
                            <div class="d-flex justify-content-center">
                                <button class="btn btn-add" @click="submit" v-if="commonStores.loading"><i class="fa-solid fa-spinner fa-spin"></i> Loading....</button>
                                <button class="btn btn-add" @click="submit" v-else> Update Sales Order </button>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12 mt-4">
                        <table class="table table-bordered permission-table text-center p-0">
                            <thead>
                                <tr>
                                    <th>Item Code</th>
                                    <th>Item Name</th>
                                    <th>Unite</th>
                                    <th>Stock</th>
                                    <th>Unite-Price</th>
                                    <th>Quantity</th>
                                    <th>Amount</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(value, index) in dynamicField" :key="index">
                                    <td>{{ items[index]?.item_code }}</td>
                                    <td>
                                        <select class="form-control" v-model="itemsId[index]" @change="updateItemsData(itemsId, index)">
                                            <option value="">Select Item</option>
                                            <option :value="value.id" v-for="(value, index) in salesItems?.data" :key="index">{{ value?.name }}</option>
                                        </select>
                                    </td>
                                    <td>{{ items[index]?.unite }}</td>
                                    <td>{{ items[index]?.stock }}</td>
                                    <td>{{ items[index]?.unite_price }}</td>
                                    <td>
                                        <input type="text" class="form-control" v-model="items[index].quantity" @input="updateAmount(index)">
                                    </td>
                                    <td>
                                        <input type="text" class="form-control" v-model="items[index].amount">
                                    </td>
                                    <td>
                                        <button class="btn btn-add" @click="addField" v-show="dynamicField.length==parseInt(index+1)">Add</button>
                                        <button class="btn btn-remove" @click="removeField(index)" v-show="dynamicField.length!=parseInt(index+1)"><i class="fa-solid fa-trash-can"></i></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
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

.btn-remove {
    background-color: #f14b4b;
    box-shadow: 0 7px 14px 0 rgba(241, 75, 75, 0.5);
    border: none;
    color: #fff;
}

.btn-remove:hover {
    box-shadow: none;
}

</style>