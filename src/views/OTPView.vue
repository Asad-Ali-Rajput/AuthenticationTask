<script>
import Otp from '../components/Otp.vue'

export default {
    components: {
        Otp
    }
}
</script>
<template>
    <div>
        <div class="fixed inset-0 z-50 flex items-center justify-center">
            <div class="absolute inset-0 bg-gray-900 opacity-70"></div>
            <div id="popup-modal" tabindex="-1"
                class="relative p-4 w-2/3 flex justify-center items-center max-w-2/3 max-h-full h-2/3 rounded-lg bg-white">
                <Otp :digit-count="6"></Otp>
            </div>
        </div>
    </div>
</template>
  