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
import { reactive, ref } from '@vue/reactivity';
import { useRouter } from 'vue-router';
import ImageUpload from '@/components/ImageUpload.vue';

export default {
  name: "product-create",
  components: { ImageUpload },
  setup() {
    const data = reactive({
      title: '',
      description: '',
      image: '',
      price: ''
    });
    const router = useRouter();

    const onSubmit = async () => {
      await axios.post('products', data)
      router.push('/products');
    }

    return {
      data,
      onSubmit
    }
  }
};
</script>
