<script setup lang="ts">
import { useRouter } from 'vue-router'
import QAStudyMode from '../components/QAStudyMode.vue'

const router = useRouter()

function handleBack() {
  router.push('/')
}
</script>

<template>
  <div class="study-view-page fade-in">
    <QAStudyMode @back="handleBack" />
  </div>
</template>

<style scoped>
.study-view-page {
  width: 100%;
}
</style>
