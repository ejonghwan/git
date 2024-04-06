<template>
  <div class="q-pa-xl">
    <AppCard :hoho="'zzz hoho'">
      <template #header>
        <div class="text-h5 text-weight-medium">{{ course?.title }}</div>
        <div class="flex q-gutter-x-sm items-center q-mt-sm text-grey-8">
          <span class="flex items-center">
            <q-icon name="star" size="16px" color="orange" />
            <span>5.0</span>
          </span>
          <span> {{ course?.rating }} </span>
          <span>&middot;</span>
          <span>{{ course?.studentCount }}명의 수강생</span>
          <q-space />
          <a class="text-bold" :href="course?.reviewsUrl" target="_blank">
            수강평 보기
          </a>
        </div>
      </template>
      <div class="q-mb-md">
        <VideoPlayer />
      </div>
      <div class="row q-col-gutter-md">
        <div class="col-6">
          <q-btn
            label="인프런에서 수강하기"
            unelevated
            class="full-width"
            color="primary"
            href="https://inf.run/yWHo"
            target="_blank"
          />
        </div>
        <div class="col-6">
          <q-btn
            label="짐코딩 클럽에서 수강하기"
            unelevated
            class="full-width"
            color="red"
            href="https://edu.gymcoding.co/p/products"
            target="_blank"
          />
        </div>
      </div>
      <p class="q-mt-lg text-grey-8">
        {{ course?.content }}
      </p>
    </AppCard>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const { course } = useCourse(route.params.courseSlug as string);

console.log(route.params, 'params?');

/*
  오류난 이유?
  route.params에서 가져온건 string 또는 string[] 이라서 ... 
  우리는 함수 선언문 매개변수에 string이라고 정해줬기 때문에 string만 보내야함. 그래서 명시해줘야함
*/
</script>

<style scoped></style>
