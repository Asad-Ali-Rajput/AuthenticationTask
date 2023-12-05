<script setup>
import { ref, reactive, computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const isModalOpen = computed(() => store.state.isOpenModal)

const closeModal = () => {
  store.commit('closeModal')
  otpValue.value = ref('')
}


const props = defineProps({
    default: String,

    digitCount: {
        type: Number,
        required: true
    }
});

const digits = reactive([])

if (props.default && props.default.length === props.digitCount) {
    for (let i = 0; i < props.digitCount; i++) {
        digits[i] = props.default.charAt(i)
    }
} else {
    for (let i = 0; i < props.digitCount; i++) {
        digits[i] = null;
    }
}

const otpCont = ref(null)

const emit = defineEmits(['update:otp']);

const isDigitsFull = function () {
    for (const elem of digits) {
        if (elem == null || elem == undefined) {
            return false;
        }
    }

    return true;
}

const handleKeyDown = function (event, index) {
    if (event.key !== "Tab" &&
        event.key !== "ArrowRight" &&
        event.key !== "ArrowLeft"
    ) {
        event.preventDefault();
    }

    if (event.key === "Backspace") {
        digits[index] = null;

        if (index != 0) {
            (otpCont.value.children)[index - 1].focus();
        }

        return;
    }

    if ((new RegExp('^([0-9])$')).test(event.key)) {
        digits[index] = event.key;

        if (index != props.digitCount - 1) {
            (otpCont.value.children)[index + 1].focus();
        }
    }
    if (isDigitsFull()) {
        emit('update:otp', digits.join(''))
    }
}

</script>
<template>
    <div class="text-center" ref="otpCont">
        <div class="flex justify-center items-center px-5 text-lg font-semibold">
            <h1 class="w-3/6 text-center">Please enter one-time password to verify your account</h1>
        </div>
    <h2 class="py-4 text-lg text-gray-500">A code has been sent to your email address</h2>
    <div class="flex justify-center items-center w-full">
        <div v-for="(el, ind) in digits" :key="el + ind" class="flex justify-center items-center">
            <input type="text" class="digit-box" v-model="digits[ind]"
                :autofocus="ind === 0" maxlength="1" @keydown="handleKeyDown($event, ind)">
            <!-- Add a conditional rendering to show dash after each input, except for the last one -->
            <span class="w-8 h-8 text-slate-400 text-center text-xl font-extrabold" v-if="ind < digits.length - 1">-</span>
        </div>
    </div>
    <button type="button" class="focus:outline-none font-extrabold text-white bg-[#ff004f] hover:bg-[#cc0041] focus:ring-4 focus:ring-[#ff80a8] rounded-lg text-sm px-10 py-3 my-5 me-2 mb-2" @click="closeModal">Validate</button>
    <h3 class="text-gray-500 py-4">Didn't get the code? <button class="text-[#9061F9]">Resend</button></h3>
</div>
</template>
<style scoped>
.digit-box {
    height: 4rem;
    width: 4rem;
    border: 2px solid gray;
    display: inline-block;
    border-radius: 5px;
    margin: 5px;
    padding: 15px;
    font-size: 3rem;
}

.digit-box:focus {
    border: 2px solid #9061F9;
    outline: 3px solid #9061F9;
}
</style>