<template>
  <form @submit.prevent="onSubmit">
    <div class="mb-3">
      <label>Title</label>
      <input v-model="data.title" class="form-control" name="title">
    </div>
    <div class="mb-3">
      <label>Description</label>
      <textarea v-model="data.description" class="form-control" name="description"></textarea>
    </div>
    <div class="mb-3">
      <label>Image</label>
      <div class="input-group">
        <input v-model="data.image" class="form-control" name="image">
        <ImageUpload @uploaded="data.image = $event" />
      </div>
    </div>
    <div class="mb-3">
      <label>Price</label>
      <input v-model="data.price" type="number" class="form-control" name="price">
    </div>

    <button class="btn btn-outline-secondary">Save</button>
  </form>
</template>

<script lang="ts">
import axios from 'axios';
import { reactive } from '@vue/reactivity';
import { useRoute, useRouter } from 'vue-router';
import ImageUpload from '@/components/ImageUpload.vue';
import { onMounted } from '@vue/runtime-core';

export default {
  name: "product-edit",
  components: { ImageUpload },
  setup() {
    const data = reactive({
      title: '',
      description: '',
      image: '',
      price: ''
    });
    const route = useRoute();
    const router = useRouter();
    const productId = route.params.id;

    onMounted(async () => {
      const res = await axios.get(`products/${productId}`);
      
      data.title = res.data.title;
      data.description = res.data.description;
      data.image = res.data.image;
      data.price = res.data.price;
    })

    const onSubmit = async () => {
      await axios.put(`products/${productId}`, data)
      router.push('/products');
    }

    return {
      data,
      onSubmit
    }
  }
};
</script>
