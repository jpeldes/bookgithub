const API_BASE = "https://api.github.com";

const jsonGet = url => fetch(url).then(response => response.json());

export default {
  searchRepos: q => {
    let url = new URL(API_BASE + "/search/repositories");
    url.searchParams.append("q", q);
    return jsonGet(url.toString());
  }
};
