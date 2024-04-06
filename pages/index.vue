<template>
  <q-layout>
    <q-page-container>
      <q-page padding>
        <div class="q-my-xl tex-center">
          <div class="text-h4">All courese</div>
        </div>
        <div class="row q-col-gutter-lg">
          <ul>
            <li v-for="{ courseSlug, title } in courses" :key="title">
              <nuxt-link :to="`/course/${courseSlug}`">
                <div>{{ title }}</div>
              </nuxt-link>
            </li>
          </ul>
        </div>
        asdsad
        <CourseCard :hoho="obj" />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
const { courses } = useCourses();
const obj: { name: string; age: number; add?: string } = {
  name: 'jong',
  age: 13,
  add: 'z',
};

// console.log('courses?', courses);
</script>

<style scoped></style>
