<template>
  <v-card>
    <v-card-title>
      {{ title }}
    </v-card-title>

    <v-card-subtitle style="min-height: 90px">{{ subtitle }}</v-card-subtitle>

    <v-card-actions>
      <v-btn text :to="href">
        <v-icon>mdi-arrow-right</v-icon>
      </v-btn>

      <v-spacer />
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ["title", "subtitle", "href"]
};
</script>

<style>
</style>