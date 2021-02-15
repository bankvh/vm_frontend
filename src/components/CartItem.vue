<template>
    <div class="item">    

        <div id="image-container">
          <img :src="item.image" alt="" id="product-image" />
        </div>

        <h3 id='product-name'>{{item.name}}</h3>
    
        <div class="button-container">
            <button class="minus-btn" type="button" name="button" @click='decreaseItem'>
                <img src="../../public/minus.svg" alt="" class="icon"/>
            </button>
            <input type="text" name="name" :value="item.amount" disabled>
            <button class="plus-btn" type="button" name="button" @click='increaseItem'>
                <img src="../../public/plus.svg" alt="" />
            </button>
        </div>
    
        <div class="total-price">${{price}}</div>
        <div class="button-container">
          <button class="delete-btn" type="button" name="button" @click='removeItem'>
            <img src="../../public/close.svg" alt="" />
          </button>
        </div>

    </div>
</template>

<script>
export default {
    props: {
        item: Object
    },
    computed: {
        price(){
            return this.item.amount * this.item.price
        }
    },
    methods: {
        increaseItem(){
            this.$emit('increase-item', this.item.id)
        },
        decreaseItem(){
            this.$emit('decrease-item', this.item.id)
        },
        removeItem(){
            this.$emit('remove-item', this.item.id)
        }
    }
}
</script>

<style scoped>
 
.item {
  padding: 20px 30px;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-content: center;
  border:  1px solid #E1E8EE;
}

.buttons {
  position: relative;
  padding-top: 30px;
  margin-right: 60px;
}
 
.image {
  margin-right: 50px;
  width: 50px;
  height: 50px;
}

.button-container {
  padding-top: 20px;
  margin-right: 0px;
}

.button-container input {
  -webkit-appearance: none;
  border: none;
  text-align: center;
  width: 32px;
  font-size: 16px;
  color: #43484D;
  font-weight: 300;
}
 
button[class*=btn] {
  width: 30px;
  height: 30px;
  background-color: #E1E8EE;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}
.minus-btn img {
  margin-bottom: 3px;
}
.plus-btn img {
  margin-top: 2px;
}

.total-price {
  width: 83px;
  padding-top: 27px;
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  color: #43484D;
}

#image-container {
  width: 20%;
  height: 100%;    
}

#product-image {
  max-width:100%;
  max-height:100%;      
}

@media only screen and (max-width: 600px) {
  .item {
    padding: 10px;
  }

  #product-name {
    display: none;
  }
}

</style>