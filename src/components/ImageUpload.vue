<template>
  <label class="btn btn-primary">
    Upload <input type="file" hidden @change="upload($event.target.files)" />
  </label>
</template>

<script lang="ts">
import axios from 'axios';
import { SetupContext } from '@vue/runtime-core';

export default {
  name: "image-upload",
  emits: ['uploaded'],
  setup(props: any, ctx: SetupContext) {
    const upload = async (files: FileList | null) => {
      if(files === null) return;

      const file = files.item(0);

      if(file !== null) {
        const formData = new FormData();
        formData.append('image', file);
  
        const {data} = await axios.post('upload', formData);
        ctx.emit('uploaded', data.url)
      }

    };

    return {
      upload
    }
  }
};
</script>
