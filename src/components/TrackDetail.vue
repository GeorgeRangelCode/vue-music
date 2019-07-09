<template lang="pug">
  .container
    .columns
      .column.is-5.is-offset-4
        pm-track(v-bind:track="track")
</template>

<script>
import trackSevice from "@/services/trackService";
import PmTrack from "@/components/track.vue";

export default {
  components: {
    PmTrack
  },

  data () {
    return {
      track: {}
    }
  },

  created () {
    const id = this.$route.params.id
    trackSevice.getById(id)
      .then(response => {
        this.track = response
        console.log(response)
      })
  }
}
</script>

<style lang="scss" scoped>
  .columns {
    margin: 20px;
  }
</style>