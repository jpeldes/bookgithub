<template>
  <v-tooltip top>
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" fab :color="actionBtnColor" @click="onClickBookmarkAction">
        <v-icon>{{ actionBtnIcon }}</v-icon>
      </v-btn>
    </template>
    <span>{{ isBookmarked ? 'Remove bookmark' : 'Bookmark' }}</span>
  </v-tooltip>
</template>

<script>
export default {
  name: "RepoBookmarkBtn",
  props: ["id"],
  computed: {
    isBookmarked() {
      return this.$store.getters.isBookmarked(this.id);
    },
    item() {
      return this.$store.getters.getRepoById(this.id);
    },
    actionBtnIcon() {
      return !this.isBookmarked ? "mdi-bookmark" : "mdi-bookmark";
    },
    actionBtnColor() {
      return !this.isBookmarked ? "" : "primary";
    }
  },
  methods: {
    onClickBookmarkAction: function() {
      if (this.isBookmarked) {
        this.$store.commit("removeBookmark", { bookmarkId: this.id });
      } else {
        this.$store.commit("addBookmark", { bookmarkId: this.id });
      }
    }
  }
};
</script>

<style>
</style>