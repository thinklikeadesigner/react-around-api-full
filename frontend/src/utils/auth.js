// export const baseUrl = 'http://api.final-countdown.students.nomoreparties.site';
const   baseUrl =  "http://localhost:3000";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    Promise.reject("Error!" + res.statusText);
  }
}

export const register = (email, password) => {
  return fetch(baseUrl + '/users/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then(checkResponse)
    .then((res) => {
      return res;
    });
};

export const authorize = (email, password) => {
  return fetch(baseUrl + '/users/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
  .then(checkResponse)
    .then((res) => {
      if (res.token) {
        localStorage.setItem('token', res.token);
        return res;
      }
    });
};

export const getContent = (jwt) => {
  return fetch(baseUrl + '/users/me', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
  })
  .then(checkResponse)
    .then((res) => {
      return res;
    });
};
