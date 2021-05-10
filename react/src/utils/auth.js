export const BASE_URL = "http://localhost:3000";

// function checkResponse(res) {
//   if (res.ok) {
//     return res.json();
//   } else {
//     Promise.reject("Error!" + res.statusText);
//   }
// }

export const register = (email, password) => {
  return fetch(BASE_URL + "/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      console.log(res);
      if (res.ok) {
        return res.json();
      } else {
        Promise.reject("Error!" + res.statusText);
      }
    })
    .then((res) => {
      return res;
    });
};

export const authorize = (email, password, ) => {
  return fetch(BASE_URL + "/users/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",

    },
    body: JSON.stringify({ email, password }),
  })
  .then((res) =>  

  res.ok ?
   res.json()
:
    Promise.reject("Error!" + res.statusText)
  
  
  )
    .then((res) => {
      console.log('this is res', res);
      if (res.token) {
        localStorage.setItem("token", res.token);
        return res;
      }
    });
};

export const getContent = (token) => {
  console.log('get content token ', token);
  return fetch(BASE_URL + "/users/me", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {  if (res.ok) {
      return res.json();
    } else {
      Promise.reject("Error!" + res.statusText);
    }})
    .then((data) => {
      return data;
    });
};
