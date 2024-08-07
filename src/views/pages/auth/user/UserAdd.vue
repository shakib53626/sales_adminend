<script setup>
import { onMounted, ref } from 'vue';
import { useUser, useNotification, useRole } from '@/stores'
import { useRoute, useRouter } from 'vue-router';

const role         = useRole();
const user         = useUser();
const route        = useRoute();
const router       = useRouter();
const notification = useNotification();

const image        = ref();
const imagePreview = ref();
const name         = ref('');
const phoneNumber  = ref('');
const email        = ref('');
const status       = ref('active');
const roleId       = ref('');
const password     = ref('');
const errors       = ref();
const roles        = ref();

const getRolesList = async() =>{
    const res = await role.getRolesList();
    if(res?.success){
        roles.value = res?.result;
    }
}

const handleFileChange = (e) => {
  image.value = e.target.files[0];
  let reader  = new FileReader();
  reader.addEventListener("load", function(){
    imagePreview.value = reader.result;
  }.bind(this), false);
  if(image.value){
    if(/\.(jpe?g|png|gif)$/i.test(image.value.name)){
      reader.readAsDataURL(image.value)
    }
  }
}

const submit = async() =>{
    const formData = new FormData();
    formData.append('name', name.value);
    formData.append('email', email.value);
    formData.append('phone_number', phoneNumber.value);
    formData.append('status', status.value);
    formData.append('password', password.value);
    if(roleId.value){
        formData.append('role_ids[0]', roleId.value);
    }
    if(image.value){
        formData.append('image', image.value);
    }

    const res = await user.insertUser(formData);
    if(res?.success){
        router.push({name:'users-list'});
        notification.Success("User Created Successfully");
    }else{
        errors.value = res.errors;
    }
    
}

onMounted(() => {
    getRolesList();  
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
                            <router-link :to="{ name: 'users-list' }" class="btn btn-add ms-2"><i
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
                                <label for="username">User Name</label>
                                <input type="text" id="username" placeholder="User Name" class="form-control" v-model="name">
                                <span class="errors">
                                    <span class="text-danger" v-for="(error, index) in errors?.name" :key="index">{{ error }}</span>
                                </span>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group mb-4">
                                <label for="email">Email</label>
                                <input type="email" id="email" placeholder="User Email" class="form-control" v-model="email">
                                <span class="errors">
                                    <span class="text-danger" v-for="(error, index) in errors?.email" :key="index">{{ error }}</span>
                                </span>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group mb-4">
                                <label for="phone_number">Phone Number</label>
                                <input type="text" id="phone_number" placeholder="Phone Number" class="form-control" v-model="phoneNumber">
                                <span class="errors">
                                    <span class="text-danger" v-for="(error, index) in errors?.phone_number" :key="index">{{ error }}</span>
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
                        <div class="col-md-6">
                            <div class="form-group mb-4">
                                <label for="status">User Role</label>
                                <select id="status" class="form-control" v-model="roleId">
                                    <option value="">Select One</option>
                                    <option :value="data.id" v-for="(data, index) in roles?.data" :key="index">{{ data.display_name }}</option>
                                </select>
                                <span class="errors">
                                    <span class="text-danger" v-for="(error, index) in errors?.role" :key="index">{{ error }}</span>
                                </span>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group mb-4">
                                <label for="password">Password</label>
                                <input type="text" id="password" placeholder="Password" class="form-control" v-model="password">
                                <span class="errors">
                                    <span class="text-danger" v-for="(error, index) in errors?.phone_number" :key="index">{{ error }}</span>
                                </span>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group mb-4">
                                <label for="image">Profile Image</label>
                                <input type="file" id="image" class="form-control" @change="handleFileChange">
                                <span class="errors">
                                    <span class="text-danger" v-for="(error, index) in errors?.image" :key="index">{{ error }}</span>
                                </span>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group mb-4" v-if="imagePreview">
                                <img :src="imagePreview" alt="" width="80">
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="d-flex justify-content-end">
                                <button class="btn btn-add" @click="submit" v-if="user.addLoading"><i class="fa-solid fa-spinner fa-spin"></i> Loading....</button>
                                <button class="btn btn-add" @click="submit" v-else><i class="fa-solid fa-plus"></i> Add User </button>
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