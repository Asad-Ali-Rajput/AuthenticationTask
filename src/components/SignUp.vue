<script setup>
import { EyeIcon, EyeSlashIcon, ChevronDownIcon } from '@heroicons/vue/24/outline'
import { ref } from 'vue'
import { useForm, createSubmitHandler } from 'vue-use-form'
import { useToast } from 'vue-toastification'
import axios from 'axios'

const toast = useToast()
const showPassword = ref(false)
const passwordInputType = ref('password')
const showConfirmPassword = ref(false)
const confirmPasswordInputType = ref('password')
const isDropdownOpen = ref(false)
const selectedOption = ref(null)
const hoveredOption = ref(null)

const {
  register,
  formState: { errors },
  handleSubmit,
} = useForm({
  defaultValues: {
    name: '',
    email: '',
    role: '',
    password: '',
  }
})

const toggleDropdown = () => {
  console.log("here", isDropdownOpen.value)
  isDropdownOpen.value = !isDropdownOpen.value
}

const closeDropdown = () => {
  isDropdownOpen.value = false
}

const selectOption = (option) => {
  selectedOption.value = option
  isDropdownOpen.value = false

  // Update the selected role in the form data
  console.log(option)
  register('role', { value: option })
}

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
  passwordInputType.value = showPassword.value ? 'text' : 'password'
}

const toggleConfirmPasswordVisibility = () => {
  showConfirmPassword.value = !showConfirmPassword.value
  confirmPasswordInputType.value = showConfirmPassword.value ? 'text' : 'password'
}

const onSubmit = createSubmitHandler(async (data) => {
  console.log(data.role)
  try {
    const response = await axios.post('http://localhost:5000/api/user/create', {
      name: data.name.el._value,
      email: data.email.el._value,
      role: selectedOption.value,
      password: data.password.el._value,
    })
    toast.success(String(response.message))

    // Redirect or perform other actions upon successful login
  } catch (error) {
    toast.error(String(error))
  }
})
</script>

<template>
  <div class="w-full h-full flex">
    <div class="w-1/2 flex justify-center items-center">
      <form class="w-[70%]" @submit.prevent="handleSubmit(onSubmit)()">
        <h1 class="text-2xl font-semibold font-sans">Sign Up</h1>
        <p class="text-gray-400">Fill out the form to register</p>
        <div>
          <div class="py-6">
            <input type="text" id="name" name="name"
              class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 mb-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
              placeholder="Full name" required :="register('name', { required: 'fullname cannot be empty' })">
            <span v-if="errors.name">{{ errors.name }}</span>
            <!-- <input type="phone" id="cellnumber" name="cellnumber"
              class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 mb-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
              placeholder="Number" required :="register('cellnumber', { required: 'Phone number cannot be empty' })"> -->
            <div class="w-full">
              <div class="mb-4 rounded-lg relative inline-block w-full" @mouseleave="closeDropdown()">
                <div class="bg-white text-[#333] cursor-pointer p-2.5 rounded-lg border border-slate-300 flex justify-between items-center" @click="toggleDropdown()">
                  {{ selectedOption || 'Choose a role' }}
                  <ChevronDownIcon class="h-4 w-4 text-violet-500"/>
                </div>
                <ul v-show="isDropdownOpen" class="dropdown-content">
                  <li @click="selectOption('user')" :class="{ 'hovered': hoveredOption === 'user' }">User</li>
                  <li @click="selectOption('admin')" :class="{ 'hovered': hoveredOption === 'admin' }">Admin</li>
                </ul>
              </div>
            </div>
            <span v-if="errors.role">{{ errors.role }}</span>
            <input type="email" id="email" name="email"
              class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 mb-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
              placeholder="Email" required :="register('email', { required: 'Email field cannot be empty!' })">
            <span v-if="errors.email">{{ errors.email }}</span>
            <div class="relative">
              <input id="password" name="password"
                class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 mb-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
                :type="passwordInputType" placeholder="Password" required
                :="register('password', { required: 'Password field cannot be empty!' })">
              <button class="absolute bottom-2 right-3" @click="togglePasswordVisibility()">
                <span v-if="!showPassword">
                  <EyeSlashIcon class="h-6 w-6 text-violet-500" />
                </span>
                <span v-else>
                  <EyeIcon class="h-6 w-6 text-violet-500" />
                </span>
              </button>
            </div>
            <span v-if="errors.password">{{ errors.password }}</span>
            <div class="relative">
              <input id="confirmpassword" name="confirmpassword"
                class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 mb-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
                :type="confirmPasswordInputType" placeholder="Confirm password" required
                :="register('confirmpassword', { required: 'Confirm password field cannot be empty!' })">
              <button class="absolute bottom-2 right-3" @click="toggleConfirmPasswordVisibility()">
                <span v-if="!showConfirmPassword">
                  <EyeSlashIcon class="h-6 w-6 text-violet-500" />
                </span>
                <span v-else>
                  <EyeIcon class="h-6 w-6 text-violet-500" />
                </span>
              </button>
            </div>
            <span v-if="errors.confirmpassword">{{ errors.confirmpassword }}</span>
            <RouterLink to="#" class="text-violet-500 active:text-violet-500">Forget Password?</RouterLink>
          </div>
        </div>
        <button type="submit"
          class="text-white bg-violet-700 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 my-4 text-center dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800">Register</button>
        <div class="text-center">Already have an account? <RouterLink to="/"
            class="text-violet-500 active:text-violet-500">Sign in</RouterLink>
        </div>
      </form>
    </div>
    <div class="w-1/2 h-screen flex justify-center items-center bg-violet-500"><img src="../assets/3783954.webp"
        alt="signin logo" /></div>
  </div>
</template>

<style scoped>

/* Style for the dropdown content */
.dropdown-content {
  width: 100%;
  position: absolute;
  background-color: #fff;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  z-index: 1;
  list-style-type: none;
  padding: 0;
}

/* Style for dropdown options */
.dropdown-content li {
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

/* Hover effect for dropdown options */
.dropdown-content li:hover {
  background-color: #9061F9;
  color: #fff;
  font-weight: bold;
}

/* Style for hovered option */
.dropdown-content li.hovered {
  background-color: #9061F9;
  color: #fff;
  font-weight: bold;
}
</style>