<template>
  <v-container>
    <ViewHeading heading="Welcome to bookgithub" />
    <v-row justify="center">
      <v-col sm="3">
        <HomeNavItem
          title="Search"
          subtitle="Search from public GitHub repositories"
          href="/search"
        />
      </v-col>
      <v-col sm="3">
        <HomeNavItem
          title="Bookmarks"
          subtitle="Public GitHub repositories that you have bookmarked"
          href="/bookmarks"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import HomeNavItem from "@/components/HomeNavItem";
import ViewHeading from "@/components/ViewHeading.vue";

export default {
  name: "Home",
  components: {
    ViewHeading,
    HomeNavItem
  }
};
</script>
