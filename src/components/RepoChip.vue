<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <v-chip v-on="on" v-bind:color="color" class="mr-2" small>
        <v-icon>{{ icon }}</v-icon>
        <span class="font-weight-medium">{{ count }}</span>
      </v-chip>
    </template>
    <span>{{ tooltip }}</span>
  </v-tooltip>
</template>

<script>
export default {
  props: ["color", "icon", "count", "tooltip"]
};
</script>