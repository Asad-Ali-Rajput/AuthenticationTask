<script>
import { EyeIcon, EyeSlashIcon, ChevronDownIcon } from '@heroicons/vue/24/outline'
import { useForm } from 'vue-use-form'
import { useToast } from 'vue-toastification'
import axios from 'axios'
import OTPView from '../views/OTPView.vue'

export default {
  data() {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      defaultValues: {
        name: '',
        email: '',
        role: '',
        password: '',
      }
    })
    return {
      toast: useToast(),
      isModalOpen: this.$store._state.data.isOpenModal,
      showPassword: false,
      passwordInputType: 'password',
      showConfirmPassword: false,
      confirmPasswordInputType: 'password',
      password: '',
      passwordCheck: '',
      passwordError: '',
      isDropdownOpen: false,
      selectedOption: null,
      hoveredOption: null,
      register,
      errors,
      handleSubmit,
    };
  },
  computed: {
    isModalOpen() {
      return this.$store._state.data.isOpenModal
    },
    passwordMatch() {
      return this.password === this.passwordCheck
    },
  },
  watch: {
    // 'password'(newValue) {
    //   // Watch for changes in the password field
    //   this.validatePasswordConfirmation(newValue)
    // },
    'passwordCheck'(newValue) {
      // Watch for changes in the passwordCheck field
      this.validatePasswordConfirmation(newValue)
    },
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen
    },
    closeDropdown() {
      this.isDropdownOpen = false;
    },
    selectOption(option) {
      this.selectedOption = option
      this.isDropdownOpen = false
      this.register('role', { value: option })
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
      this.passwordInputType = this.showPassword ? 'text' : 'password'
    },
    toggleConfirmPasswordVisibility() {
      this.showConfirmPassword = !this.showConfirmPassword;
      this.confirmPasswordInputType = this.showConfirmPassword ? 'text' : 'password'
    },
    validatePasswordConfirmation(passwordCheck) {
      if (this.password !== passwordCheck) {
        this.passwordError = 'Password does not match';
      } else {
        this.passwordError = 'Password Matched';
      }
    },
    async onSubmit(data) {
      try {
        const response = await axios.post('http://localhost:5000/api/user/create', {
          name: data.name.el._value,
          email: data.email.el._value,
          role: data.role.inputValue._value,
          password: data.password.el._value,
        })

        // Dispatch the action to set the user state
        this.$store.dispatch('user/setUser', {
          name: data.name.el._value,
          email: data.email.el._value,
          role: data.role.inputValue._value,
          password: data.password.el._value,
        })
        this.$store.dispatch('openModal')

        const responseOtp = await axios.post('http://localhost:5000/api/otp', {
          email: data.email.el._value,
        })
        this.toast.success(String(responseOtp.data.message))
        // Check if OTP state is not empty
        if (this.$store.getters['getOtp']) {
          this.toast.success(String(response.data.message))
        } else {
          // this.toast.error("Verify your account")
        }
      } catch (error) {
        this.toast.error(String(error))
      }
    },
    onError(errors) {
      console.log(errors)
    }
  },
  components: {
    OTPView,
    EyeIcon,
    EyeSlashIcon,
    ChevronDownIcon
  },
}
</script>

<template>
  <div class="w-full h-full flex">
    <div class="w-1/2 flex justify-center items-center">
      <form class="w-[70%]" @submit.prevent="handleSubmit(onSubmit, onError)()">
        <h1 class="text-2xl font-semibold font-sans">Sign Up</h1>
        <p class="text-gray-400">Fill out the form to register</p>
        <div>
          <div class="py-6">
            <div class="pb-4">
              <input type="text" id="name" name="name"
                class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
                placeholder="Full name" v-model="name"
                v-bind="register('name', { required: 'Name field cannot be empty!' })">
              <span class="text-red-500" v-if="errors.name">{{ errors.name.message }}</span>
            </div>

            <div class="w-full">
              <div class="mb-4 rounded-lg relative inline-block w-full" @mouseleave="closeDropdown()">
                <div
                  class="bg-white text-[#333] cursor-pointer p-2.5 rounded-lg border border-slate-300 flex justify-between items-center"
                  @click="toggleDropdown()">
                  {{ selectedOption || 'Choose a role' }}
                  <ChevronDownIcon class="h-4 w-4 text-violet-500" />
                </div>
                <ul v-show="isDropdownOpen" class="dropdown-content">
                  <li @click="selectOption('user')" :class="{ 'hovered': hoveredOption === 'user' }">User</li>
                  <li @click="selectOption('admin')" :class="{ 'hovered': hoveredOption === 'admin' }">Admin</li>
                </ul>
              </div>
            </div>
            <span v-if="!errors.role">{{ errors.role }}</span>
            <div class="pb-4">
              <input type="email" id="email" name="email"
                class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
                placeholder="Email" v-bind="register('email', { required: 'Email field cannot be empty!' })">
              <span class="text-red-500" v-if="errors.email">{{ errors.email.message }}</span>
            </div>
            <div class=" pb-4">
              <div class="relative">
                <input id="password" name="password"
                  class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
                  :type="passwordInputType" placeholder="Password" v-model="password"
                  v-bind="register('password', { required: 'Password field cannot be empty!' })">
                <button type="button" class="absolute bottom-2 right-3" @click="togglePasswordVisibility">
                  <span v-if="!showPassword">
                    <EyeSlashIcon class="h-6 w-6 text-violet-500" />
                  </span>
                  <span v-else>
                    <EyeIcon class="h-6 w-6 text-violet-500" />
                  </span>
                </button>
              </div>
              <span class="text-red-500" v-if="errors.password">{{ errors.password.message }}</span>
            </div>
            <div class="relative">
              <input id="confirmpassword" name="confirmpassword"
                class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 mb-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
                :type="confirmPasswordInputType" placeholder="Confirm password" v-model="passwordCheck"
                v-bind="register('confirmpassword', { required: 'Confirm password field cannot be empty!' })">
              <button type="button" class="absolute bottom-2 right-3" @click="toggleConfirmPasswordVisibility">
                <span v-if="!showConfirmPassword">
                  <EyeSlashIcon class="h-6 w-6 text-violet-500" />
                </span>
                <span v-else>
                  <EyeIcon class="h-6 w-6 text-violet-500" />
                </span>
              </button>
            </div>
            <span :class="{ 'text-green-500': passwordMatch, 'text-red-500': !passwordMatch }">
              {{ passwordCheck ? passwordError : '' }}
            </span>
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
  <component :is="isModalOpen ? 'OTPView' : 'div'"></component>
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