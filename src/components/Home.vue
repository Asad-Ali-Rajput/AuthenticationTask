<script>
import api from './Api'
import { useRouter } from 'vue-router'
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
      console.log("Delete Clicked for row index:", index)
    },
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
  <div class="container">
    <table class="w-full border border-gray-300">
      <thead>
        <tr>
          <th class="py-2 px-4 border-b">Photo</th>
          <th class="py-2 px-4 border-b">Title</th>
          <th class="py-2 px-4 border-b w-[10rem]">Description</th>
          <th class="py-2 px-4 border-b">Category</th>
          <th class="py-2 px-4 border-b">Status</th>
          <th class="py-2 px-4 border-b">Price</th>
          <th class="py-2 px-4 border-b">Unit</th>
          <th class="py-2 px-4 border-b">Created By</th>
          <th class="py-2 px-4 border-b">Type</th>
          <th class="py-2 px-4 border-b">Quantity</th>
          <th class="py-2 px-4 border-b">Delivery</th>
          <th class="py-2 px-4 border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in allProducts"
          :key="index"
          @click="handleRowClick(item)"
          class="cursor-pointer hover:bg-gray-100"
        >
          <td class="py-2 px-4">
            <img :src="item.photo" alt="Product Photo" class="w-12 h-12 object-cover rounded" />
          </td>
          <td class="py-2 px-4">{{ item.title }}</td>
          <td class="py-2 px-4 w-[10rem] whitespace-pre-line">{{ item.description }}</td>
          <td class="py-2 px-4">{{ item.category }}</td>
          <td class="py-2 px-4">{{ item.status }}</td>
          <td class="py-2 px-4">{{ item.unit }}" "{{ item.price }}</td>
          <td class="py-2 px-4"></td>
          <td class="py-2 px-4">{{ item.createdBy.name }}</td>
          <td class="py-2 px-4">{{ item.type }}</td>
          <td class="py-2 px-4">{{ item.quantity }}</td>
          <td class="py-2 px-4">{{ item.delivery.type }}</td>
          <td class="py-2 px-4">
            <button @click="handleDeleteClick(index)" class="text-red-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
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
