<template>
  <div id="restaurant-forum">
    <main role="main">
      <Navbar />
      <router-view />
    </main>
  </div>
</template>

<script>
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import 'animate.css';

export default {
  components: {
    Navbar,
  },
};
</script>