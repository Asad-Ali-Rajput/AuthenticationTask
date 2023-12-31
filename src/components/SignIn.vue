<script>
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline'
import { useForm } from 'vue-use-form'
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification'
import VueJwtDecode from 'vue-jwt-decode'
import axios from 'axios'

export default {

  components: {
    EyeIcon,
    EyeSlashIcon
  },
  data() {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm()

    return {
      toast: useToast(),
      route: useRouter(),
      showPassword: false,
      passwordInputType: 'password',
      register,
      errors,
      handleSubmit,
    }
  },

  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
      this.passwordInputType = this.showPassword ? 'text' : 'password'
    },
    async onSubmit(data) {
      try {
        const response = await axios.post('http://localhost:5000/api/user/login', {
          email: data.email.el._value,
          password: data.password.el._value,
        });
        const { token, refreshToken } = response.data

        const decodedToken = VueJwtDecode.decode(token)
        const userEmail = decodedToken.email
        const userId = decodedToken.userId
        this.$store.dispatch('setLoginInfo', {
          email: userEmail,
          _id: userId,
        })
        // Store the tokens in store's state for later use
        this.$store.dispatch('login', {
          accessToken: token,
          refreshToken: refreshToken,
        })
        // Redirect or perform other actions upon successful login
        this.route.push('/home')
      } catch (error) {
        this.toast.error(String(error))
      }
    },
    onError(errors) {
      console.log(errors)
    }
  },
}
</script>

<template>
  <div class="w-full h-full flex">
    <div class="w-1/2 flex justify-center items-center">
      <form class="w-[70%]" @submit.prevent="() => handleSubmit(onSubmit, onError)()">
        <h1 class="text-2xl font-semibold font-sans">Sign In</h1>
        <p class="text-gray-400">Enter your email and password to sign in</p>
        <div>
          <div class="py-6 relative">
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
                  :type="passwordInputType" placeholder="Password"
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
            <RouterLink to="#" class="text-violet-500 active:text-violet-500">Forget Password?</RouterLink>
          </div>
        </div>
        <button type="submit"
          class="text-white bg-violet-700 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 my-4 text-center dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800">Sign
          In</button>
        <div class="text-center">Don't have an account? <RouterLink to="/signup"
            class="text-violet-500 active:text-violet-500">Sign up</RouterLink>
        </div>
    </form>
  </div>
  <div class="w-1/2 h-screen flex justify-center items-center bg-violet-500"><img src="../assets/3783954.webp"
      alt="signin logo" /></div>
</div></template>
