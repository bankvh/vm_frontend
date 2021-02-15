<template>
  <div>
      <h1>NOTIFICATIONS</h1>
      <div v-for="(message, index) in notifications" :key="index">
          <notification :msg="message"/>
      </div>
  </div>
</template>

<script>
import {API_ROUTE} from '../../api'
import Notification from '../components/Notification.vue'
export default {
  components: { Notification },
  name: 'Admin',
  async created(){
    try {
      const events = new EventSource(`${API_ROUTE}/event`)
      events.onmessage = event => {
        const message = JSON.parse(event.data);

        if (message !== 'connected'){
          console.log(message)
          this.notifications.push(message)
        }
      }

    } catch (error) {
      console.log(error)
    }
  },
  data(){
      return {
          notifications: []
      }
  },
  methods: {
    log(item) {
      console.log(item)
    }
  }
}
</script>