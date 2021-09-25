<template>
  <form @submit.prevent="onSubmit">
    <div class="mb-3">
      <label>First Name</label>
      <input v-model="data.first_name" class="form-control" name="first_name">
    </div>
    <div class="mb-3">
      <label>Last Name</label>
      <input v-model="data.last_name" class="form-control" name="last_name">
    </div>
    <div class="mb-3">
      <label>Email</label>
      <input v-model="data.email" class="form-control" name="email">
    </div>

    <div class="mb-3">
      <label>Role</label>
      <select v-model="data.role_id" name="role_id" class="form-control">
        <option v-for="role of roles" :key="role.id" :value="role.id">
          {{ role.name }}
        </option>
      </select>
    </div>

    <button class="btn btn-outline-secondary">Save</button>
  </form>
</template>

<script lang="ts">
import axios from 'axios';
import { reactive, ref } from '@vue/reactivity';
import { onMounted } from '@vue/runtime-core';
import { useRoute, useRouter } from 'vue-router';

export default {
  name: "user-edit",
  setup() {
    const data = reactive({
      first_name: '',
      last_name: '',
      email: '',
      role_id: ''
    });
    const roles = ref([]);
    const route = useRoute();
    const router = useRouter();
    const userId = route.params.id;

    onMounted( async () => {
      // get roles for <select>
      const rolesRes = await axios.get('roles');
      roles.value = rolesRes.data;

      // get User based on id
      const userRes = await axios.get(`users/${userId}`);
      data.first_name = userRes.data.first_name;
      data.last_name = userRes.data.last_name;
      data.email = userRes.data.email;
      data.role_id = userRes.data.role.id;
    })

    const onSubmit = async () => {
      await axios.put(`users/${userId}`, data)
      router.push('/users');
    }

    return {
      data,
      roles,
      onSubmit
    }
  }
};
</script>
