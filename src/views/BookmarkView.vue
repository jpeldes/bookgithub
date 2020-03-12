<template>
  <div>
    <ViewHeading heading="Bookmarks" />
    <div>
      <v-row>
        <v-col v-for="id in bookmarkIds" :key="id" cols="12">
          <RepoItem :id="id" bookmarkAction="removeBookmark" />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import ViewHeading from "@/components/ViewHeading.vue";
import RepoItem from "@/components/RepoItem.vue";
export default {
  components: { ViewHeading, RepoItem },
  computed: {
    bookmarkIds() {
      return this.$store.getters.bookmarkIds;
    }
  }
};
</script>

<style>
</style>