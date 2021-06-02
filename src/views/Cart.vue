<template>
  <ion-page>
      <ion-content :fullscreen=true>
        <div class="cart">
            <div class="cart-header">
                <div class="c-header-start">
                    <svg @click="cartBack" class="cart-back" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd"/></svg>
                    Cart
                </div>
                <div class="cart-cost">
                    $ {{ cartTotal }}
                </div>
            </div>
            <div v-if="items.length > 0" class="checkout">
                <div @click="checkout(cartTotal)" class="c-btn">
                    Checkout
                </div>
            </div>

            <div v-if="items.length <= 0" class="no-items">
                Cart is empty
            </div>

            <div class="products">
            <div v-for="(item, i) in items" :key="i" class="p-item">
                <div class="i-header">
                <div @click="deleteItem(item.id)" class="price-off">
                    <svg class="delete-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>
                </div>
                <div class="in-stock">
                    <!-- 23 in stock -->
                </div>
                </div>
                <div style="height: 140px; display: flex; justify-content: center; width: 100%;">
                    <ion-img class="i-pic" :src="item.image" />
                </div>
                <div class="i-name">
                {{ item.name }}
                </div>
                <div class="i-price">
                <div class="i-dollar">
                    $
                </div>
                {{ item.priceInDollars }}
                </div>
                <div class="i-stars">
                <svg class="star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 1.3l2.388 6.722H18.8l-5.232 3.948 1.871 6.928L10 14.744l-5.438 4.154 1.87-6.928-5.233-3.948h6.412L10 1.3z"/></svg>
                <svg class="star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 1.3l2.388 6.722H18.8l-5.232 3.948 1.871 6.928L10 14.744l-5.438 4.154 1.87-6.928-5.233-3.948h6.412L10 1.3z"/></svg>
                <svg class="star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 1.3l2.388 6.722H18.8l-5.232 3.948 1.871 6.928L10 14.744l-5.438 4.154 1.87-6.928-5.233-3.948h6.412L10 1.3z"/></svg>
                <svg class="star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 1.3l2.388 6.722H18.8l-5.232 3.948 1.871 6.928L10 14.744l-5.438 4.154 1.87-6.928-5.233-3.948h6.412L10 1.3z"/></svg>
                </div>
            </div>
        </div>
        </div>
      </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonPage, IonImg } from '@ionic/vue';
import { defineComponent } from 'vue';
import store from '../store'
// import axios from 'axios';

export default defineComponent({
    components: {
        IonContent,
        IonPage,
        IonImg
    },

    computed: {
        items: () => {
            return store.getters.getItems
        },

        cartTotal: () => {
            return store.getters.getTotal
        },
    },

    methods: {
        cartBack(){
            store.dispatch('changePage', 'home')
        },

        deleteItem(id){
            store.dispatch('deleteItem', id)
        },

        // add a new order
        // add a new sale to the specific product
        checkout(total){
            store.dispatch('checkout', total)
            store.dispatch('changePage', 'orders')
        }
    }

})
</script>

<style>
@import '../styles/cart.css';
@import '../styles/home.css';
</style>