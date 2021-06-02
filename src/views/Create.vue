<template>
  <div v-if="page == 'signup'" class="create">
    <div class="create">
      <div class="c-title">Create Account</div>
      <div @click="login" class="login-btn">
        Login instead
      </div>

      <div class="a-label">Username</div>
      <div class="a-input">
        <input v-model="name" class="a-enter" placeholder="Penguin" type="text" />
      </div>

      <div class="a-label">Email</div>
      <div class="a-input">
        <input v-model="email" class="a-enter" placeholder="Penguin@gmail.com" type="email" />
      </div>

      <div class="a-label">Zip code</div>
      <div class="a-input">
        <input v-model="location" class="a-enter" placeholder="345 Street Lisbon" type="text" />
      </div>

      <div class="a-label">Password</div>
      <div class="a-input">
        <input v-model="password" class="a-enter" placeholder="***********" type="password" />
      </div>
      <div @click="createAccount()" class="c-btn">Continue</div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import axios from 'axios'
import store from '../store'
import url from './url'

export default defineComponent({
    data(){
      return{
        name: '',
        email: '',
        password: '',
        location: ''
      }
    },
    
    computed: {
      page: () => {
        return store.getters.getPage
      }
    },

    created(){
      if(!store.getters.getToken){
        this.$router.push({ name: 'Home' })
      }
      // axios.get('https://api.kanye.rest/')
      // .then((res) => {
      //   console.log(res)
      // })
    },

    methods: {
      login(){
        store.dispatch('changePage', 'login')
      },

      async createAccount(){
        axios.post(`${url}/users`, {
          name: this.name.toLowerCase(),
          email: this.email.toLowerCase(),
          location: this.location.toLowerCase(),
          password: this.password
        })
        .then(async(res) => {
          console.log(res)
          const user = {
            name: res.data.user.name,
            email: res.data.user.email,
            location: res.data.user.location,
            token: res.data.token
          }
          await store.dispatch('addUser', user)
          store.dispatch('changePage', 'home')
        })
        .catch((e) => {
          console.log(e)
        })
      }
    }
});
</script>


<style>
@import "../styles/create.css";
</style>