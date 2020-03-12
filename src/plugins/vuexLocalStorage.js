import VuexPersistence from "vuex-persist";

const vuexLocalStorage = new VuexPersistence({
  storage: window.localStorage
});

export default vuexLocalStorage;
