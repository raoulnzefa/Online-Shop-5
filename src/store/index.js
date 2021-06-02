import { createStore } from 'vuex'
import moment from 'moment'
import axios from 'axios'
import url from '../views/url'

const store = createStore({
    state: {
        page: 'signup',
        //login 
        // signup 
        // cart
        // orders
        // home
        // analytics
        user: {},
        // cart is saved in local state only
        items: [],
        analytics: [],
        sales: [
            {
                sale: 'height: 30%;',
                day: 'S'
            },
            {
                sale: 'height: 55%;',
                day: 'M'
            },
            {
                sale: 'height: 67%;',
                day: 'T'
            },
            {
                sale: 'height: 88%;',
                day: 'W'
            },
            {
                sale: 'height: 45%;',
                day: 'T'
            },
            {
                sale: 'height: 8%;',
                day: 'F'
            },
            {
                sale: 'height: 10%;',
                day: 'S'
            },

        ],
        orders: [],
        stock: []
    },

    getters: {
        getItems(state) {
            return state.items
        },

        getToken(state) {
            return state.user.token
        },

        getPage(state) {
            return state.page
        },

        Analytics(state){
            return state.analytics
        },

        getUser(state) {
            return state.user
        },

        getSales(state) {
            return state.sales
        },

        getOrders(state) {
            // const config = {
            //     headers: { Authorization: `Bearer ${state.user.token}` }
            // }

            // axios.get('http://localhost:3000/getOrders', config)
            // .then((res) => {
            //     return res.data.orders
            // })
            // .catch((e) => {
            //     console.log(e)
            //     return 
            // })
            return state.orders
        },

        getUserToken(state) {
            return state.user.token
        },

        getStock(state) {
            // const config = {
            //     headers: { Authorization: `Bearer ${state.user.token}` }
            // }

            // axios.get('http://localhost:3000/getOrders', config)
            //     .then((res) => {
            //         return res.data.orders
            //     })
            //     .catch((e) => {
            //         console.log(e)
            //         return
            //     })

            return state.stock
        },

        getTotal(state) {
            if (state.items.length <= 0) {
                return 0
            } else {
                let i;
                var price = 0
                for (i = 0; i < state.items.length; i++) {
                    if (i == 0) {
                        price = state.items[i].priceInDollars
                    } else {
                        price = price + state.items[i].priceInDollars
                    }
                }

                return price
            }
        }
    },

    mutations: {
        DELETE_ITEM(state, id) {
            let i;
            let index;
            for (i = 0; i < state.items.length; i++) {
                if (state.items[i].id == id) {
                    index = i
                }
            }

            state.items.splice(index, 1)
        },

        SET_PAGE(state, page) {
            state.page = page
        },

        SET_USER(state, user) {
            state.user = user
        },

        SET_ORDER(state, order) {
            state.orders = order
        },

        CHECKOUT(state, total) {
            // totalPrice 
            // date

            const products = []
            let i;
            for (i = 0; i < state.items.length; i++) {
                products.push(state.items[i])
            }

            const day = moment(new Date()).add(10, 'days').format();
            // const mydate = moment(day).startOf('day').fromNow()

            const checkout = {
                products,
                totalCost: total,
                deliveryDate: day
            }

            state.orders.push(checkout)

            const config = {
                headers: { Authorization: `Bearer ${state.user.token}` }
            }

            state.orders.push(checkout)

            axios.post(`${url}/addOrder`,
                checkout,
                config
            )
                .then(() => {
                    console.log('Success')
                })

                .catch((e) => {
                    console.log(e)
                })

            state.items = []
        },

        SET_ITEM(state, item) {
            state.items.push(item)
        },

        SET_ANALYTICS(state, analytics) {
            state.analytics = analytics
        },

        SET_PRODUCTS(state, products) {
            state.stock = products
        }
    },

    actions: {
        addItem({ commit }, state) {
            commit('SET_ITEM', state)
        },

        addUser({ commit }, user) {
            commit('SET_USER', user)
        },

        deleteItem({ commit }, id) {
            commit('DELETE_ITEM', id)
        },

        addOrder({ commit }, order) {
            commit('SET_ORDER', order)
        },

        getOrders({ commit }) {
            const config = {
                headers: { Authorization: `Bearer ${store.getters.getUserToken}` },
            };
            axios
                .get(`${url}/getOrders`, config)
                .then((res) => {
                    commit('SET_ORDER', res.data.orders)
                })
                .catch((e) => {
                    console.log(e);
                });
        },

        changePage({ commit }, page) {
            commit('SET_PAGE', page)
        },

        getProducts({ commit }) {

            const config = {
                headers: { Authorization: `Bearer ${store.getters.getUserToken}` },
            };

            axios
                .get(`${url}/getProducts`, config)
                .then((res) => {
                    commit('SET_PRODUCTS', res.data.products)
                })
                .catch((e) => {
                    console.log(e);
                });

            
        },

        getAnalytics({ commit }){
            const config = {
                headers: { Authorization: `Bearer ${store.getters.getUserToken}` },
            };
            axios.get(`${url}/analytics`, config)
            .then((res) => {
                commit('SET_ANALYTICS', res.data)
                console.log(res.data)
            })
            .catch((e) => {
                console.log(e)
            })
        },

        // add items in cart to orders
        checkout({ commit }, total) {
            commit('CHECKOUT', total)
        },

    }
})

// export default new Vuex.Store({

// })

export default store;