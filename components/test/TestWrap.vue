<template>
    <div class="video-container">
        parent {{ ii }}
        <TestDetail v-for="(d, idx) in dd" :key="d.name" :data="d" :idxzz="ii" @click:remove="handleRemove" @click="handleParentClick(idx,d )" ref="btnallRef" :class="n === idx ? 'active': false" />
    </div>
  </template>
  
  <script setup lang="ts">

    const dd = ref([{ id: 0, name: 'e1', age: 1 }, { id: 1, name: 'e2', age: 2 }, { id: 2, name: 'e3', age: 3 }])
    const isActive = ref(false)
    const ii = ref(0)


  const handleParentClick = (idx: number, d: object) => {
    console.log(idx)
    // return isActive.value = !isActive.value
    // return idx === d.id ? 'active' : false
    console.log(d)
    ii.value = idx
    n.value = idx
  }


  const btnallRef = ref(null);
  const n = ref(0);
  const handleRemove = () => {
      // btnallRef.value.map(item => console.log(item))
      // console.log(btnallRef)
  }


  var arr: number[] = [10, 3, 5, 11, 50, 7, 35, 23, 30, 42]
  
  function ba(arr: number[] | undefined) {
    if(arr.length <= 1) return arr;

    let fibo = [arr.shift()];
    let g1 = [];
    let g2 = [];
   
    // console.log('fibo?',fibo)
  
    for(let i in arr) {
      if(arr[i] < fibo) {
        g1.push(arr[i])
      } else {
        g2.push(arr[i])
      }
    }
   
    console.log(g1, g2)

    let aa = ba(g1).concat(fibo, ba(g2))
    // console.log('aa?', aa)
    return aa
  }


  console.log('last fibo?', ba(arr))

  </script>
  


  <style>
    .active button { border: 2px solid red; }
</style>