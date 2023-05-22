const localStorageKey = "__bookshelf_token__";

const client = async (domain, endpoint, { body, ...customConfig } = {}) => {
  const envDomain = domain;
  // ?? process?.env.REACT_APP_API_URL ?? "";

  const token = window.localStorage.getItem(localStorageKey);
  const headers = {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
  };
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
    // config.body = JSON.stringify(body);
    const customBody = {
      content: "note de prueba",
      important: false,
    };
    config.body = JSON.stringify(customBody);
    // config.body = body;
  }

  const _URL = `${envDomain}/${endpoint}`;

  // TODO: VALIDATE URL
  // const MYURL = new URL(_URL);
  // console.log({ URL: _URL });

  // const response = await window.fetch(`${envDomain}/${endpoint}`, config);
  // const response = await window.fetch(_URL, config);
  // console.log({ _URL, config });
  const response = await fetch(_URL, config);
  // console.log({ response });
  // console.log("ere", response);
  if (response.status === 401) {
    logout();
    window.location.assign(window.location);
    return;
  }
  if (response.ok) {
    return await response.json();
  } else {
    const errorMessage = await response.text();
    return Promise.reject(new Error(errorMessage));
  }
};

function logout() {
  window.localStorage.removeItem(localStorageKey);
}

export default client;

export async function get({ api_domain, endpoint, customConfig }) {
  return await client(api_domain, endpoint, {
    method: "GET",
    ...customConfig,
  });
}

export async function post({ api_domain, endpoint, body, customConfig }) {
  return await client(api_domain, endpoint, {
    method: "POST",
    body,
    ...customConfig,
  });
}

export async function put(endpoint, body, customConfig) {
  return await client("api-domain", endpoint, {
    method: "PUT",
    body,
    ...customConfig,
  });
}

export async function patch(endpoint, body, customConfig) {
  return await client("api-domain", endpoint, {
    method: "PATCH",
    body,
    ...customConfig,
  });
}

export async function remove(endpoint, customConfig) {
  return await client("api-domain", endpoint, {
    method: "DELETE",
    ...customConfig,
  });
}

// function logout() {
//   window.localStorage.removeItem(localStorageKey);
// }
