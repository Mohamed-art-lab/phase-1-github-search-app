document.getElementById('searchForm').addEventListener('submit', handleFormSubmit);

function handleFormSubmit(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  searchGitHubUsers(username);
}

function searchGitHubUsers(username) {
  const url = `https://api.github.com/search/users?q=${username}`;

  fetch(url)
    .then(handleResponse)
    .then(displayUserList)
    .catch(handleError);
}

function handleResponse(response) {
  if (!response.ok) {
    throw new Error(`GitHub API request failed with status: ${response.status}`);
  }
  return response.json();
}

function handleError(error) {
  console.error('Error:', error.message);
}

function displayUserList(users) {
  const userList = document.getElementById('userList');
  userList.innerHTML = '';

  users.forEach(user => {
    const userElement = createUserElement(user);
    userElement.addEventListener('click', () => getUserRepositories(user.login));
    userList.appendChild(userElement);
  });
}

function createUserElement(user) {
  const userElement = document.createElement('div');
  userElement.innerHTML = `
    <p>${user.login}</p>
    <img src="${user.avatar_url}" alt="${user.login}">
    <a href="${user.html_url}" target="_blank">View Profile</a>
  `;
  return userElement;
}

function getUserRepositories(username) {
  const url = `https://api.github.com/users/${username}/repos`;

  fetch(url)
    .then(handleResponse)
    .then(displayRepoList)
    .catch(handleError);
}

function displayRepoList(repositories) {
  const repoList = document.getElementById('repoList');
  repoList.innerHTML = '';

  repositories.forEach(repo => {
    const repoElement = createRepoElement(repo);
    repoList.appendChild(repoElement);
  });
}

function createRepoElement(repo) {
  const repoElement = document.createElement('div');
  repoElement.innerHTML = `
    <p>${repo.name}</p>
    <p>${repo.description || 'No description available.'}</p>
  `;
  return repoElement;
}