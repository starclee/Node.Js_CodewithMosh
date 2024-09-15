console.log("Before");
getUsers(1, getRepos);

function getRepos(users) {
  getRepositories(users.userName, getCommits);
}

function getCommits(repos) {
  console.log("Repos", repos, repos[0]);
  getCommitsH(repos[0], displayCommits);
}

function displayCommits(commits) {
  console.log(commits);
}

function getUsers(id, callBack) {
  setTimeout(() => {
    console.log("Fetching users from the database...");
    callBack({ id, userName: "Starc" });
  }, 2000);
}

function getRepositories(userName, callBack) {
  setTimeout(() => {
    console.log("Calling GitHub API for Repo's...");
    let userRepos = {
      Starc: ["repo1", "repo2", "repo3"],
      Lee: ["1repo", "2repo", "3repo"],
    };
    callBack(userRepos[userName]);
  }, 2000);
}

function getCommitsH(repo, callBack) {
  setTimeout(() => {
    console.log(`Getting commit history of the ${repo}...`);
    let repoCommits = {
      repo1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      repo2: ["a", "b", "c", "d", "e", "f", "g"],
    };
    callBack(repoCommits[repo]);
  }, 2000);
}
console.log("After");
