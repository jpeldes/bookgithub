<template>
  <v-container>
    <ViewHeading heading="Search" />
    <div>
      <v-text-field
        v-model="q"
        v-on:input="onSearchInput"
        :prepend-icon="searchIcon"
        label="Search from repositories"
        autocomplete="pleasedont"
        :error-messages="errorMessage"
      />
    </div>
    <div>
      <v-row>
        <v-col v-for="id in resultItemIds" :key="id" cols="12">
          <RepoCard :id="id" />
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import ViewHeading from "@/components/ViewHeading.vue";
import RepoCard from "@/components/RepoCard.vue";
import api from "@/api/api.js";

export default {
  data: () => ({
    q: "",
    errorMessage: "",
    debounceId: null,
    resultItemIds: []
  }),
  components: {
    ViewHeading,
    RepoCard
  },
  computed: {
    searchIcon() {
      return this.debounceId === null ? "mdi-magnify" : "mdi-spin mdi-loading";
    }
  },
  methods: {
    onSearchInput: function() {
      this.errorMessage = "";
      if (this.debounceId) {
        clearTimeout(this.debounceId);
      }

      this.debounceId = setTimeout(
        query => {
          let cachedQuery = this.$store.getters.getRepoIdsByQuery(query);
          if (Array.isArray(cachedQuery)) {
            this.resultItemIds = cachedQuery;
          } else if (query) {
            this.goSearchRepos(query);
          } else {
            this.resultItemIds = [];
          }

          this.debounceId = null;
        },
        500,
        this.q
      );
    },
    goSearchRepos: function(query) {
      if (query) {
        api
          .searchRepos(query)
          .then(json => {
            let { items } = json;
            let ids = items.map(item => item.id);
            this.$store.commit("saveRepoSearch", {
              query,
              ids,
              items
            });

            this.errorMessage = "";

            // Fix race condition
            // Better fix would be to cancel apicall
            if (this.q === query) {
              this.resultItemIds = ids;
            }
          })
          .catch(err => {
            if (err.message.indexOf("API rate limit exceeded") >= 0) {
              this.errorMessage =
                "Too many searches recently. Please try again in a minute.";
            } else {
              console.error(err);
              this.errorMessage = "An error occurred. Please try again later";
            }
            this.resultItemIds = [];
          });
      }
    }
  }
};
</script>

<style>
</style>