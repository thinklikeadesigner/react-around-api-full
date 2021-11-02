
// const   baseUrl = 'http://api.final-countdown.students.nomoreparties.site';
const   baseUrl = process.env.NODE_ENV === 'production' ? "https://api-02092011.herokuapp.com" : "http://localhost:5000";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    Promise.reject("Error!" + res.statusText);
  }
}
/*BUG fix the cors error

Access to fetch at 'https://api-02092011.herokuapp.com/signin' from origin 
'https://web-client-02092011.herokuapp.com' has been blocked by CORS policy: 
Response to preflight request doesn't pass access control check: No 
'Access-Control-Allow-Origin' header is present on the requested resource. 
If an opaque response serves your needs, set the request's mode to 'no-cors' 
to fetch the resource with CORS disabled.
api-02092011.herokuapp.com/signin:1 Failed to load resource: net::ERR_FAILED

*/ 
export const register = (email, password) => {

  return fetch(baseUrl + '/signup', {

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

  return fetch(baseUrl + '/signin', {

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
