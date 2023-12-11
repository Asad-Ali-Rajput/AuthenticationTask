<template>
    <div class="p-4">

        <form @submit.prevent="onSubmit">
            <div class="flex">
                <div class="w-1/3 pr-4">
                    <img :src="product.photo" alt="product image" class="w-full h-full object-fill rounded-3xl" />
                </div>
                <div class="w-2/3">
                    <div>
                        <label for="image"
                            class="block mt-2 text-sm font-medium text-gray-900 dark:text-white">Image</label>
                        <input type="url" id="image" v-model="product.photo"
                            class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
                            placeholder="www.url.com" required>
                    </div>
                    <div>
                        <label for="title"
                            class="block mt-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                        <input type="text" id="title" v-model="product.title"
                            class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
                            placeholder="Doe" required>
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
                            placeholder="Description">
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
                            placeholder="Orignal Price" required>
                    </div>
                    <div class="">
                        <label for="quantity"
                            class="block mt-2 text-sm font-medium text-gray-900 dark:text-white">Quantity</label>
                        <input type="number" id="quantity" v-model="product.quantity"
                            class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
                            required>
                    </div>
                </div>
            </div>
            <div class="">
                <label for="type" class="block mt-2 text-sm font-medium text-gray-900 dark:text-white">Type</label>
                <input type="text" id="type" v-model="product.type"
                    class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500">
            </div>
            <div class="">
                <label for="delivery" class="block mt-2 text-sm font-medium text-gray-900 dark:text-white">Delivery</label>
                <input type="text" id="delivery" v-model="product.delivery.charges"
                    class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500">
            </div>
            <button type="submit"
                class="text-white bg-violet-700 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 my-4 text-center dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800">Submit</button>
        </form>
    </div>
</template>
<script>
import api from './Api'
import { useToast } from 'vue-toastification'
export default {
    data() {
        const product = {
            title: null,
            description: null,
            category: null,
            status: null,
            price: null,
            originalPrice: null,
            unit: "$",
            photo: null,
            type: null,
            quantity: null,
            delivery: {
                charges: 0,
                type: 'free',
            },
            createdBy: this.$store.getters['getLoginInfo'],
        }
        if (product.delivery.charges === 0) {
            product.delivery.type = "free"
        } else {
            product.delivery.type = "paid"
        }
        return {
            toast: useToast(),
            product,
        }
    },
    methods: {
        async onSubmit() {
            try {
                const response = await api.post(`http://localhost:5000/api/product`, this.product)
                this.toast.success(String(response.data.message))
            } catch (error) {
                this.toast.error(String(error))
            }
        },
    },
}
</script>
<style lang="">
    
</style>