export class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
   
  }

  //  token = localStorage.getItem("token");

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      Promise.reject("Error!" + res.statusText);
    }
  }

  getCardList(token) {
    return fetch(this._baseUrl + "/cards", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => this._checkResponse(res));
  }

  getUserInfo(token) {
    return fetch(this._baseUrl + "/users/me", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "GET",
    }).then((res) => this._checkResponse(res));
  }

  getAppInfo() {
    return Promise.all([this.getUserInfo(), this.getCardList()]);
  }

  addCard({ name, link }) {
    return fetch(this._baseUrl + "/cards", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOTFlOTA5MGYzOTk5YzY2ODVmMzlhYyIsImlhdCI6MTYyMDMzNTM0NywiZXhwIjoxNjIwOTQwMTQ3fQ.ixSXdBg04oxlT3IbT2N4sCm7QYOlxfRaoMPM_377QeE`,
      },
      method: "POST",
      body: JSON.stringify({
        name,
        link,
      }),
    }).then((res) => this._checkResponse(res));
  }

  removeCard(cardId) {
    return fetch(this._baseUrl + "/cards/" + cardId, {
      headers: this._headers,
      method: "DELETE",
    }).then((res) => this._checkResponse(res));
  }

  changeCardLikeStatus(cardId, isLiked) {
    let apiCall;

    if (isLiked) {
      apiCall = "PUT";
    } else {
      apiCall = "DELETE";
    }

    return fetch(this._baseUrl + "/cards/likes/" + cardId, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOTFlOTA5MGYzOTk5YzY2ODVmMzlhYyIsImlhdCI6MTYyMDMzNTM0NywiZXhwIjoxNjIwOTQwMTQ3fQ.ixSXdBg04oxlT3IbT2N4sCm7QYOlxfRaoMPM_377QeE`,
      },
      method: apiCall,
    }).then((res) => this._checkResponse(res));
  }

  setUserInfo({ name, about }) {
    return fetch(this._baseUrl + "/users/me", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOTFlOTA5MGYzOTk5YzY2ODVmMzlhYyIsImlhdCI6MTYyMDMzNTM0NywiZXhwIjoxNjIwOTQwMTQ3fQ.ixSXdBg04oxlT3IbT2N4sCm7QYOlxfRaoMPM_377QeE`,
      },
      body: JSON.stringify({
        name,
        about,
      }),
    }).then((res) => this._checkResponse(res));
  }

  setUserAvatar({ avatar }) {
    return fetch(this._baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOTFlOTA5MGYzOTk5YzY2ODVmMzlhYyIsImlhdCI6MTYyMDMzNTM0NywiZXhwIjoxNjIwOTQwMTQ3fQ.ixSXdBg04oxlT3IbT2N4sCm7QYOlxfRaoMPM_377QeE`,
      },
      body: JSON.stringify({ avatar }),
    }).then((res) => this._checkResponse(res));
  }
}

export const api = new Api({
  baseUrl: "http://localhost:3000",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",

  },

});

//FIXME hard coding token until i can get everuthing working

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOTFlOTA5MGYzOTk5YzY2ODVmMzlhYyIsImlhdCI6MTYyMDMzNTM0NywiZXhwIjoxNjIwOTQwMTQ3fQ.ixSXdBg04oxlT3IbT2N4sCm7QYOlxfRaoMPM_377QeE