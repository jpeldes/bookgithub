<template>
  <v-app-bar app dark color="green lighten-1">
    <v-toolbar-title class="ml-0 pr-2">
      <v-btn icon to="/">
        <v-icon>mdi-home</v-icon>
      </v-btn>
    </v-toolbar-title>
    <v-spacer />
    <RepoSearchInput />
    <v-spacer />
    <v-btn icon to="/bookmarks" class="ml-2 mr-2">
      <v-badge color="blue" :content="bookmarkCount" :value="bookmarkCount">
        <v-icon>mdi-bookmark</v-icon>
      </v-badge>
    </v-btn>
  </v-app-bar>
</template>
<script>
import RepoSearchInput from "@/components/RepoSearchInput.vue";
export default {
  components: {
    RepoSearchInput
  },
  computed: {
    bookmarkCount() {
      return this.$store.getters.bookmarkCount;
    }
  }
};
</script>