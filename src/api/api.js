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

const textPost = (url, data) =>
  fetch(url, { method: 'POST', body: JSON.stringify(data) }).then(async response => {
    if (response.ok) {
      let text = await response.text();
      return Promise.resolve(text);
    } else {
      let json = await response.json();
      return Promise.reject(json);
    }
  });

export default {
  searchRepos: q => {
    let url = new URL(API_BASE + "/search/repositories");
    url.searchParams.append("q", q);
    return jsonGet(url.toString());
  },
  syncReadme: fullName => {
    let url = API_BASE + `/repos/${fullName}/readme`;
    return jsonGet(url);
  },
  parseMarkdown: text => {
    let url = API_BASE + `/markdown`;
    return textPost(url, { text });
  }
};
