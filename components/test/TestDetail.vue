<template>
    <div>
        <button type="button" @click="handleParentClick(data.name); " :class="idxzz === data.id ? 'active' : ''"  >
            {{ data.id }}
            <p>name: {{ data.name }}</p>
            <p>age: {{ data.age }}</p>
        </button>

    </div>
  </template>
  
  <script setup lang="ts">

  interface Props {
    data: {
        name: string;
        age: number;
    },
    idx: number
  }
  const props = defineProps<Props>();
  const { data, idxzz } = toRefs(props)

  
  console.log('idx?', idxzz)

    const isActive = ref(false)

    
    const emit = defineEmits ([ "click:remove" ])

    const handleParentClick = (name: string):string | boolean => {
        // btnRef.value.classList.remove('active')
        // isActive.value = !isActive.value
        
        emit("click:remove")
        // return props.data.idx === props.data.id ? 'active' : false;
    }


    // const aa = computed((a) => {
    //     return  props.data.name ===  'active'
    // })
    

  

  </script>
  
