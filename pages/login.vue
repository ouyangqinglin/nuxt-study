<script setup lang="ts">
import {getFetchData} from "~/composables/request";
definePageMeta({
  layout: 'blank'
})
const route = useRoute()
const token = useCookie('token')

const params = reactive({
  username: 'admin',
  password: 'admin123'
})
async function login() {
  const res = await getFetchData({
    url: '/login',
    method: 'post',
    params
  })
  token.value = { 'token': res.token }
  navigateTo(route.query.redirect || '/')
}
</script>

<template>
  <div>
    <UInput type="text" v-model="params.username" />
    <UInput type="text" v-model="params.password" />
    <UButton @click="login">login</UButton><br />
    <nuxt-link to="/">Home</nuxt-link>
  </div>
</template>

<style scoped>

</style>