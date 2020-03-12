<template>
  <v-chip v-bind:color="color">
    <v-icon>{{ icon }}</v-icon>
    <span class="font-weight-medium">{{ count }}</span>
  </v-chip>
</template>

<script>
export default {
  props: ["color", "icon", "count"]
};
</script>