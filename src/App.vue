<template lang="pug">
  #app
    section.section

      nav.nav.has-shadow
        .container
          input.input.is-large(type="text", placeholder="Buscar Canciones", v-model="searchQuery")
          a.button.is-info.is-large(v-on:click="search") Buscar
          a.button.is-danger.is-large &times;
          p
            small {{searchMessage}}

      .container.results
        .columns
          .column(v-for="track in tracks") {{track.nombre}} - {{track.artist}}
</template>

<script>
const tracks = [
  { nombre: "cancion 1", artist: "artist 1" },
  { nombre: "cancion 2", artist: "artist 2" },
  { nombre: "cancion 3", artist: "artist 3" }
];

export default {
  name: "app",

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
      this.tracks = tracks;
      console.log(this.searchQuery);
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
