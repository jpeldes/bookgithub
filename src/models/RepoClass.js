class RepoClass {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.fullName = data.full_name;
    this.description = data.description;
    this.starsCount = data.stargazers_count;
    this.forksCount = data.forks_count;
    this.githubLink = data.html_url;

    let owner = data.owner || {};

    this.authorName = owner.login;
    this.authorAvatarUrl = owner.avatar_url;

    this.readmeHtml = "";
  }
}

export default RepoClass;
