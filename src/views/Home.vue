<template>
  <v-container fluid>
    <v-row justify="center">
      <h1 class="text-center headline mt-5 mb-3">
        Welcome to
        <span class="font-weight-regular">bookgithub</span>
      </h1>
    </v-row>
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

export default {
  name: "Home",
  components: {
    HomeNavItem
  }
};
</script>
