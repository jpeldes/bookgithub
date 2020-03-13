import Vue from "vue";
import Vuex from "vuex";
import vuexLocalStorage from "@/plugins/vuexLocalStorage";

import api from "@/api/api.js";

import RepoClass from "@/models/RepoClass";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    search: {
      isSearching: false,
      query: "",
      errorMessage: "",
      resultIds: []
    },
    repos: {
      byId: {}
    },
    bookmarks: {
      ids: []
    }
  },
  mutations: {
    clearSearchResults(state) {
      state.search.resultIds = [];
    },
    isSearching(state, payload) {
      state.search.isSearching = payload.isSearching;
    },
    updateSearchQuery(state, payload) {
      state.search.query = payload.q;
    },
    updateSearchError(state, payload) {
      state.search.errorMessage = payload.errorMessage;
    },
    saveRepoSearch(state, payload) {
      let { items, ids } = payload;

      // Save repo data
      items.forEach(item => {
        state.repos.byId[item.id] = new RepoClass(item);
      });

      // Save query
      state.search.resultIds = ids;
    },
    addBookmark(state, payload) {
      let id = payload.bookmarkId;
      if (state.bookmarks.ids.indexOf(id) < 0) {
        state.bookmarks.ids = [id, ...state.bookmarks.ids];
      }
    },
    removeBookmark(state, payload) {
      let id = payload.bookmarkId;
      let idx = state.bookmarks.ids.indexOf(id);
      if (idx >= 0) {
        state.bookmarks.ids.splice(idx, 1);
      }
    }
  },
  actions: {
    searchRepos({ commit, state }, { query }) {
      commit("isSearching", { isSearching: true });
      if (state.search.errorMessage !== "") {
        commit("updateSearchError", { errorMessage: "" });
      }

      return api
        .searchRepos(query)
        .then(json => {
          let { items } = json;
          let ids = items.map(item => item.id);
          if (state.search.query === query) {
            commit("saveRepoSearch", {
              ids,
              items
            });
          } else {
            // Avoid query mismatch
            // Better to cancel API call, though.
          }
        })
        .catch(err => {
          let errorMessage = "";
          if (err.message.indexOf("API rate limit exceeded") >= 0) {
            errorMessage =
              "Too many searches recently. Please try again in a minute.";
          } else {
            console.error(err);
            errorMessage = "An error occurred. Please try again later";
          }
          if (state.search.errorMessage !== errorMessage) {
            commit("updateSearchError", { errorMessage });
          }
          commit("clearSearchResults");
        })
        .finally(() => {
          commit("isSearching", { isSearching: false });
        });
    }
  },
  modules: {},
  getters: {
    getSearchQuery: state => {
      return state.search.query;
    },
    isBookmarked: state => id => {
      return state.bookmarks.ids.indexOf(id) >= 0;
    },
    bookmarkIds: state => {
      return state.bookmarks.ids;
    },
    bookmarkCount: state => {
      return state.bookmarks.ids.length;
    },
    getSearchResultIds: state => {
      return state.search.resultIds;
    },
    getRepoById: state => id => {
      return state.repos.byId[id];
    }
  },
  plugins: [vuexLocalStorage.plugin]
});
