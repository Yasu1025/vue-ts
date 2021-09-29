<template>
  <div class="table-responsive">
    <table class="table table-striped table-sm">
      <thead>
        <tr>
          <th>#</th>
          <th>Image</th>
          <th>Title</th>
          <th>Description</th>
          <th>Price</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.id }}</td>
          <td><img :src="product.image" width="50" /></td>
          <td>{{ product.title }}</td>
          <td>{{ product.description }}</td>
          <td>{{ product.price }}</td>
          <td>
            <div class="btn-group mr-2">
              <router-link :to="`/products/${product.id}/edit`" class="btn btn-sm btn-outline-secondary">Edit</router-link>
              <a href="javascript:void(0)" class="btn btn-sm btn-outline-secondary" @click="onDelete(product.id)">Delete</a>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <Paginator
    :lastPage="lastPage"
    @page-changed="load($event)"
  />

</template>

<script lang="ts">
import { onMounted, ref } from '@vue/runtime-core';
import axios from 'axios';
import { Product } from '../../models/Product';
import Paginator from '@/components/Paginator.vue';

export default {
  name: "products",
  components: { Paginator },
  setup() {
    const products = ref([]);
    const lastPage = ref(0);

    const load = async (page = 1) => {
      const { data } = await axios.get(`products?page=${page}`);
      products.value = data.data;
      lastPage.value = data.meta.last_page;
    }

    onMounted( load );

    const onDelete = async (productId: number) => {
      await axios.delete(`products/${productId}`);

      products.value = products.value.filter((p: Product) => p.id !== productId)
    };

    return {
      products,
      lastPage,
      load,
      onDelete
    }
  }
};
</script>
