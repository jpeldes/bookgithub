<template>
  <v-container>
    <ViewHeading heading="Search" />
    <div>
      <RepoSearchInput />
    </div>
    <div>
      <v-row>
        <v-col v-for="id in resultItemIds" :key="id" cols="12">
          <RepoCard :id="id" />
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import ViewHeading from "@/components/ViewHeading.vue";
import RepoCard from "@/components/RepoCard.vue";
import RepoSearchInput from "@/components/RepoSearchInput.vue";

export default {
  components: {
    ViewHeading,
    RepoCard,
    RepoSearchInput
  },
  computed: {
    resultItemIds() {
      return this.$store.getters.getSearchResultIds;
    }
  }
};
</script>

<style>
</style>