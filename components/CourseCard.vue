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
import axios from 'axios';
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


// type HeadersInit = Headers | string[][] | Record<string, string>;
interface Res<T> {
  data?: T;
  aa: string
}

interface GetD {
  completed: boolean;
  id: number;
  title: string
  userId: number;
}
// test2
const getData = async <T, >(url: string): Promise<T> => {
  const res = await axios.get(url);
  const data = res.data;
  // return { data: data, aa: 'asd' }
  return data
};
onBeforeMount(async () => {
  const d = await getData<Res<GetD>>('https://jsonplaceholder.typicode.com/todos/');
  console.log('ddddddddddddddd??????????????', d)
});






interface Hoho<T, G> {
  hoho: string
  zzz: string
  gene: T
  gene1: G
}

interface Gene {
  gene2: string;
}

const zz: Hoho<string, Gene> = {
  hoho: 'aa',
  zzz: 'asd',
  gene: 'gene1',
  gene1: {
    gene2: 'gene2'
  }
}


// 제네릭 테스트 1
// function abc<T>(z: T): string {
//   console.log(z);
//   return 'zz';
// }

const abc = <T,> (z: T): string => {
  console.log(z);
  return 'zz';
}  
const re = abc<string>('hhhh');
console.log('re?', re);


// 제네릭 테스트 2
// function fn(arr: Type): Type {
//   return arr[0]
// }
// const fn = <Type> (arr: Type[]): Type => arr[0];
// console.log('n', fn<number>(['a',1,2,3]) ) // type error
// console.log('s', fn<string>(['1','2','3'])); 


// 제네릭 테스트 3
// 아래 소스를 제네릭으로 변경
// interface innerData {
//   completed: boolean;
//   id: number;
//   title: string;
//   userId: number;
// }

// interface GetDataaa {
//   header: object
//   status: number;
//   data: innerData
// }

// const getDataaa = async (url: string): Promise<GetDataaa> => {
//   const res = await axios.get(url);
//   const data = res.data
//   return { header: res.headers, status: res.status, data: await data  }
// }



// 이렇게 변경
// 정리하자면 인터페이스를 선언할 때 넣는게 아니라 실행할 때 넣는다고 보면됨.
// 지금껏 헷갈린게 함수 만들때도 선언부분이기때문에 헷갈렸는데... 생각해보니 인터페이스 선언이었음.

interface GetDataaa<T> { //밖에다 매개변수 주고 선언할때 위 인터페이스를 넘기는구나 
  header: object
  status: number;
  data: T;
}
interface innerData {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
}


const getVal = ref() 
// const getDataaa = async (url: string): Promise<GetDataaa<innerData>> => {
const getDataaa = async <T, >(url: string): Promise<GetDataaa<T>> => {
  const res = await axios.get(url);
  const data = res.data
  return { header: res.headers, status: res.status, data: data  }
}


getVal.value = await getDataaa<GetDataaa<innerData>>('https://jsonplaceholder.typicode.com/todos/1')
console.log('?????????????????????', getVal.value.header)
// console.log('dd?', dd)





defineEmits<{
  click: [];
}>();
</script>
