<template>
  <v-chip v-bind:color="color" class="mr-2" small>
    <v-icon>{{ icon }}</v-icon>
    <span class="font-weight-medium">{{ count }}</span>
  </v-chip>
</template>

<script>
export default {
  props: ["color", "icon", "count"]
};
</script>