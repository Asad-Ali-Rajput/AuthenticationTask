<template>
  <div>
    <nav class="bg-white border-gray-200 dark:bg-gray-900">
      <div class="w-screen flex flex-wrap items-center justify-between p-4">
        <a href="https://flowbite.com/" class="flex items-center rtl:space-x-reverse">
          <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" />
          <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
        </a>
        <div class="flex items-center md:space-x-0 rtl:space-x-reverse">
          <button @click="handleDashboard">
            <MoonIcon class="w-6 h-6 mr-4" />
          </button>
          <button @click="toggleDropdown" type="button"
            class="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-violet-500 dark:focus:ring-gray-600"
            id="user-menu-button" aria-expanded="false">
            <span class="sr-only">Open user menu</span>
            <div class="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
              <svg class="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd">
                </path>
              </svg>
            </div>
          </button>
          <!-- Dropdown menu -->
          <div v-if="isDropdownOpen"
            class="absolute top-[3rem] z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
            id="user-dropdown">
            <div class="px-4 py-3">
              <span class="block text-sm text-gray-500 truncate dark:text-gray-400">{{ userInfo.email }}</span>
            </div>
            <ul class="py-2" aria-labelledby="user-menu-button">
              <li>
                <a @click="handleSignOut" href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                  Sign out
                </a>
              </li>
            </ul>
          </div>
          <div class="flex justify-end items-center pl-4">
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
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { MoonIcon } from '@heroicons/vue/24/outline'
export default {
  components: {
    MoonIcon,
  },
  data() {
    return {
      route: useRouter(),
      isDropdownOpen: false,
      userInfo: this.$store.getters['getLoginInfo']
    }
  },
  methods: {
    handleDashboard() {
      this.route.push("/dashboard")
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    handleAddProduct() {
      this.route.push({ name: 'addProduct', params: { str: 'add' } })
    },
    handleSignOut() {
      this.$store.dispatch('logout')
      this.route.go(0) // Reload the current route

      // You may also want to redirect to the login page or another page
      // this.route.push({ name: 'login' });
    }
  },
}
</script>

<style scoped>
/* Add your styles if needed */
</style>
