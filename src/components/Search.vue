<template lang="pug">
  main
    pm-notification(v-show="showNotification")
      p(slot="body") No se encontraron resultados
    pm-loader(v-show="isLoading")
    section.section(v-show="!isLoading")
      nav.nav
        .container
          input.input.is-large(type="text", placeholder="Buscar Canciones", v-model="searchQuery")
          a.button.is-info.is-large(v-on:click="search") Buscar
          a.button.is-danger.is-large &times;
      .container
        p
          small {{searchMessage}}
      .container.results
        .columns.is-multiline
          .column.is-one-quarter(v-for="track in tracks") 
            pm-track(
              v-bind:class="{ 'is-active': track.id == selectedTrack }"
              v-bind:track="track" 
              v-on:select="setSelectTrack"
            )
</template>

<script>
import trackSevice from "@/services/trackService";
import PmTrack from "@/components/track.vue";
import PmLoader from "@/components/shared/Loader.vue";
import PmNotification from "@/components/shared/Notification.vue";

export default {
  name: "app",

  components: {
    PmTrack,
    PmLoader,
    PmNotification
  },

  data() {
    return {
      searchQuery: "",
      tracks: [],
      isLoading: false,
      showNotification: false,
      selectedTrack: ''
    };
  },

  computed: {
    searchMessage() {
      return `Encontrados ${this.tracks.length}`;
    }
  },

  watch: {
    showNotification () {
      if (this.showNotification) {
        setTimeout(() => {
          this.showNotification = false
        }, 3000)
      }
    }
  },

  methods: {
    search() {
      if (!this.searchQuery) {
        return;
      }
      this.isLoading = true;
      trackSevice.search(this.searchQuery)
        .then(response => {
          this.showNotification = response.tracks.total == 0
          this.tracks = response.tracks.items;
          this.isLoading = false;
        });
    },

    setSelectTrack (id) {
      this.selectedTrack = id
    }
  }
};
</script>

<style lang="scss">
.results {
  margin-top: 50px;
}
.is-active {
  border: 3px solid #23d160;
}
</style>
