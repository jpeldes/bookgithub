<template>
  <div>
    <ViewHeading heading="Bookmarks" />
    <div>
      <v-row>
        <v-col v-for="id in bookmarkIds" :key="id" cols="12">
          <RepoCard :id="id" />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import ViewHeading from "@/components/ViewHeading.vue";
import RepoCard from "@/components/RepoCard.vue";
export default {
  components: { ViewHeading, RepoCard },
  computed: {
    bookmarkIds() {
      return this.$store.getters.bookmarkIds;
    }
  }
};
</script>

<style>
</style>