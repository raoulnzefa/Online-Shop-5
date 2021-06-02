<template>
  <ion-page v-if="page == 'home'">
    <ion-content :fullscreen="true">
      <div v-if="menu" class="user-menu">
        <div class="u-title">
          User Profile
          <svg
            @click="menu = !menu"
            class="u-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M14.348 14.849a1.2 1.2 0 01-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 11-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 111.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 111.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 010 1.698z"
            />
          </svg>
        </div>
        <div class="u-name">
          {{ user.name }}
        </div>
        <div class="u-name">
          {{ user.location }}
        </div>
        <div class="u-name">
          {{ user.email }}
        </div>
      </div>
      <div class="home">
        <div class="cart-menu">
          <div class="cart-title">Cart Total</div>
          <div class="total-price">$ {{ cartTotal }}</div>
        </div>
        <div class="menu">
          <svg
            @click="menu = !menu"
            class="menu-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clip-rule="evenodd"
            />
          </svg>
          <div style="display: flex; justify-content: center; gap: 40px">
            <svg
              @click="analytics"
              class="orders-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M18 14.824V12.5A3.5 3.5 0 0014.5 9h-2A1.5 1.5 0 0111 7.5V5.176A2.395 2.395 0 0012.4 3a2.4 2.4 0 10-4.8 0c0 .967.576 1.796 1.4 2.176V7.5A1.5 1.5 0 017.5 9h-2A3.5 3.5 0 002 12.5v2.324A2.396 2.396 0 003 19.4a2.397 2.397 0 001-4.576V12.5A1.5 1.5 0 015.5 11h2c.539 0 1.044-.132 1.5-.35v4.174a2.396 2.396 0 001 4.576 2.397 2.397 0 001-4.576V10.65c.456.218.961.35 1.5.35h2a1.5 1.5 0 011.5 1.5v2.324A2.395 2.395 0 0014.6 17a2.4 2.4 0 104.8 0c0-.967-.575-1.796-1.4-2.176zM10 1.615a1.384 1.384 0 110 2.768 1.384 1.384 0 010-2.768zm-7 16.77a1.385 1.385 0 110-2.77 1.385 1.385 0 010 2.77zm7 0a1.385 1.385 0 110-2.77 1.385 1.385 0 010 2.77zm7 0a1.385 1.385 0 110-2.77 1.385 1.385 0 010 2.77z"
              />
            </svg>
            <svg
              @click="orders"
              class="orders-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M18.121 3.271c-.295-.256-1.906-1.731-2.207-1.991-.299-.259-.756-.28-1.102-.28H5.188c-.345 0-.802.021-1.102.28-.301.26-1.912 1.736-2.207 1.991-.297.256-.543.643-.464 1.192.079.551 1.89 13.661 1.937 13.973A.67.67 0 004 19h12a.67.67 0 00.648-.565c.047-.311 1.858-13.422 1.938-13.973.078-.548-.168-.935-.465-1.191zM10 11.973c-3.248 0-3.943-4.596-4.087-5.543H7.75c.276 1.381.904 3.744 2.25 3.744s1.975-2.363 2.25-3.744h1.838c-.145.947-.84 5.543-4.088 5.543zM3.17 4.006L5 2h10l1.83 2.006H3.17z"
              />
            </svg>
            <div @click="openCart" style="position: relative">
              <svg
                class="menu-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zm13 15.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                />
              </svg>
              <div v-if="cartItems.length > 0" class="cart-number"></div>
            </div>
          </div>
        </div>
        <div class="menu-title">Our Products</div>
        <div class="products">
          <div v-for="(item, i) in stock" :key="i" class="p-item">
            <div class="i-header">
              <div
                @click="addToCart(item.name, item.priceInDollars, item.image)"
                class="price-off"
              >
                <svg
                  class="add-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <div class="in-stock">
                {{ item.stock }} in stock
              </div>
            </div>
            <div style="height: 140px; display: flex; justify-content: center; width: 100%;">
              <ion-img class="i-pic" :src="item.image" />
            </div>
            <div class="i-name">
              {{ item.name }}
            </div>
            <div class="i-price">
              <div class="i-dollar">$</div>
              {{ item.priceInDollars }}
            </div>
            <div class="i-stars">
              <svg
                class="star"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M10 1.3l2.388 6.722H18.8l-5.232 3.948 1.871 6.928L10 14.744l-5.438 4.154 1.87-6.928-5.233-3.948h6.412L10 1.3z"
                />
              </svg>
              <svg
                class="star"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M10 1.3l2.388 6.722H18.8l-5.232 3.948 1.871 6.928L10 14.744l-5.438 4.154 1.87-6.928-5.233-3.948h6.412L10 1.3z"
                />
              </svg>
              <svg
                class="star"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M10 1.3l2.388 6.722H18.8l-5.232 3.948 1.871 6.928L10 14.744l-5.438 4.154 1.87-6.928-5.233-3.948h6.412L10 1.3z"
                />
              </svg>
              <svg
                class="star"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M10 1.3l2.388 6.722H18.8l-5.232 3.948 1.871 6.928L10 14.744l-5.438 4.154 1.87-6.928-5.233-3.948h6.412L10 1.3z"
                />
              </svg>
            </div>
          </div>

          
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonPage, IonImg } from "@ionic/vue";
import { defineComponent } from "vue";
import gsap from "gsap";
import store from "../store";
// import axios from "axios";

export default defineComponent({
  name: "Home",
  components: {
    IonContent,
    IonImg,
    //IonHeader,
    IonPage,
    //IonTitle,
    //IonToolbar
  },

  data() {
    return {
      addCart: [],
      menu: false,
    };
  },

  computed: {
    cartTotal: () => {
      return store.getters.getTotal;
    },

    page: () => {
      return store.getters.getPage;
    },

    stock: () => {
      return store.getters.getStock;
    },

    user: () => {
      return store.getters.getUser;
    },

    cartItems: () => {
      return store.getters.getItems;
    },
  },

  created() {
    // if(!store.getters.getToken){
    //   store.dispatch('changePage', 'analytics')
    // }

    store.dispatch('getProducts')
  },

  methods: {
    addToCart(name, price, image) {
      store.dispatch("addItem", {
        name,
        priceInDollars: price,
        image
      });
    },

    orders() {
      store.dispatch("changePage", "orders");
    },

    analytics() {
      store.dispatch("changePage", "analytics");
    },

    openCart() {
      store.dispatch("changePage", "cart");
    },

    closeOptions() {
      this.addCart.open = false;

      gsap.to(".cart-menu", {
        ease: "power3.easeOut",
        display: "none",
        opacity: 0,
        y: 400,
        duration: 0.6,
      });
    },

    // addToCart(name, url, price){

    // }
  },
});
</script>

<style scoped>
@import "../styles/home.css";
</style>