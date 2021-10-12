<script setup>
import { ref } from 'vue'

defineProps({
  msg: String
})

const count = ref(0)
function add(){
  count.value++
}
</script>

<template>
  <h1>{{ msg }}</h1>
  <button type="button" @click="add">count is: {{ count }}</button>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
