<template>
  <v-text-field
    v-model="q"
    :prepend-icon="searchIcon"
    label="Search from repositories"
    autocomplete="pleasedont"
    :error-messages="errorMessage"
  />
</template>

<script>
import _ from "lodash";

export default {
  computed: {
    errorMessage() {
      return this.$store.state.search.errorMessage;
    },
    searchIcon() {
      return this.isSearching ? "mdi-spin mdi-loading" : "mdi-magnify";
    },
    isSearching() {
      return this.$store.state.search.isSearching;
    },
    q: {
      get() {
        return this.$store.getters.getSearchQuery;
      },
      set(q) {
        this.$store.commit("updateSearchQuery", { q });
      }
    }
  },
  watch: {
    q(newQuery) {
      this.debounceSearch(newQuery);
    }
  },
  methods: {
    debounceSearch: _.debounce(function(query) {
      if (query) {
        this.$store.dispatch("searchRepos", { query });
      } else {
        this.$store.commit("clearSearchResults");
        this.$store.commit("isSearching", { isSearching: false });
      }
    }, 500)
  }
};
</script>

<style>
</style>