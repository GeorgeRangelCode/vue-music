<template lang="pug">
  #app
    pm-header
    section.section
      nav.nav.has-shadow
        .container
          input.input.is-large(type="text", placeholder="Buscar Canciones", v-model="searchQuery")
          a.button.is-info.is-large(v-on:click="search") Buscar
          a.button.is-danger.is-large &times;
      .container
        p
          small {{searchMessage}}
      .container.results
        .columns
          .column(v-for="track in tracks") 
            | {{track.name}} - {{track.artists[0].name}}
    pm-footer
</template>

<script>
import trackSevice from "./services/trackService";
import PmFooter from "./components/layout/Footer.vue";
import PmHeader from "./components/layout/Header.vue";

export default {
  name: "app",

  components: {
    PmFooter,
    PmHeader
  },

  data() {
    return {
      searchQuery: "",
      tracks: []
    };
  },

  computed: {
    searchMessage() {
      return `Encontrados ${this.tracks.length}`;
    }
  },

  methods: {
    search() {
      if (!this.searchQuery) {
        return;
      }
      trackSevice
        .search(this.searchQuery)
        .then(response => (this.tracks = response.tracks.items));
    }
  }
};
</script>

<style lang="scss">
@import "./scss/main.scss";
.results {
  margin-top: 50px;
}
</style>
