<template>
  <div>
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
          <RepoItem :id="id" />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import ViewHeading from "@/components/ViewHeading.vue";
import RepoItem from "@/components/RepoItem.vue";
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
    RepoItem
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

            this.resultItemIds = ids;
          })
          .catch(err => {
            console.error(err);
            this.errorMessage = err.message;
            this.resultItemIds = [];
          });
      }
    }
  }
};
</script>

<style>
</style>