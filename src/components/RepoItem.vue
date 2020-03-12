<template>
  <v-card>
    <v-list-item three-line>
      <v-list-item-avatar>
        <v-img :src="item.authorAvatarUrl" />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>{{ item.name }}</v-list-item-title>
        <v-list-item-subtitle>{{ item.description }}</v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action>
        <v-btn text icon :color="actionBtnColor" rounded v-on:click="onClickBookmarkAction">
          <v-icon>{{ actionBtnIcon }}</v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>
    <v-card-actions>
      <RepoChip color="warning" icon="mdi-star" :count="item.starsCount" />&nbsp;
      <RepoChip color="success" icon="mdi-directions-fork" :count="item.forksCount" />
    </v-card-actions>
  </v-card>
</template>

<script>
import RepoChip from "@/components/RepoChip.vue";

export default {
  props: ["id", "bookmarkAction"],
  components: {
    RepoChip
  },
  computed: {
    isBookmarked() {
      return this.$store.getters.isBookmarked(this.id);
    },
    item() {
      return this.$store.getters.getRepoById(this.id);
    },
    actionBtnIcon() {
      return !this.isBookmarked
        ? "mdi-bookmark-plus"
        : "mdi-bookmark-remove";
    },
    actionBtnColor() {
      return !this.isBookmarked
        ? "info"
        : "error";
    }
  },
  methods: {
    onClickBookmarkAction: function() {
      let bookmarkAction = !this.isBookmarked ? 'addBookmark' : 'removeBookmark';
      this.$store.commit(bookmarkAction, { bookmarkId: this.id });
    }
  }
};
</script>

<style>
</style>