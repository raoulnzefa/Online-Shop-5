<template>
  <div v-if="page == 'login'" class="create">
      <div class="c-title">Login</div>

      <div class="a-label">Email</div>
      <div class="a-input">
        <input v-model="email" class="a-enter" placeholder="Penguin" type="text" />
      </div>

      <div class="a-label">Password</div>
      <div class="a-input">
        <input v-model="password" class="a-enter" placeholder="***********" type="password" />
      </div>

      <div @click="create" class="login-btn">
        Signup instead
      </div>

      <div v-if="feedback" class="feedback">
        Incorrect email or password
      </div>
      <div @click="login" class="c-btn">Login</div>

  </div>
</template>

<script>
import { defineComponent } from 'vue';
import store from '../store'
import axios from 'axios'
import url from './url'

export default defineComponent({
    computed: {
      page: () => {
        return store.getters.getPage
      }
    },
    data(){
      return {
        email: '',
        password: '',
        feedback: false
      }
    },
    methods: {
        create(){
            store.dispatch('changePage', 'signup')
        },

        login(){
          axios.post(`${url}/users/login`, {
            email: this.email.toLowerCase(),
            password: this.password
          })
          .then(async(res) => {
            const user = {
              name: res.data.user.name,
              email: res.data.user.email,
              location: res.data.user.location,
              orders: res.data.user.orders,
              token: res.data.token
            }
            await store.dispatch('addUser', user)
            store.dispatch('changePage', 'home')
          })
          .catch((e) => {
            console.log(e)
            alert(e)
            this.feedback = true
          })
        }
    }
})
</script>

<style>
@import '../styles/create.css';
</style>