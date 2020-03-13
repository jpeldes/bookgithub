import Vue from "vue";
import Vuex from "vuex";
import vuexLocalStorage from '@/plugins/vuexLocalStorage';

import RepoClass from "@/models/RepoClass";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    search: {
      query: '',
      byQuery: {}
    },
    repos: {
      byId: {}
    },
    bookmarks: {
      ids: []
    }
  },
  mutations: {
    updateSearchQuery(state, payload) {
      state.search.query = payload.q;
    },
    saveRepoSearch(state, payload) {
      let { query, items, ids } = payload;

      // Save repo data
      items.forEach(item => {
        state.repos.byId[item.id] = new RepoClass(item);
      });

      // Save query
      state.search.byQuery[query] = ids;
    },
    addBookmark(state, payload) {
      let id = payload.bookmarkId;
      if (state.bookmarks.ids.indexOf(id) < 0) {
        state.bookmarks.ids = [id, ...state.bookmarks.ids]
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
  actions: {},
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
    getRepoIdsByQuery: state => query => {
      return state.search.byQuery[query];
    },
    getRepoById: state => id => {
      return state.repos.byId[id];
    }
  },
  plugins: [vuexLocalStorage.plugin]
});
