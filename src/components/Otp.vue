<!-- <script setup>
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { useToast } from 'vue-toastification'
import axios from 'axios'

const toast = useToast()
const store = useStore()
const otpValue = ref('')

// const closeModal = () => {
//     store.commit('closeModal')
//     otpValue.value = ref('')
// }

const closeModal = async () => {
  try {
    store.dispatch('setOtp', otpValue);
    if (!otpValue.value.trim()) {
      toast.error("OTP is empty. Please provide a valid OTP.");
      return
    }
    const userEmail = store.getters['user/getUser'].email;
    const response = await axios.post('http://localhost:5000/api/verifyOtp', {
        otp: otpValue.value,
        email: userEmail,
    })
    store.commit('closeModal')
    otpValue.value = ref('')
    toast.success(String(response.data.message))

  } catch (error) {
    toast.error(String(error))
  }
};

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

const isDigitsFull = function () {
    for (const elem of digits) {
        if (elem == null || elem == undefined) {
            return false;
        }
    }

    return true;
}

const handleKeyDown = async function (event, index) {
    if (event.key !== "Tab" &&
        event.key !== "ArrowRight" &&
        event.key !== "ArrowLeft"
    ) {
        event.preventDefault();
    }

    if (event.key === "Backspace") {
        digits[index] = null;

        if (index !== 0) {
            const otpConts = otpCont.value.children[2].children
            otpConts[index - 1].focus();
        }

        return;
    }

    if ((new RegExp('^([0-9])$')).test(event.key)) {
        digits[index] = event.key;

        if (index !== props.digitCount - 1) {
            const otpConts = otpCont.value.children[2].children
            otpConts[index + 1].focus();
        }
        if (isDigitsFull()) {
            otpValue.value = digits.join('')
        }
    }
}

</script> -->

<script>
import { useToast } from 'vue-toastification'
import axios from 'axios'

export default {
    props: {
        default: String,
        digitCount: {
            type: Number,
            required: true
        }
    },
    setup() {
        const otpCont = null
        return{ otpCont }
    },
    data() {
        return {
            toast: useToast(),
            otpValue: '',
            digits: [],
        };
    },
    methods: {
        closeModal: async function () {
            try {
                this.$store.dispatch('setOtp', this.otpValue)
                if (!this.otpValue.trim()) {
                    this.toast.error("OTP is empty. Please provide a valid OTP.")
                    return
                }

                const userEmail = this.$store.getters['user/getUser'].email
                const response = await axios.post('http://localhost:5000/api/verify-otp', {
                    otp: this.otpValue,
                    email: userEmail,
                })

                store.commit('closeModal')
                this.otpValue = ''
                this.toast.success(String(response.data.message))
            } catch (error) {
                this.toast.error(String(error))
            }
        },
        isDigitsFull: function () {
            return this.digits.every(elem => elem !== null && elem !== undefined)
        },
        handleKeyDown: async function (event, index) {
            if (event.key !== "Tab" &&
                event.key !== "ArrowRight" &&
                event.key !== "ArrowLeft"
            ) {
                event.preventDefault()
            }

            if (event.key === "Backspace") {
                this.digits[index] = null

                if (index !== 0) {
                    console.log(this.otpCont)
                    const otpConts = this.otpCont.children[2].children
                    otpConts[index - 1].focus()
                }

                return
            }

            if ((new RegExp('^([0-9])$')).test(event.key)) {
                this.digits[index] = event.key

                if (index !== this.digitCount - 1) {
                    console.log("this.otpCont",this.otpCont)
                    const otpConts = this.otpCont.children[2].children
                    otpConts[index + 1].focus()
                }
                if (this.isDigitsFull()) {
                    this.otpValue = this.digits.join('')
                }
            }
        }
    },
    mounted() {
        if (this.default && this.default.length === this.digitCount) {
            for (let i = 0; i < this.digitCount; i++) {
                this.digits[i] = this.default.charAt(i)
            }
        } else {
            this.digits = Array(this.digitCount).fill(null)
        }
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
            <input type="text"
                class="h-[4rem] w-[4rem] border-2 border-gray-500 inline-block rounded-lg text-[3rem] p-4 m-2 focus:border-2 focus:border-violet-500 focus:outline-2 focus:outline-violet-500"
                v-for="(el, ind) in digits" :key="el + ind" v-model="digits[ind]" :autofocus="ind === 0" maxlength="1"
                @keydown="handleKeyDown($event, ind)">
        </div>
        <button type="button"
            class="focus:outline-none font-extrabold text-white bg-[#ff004f] hover:bg-[#cc0041] focus:ring-4 focus:ring-[#ff80a8] rounded-lg text-sm px-10 py-3 my-5 me-2 mb-2"
            @click="closeModal">Validate</button>
        <h3 class="text-gray-500 py-4">Didn't get the code? <button class="text-[#9061F9]">Resend</button></h3>
    </div>
</template>