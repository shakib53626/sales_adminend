<script setup>
import { useCommonStores } from '@/stores'
import { onMounted, ref } from "vue";
import Swal from 'sweetalert2'
import { useRoute } from 'vue-router';

const route        = useRoute();
const commonStores = useCommonStores();

const subjects     = ref('');
const paginateSize = ref('');
const searchKey    = ref('');

const getSubjects = async(page=1) =>{
    const res = await commonStores.getDataList('/admin/orders', {
        params:{
            page         : page,
            paginate_size: paginateSize.value,
            search_key   : searchKey.value,
        }
    });
    if(res?.success){
        subjects.value = res?.result;
        
    }
}



const destroy = async(removeId) =>{
    Swal.fire({
        icon: 'question',
        title: 'Are You Sure Remove It ?',
        text: "Do you want to continue  ? ",
        showCancelButton: true,
        confirmButtonText: 'Confirm',
        cancelButtonText:'Cancel',
    }).then((result)=>{
        (async () => {
            if (result.isConfirmed) {
                const res = await commonStores.destroy(`/admin/orders/${removeId}`);
                if (res.success) {
                    Swal.fire('Deleted!', 'Data Deleted Successfully', 'success');
                    getSubjects();
                }
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('Cancelled', 'You have clicked cancel', 'error');
            }
        })();
    })
}

onMounted(() => {
    getSubjects();  
})
</script>

<template>
    <div class="reset-password-page-area">
        <div class="row">
            <div class="col-md-12">
                <div class="page-title">
                    <div class="d-flex justify-content-between align-items-center">
                        <h4>{{route.meta?.title}}</h4>
                        <div>
                            <!-- <router-link :to="{name: 'item-add'}" class="btn btn-add"><i class="fa-solid fa-plus"></i> Add</router-link> -->
                            <router-link :to="{name: 'dashboard'}" class="btn btn-add ms-2"><i class="fa-solid fa-arrow-left"></i> Back</router-link>
                        </div>
                    </div>
                    <hr>
                </div>
                <div class="content-body">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card text-center mb-4">

                                <table class="table table-striped table-hover permission-table">
                                    <thead>
                                        <tr>
                                            <th style="width:10%;">Order Number</th>
                                            <th style="width:15%;">Order Date</th>
                                            <th style="width:15%;">Warehouse</th>
                                            <th style="width:15%;">Remarks</th>
                                            <th style="width:15%;">Customer</th>
                                            <th style="width:15%;">Carton Bonus</th>
                                            <th style="width:15%;">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(value, index) in subjects?.data" :key="index" v-show="value.order_items?.length == 0">
                                            <td>{{ value.order_number }}</td>
                                            <td>{{ value.order_date }}</td>
                                            <td>{{ value.warehouse }}</td>
                                            <td>{{ value.remarks }}</td>
                                            <td>{{ value.customer }}</td>
                                            <td>{{ value.carton_bonus }} %</td>
                                            <td>
                                                <router-link :to="{name:'update-sales-order', params : {id: value.id} }" class="btn btn-approve btn-sm">Add</router-link>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.content-body .card {
    width: 100%;
    padding-top: 10px;
}

.content-body .card img {
    height: 80px;
    width: 80px;
    border-radius: 100%;
    border: 4px solid #1C5990;
    margin: auto;
}

.content-body .card h5 {
    font-weight: 700;
    color: #1C5990;
    margin-bottom: 0;
}

.reset-password-page-area {
    padding: 20px;
}

.page-title h4 {
    margin-bottom: 0;
    font-weight: 700;
    color: #1C5990;
}

.page-title hr {
    height: 3px;
    color: #1C5990;
}

.approval-action {
    padding-top: 10px;
}

.approval-action button {
    padding: 3px 10px;
    border: none;
    border-radius: 5px;
    color: #fff;
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

.btn-approve {
    background-color: #1eca7b;
    box-shadow: 0 7px 14px 0 rgba(30, 202, 123, 0.5);
    border: none;
    color: #fff;
}

.btn-approve:hover {
    box-shadow: none;
}
.btn-sm{
    font-size: 14px;
    padding: 3px 10px;
}
.permission-table td{
    color: #686868;
}
.permission-table th{
    color: #1C5990;
}
.profile-list-image{
    width: 30px !important;
    height: 30px !important;
    border-radius: 50% !important;
    border: 2px solid #c9c9c9 !important;
}

</style>