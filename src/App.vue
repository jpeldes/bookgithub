<template>
  <v-app>
    <AppBar />
    <v-content>
      <v-scroll-x-transition hide-on-leave>
        <router-view />
      </v-scroll-x-transition>
    </v-content>
  </v-app>
</template>

<script>
import AppBar from "@/components/AppBar";
export default {
  name: "App",

  components: {
    AppBar
  },
  data: () => ({
    //
  })
};
</script>
