const API_BASE = "https://api.github.com";

const jsonGet = url =>
  fetch(url).then(async response => {
    let json = await response.json();
    if (response.ok) {
      return Promise.resolve(json);
    } else {
      return Promise.reject(json);
    }
  });

export default {
  searchRepos: q => {
    let url = new URL(API_BASE + "/search/repositories");
    url.searchParams.append("q", q);
    return jsonGet(url.toString());
  }
};
