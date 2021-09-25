<template>
  <form @submit.prevent="onSubmit">
    <div class="mb-3 mt-3 row">
      <label class="col-sm-2 col-form-label">Name</label>
      <div class="col-sm-10">
        <input v-model="formData.name" class="form-control" name="name">
      </div>
    </div>

    <div class="mb-3 row">
      <label class="col-sm-2 col-form-label">Permissions</label>
      <div class="col-sm-10">
        <div
          v-for="permission in permissionsList"
          :key="permission.id"
          class="form-check form-check-inline col-3"
        >
          <input
            class="form-check-input"
            type="checkbox"
            :value="permission.id"
            :checked="isChecked(permission.id)"
            @change="onChange(permission.id, $event.target.checked)"
          >
          <label class="form-check-label">{{ permission.name }}</label>
        </div>
      </div>
    </div>

    <button class="btn btn-outline-secondary">Save</button>
  </form>
</template>

<script lang="ts">
import { onMounted, reactive, ref } from '@vue/runtime-core';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import { Permission } from '../../models/permission';

export default {
  name: "role-edit",
  setup() {

    const formData = reactive({
      name: '',
      permissions: [] as number[]
    })

    const permissionsList = ref([]);
    const router = useRouter();
    const route = useRoute();
    const roleId = route.params.id;

    onMounted( async () => {
      // for permissions checks
      const permissionsRes = await axios.get('permissions');
      permissionsList.value = permissionsRes.data;

      // for role data
      const roleRes = await axios.get(`roles/${roleId}`);
      formData.name = roleRes.data.name;
      formData.permissions = roleRes.data.permissions.map((p: Permission) => p.id);
    });

    const onChange = (id: number, checked: boolean) => {
      if (checked) {
        formData.permissions = [...formData.permissions, id];
        return;
      }
      formData.permissions = formData.permissions.filter(p => p !== id);
    };

    const isChecked = (id: number) => {
      return formData.permissions.some(p => p === id);
    }


    const onSubmit = async () => {
      await axios.put(`roles/${roleId}`, formData);
      await router.push('/roles');
    };

    return {
      formData,
      permissionsList,
      onChange,
      isChecked,
      onSubmit
    }
  }
}
</script>