<template>
  <nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
    <a class="navbar-brand col-md-3 col-lg-2 mr-0 px-3" href="#">Company name</a>

    <nav class="my-2 my-md-0 mr-md-3">
      <router-link to="/profile" class="p-2 text-white text-decoration-none">{{ name }}</router-link>
      <router-link to="/login" class="p-2 text-white text-decoration-none" @click="logout">Sign out</router-link>
    </nav>
  </nav>
</template>

<script>
import { computed, ref, watch } from '@vue/runtime-core';
import axios from 'axios';
import { useStore } from 'vuex';
export default {
  name: "nav",
  setup() {
    const store = useStore();
    const name = ref('');
    const user = computed(() => store.state.user);

    watch(user, () => {
      name.value = `${user.value.first_name} ${user.value.last_name}`
    })

    const logout = async () => {
      await axios.post('logout')
    }

    return {
      name,
      logout
    }
  }
}
</script>