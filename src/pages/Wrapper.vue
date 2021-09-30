<template>
  <Nav />

  <div class="container-fluid">
    <div class="row">
      <Menu />

      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script>
import Nav from "@/components/Nav.vue";
import Menu from "@/components/Menu.vue";
import axios from 'axios';
import { onMounted } from '@vue/runtime-core';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
  name: 'wrapper',
  components: {
    Nav,
    Menu
  },
  setup() {
    onMounted(async () => {
      const router = useRouter();
      const store = useStore();


      try {
        const { data } = await axios.get('user');
        store.dispatch('setUser', data);
      } catch (e) {
        await router.push('/login');
      }

    }) 
  }
}
</script>
