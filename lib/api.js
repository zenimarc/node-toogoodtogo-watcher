const _ = require("lodash");
const got = require("got");
const { config } = require("./config");

const api = got.extend({
  prefixUrl: "https://apptoogoodtogo.com/api/",
  headers: _.defaults(config.get("api.headers"), {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Accept-Language": "en-US",
  }),
  responseType: "json",
  resolveBodyOnly: true,
});

module.exports = {
  login,
  listFavoriteBusinesses,
};

function login() {
  const session = getSession();
  return session.refreshToken ? refreshToken() : loginByEmail();
}

function loginByEmail() {
  const credentials = config.get("api.credentials");

  return api
<<<<<<< HEAD
    .post("auth/v1/loginByEmail", {
=======
    .post("auth/v2/loginByEmail", {
>>>>>>> 0d67841370c3f33b1741fd109159675044c93eb6
      json: {
        device_type: "UNKNOWN",
        email: credentials.email,
        password: credentials.password,
      },
    })
    .then(createSession);
}

function refreshToken() {
  const session = getSession();

  return api
<<<<<<< HEAD
    .post("auth/v1/token/refresh", {
=======
    .post("auth/v2/token/refresh", {
>>>>>>> 0d67841370c3f33b1741fd109159675044c93eb6
      json: {
        refresh_token: session.refreshToken,
      },
    })
    .then(updateSession);
}

function listFavoriteBusinesses() {
  const session = getSession();

  return api.post("item/v7/", {
    json: {
      favorites_only: true,
      origin: {
        latitude: 52.5170365,
        longitude: 13.3888599,
      },
      radius: 200,
      user_id: session.userId,
    },
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
  });
}

function getSession() {
  return config.get("api.session") || {};
}

function createSession(login) {
  config.set("api.session", {
    userId: login.startup_data.user.user_id,
    accessToken: login.access_token,
    refreshToken: login.refresh_token,
  });
  return login;
}

function updateSession(token) {
  config.set("api.session.accessToken", token.access_token);
  return token;
}
