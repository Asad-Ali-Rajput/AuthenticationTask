<template>
    <div class="p-4">

        <form v-if="product" @submit.prevent="onSubmit">
            <div class="flex">
                <div class="w-1/3 pr-4">
                    <img :src="product.photo" alt="product image" class="w-full h-full object-fill rounded-3xl" />
                </div>
                <div class="w-2/3">
                    <div>
                        <label for="title"
                            class="block mt-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                        <input type="text" id="title" v-model="product.title"
                            class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
                            placeholder="Title" required>
                    </div>
                    <div>
                        <label for="category"
                            class="block mt-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                        <input type="text" id="category" v-model="product.category"
                            class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
                            placeholder="Category" required>
                    </div>
                    <div>
                        <label for="desciption"
                            class="block mt-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                        <input type="text" id="desciption" v-model="product.description"
                            class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
                            placeholder="Description" required>
                    </div>
                    <div>
                        <label for="status"
                            class="block mt-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
                        <input type="text" id="status" v-model="product.status"
                            class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
                            placeholder="Status" required>
                    </div>
                    <div class="relative">
                        <label for="price"
                            class="block mt-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                        <span class="absolute inset-y-0 left-0 top-5 flex items-center pl-2">
                            {{ product.unit }}
                        </span>
                        <input type="number" id="price" v-model="product.price"
                            class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 pl-8 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
                            placeholder="Price" required />
                    </div>
                    <div class="relative">
                        <label for="orignalPrice"
                            class="block mt-2 text-sm font-medium text-gray-900 dark:text-white">Orignal
                            Price</label>
                        <span class="absolute inset-y-0 left-0 top-[1.1rem] flex items-center pl-2">
                            {{ product.unit }}
                        </span>
                        <input type="number" id="orignalPrice" v-model="product.originalPrice"
                            class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 pl-8 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
                            placeholder="Price" required>
                    </div>
                    <div class="">
                        <label for="createdBy" class="block mt-2 text-sm font-medium text-gray-900 dark:text-white">Created
                            By</label>
                        <input type="text" id="createdBy" :value="product.createdBy?.name" disabled
                            class="bg-white border border-gray-300 text-gray-400 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
                            placeholder="Created By" required>
                    </div>
                    <div class="">
                        <label for="quantity"
                            class="block mt-2 text-sm font-medium text-gray-900 dark:text-white">Quantity</label>
                        <input type="number" id="quantity" v-model="product.quantity"
                            class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
                            placeholder="Quantity" required>
                    </div>
                </div>
            </div>
            <div class="">
                <label for="type" class="block mt-2 text-sm font-medium text-gray-900 dark:text-white">Type</label>
                <input type="text" id="type" v-model="product.type"
                    class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
                    placeholder="Type" required>
            </div>
            <div class="">
                <label for="delivery" class="block mt-2 text-sm font-medium text-gray-900 dark:text-white">Delivery</label>
                <input type="text" id="delivery" v-model="formattedDelivery"
                    class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
                    placeholder="Delivery Charges" required>
            </div>
            <button type="submit"
                class="text-white bg-violet-700 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 my-4 text-center dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800">Submit</button>
        </form>
    </div>
</template>
<script>
import api from './Api'
import { useToast } from 'vue-toastification'
// import sanitizeHtml from 'sanitize-html'
export default {
    data() {
        return {
            toast: useToast(),
            productId: this.$store.getters['getProduct'],
            product: null,
        }
    },
    computed: {
        formattedDelivery: {
            get() {
                return this.product.delivery?.charges !== 0 ? this.product.delivery?.charges : this.product.delivery.type
            },
            set(value) {
                if (this.product.delivery) {
                    this.product.delivery.charges = value
                }
            },
        },
    },
    methods: {
        async fetchProductById(productId) {
            try {
                const response = await api.get(`http://localhost:5000/api/product/${productId}`)
                this.product = response.data
            } catch (error) {
                console.error('Error fetching product:', error)
                // Handle the error (e.g., show an error message)
            }
        },
        async onSubmit() {

            this.callApi(this.productId)
        },
        async callApi(productId) {
            try {
                const response = await api.put(`http://localhost:5000/api/product/${productId}`, this.product)
                if (response.status !== 200) return this.toast.success(String(response.statusText))
                this.toast.success("Product has been updated")
                this.fetchProductById(productId)
                this.$router.go(-1)
            } catch (error) {
                this.toast.error(String(error))
            }
        },
    },
    mounted() {
        if (this.productId) {
            this.fetchProductById(this.productId)
        }
    }
}
</script>
<style lang="">
    
</style>