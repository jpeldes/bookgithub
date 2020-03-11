<template>
  <div>
    <ViewHeading heading="Search" />
    <div>
      <v-text-field
        v-model="q"
        v-on:input="onSearchInput"
        prepend-icon="mdi-magnify"
        label="Search from repositories"
        autocomplete="pleasedont"
      />
    </div>
    <div>
      <span v-if="q" class="overline">Searching for {{ q }}</span>
    </div>
    <div>
      <v-row>
        <v-col v-for="item in resultItems" :key="item.id" cols="12">
          <v-card>
            <v-list-item three-line>
              <v-list-item-avatar>
                <v-img :src="item.owner.avatar_url" />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ item.full_name }}</v-list-item-title>
                <v-list-item-subtitle>{{ item.description }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn color="info" rounded><v-icon>mdi-bookmark</v-icon></v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import ViewHeading from "@/components/ViewHeading.vue";
import api from "@/api/api.js";

export default {
  data: () => ({
    q: "",
    resultItems: [],
    debounceId: null
  }),
  components: {
    ViewHeading
  },
  methods: {
    onSearchInput: function() {
      if (this.q) {
        this.goSearchRepos();
      }
    },
    goSearchRepos: function() {
      if (this.debounceId) {
        clearTimeout(this.debounceId);
      }
      this.debounceId = setTimeout(() => {
        if (this.q) {
          api.searchRepos(this.q).then(json => {
            this.resultItems = json.items;
          });
        }
        this.debounceId = null;
      }, 300);
    }
  }
};
</script>

<style>
</style>