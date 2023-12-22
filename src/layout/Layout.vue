<template>
    <div>
      <Navbar />
      <div class="main-content">
        <router-view></router-view>
      </div>
    </div>
  </template>
  
  <script>
  import Navbar from '../components/Navbar.vue'
  
  export default {
    components: {
      Navbar,
    },
  };
  </script>
  