<template>
    <div class="p-4">

        <form>
            <div class="flex">
                <div class="w-1/3 pr-4">
                    <img :src="product.photo" alt="product image" class="w-full h-full object-fill rounded-3xl" />
                </div>
                <div class="w-2/3">
                    <div>
                        <label for="title"
                            class="block mt-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                        <input type="text" id="title" :value="title"
                            class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
                            placeholder="Title" required>
                    </div>
                    <div>
                        <label for="category"
                            class="block mt-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                        <input type="text" id="category" :value="category"
                            class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
                            placeholder="Category" required>
                    </div>
                    <div>
                        <label for="desciption"
                            class="block mt-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                        <input type="text" id="desciption" :value="description"
                            class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
                            placeholder="Description" required>
                    </div>
                    <div>
                        <label for="status"
                            class="block mt-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
                        <input type="text" id="status" :value="status"
                            class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
                            placeholder="Status" required>
                    </div>
                    <div class="relative">
                        <label for="price"
                            class="block mt-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                        <span class="absolute inset-y-0 left-0 top-5 flex items-center pl-2">
                            {{ unit }}
                        </span>
                        <input type="number" id="price" :value="price"
                            class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 pl-8 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
                            placeholder="Price" required />
                    </div>
                    <div class="relative">
                        <label for="orignalPrice"
                            class="block mt-2 text-sm font-medium text-gray-900 dark:text-white">Orignal
                            Price</label>
                        <span class="absolute inset-y-0 left-0 top-[1.1rem] flex items-center pl-2">
                            {{ unit }}
                        </span>
                        <input type="number" id="orignalPrice" :value="originalPrice"
                            class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 pl-8 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
                            placeholder="Price" required>
                    </div>
                    <div class="">
                        <label for="createdBy" class="block mt-2 text-sm font-medium text-gray-900 dark:text-white">Created
                            By</label>
                        <input type="text" id="createdBy" :value="createdBy"
                            class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
                            placeholder="Created By" required>
                    </div>
                    <div class="">
                        <label for="quantity"
                            class="block mt-2 text-sm font-medium text-gray-900 dark:text-white">Quantity</label>
                        <input type="number" id="quantity" :value="quantity"
                            class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
                            placeholder="Quantity" required>
                    </div>
                </div>
            </div>
            <div class="">
                <label for="type" class="block mt-2 text-sm font-medium text-gray-900 dark:text-white">Type</label>
                <input type="text" id="type" :value="type"
                    class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
                    placeholder="Delivery Charges" required>
            </div>
            <div class="">
                <label for="delivery" class="block mt-2 text-sm font-medium text-gray-900 dark:text-white">Delivery</label>
                <input type="text" id="delivery" :value="delivery?.charges !== 0 ? delivery?.charges : delivery.type"
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
import sanitizeHtml from 'sanitize-html'
export default {
    data() {
        return {
            toast: useToast(),
            product: this.$store.getters['getProduct'],
            title: null,
            description: null,
            category: null,
            status: null,
            price: null,
            originalPrice: null,
            unit: null,
            createdBy: null,
            type: null,
            quantity: null,
            delivery: null,
            sanitized: null,
        }
    },
    methods: {
        onSubmit() {
            // Update the store state
            this.$store.commit('setProduct', {
                title: this.title,
                description: this.description,
                category: this.category,
                status: this.status,
                price: this.price,
                unit: this.unit,
                createdBy: { name: this.createdBy }, // Assuming createdBy is an object with a 'name' property
                type: this.type,
                quantity: this.quantity,
                delivery: this.delivery, // Assuming delivery is an object with a 'type' property
                originalPrice: this.originalPrice,
            });

            // Call API with updated state (Replace the following line with your actual API call)
            this.callApi(this.$store.getters['getProduct'])
        },
        async callApi(product) {
            try {
                const response = await api.put(`http://localhost:5000/api/product/${product._id}`)
                this.toast.success(String(response.data.message))
            } catch (error) {
                this.toast.error(String(error))
            }
        },
    },
    mounted() {
        const product = this.$store.getters['getProduct'];

        if (product) {
            this.title = product.title
            this.description = sanitizeHtml(product.description, { allowedTags: [], allowedAttributes: {} })
            this.category = product.category
            this.status = product.status
            this.price = product.price
            this.unit = product.unit
            this.createdBy = product.createdBy.name
            this.type = product.type
            this.quantity = product.quantity
            this.delivery = product.delivery
            this.originalPrice = product.originalPrice

            // console.log(this.title, this.description, this.category, this.status, this.price, this.unit, this.createdBy, this.type, this.quantity, this.delivery)
        }
    }
}
</script>
<style lang="">
    
</style>