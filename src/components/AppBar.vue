<template>
    <v-app-bar
      app
      dark
      color="green lighten-1"
    >
      <v-toolbar-title
        style="width: 150px"
        class="ml-0 pl-4 d-none d-sm-flex"
      >
        <span>bookgithub</span>
      </v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Search"
      />
      <v-spacer />
      <v-btn icon x-large>
        <v-icon>mdi-bookmark</v-icon>
      </v-btn>
    </v-app-bar>
</template>