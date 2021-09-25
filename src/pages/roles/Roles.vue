<template>
  <div class="table-responsive">
    <table class="table table-striped table-sm">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="role in roles" :key="role.id">
          <td>{{ role.id }}</td>
          <td>{{ role.name }}</td>
          <td>
            <div class="btn-group mr-2">
              <router-link :to="`/roles/${role.id}/edit`" class="btn btn-sm btn-outline-secondary">Edit</router-link>
              <a href="javascript:void(0)" class="btn btn-sm btn-outline-secondary" @click="onDelete(role.id)">Delete</a>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { ref } from '@vue/reactivity';
import { onMounted } from '@vue/runtime-core';
import axios from 'axios';
import { Role } from '../../models/role';

export default {
  name: "roles",
  setup() {
    const roles = ref([]);

    onMounted( async () => {
      const { data } = await axios.get('roles');
      roles.value = data;
    });

    const onDelete = async (roleId: number) => {
      if(confirm('Are you sure?')) {
        await axios.delete(`roles/${roleId}`);
        roles.value = roles.value.filter((r: Role) => r.id !== roleId )
      }
    }

    return {
      roles,
      onDelete
    }
  }
};
</script>
