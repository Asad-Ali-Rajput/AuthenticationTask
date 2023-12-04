<script setup>
import { ref, onMounted } from 'vue'
import api from './api'

const userProfile = ref(null)

// Function to fetch user profile data
const fetchProfile = async () => {
  try {
    const response = await api.get('/api/profile'); // Replace with your actual profile API endpoint
    userProfile.value = response.data;
  } catch (error) {
    console.error('Error fetching profile:', error);
  }
};

// Call the fetchProfile function when the component is mounted
onMounted(() => {
  fetchProfile();
});
</script>

<template>
  <div>
    <h1>Home</h1>
    <div v-if="userProfile">
      <h2>User Profile</h2>
      <p>Name: {{ userProfile.name }}</p>
      <p>Email: {{ userProfile.email }}</p>
      <!-- Add more profile properties as needed -->
    </div>
  </div>
</template>

<style scoped>
/* Add your styles here */
</style>
