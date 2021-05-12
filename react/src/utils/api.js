



  function checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      Promise.reject("Error!" + res.statusText);
    }
  }

  const   baseUrl =  "http://localhost:3000";

  export const getCardList = () => {
    return fetch(baseUrl + "/cards", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => checkResponse(res));
  }





  export const addCard = ({ name, link }) => {
    return fetch(baseUrl + "/cards", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
       Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: "POST",
      body: JSON.stringify({  
        name,
        link, 
      }),
    }).then((res) => checkResponse(res));
  }

  export const removeCard = (cardId) => {
    return fetch(baseUrl + "/cards/" + cardId, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
       Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: "DELETE",
    }).then((res) => checkResponse(res));
  }

  export const changeCardLikeStatus = (cardId, isLiked) => {
    let apiCall;

    if (isLiked) {
      apiCall = "PUT";
    } else {
      apiCall = "DELETE";
    }

    return fetch(baseUrl + "/cards/likes/" + cardId, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
       Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: apiCall,
    }).then((res) => checkResponse(res));
  }

  export const setUserInfo = ({ name, about }) => {
    
    return fetch(baseUrl + "/users/me", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
       Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        name,
        about,
      }),
    }).then((res) => checkResponse(res));
  }

  export const setUserAvatar = ({ avatar })  => {
    
    return fetch(baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
       Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ avatar }),
    }).then((res) => checkResponse(res));
  }

//FIXME hard coding token until i can get everuthing working

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOWIwOGQ2ODIzNjk1NTllYjA2NDhhMCIsImlhdCI6MTYyMDc3MzA4NSwiZXhwIjoxNjIxMzc3ODg1fQ.4980I0VkN0kg9toWJ6g3PBCKxmfzQx1jHiO0mfE1IPY