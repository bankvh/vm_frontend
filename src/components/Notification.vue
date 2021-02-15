<template>
    <div class="container">
    <h4>{{currentTime}}</h4>
    <p class="message">{{msg}}</p>
    </div>
</template>

<script>
export default {
  name: 'Notification',
  props: {
    msg: String
  },
  computed: {
      currentTime(){
          const currentDate = new Date()
          return `${currentDate.getHours()}:${currentDate.getMinutes()}`
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  border: 2px solid #dedede;
  background-color: #f1f1f1;
  border-radius: 5px;
  padding: 10px;
  margin: 10px 0;
}

.container h4 {
  float: left;
  max-width: 60px;
  width: 100%;
  margin-right: 20px;
  border-radius: 50%;
}

.container::after {
  content: "";
  clear: both;
  display: table;
}

.message {
    font-size: 20px;
    font-weight: 500;
}

</style>
