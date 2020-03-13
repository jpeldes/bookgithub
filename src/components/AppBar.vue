<template>
  <v-app-bar app dark color="green lighten-1">
    <v-toolbar-title class="ml-0 pr-2">
      <v-btn icon to="/">
        <v-icon>mdi-home</v-icon>
      </v-btn>
    </v-toolbar-title>
    <v-spacer />
    <v-text-field
      @focus="onSearchFocus"
      flat
      solo-inverted
      hide-details
      prepend-inner-icon="mdi-magnify"
      label="Search"
    />
    <v-spacer />
    <v-btn icon x-large to="/bookmarks" class="ml-2">
      <v-icon>mdi-bookmark</v-icon>
    </v-btn>
  </v-app-bar>
</template>
<script>
import router from "@/router";
export default {
  methods: {
    onSearchFocus: () => {
      router.push("/search").catch(() => {});
    }
  }
};
</script>