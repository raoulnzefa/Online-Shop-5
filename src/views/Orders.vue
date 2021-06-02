<template>
  <ion-page>
      <ion-content :fullscreen=true>
          <div class="cart">
            <div class="cart-header">
            <div class="c-header-start">
                <svg
                @click="cartBack"
                class="cart-back"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                >
                <path
                    fill-rule="evenodd"
                    d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                    clip-rule="evenodd"
                />
                </svg>
                Orders
            </div>
            <!-- <div class="cart-cost">$ {{ cartTotal }}</div> -->
            </div>

            <div class="payment">
                Payment on delivery
            </div>

            <div class="products">
                <div v-for="(order, i) in orders" :key="i" class="p-item">
                    <div style="display: flex; justify-content: center; width: 100%;">
                    <img class="o-pic" src="../../assets/box.png" />
                    </div>

                    <div v-for="(item, n) in order.products" :key="n" class="o-item">
                        {{ item.name }}
                        <div class="o-i-price">
                            $ {{ item.priceInDollars }}
                        </div>
                    </div>

                    <div class="o-item">
                        total
                        <div class="o-i-total">
                            $ {{ order.totalCost }}
                        </div>
                    </div>

                    <div class="o-delivery">
                        {{ order.deliveryDate }}
                    </div>
                </div>
                </div>
        </div>
      </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonPage  } from '@ionic/vue';
import { defineComponent } from 'vue';
import store from '../store'
// import moment from 'moment'

export default defineComponent({
    components: {
        IonContent,
        IonPage
    },

    data(){
        return {
            // orders: []
        }
    },

    computed: {
        orders: () => {
            return store.getters.getOrders
        },
    },

    created(){
        store.dispatch('getOrders')
    },

    methods: {
        cartBack(){
            store.dispatch('changePage', 'home')
        },
    }
});
</script>

<style>
@import "../styles/orders.css";
@import "../styles/cart.css";
</style>