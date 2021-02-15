<template>
  <h1 class='left-text'>Location: {{location}}</h1>
  <div class='container'>

      <div id='product-container'>
        <h2 :style="{textAlign: 'left'}">Vending Machine</h2>
        <div class='container'>
          <template v-for="(product, index) in products" :key="index">
            <product-card :product="product" @click="buyProduct(index)"/>
          </template>
        </div>
      </div>

      <div id='cart-container'>
        <h2 class='left-text'>MY CART</h2>

        <div id='cart-item-container'>
          <template v-for="(item, index) in carts" :key="index">
            <cart-item :item="item" @increase-item="increaseItem" @decrease-item="decreaseItem" @remove-item="removeItem"/>
          </template>
        </div>

        <div id='summary-container' v-if="carts && Object.keys(carts).length >= 1">
          <button @click="checkout">checkout</button>
          <h2 id='total-price'>{{totalPrice}} BATH</h2>
        </div>
        <div v-else>
          <h2 v-if="status">{{status}}</h2> <h2 v-else>EMPTY CART</h2>
        </div>
      </div>

  </div>
</template>

<script>
import { API_ROUTE } from '../../api'
import CartItem from '../components/CartItem.vue'
import ProductCard from "../components/ProductCard.vue"

export default {
  components: { ProductCard, CartItem },
  name: 'VendingMachine',
  props: ["location"],
  created(){
    this.fetchProducts()
  },
  data(){
    return {
      // products: [{name: 'coke', quantity: 10, price: 20}, {name: 'pepsi', quantity: 10, price: 20}],
      // carts: {'coke': {name: 'coke', quantity: 10, price: 20, amount: 1}, 'pepsi': {name: 'pepsi', quantity: 10, price: 20, amount: 1}}
      status: '',
      isProcessing: false,
      machineId: null,
      products: [],
      carts: {}
    }
  },
  computed:{
    totalPrice(){
      return Object.keys(this.carts).map(key => this.carts[key].amount * this.carts[key].price).reduce((a,b)=>a+b, 0)
    }
  },
  methods: {
    buyProduct(index){
      const product = this.products[index]
      const item = this.carts[product.id]

      if (product.v >=1) {
        if (item){
          if (item.amount+1 <= item.v) this.carts[product.id].amount += 1
        } else {
          this.carts[product.id] = {...product, amount: 1}
        }
      } else {
        alert(`${product.name} is out of stock`)
      }

    },
    increaseItem(key){
      const item = this.carts[key]
      if (item.amount+1 <= item.v){
        this.carts[key].amount += 1
      }
    },
    decreaseItem(key){
      const item = this.carts[key]
      if (item.amount-1 <= 0){
        delete this.carts[key]
      } else {
        this.carts[key].amount -= 1
      }
    },
    removeItem(key){
      delete this.carts[key]
    },
    async fetchProducts(){
      const res = await fetch(`${API_ROUTE}/location/${this.location}/machine`)
      const data = await res.json()
      this.products = data.products
      this.machineId = data.id
    },
    async checkout(){
      this.isProcessing = true
      const order = {}
      for (const [key, value] of Object.entries(this.carts)) {
        order[key] = value.amount
      }

      try {
        const res = await fetch(`${API_ROUTE}/machine/${this.machineId}/checkout`,
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(order)
        })

        if (res.ok){
          this.status = 'ORDER SUCCESS'
          this.fetchProducts()
        } else {
          this.status = 'ORDER FAIL'
        }

      } catch (e) {
        this.status = 'ORDER FAIL'
      }
      this.isProcessing = false 
      this.carts = {}
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.left-text {
  text-align: left;
}
#product-container {
  width: 60%;
}
#cart-container {
  width: calc(40% - 40px);
  margin: 20px;
}
#cart-item-container {
  display: flex;
  justify-content: flex-start; 
  flex-wrap: wrap;
  background: #FFFFFF;
  box-shadow: 1px 2px 3px 0px rgba(0,0,0,0.10);
  border-radius: 6px;
 
  display: flex;
  flex-direction: column;
}
#summary-container {
  display: flex;
  justify-content: space-between;
  padding: 10px 30px 10px 30px;
}
@media only screen and (max-width: 600px) {
  #product-container {
    width: 100%;
  }
  #cart-container {
    width: 100%;
  } 
}
</style>
