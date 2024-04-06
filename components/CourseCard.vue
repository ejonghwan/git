<template>
  <q-card class="my-card" @click="$emit('click')">
    <!-- <img :src="thumbnail" /> -->

    <q-card-section>
      <!-- <div class="text-h6 ellipsis">{{ title }}</div>
      <div class="text-subtitle2 ellipsis text-grey-8">
        {{ subtitle }}
      </div> -->
      {{ hoho.name }}
      {{ hoho.age }}
      {{ hoho.add }}
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
// interface Props {
//   thumbnail: string;
//   title: string;
//   subtitle: string;
// }
// withDefaults(defineProps<Props>(), {
//   thumbnail: '',
//   title: '',
//   subtitle: '',
// });

interface Info {
  name: string;
  age: number;
  add?: string;
}

interface Props {
  // hoho: {
  //   name: string;
  //   age: number;
  //   add?: string;
  // };
  hoho: Info;
}
const props = defineProps<Props>();
console.log('c porps?', props);

defineEmits<{
  click: [];
}>();
</script>
