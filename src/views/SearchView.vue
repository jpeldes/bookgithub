<template>
  <v-container>
    <div>
      <v-row v-if="errorMessage">
        <v-col cols="6" offset="3">
          <v-alert type="error" text>{{ errorMessage }}</v-alert>
        </v-col>
      </v-row>

      <v-row
        v-if="!errorMessage && isSearchQueryEmpty && !isSearching && resultItemIds.length === 0"
        justify="center"
        class="text-center"
      >
        <v-col>
          <div class="mb-3">
            <v-icon x-large color="green lighten-2">mdi-emoticon-happy-outline</v-icon>
          </div>
          <div>
            <h1 class="headline font-weight-light">Type something</h1>
          </div>
          <div class="subtitle-1 text--secondary">Don't be shy…</div>
        </v-col>
      </v-row>

      <v-row v-if="hasSearchFoundZero" justify="center" class="text-center">
        <v-col>
          <div class="mb-3">
            <v-icon x-large color="green lighten-2">mdi-ninja</v-icon>
          </div>
          <div>
            <h1 class="headline font-weight-light">No matches found</h1>
          </div>
          <div class="subtitle-1 text--secondary">Please try another search.</div>
        </v-col>
      </v-row>

      <v-row>
        <v-col v-for="id in resultItemIds" :key="id" cols="12">
          <RepoCard :id="id" />
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import RepoCard from "@/components/RepoCard.vue";

export default {
  components: {
    RepoCard
  },
  computed: {
    isSearchQueryEmpty() {
      return this.$store.getters.getSearchQuery === "";
    },
    hasSearchFoundZero() {
      return this.$store.state.search.hasSearchFoundZero;
    },
    isSearching() {
      return this.$store.state.search.isSearching;
    },
    errorMessage() {
      return this.$store.state.search.errorMessage;
    },
    resultItemIds() {
      return this.$store.getters.getSearchResultIds;
    }
  }
};
</script>

<style>
</style>