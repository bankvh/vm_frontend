<template>
  <div>
      <h1>ALL LOCATION</h1>
      <div v-for="loc in location" :key="loc">
          <router-link :to="`/location/${loc.id}`"><h1>{{loc.name}}</h1></router-link>
      </div>
  </div>
</template>

<script>
import {API_ROUTE} from '../../api'
export default {
  name: 'Home',
  async created(){
    const res = await fetch(`${API_ROUTE}/location`)
    const data = await res.json()
    this.location = data
  },
  data(){
      return {
          location: []
      }
  },
  methods: {
    log(item) {
      console.log(item)
    }
  }
}
</script>