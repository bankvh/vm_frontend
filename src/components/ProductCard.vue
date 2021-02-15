<template>
    <div class="card">
        <div class="image-container">
            <img :src="product.image" alt="Avatar" class="image" />
        </div>
        <div class="description">
            <p><b>{{product.price}} BATH</b></p>
            <div class="product-tag">
                <p>STOCK</p>
                <p>{{product.v}} LEFT</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        product: Object
    }
}
</script>

<style scoped>
.card {
    /* Add shadows to create the "card" effect */
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    width: calc(25% - 10px);
    height: 250px;
    margin: 5px;
}

/* On mouse-over, add a deeper shadow */
.card:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

/* Add some padding inside the card container */
.description {
    padding: 2px 16px;
}

.image-container {
    width: 100%;
    height: 50%;
    padding: 5px 0px;
}
.image {
    max-width:100%;
    max-height:100%;        
}
.product-tag {
    display: flex;
    justify-content: space-between;
}

@media only screen and (max-width: 600px) {
  .card  {
    width: calc(50% - 10px);
  }
}
</style>