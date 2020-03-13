<template>
  <v-card>
    <v-list-item three-line>
      <v-list-item-avatar>
        <v-img :src="item.authorAvatarUrl" />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>
          <a text color="primary" target="_blank" :href="item.githubLink">{{ item.name }}</a>
        </v-list-item-title>
        <v-list-item-subtitle>{{ item.description }}</v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn
              v-on="on"
              text
              icon
              rounded
              :color="actionBtnColor"
              @click="onClickBookmarkAction"
            >
              <v-icon>{{ actionBtnIcon }}</v-icon>
            </v-btn>
          </template>
          <span>{{ isBookmarked ? 'Remove bookmark' : 'Bookmark' }}</span>
        </v-tooltip>
      </v-list-item-action>
    </v-list-item>
    <v-card-actions>
      <RepoChip
        color="warning"
        icon="mdi-star"
        :count="item.starsCount"
        :tooltip="`Starred ${item.starsCount} times`"
      />
      <RepoChip
        color="success"
        icon="mdi-directions-fork"
        :count="item.forksCount"
        :tooltip="`Forked ${item.forksCount} times`"
      />
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
      return !this.isBookmarked ? "mdi-bookmark-plus" : "mdi-bookmark-remove";
    },
    actionBtnColor() {
      return !this.isBookmarked ? "info" : "error";
    }
  },
  methods: {
    onClickBookmarkAction: function() {
      let bookmarkAction = !this.isBookmarked
        ? "addBookmark"
        : "removeBookmark";
      this.$store.commit(bookmarkAction, { bookmarkId: this.id });
    }
  }
};
</script>

<style>
</style>