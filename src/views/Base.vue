<template>
  <div class="base">
    <Create v-if="page == 'signup'" />
    <Analytics v-if="page == 'analytics'" />
    <Cart v-if="page == 'cart'" />
    <Login v-if="page == 'login'" />
    <Home v-if="page == 'home'" />
    <Orders v-if="page == 'orders'" />
  </div>
</template>

<script>
import Analytics from "./Analytics";
import Cart from "./Cart";
import Create from "./Create";
import Login from "./Login";
import Home from "./Home";
import store from "../store";
import Orders from './Orders';

import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  components: {
    Analytics,
    Cart,
    Create,
    Login,
    Home,
    Orders
  },

  computed: {
    page: () => {
      return store.getters.getPage;
    },
  },
});
</script>

<style>
</style>