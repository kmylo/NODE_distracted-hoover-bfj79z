const localStorageKey = "__bookshelf_token__";

async function client(domain, endpoint, { body, ...customConfig } = {}) {
  const envDomain = domain ?? process?.env.REACT_APP_API_URL ?? "";

  const token = window.localStorage.getItem(localStorageKey);
  const headers = { "content-type": "application/json" };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  // TODO: extend methods
  const config = {
    method: body ? "POST" : "GET",
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };
  if (body) {
    config.body = JSON.stringify(body);
  }

  const _URL = `${envDomain}/${endpoint}`;

  // TODO: VALIDATE URL
  // const MYURL = new URL(_URL);
  // console.log({ URL: _URL });

  // const response = await window.fetch(`${envDomain}/${endpoint}`, config);
  // const response = await window.fetch(_URL, config);
  const response = await fetch(_URL, config);
  // console.log("ere", response);
  if (response.status === 401) {
    logout();
    // window.location.assign(window.location);
    return;
  }
  if (response.ok) {
    return await response.json();
  } else {
    const errorMessage = await response.text();
    return Promise.reject(new Error(errorMessage));
  }
}

function logout() {
  window.localStorage.removeItem(localStorageKey);
}

export default client;
