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
        <v-btn color="info" rounded v-on:click="onClickAddBookmark">
          <v-icon>mdi-bookmark</v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>
    <v-card-actions>
      <RepoChip color="warning" icon="mdi-star" :count="item.starsCount" />
      &nbsp;
      <RepoChip color="success" icon="mdi-directions-fork" :count="item.forksCount" />
    </v-card-actions>
  </v-card>
</template>

<script>
import RepoChip from "@/components/RepoChip.vue";

export default {
  props: ["id"],
  components: {
    RepoChip
  },
  computed: {
    item() {
      return this.$store.getters.getRepoById(this.id);
    }
  },
  methods: {
    onClickAddBookmark: function() {
      this.$store.commit("addBookmark", { bookmarkId: this.id });
    }
  }
};
</script>

<style>
</style>