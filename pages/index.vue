<script setup lang="ts">
import {getFetchData} from "~/composables/request";
const list = ref([]), isOpen = ref(false)
const selected = ref([])
const toast = useToast()
const columns = [
  {
    key: 'id',
    label: 'ID'
  },
  {
    key: 'updateBy',
    label: 'UpdateBy'
  },
  {
    key: 'versionNum',
    label: 'VersionNum'
  },
  {
    key: 'path',
    label: 'ReportPath'
  },
  {
    key: 'createTime',
    label: 'CreateTime',
    sortable: true
  }
]
const params = reactive({
  pageSize: 10,
  pageNum: 1,
  total: 0,
  sn: ''
})
const loading = ref(false)
watch(() => params.pageNum,
    (v) => getList()
)
async function getList() {
  loading.value = true
  const res = await getFetchData({
    url: '/version/list',
    method: 'get',
    params
  })
  loading.value = false
  console.log('list', res)
  list.value = res.rows
  selected.value = [list.value[0]]
  params.total = res.total
}
getList()
function toastOpen() {
  toast.add({ title: 'Hello world!' })
  isOpen.value = true
}
</script>

<template>
  <div class="py-5">
    <UForm class="flex">
      <UFormGroup label="SN" name="sn" class="w-1/3 mr-5">
        <UInput v-model="params.sn"></UInput>
      </UFormGroup>
      <UFormGroup label="Name" name="name" class="w-1/3">
        <UInput v-model="params.name"></UInput>
      </UFormGroup>
    </UForm>
    <div class="flex justify-end">
      <UButton @click="toastOpen" class="my-5">新增</UButton>
    </div>
    <UTable :rows="list" :columns="columns" v-model="selected"
            :empty-state="{ icon: 'i-heroicons-circle-stack-20-solid', label: 'No Data.' }"
            :sort="{ column: 'createTime'}" :loading="loading">
    </UTable>
    <div class="my-5 flex justify-end">
      <UPagination v-model="params.pageNum" :page-count="params.pageSize" :total="params.total" />
    </div>

    <UModal v-model="isOpen">
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <Placeholder class="h-8" />
        </template>

        <Placeholder class="h-32" />

        <template #footer>
          <Placeholder class="h-8" />
        </template>
      </UCard>
    </UModal>
  </div>
</template>

<style lang="scss">
a {
  text-decoration: none;
}
</style>