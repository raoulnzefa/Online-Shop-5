<template>
  <ion-page>
        <div class="analytics">
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
                Analytics
            </div>
            </div>
            <div class="banner">
                Analytics per week
            </div>

                <div class="products">
                <div class="p-item">
                    <div class="i-header">
                    <div class="sales-title">
                        Sales per day
                    </div>
                    <div class="in-stock">
                        <!-- 23 in stock -->
                    </div>
                    </div>

                    <div class="day-bars">
                        <div v-for="(sale, i) in sales" :key="i" class="bar-wrapper">
                            <div class="day-bar">
                                <div :style="sale.sale" class="db"></div>
                            </div>
                            {{ sale.day }}
                        </div>
                    </div>
                </div>

                <div class="p-item">
                    <div class="i-header">
                    <div class="sales-title">
                        Best Seller
                    </div>
                    <div class="sales-number">
                        {{ analytics.productWithMostSales.salesCount }} sales
                    </div>
                    </div>
                        <div class="i-name">
                        {{ analytics.productWithMostSales.name }}
                        </div>
                        <div style="height: 12px;"></div>
                        <div class="cart-cost">
                            $ {{ analytics.productWithMostSales.salesTotal }}
                        </div>
                        
                    </div>

                     <div class="p-item">
                    <div class="i-header">
                    <div class="sales-title">
                        Worst Seller
                    </div>
                    <div class="sales-number">
                        {{ analytics.productWithMostSales.salesCount }} sales
                    </div>
                    </div>
                        <div class="i-name">
                        {{ analytics.productWithLeastSales.name }}
                        </div>
                        <div style="height: 12px;"></div>
                        <div class="cart-cost">
                            $ {{ analytics.productWithLeastSales.salesTotal }}
                        </div>
                        
                    </div>

                    <!-- each product analytic  -->
                    <div class="title-tag">
                        Product analysis
                    </div>
                    <div v-for="(s, i) in stock" :key="i" class="p-item">
                        <div class="t-name">
                            {{ s.name }}
                            <div class="t-total">
                                total sales
                                <div class="t-total-price">
                                    $ {{ s.salesTotal }}
                                </div>
                            </div>
                        </div>
                        <div class="divide"></div>
                        <div class="t-sales">
                            <div class="t-t-sales">
                                Sales
                            </div>
                            <div class="t-total-price">
                                {{ s.salesCount }}
                            </div>
                        </div>
                        <div class="divide"></div>
                        <div class="t-sales">
                            <div class="t-t-sales">
                                Price
                            </div>
                            <div class="t-total-price">
                                $ {{ s.priceInDollars }}
                            </div>
                        </div>
                    </div>
            </div>
        </div>
  </ion-page>
</template>

<script>
import { IonPage  } from '@ionic/vue';
import { defineComponent } from 'vue';
import store from '../store'
//import axios from 'axios';
export default defineComponent({
    components: {
        IonPage,
        // IonImg
    },

    data(){
        return {
            mostSales: null,
            leastSales: null
        }
    },

    created(){
        store.dispatch('getAnalytics')
        store.dispatch('getProducts')
    },

    computed: {
        sales: () => {
            return store.getters.getSales
        },

        analytics: () => {
            return store.getters.Analytics
        },

        stock: () => {
            return store.getters.getStock;
        },
    },

    methods: {
        cartBack(){
            store.dispatch('changePage', 'home')
        },
    }

});
</script>

<style>
@import "../styles/analytics.css";
@import "../styles/cart.css";
</style>