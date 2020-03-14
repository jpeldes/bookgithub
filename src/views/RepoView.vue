<template>
  <v-container>
    <v-sheet>
      <v-row>
        <v-col class="flex-grow-0">
          <v-avatar size="80" left>
            <v-img :src="item.authorAvatarUrl" />
          </v-avatar>
        </v-col>
        <v-col class="flex-grow-1">
          <div class="headline">{{ item.fullName }}</div>
          <div v-if="item.description" class="subtitle-1">{{ item.description }}</div>
          <div v-if="!item.description" class="subtitle-1 italic">No description available.</div>
        </v-col>
        <v-col class="flex-grow-0">
          <RepoBookmarkBtn :id="id" />
        </v-col>
      </v-row>
    </v-sheet>
    <v-row class="mt-3">
      <v-col>
        <RepoChip
          color="warning"
          icon="mdi-star"
          :count="item.starsCount"
          :tooltip="`Starred ${item.starsCount} times`"
        />
        <RepoChip
          color="success"
          icon="mdi-directions-fork"
          :count="item.forksCount"
          :tooltip="`Forked ${item.forksCount} times`"
        />
      </v-col>
    </v-row>
    <v-expansion-panels class="mt-5">
      <v-expansion-panel>
        <v-progress-linear v-if="!readmeHtml" indeterminate />
        <v-expansion-panel-header>
          <span class="subtitle-2">README.md</span>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <div v-if="!readmeHtml">
            <v-icon x-large color="primary">mdi-loading mdi-spin</v-icon>
          </div>
          <div v-html="readmeHtml"></div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script>
import RepoBookmarkBtn from "@/components/RepoBookmarkBtn";
import RepoChip from "@/components/RepoChip";
import api from "@/api/api";
import _ from "lodash";

export default {
  data: () => ({
    readmeHtml: ""
  }),
  components: {
    RepoBookmarkBtn,
    RepoChip
  },
  computed: {
    id: function() {
      return parseInt(this.$route.params.id);
    },
    item: function() {
      this.syncReadmeOnce();
      return this.$store.getters.getRepoById(this.id);
    }
  },
  created: function() {
    this.syncReadmeOnce = _.once(function() {
      let repoId = this.id;
      if (this.item.readmeHtml) {
        // Dont sync
        this.readmeHtml = this.item.readmeHtml;
        return;
      }

      return api.syncReadme(this.item.fullName).then(json => {
        if (json.content && json.encoding === "base64") {
          let encodedText = window.atob(json.content);
          return api.parseMarkdown(encodedText).then(html => {
            this.$store.commit("updateRepoReadme", {
              readmeHtml: html,
              repoId
            });
            this.readmeHtml = html;
          });
        }
      });
    });
  }
};
</script>

<style>
</style>