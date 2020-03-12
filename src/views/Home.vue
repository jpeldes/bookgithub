<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="6">
        <SearchView />
      </v-col>
      <v-col cols="12" sm="6">
        <BookmarkView />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SearchView from "@/views/SearchView.vue";
import BookmarkView from "@/views/BookmarkView.vue";

export default {
  name: "Home",
  components: {
    SearchView,
    BookmarkView
  }
};
</script>
