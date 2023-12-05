<template>
    <div>
        <div class="fixed inset-0 z-50 flex items-center justify-center">
            <div class="absolute inset-0 bg-gray-900 opacity-70"></div>
            <div id="popup-modal" tabindex="-1"
                class="relative p-4 w-2/3 flex justify-center items-center max-w-2/3 max-h-full h-2/3 rounded-lg bg-white">
                <Otp :digit-count="6" @update:otp="otpValue = $event"></Otp>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import Otp from '../components/Otp.vue'
import { ref, watchEffect } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const isModalOpen = ref(store.state.isOpenModal)
const otpValue = ref('')

watchEffect(() => {
  // Update the value of isModalOpen when the store state changes
  isModalOpen.value = store.state.isOpenModal
})

</script>
  