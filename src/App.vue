<template>
  <div id="app">
    <h1>Vending Machine App</h1>
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/admin">Admin</router-link>
      </div>
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
