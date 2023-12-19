<script>
import api from './Api'
import { useRouter } from 'vue-router'
import { createVNode } from 'vue'
import { Modal } from 'ant-design-vue'
import { DeleteOutlined } from '@ant-design/icons-vue'
import { ChevronUpDownIcon, FunnelIcon } from '@heroicons/vue/24/outline'
export default {
  components: {
    ChevronUpDownIcon,
    FunnelIcon,
  },
  data() {
    return {
      route: useRouter(),
      allProducts: null,
      fetchedInterval: null,
      token: this.$store.getters['getAccessToken'],
      sortColumn: '', // Track the column for sorting
      sortOrder: 'desc', // Track the sort order ('asc' or 'desc')
      showTooltip: {
        title: false,
        description: false,
        category: false,
        status: false,
        price: false,
        createdBy: false,
        type: false,
        quantity: false,
        delivery: false,
      },
      typedValue: {
        title: '',
        description: '',
        category: '',
        status: '',
        price: '',
        createdBy: '',
        type: '',
        quantity: '',
        delivery: '',
      },
    }
  },
  methods: {
    sortProducts(column, order) {
      this.allProducts.sort((a, b) => {
        const aValue = a[column]
        const bValue = b[column]

        if (aValue === undefined && bValue === undefined) return 0

        if (typeof aValue !== 'number' && typeof bValue !== 'number') return order === 'asc' ? aValue.toString().localeCompare(bValue.toString()) : bValue.toString().localeCompare(aValue.toString())

        return order === 'asc' ? aValue - bValue : bValue - aValue
        // if (typeof aValue === 'number' && typeof bValue === 'number') {
        // } else {
        // Use localeCompare for string comparison
        // return order === 'asc' ? aValue.toString().localeCompare(bValue.toString()) : bValue.toString().localeCompare(aValue.toString())
        // }
      })
    },
    async fetchProduct() {
      try {
        const response = await api.get('http://localhost:5000/api/products')
        // Check if any of the typed values are not empty
        const hasTypedValues = Object.values(this.typedValue).some(value => value.trim() !== '');
        
        if (hasTypedValues) {
          // Filter the products only if there are non-empty typed values
          for (const column in this.typedValue) {
            if (this.typedValue[column].trim() !== '') {
              this.filterProducts(column);
            }
          }
        } else {
          // If no non-empty typed values, set allProducts to the fetched data
          this.allProducts = response.data;
        }
        this.allProducts = response.data
        this.sortProducts(this.sortColumn, this.sortOrder)
      } catch (error) {
        console.error('Error fetching profile:', error)
      }
    },
    handleRowClick(item) {
      // console.log("Row Clicked:", item)
      this.$store.dispatch('setProduct', item._id)
      this.route.push({ name: 'editProduct', params: { productId: item._id } })
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
        onOk: () => {
          this.callDelete(index)
        },
        onCancel() {
          console.log('Cancel')
        },
      });
    },
    async callDelete(product_id) {
      try {
        const response = await api.delete(`http://localhost:5000/api/product/${product_id}`)
        this.toast.success(String(response.data.message))
      } catch (error) {
        this.toast.error(String(error))
      }
    },
    handleAddProduct() {
      this.route.push({ name: 'addProduct', params: { str: 'add' } })
    },
    handleSort(column) {
      // Toggle sort order if clicking on the same column
      console.log("toggle sort")
      if (this.sortColumn === column) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc'
      } else {
        this.sortColumn = column
        this.sortOrder = 'asc'
      }
      this.sortProducts(this.sortColumn, this.sortOrder)
    },
    toggleTooltip(column) {
      // Close other tooltips
      // console.log("toggletooltip")
      for (const key in this.showTooltip) {
        if (key !== column) {
          this.showTooltip[key] = false
        }
      }
      // Toggle the tooltip for the clicked column
      this.showTooltip[column] = !this.showTooltip[column]
    },
    handleFilter(column) {
      const value = this.typedValue[column].toLowerCase()

      // Filter allProducts based on the typed value and column
      this.allProducts = this.allProducts.filter(product => {
        const productValue = String(product[column]).toLowerCase()
        return productValue.includes(value)
      });
    },
  },
  created() {
    this.fetchProduct()

    // Set up an interval to call fetchProduct every, for example, 3 seconds
    this.fetchedInterval = setInterval(() => {
      this.fetchProduct()
    }, 3000)
  },

  beforeUnmount() {
    // Clear the interval when the component is destroyed to prevent memory leaks
    clearInterval(this.fetchedInterval)
  },
}
</script>

<template>
  <div class="w-full h-full">
    <div class="w-full flex justify-end items-center px-4 py-4">
      <button type="button"
        class="text-white bg-violet-700 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800"
        @click="handleAddProduct">
        Add Product
        <svg class="w-3 h-3 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M7 1v12M1 7h12" />
        </svg>
      </button>
    </div>
    <table class="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3 w-[7rem]">Photo</th>
          <th scope="col" class="px-6 py-3 w-[10rem]">
            <div class="flex items-center">
              Title
              <button class="flex items-center cursor-pointer" @click="handleSort('title')">
                <ChevronUpDownIcon class="w-4 h-4 mx-1" />
              </button>
              <button class="flex items-center cursor-pointer" @click="toggleTooltip('title')">
                <FunnelIcon class="w-4 h-4" />
              </button>
              <div :class="{ 'invisible': !showTooltip.title, 'opacity-100': showTooltip.title }" id="tooltip-dark"
                role="tooltip"
                class="absolute top-[7.3rem] z-10 inline-block text-sm font-medium border border-violet-500 bg-white text-white rounded-lg shadow-sm tooltip ">
                <div
                  class="tooltip-arrow absolute z-10 -top-[1rem] pl-[3.4rem] text-[14px] text-white bg-violet-500 shadow-sm"
                  data-popper-arrow></div>
                <div class="w-[20%] h-[5%]">
                  <input v-model="typedValue.title" @input="handleFilter('title')"
                    class="px-3 py-2 rounded-lg focus:outline-none text-slate-950" type="text"
                    placeholder="Enter something..." />

                </div>
              </div>
            </div>
          </th>
          <th scope="col" class="px-6 py-3 w-[25rem]">
            <div class="flex items-center">
              Description
              <button class="flex items-center cursor-pointer" @click="handleSort('description')">
                <ChevronUpDownIcon class="w-4 h-4 mx-1" />
              </button>
              <button class="flex items-center cursor-pointer" @click="toggleTooltip('description')">
                <FunnelIcon class="w-4 h-4" />
              </button>
              <div :class="{ 'invisible': !showTooltip.description, 'opacity-100': showTooltip.description }"
                id="tooltip-dark" role="tooltip"
                class="absolute top-[7.3rem] z-10 inline-block text-sm font-medium border border-violet-500 bg-white text-white rounded-lg shadow-sm tooltip ">
                <div
                  class="tooltip-arrow absolute z-10 -top-[1rem] pl-[6.4rem] text-[14px] text-white bg-violet-500 shadow-sm"
                  data-popper-arrow></div>
                <div class="w-[20%] h-[5%]">
                  <input v-model="typedValue.description" @input="handleFilter('description')"
                    class="px-3 py-2 rounded-lg focus:outline-none text-slate-950" type="text"
                    placeholder="Enter something..." />
                </div>
              </div>
            </div>
          </th>
          <th scope="col" class="px-6 py-3 w-[6rem]">
            <div class="flex items-center">
              Category
              <button class="flex items-center cursor-pointer" @click="handleSort('category')">
                <ChevronUpDownIcon class="w-4 h-4 mx-1" />
              </button>
              <button class="flex items-center cursor-pointer" @click="toggleTooltip('category')">
                <FunnelIcon class="w-4 h-4" />
              </button>
              <div :class="{ 'invisible': !showTooltip.category, 'opacity-100': showTooltip.category }" id="tooltip-dark"
                role="tooltip"
                class="absolute top-[7.3rem] z-10 inline-block text-sm font-medium border border-violet-500 bg-white text-white rounded-lg shadow-sm tooltip ">
                <div
                  class="tooltip-arrow absolute z-10 -top-[1rem] pl-[5.5rem] text-[14px] text-white bg-violet-500 shadow-sm"
                  data-popper-arrow></div>
                <div class="w-[20%] h-[5%]">
                  <input v-model="typedValue.category" @input="handleFilter('category')"
                    class="px-3 py-2 rounded-lg focus:outline-none text-slate-950" type="text"
                    placeholder="Enter something..." />
                </div>
              </div>
            </div>
          </th>
          <th scope="col" class="px-6 py-3 w-[6rem]">
            <div class="flex items-center">
              Status
              <button class="flex items-center cursor-pointer" @click="handleSort('status')">
                <ChevronUpDownIcon class="w-4 h-4 mx-1" />
              </button>
              <button class="flex items-center cursor-pointer" @click="toggleTooltip('status')">
                <FunnelIcon class="w-4 h-4" />
              </button>
              <div :class="{ 'invisible': !showTooltip.status, 'opacity-100': showTooltip.status }" id="tooltip-dark"
                role="tooltip"
                class="absolute top-[7.3rem] z-10 inline-block text-sm font-medium border border-violet-500 bg-white text-white rounded-lg shadow-sm tooltip ">
                <div
                  class="tooltip-arrow absolute z-10 -top-[1rem] pl-[4.2rem] text-[14px] text-white bg-violet-500 shadow-sm"
                  data-popper-arrow></div>
                <div class="w-[20%] h-[5%]">
                  <input v-model="typedValue.status" @input="handleFilter('status')"
                    class="px-3 py-2 rounded-lg focus:outline-none text-slate-950" type="text"
                    placeholder="Enter something..." />
                </div>
              </div>
            </div>
          </th>
          <th scope="col" class="px-6 py-3 w-[6rem]">
            <div class="flex items-center">
              Price
              <button class="flex items-center cursor-pointer" @click="handleSort('price')">
                <ChevronUpDownIcon class="w-4 h-4 mx-1" />
              </button>
              <button class="flex items-center cursor-pointer" @click="toggleTooltip('price')">
                <FunnelIcon class="w-4 h-4" />
              </button>
              <div :class="{ 'invisible': !showTooltip.price, 'opacity-100': showTooltip.price }" id="tooltip-dark"
                role="tooltip"
                class="absolute top-[7.3rem] z-10 inline-block text-sm font-medium border border-violet-500 bg-white text-white rounded-lg shadow-sm tooltip ">
                <div
                  class="tooltip-arrow absolute z-10 -top-[1rem] pl-[3.5rem] text-[14px] text-white bg-violet-500 shadow-sm"
                  data-popper-arrow></div>
                <div class="w-[20%] h-[5%]">
                  <input v-model="typedValue.price" @input="handleFilter('price')"
                    class="px-3 py-2 rounded-lg focus:outline-none text-slate-950" type="text"
                    placeholder="Enter something..." />
                </div>
              </div>
            </div>
          </th>
          <th scope="col" class="px-6 py-3 w-[22rem]">
            <div class="flex items-center">
              Created By
              <button class="flex items-center cursor-pointer" @click="handleSort('createdBy.name')">
                <ChevronUpDownIcon class="w-4 h-4 mx-1" />
              </button>
              <button class="flex items-center cursor-pointer" @click="toggleTooltip('createdBy')">
                <FunnelIcon class="w-4 h-4" />
              </button>
              <div :class="{ 'invisible': !showTooltip.createdBy, 'opacity-100': showTooltip.createdBy }"
                id="tooltip-dark" role="tooltip"
                class="absolute top-[7.3rem] z-10 inline-block text-sm font-medium border border-violet-500 bg-white text-white rounded-lg shadow-sm tooltip ">
                <div
                  class="tooltip-arrow absolute z-10 -top-[1rem] pl-[6rem] text-[14px] text-white bg-violet-500 shadow-sm"
                  data-popper-arrow></div>
                <div class="w-[20%] h-[5%]">
                  <input v-model="typedValue.createdBy" @input="handleFilter('createdBy')"
                    class="px-3 py-2 rounded-lg focus:outline-none text-slate-950" type="text"
                    placeholder="Enter something..." />
                </div>
              </div>
            </div>
          </th>
          <th scope="col" class="px-6 py-3 w-[6rem]">
            <div class="flex items-center">
              Type
              <button class="flex items-center cursor-pointer" @click="handleSort('type')">
                <ChevronUpDownIcon class="w-4 h-4 mx-1" />
              </button>
              <button class="flex items-center cursor-pointer" @click="toggleTooltip('type')">
                <FunnelIcon class="w-4 h-4" />
              </button>
              <div :class="{ 'invisible': !showTooltip.type, 'opacity-100': showTooltip.type }" id="tooltip-dark"
                role="tooltip"
                class="absolute top-[7.3rem] z-10 inline-block text-sm font-medium border border-violet-500 bg-white text-white rounded-lg shadow-sm tooltip ">
                <div
                  class="tooltip-arrow absolute z-10 -top-[1rem] pl-[3.3rem] text-[14px] text-white bg-violet-500 shadow-sm"
                  data-popper-arrow></div>
                <div class="w-[20%] h-[5%]">
                  <input v-model="typedValue.type" @input="handleFilter('type')"
                    class="px-3 py-2 rounded-lg focus:outline-none text-slate-950" type="text"
                    placeholder="Enter something..." />
                </div>
              </div>
            </div>
          </th>
          <th scope="col" class="px-6 py-3 w-[6rem]">
            <div class="flex items-center">
              Quantity
              <button class="flex items-center cursor-pointer" @click="handleSort('quantity')">
                <ChevronUpDownIcon class="w-4 h-4 mx-1" />
              </button>
              <button class="flex items-center cursor-pointer" @click="toggleTooltip('quantity')">
                <FunnelIcon class="w-4 h-4" />
              </button>
              <div :class="{ 'invisible': !showTooltip.quantity, 'opacity-100': showTooltip.quantity }" id="tooltip-dark"
                role="tooltip"
                class="absolute top-[7.3rem] z-10 inline-block text-sm font-medium border border-violet-500 bg-white text-white rounded-lg shadow-sm tooltip ">
                <div
                  class="tooltip-arrow absolute z-10 -top-[1rem] pl-[5.2rem] text-[14px] text-white bg-violet-500 shadow-sm"
                  data-popper-arrow></div>
                <div class="w-[20%] h-[5%]">
                  <input v-model="typedValue.quantity" @input="handleFilter('quantity')"
                    class="px-3 py-2 rounded-lg focus:outline-none text-slate-950" type="text"
                    placeholder="Enter something..." />
                </div>
              </div>
            </div>
          </th>
          <th scope="col" class="px-6 py-3 w-[6rem]">
            <div class="flex items-center">
              Delivery
              <buttondiv class="flex items-center cursor-pointer" @click="handleSort('delivery.charges')">
                <ChevronUpDownIcon class="w-4 h-4 mx-1" />
              </buttondiv>
              <buttondiv class="flex items-center cursor-pointer" @click="toggleTooltip('delivery')">
                <FunnelIcon class="w-4 h-4" />
              </buttondiv>
              <div :class="{ 'invisible': !showTooltip.delivery, 'opacity-100': showTooltip.delivery }" id="tooltip-dark"
                role="tooltip"
                class="absolute top-[7.3rem] z-10 inline-block text-sm font-medium border border-violet-500 bg-white text-white rounded-lg shadow-sm tooltip ">
                <div
                  class="tooltip-arrow absolute z-10 -top-[1rem] pl-[5rem] text-[14px] text-white bg-violet-500 shadow-sm"
                  data-popper-arrow></div>
                <div class="w-[20%] h-[5%]">
                  <input v-model="typedValue.delivery" @input="handleFilter('delivery')"
                    class="px-3 py-2 rounded-lg focus:outline-none text-slate-950" type="text"
                    placeholder="Enter something..." />

                </div>
              </div>
            </div>
          </th>
          <th scope="col" class="px-3 py-3"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in allProducts" :key="index"
          class="cursor-pointer hover:bg-gray-100 odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
          <td class="px-6 py-4" @click="handleRowClick(item)">
            <img :src="item.photo" alt="Product Photo" class="w-12 h-12 object-cover rounded" />
          </td>
          <td class="px-6 py-4" @click="handleRowClick(item)">{{ item.title }}</td>
          <td class="px-6 py-4 whitespace-pre-line w-48" @click="handleRowClick(item)" v-html="item.description"></td>
          <td class="px-6 py-4" @click="handleRowClick(item)">{{ item.category }}</td>
          <td class="px-6 py-4" @click="handleRowClick(item)">{{ item.status }}</td>
          <td class="px-6 py-4" @click="handleRowClick(item)">{{ item.unit }}{{ item.price }}</td>
          <td class="px-6 py-4" @click="handleRowClick(item)">{{ item.createdBy.name }}</td>
          <td class="px-6 py-4" @click="handleRowClick(item)">{{ item.type }}</td>
          <td class="px-6 py-4" @click="handleRowClick(item)">{{ item.quantity }}</td>
          <td class="px-6 py-4" @click="handleRowClick(item)">{{ item.delivery?.type ? item.delivery.type :
            item.delivery?.charges }}</td>
          <td class="px-3 py-4">
            <button @click="handleDeleteClick(item._id)" class="text-red-600">
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
.tooltip-dark {
  display: none;
  /* Initially hide the tooltip */
}

/* Arrow styles */
.tooltip-arrow {
  position: absolute;
  width: 0;
  height: 0;
  border-style: solid;
}

.tooltip-arrow[data-popper-arrow]::after {
  content: '';
  position: absolute;
  border-width: 8px;
  border-color: transparent transparent #9061F9 transparent;
}
</style>
