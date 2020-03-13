<template>
  <v-card>
    <v-list-item two-line>
      <v-list-item-avatar>
        <v-img :src="item.authorAvatarUrl" />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>
          <a text color="primary" target="_blank" :href="item.githubLink">{{ item.fullName }}</a>
        </v-list-item-title>
        <v-list-item-subtitle>{{ item.description }}</v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" fab :color="actionBtnColor" @click="onClickBookmarkAction">
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
    <v-card-actions>
      <v-btn color="primary" text :to="repoDetailsPath">SHOW DETAILS&nbsp;<v-icon right>mdi-arrow-right</v-icon></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import RepoChip from "@/components/RepoChip.vue";

export default {
  props: ["id", "showSnackbar"],
  components: {
    RepoChip
  },
  computed: {
    repoDetailsPath() {
      return '/repo/' + this.id;
    },
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
        this.showSnackbar({
          bookmarkId: this.id,
          undoAction: "addBookmark",
          snackbarText: `Bookmark removed: ${this.item.fullName}`
        });
        this.$store.commit("removeBookmark", { bookmarkId: this.id });
      } else {
        this.showSnackbar({
          bookmarkId: this.id,
          undoAction: "removeBookmark",
          snackbarText: `Bookmark added: ${this.item.fullName}`
        });
        this.$store.commit("addBookmark", { bookmarkId: this.id });
      }
    }
  }
};
</script>

<style>
</style>