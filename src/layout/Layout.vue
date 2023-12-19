<template>
    <div>
      <!-- Navbar component can be placed here -->
      <Navbar />
      
      <!-- Main content area -->
      <div class="main-content">
        <router-view></router-view>
      </div>
    </div>
  </template>
  
  <script>
  import Navbar from '../components/Navbar.vue'; // Replace with the actual path to your Navbar component
  
  export default {
    components: {
      Navbar,
    },
  };
  </script>
  
  <style>
  /* Add styling for your layout component */
  </style>
  