<script>
import api from './Api'
import { useRouter } from 'vue-router'
import { createVNode } from 'vue'
import { Modal } from 'ant-design-vue'
import { DeleteOutlined } from '@ant-design/icons-vue'
export default {
  data() {
    return {
      route: useRouter(),
      allProducts: null,
      fetchedInterval: null,
      token: this.$store.getters['getAccessToken'],
    }
  },
  methods: {
    async fetchProduct() {
      try {
        const response = await api.get('http://localhost:5000/api/products')
        this.allProducts = response.data
      } catch (error) {
        console.error('Error fetching profile:', error)
      }
    },
    handleRowClick(item) {
      // console.log("Row Clicked:", item)
      this.$store.dispatch('setProduct', item)
      this.route.push('/editProduct')
    },
    handleDeleteClick(index) {
      // console.log("Delete Clicked for row index:", index)
      Modal.confirm({
        title: 'Are you sure delete this product?',
        icon: createVNode(DeleteOutlined, { style: 'color: red;' }),
        content: 'Some descriptions',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
          this.callApi(index)
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    },
    async callApi(product_id) {
      try {
        const response = await api.delete(`http://localhost:5000/api/product/${product_id}`)
        this.toast.success(String(response.data.message))
      } catch (error) {
        this.toast.error(String(error))
      }
    },
    handleAddProduct() {
      this.route.push('/addProduct')
    }
  },
  created() {
    this.fetchProduct()

    // Set up an interval to call fetchProduct every, for example, 3 seconds
    this.fetchedInterval = setInterval(() => {
      this.fetchProduct()
    }, 3000)
  },

  destroyed() {
    // Clear the interval when the component is destroyed to prevent memory leaks
    clearInterval(this.fetchedInterval)
  },
}
</script>

<template>
  <div class="">
    <div class="w-full flex justify-end items-center px-4 py-4">
      <button type="button"
        class="text-white bg-violet-700 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800"
        @click="handleAddProduct">
        Add Product
        <svg class="w-3 h-3 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
          viewBox="0 0 14 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M7 1v12M1 7h12" />
        </svg>
      </button>
    </div>
    <table class="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">Photo</th>
          <th scope="col" class="px-6 py-3">Title</th>
          <th scope="col" class="px-6 py-3">Description</th>
          <th scope="col" class="px-6 py-3">Category</th>
          <th scope="col" class="px-6 py-3">Status</th>
          <th scope="col" class="px-6 py-3">Price</th>
          <th scope="col" class="px-6 py-3">Unit</th>
          <th scope="col" class="px-6 py-3">Created By</th>
          <th scope="col" class="px-6 py-3">Type</th>
          <th scope="col" class="px-6 py-3">Quantity</th>
          <th scope="col" class="px-6 py-3">Delivery</th>
          <th scope="col" class="px-6 py-3"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in allProducts" :key="index"
          class="cursor-pointer hover:bg-gray-100 odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
          <td class="px-6 py-4" @click="handleRowClick(item)">
            <img :src="item.photo" alt="Product Photo" class="w-12 h-12 object-cover rounded" />
          </td>
          <td class="px-6 py-4" @click="handleRowClick(item)">{{ item.title }}</td>
          <td class="px-6 py-4 whitespace-pre-line w-48" @click="handleRowClick(item)">{{ item.description }}</td>
          <td class="px-6 py-4" @click="handleRowClick(item)">{{ item.category }}</td>
          <td class="px-6 py-4" @click="handleRowClick(item)">{{ item.status }}</td>
          <td class="px-6 py-4" @click="handleRowClick(item)">{{ item.unit }}" "{{ item.price }}</td>
          <td class="px-6 py-4" @click="handleRowClick(item)"></td>
          <td class="px-6 py-4" @click="handleRowClick(item)">{{ item.createdBy.name }}</td>
          <td class="px-6 py-4" @click="handleRowClick(item)">{{ item.type }}</td>
          <td class="px-6 py-4" @click="handleRowClick(item)">{{ item.quantity }}</td>
          <td class="px-6 py-4" @click="handleRowClick(item)">{{ item?.delivery?.type }}</td>
          <td class="px-6 py-4">
            <button @click="handleDeleteClick(index)" class="text-red-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
/* Add your styles here */
</style>
