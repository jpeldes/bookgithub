<template>
  <v-container>
    <ViewHeading heading="Bookmarks" />
    <RepoCardList :repoIds="bookmarkIds" />
  </v-container>
</template>

<script>
import ViewHeading from "@/components/ViewHeading.vue";
import RepoCardList from "@/components/RepoCardList.vue";
export default {
  components: { ViewHeading, RepoCardList },
  computed: {
    bookmarkIds() {
      return this.$store.getters.bookmarkIds;
    }
  }
};
</script>

<style>
</style>