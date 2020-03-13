<template>
  <v-row>
    <v-col v-for="id in repoIds" :key="id" cols="12">
      <RepoCard :id="id" :showSnackbar="showSnackbar" />
    </v-col>
    <v-snackbar color="info" v-model="snackbarVisible" :timeout="timeout">
      {{ snackbarText }}
      <v-btn @click="onClickUndo">
        <v-icon left>mdi-undo</v-icon>&nbsp;Undo
      </v-btn>
    </v-snackbar>
  </v-row>
</template>

<script>
import RepoCard from "@/components/RepoCard.vue";
export default {
  props: ["repoIds"],
  components: { RepoCard },
  data: () => ({
    bookmarkId: null,
    undoAction: () => {},
    snackbarText: "",
    snackbarAction: () => {},

    timeout: 8000,
    snackbarVisible: false
  }),
  methods: {
    onClickUndo: function() {
      this.$store.commit(this.undoAction, { bookmarkId: this.bookmarkId });
      this.snackbarVisible = false;
    },
    showSnackbar: function({ bookmarkId, undoAction, snackbarText }) {
      this.bookmarkId = bookmarkId;
      this.undoAction = undoAction;
      this.snackbarText = snackbarText;

      this.snackbarVisible = true;
    }
  }
};
</script>

<style>
</style>