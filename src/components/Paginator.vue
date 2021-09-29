<template>
  <nav>
    <ul class="pagination">
      <li class="page-item">
        <a class="page-link" href="javascript:void(0)" @click="onPrev">Prev</a>
      </li>
      <li class="page-item">
        <a class="page-link" href="javascript:void(0)" @click="onNext">Next</a>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { ref, SetupContext, watch } from '@vue/runtime-core';

export default {
  name: "paginator",
  emits: ['page-changed'],
  props: {
    lastPage: {
      type: Number,
      required: true
    }
  },
  setup(props: { lastPage: number }, ctx: SetupContext) {
    const page = ref(1);
    watch(page, () => {
      ctx.emit('page-changed', page.value)
    })

    const onPrev = () => {
      if(page.value > 1) {
        page.value--;
      }
    };
    const onNext = () => {
      if(page.value < props.lastPage) {
        page.value++;
      }
    };

    return {
      onPrev,
      onNext
    }
  }
};
</script>
