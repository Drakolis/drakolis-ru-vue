import { UI_EVENTS } from "./bus.js";
import { API_HOST } from "@/config";

const METHOD_URLS = {
  settings: {
    public() {
      return API_HOST + "v1/public/settings";
    },
    index() {
      return API_HOST + "v1/private/settings";
    },
    item(id) {
      return API_HOST + `v1/private/settings/${id}`;
    }
  },
  user: {
    signIn() {
      return API_HOST + "v1/public/signIn";
    },
    signUp() {
      return API_HOST + "v1/public/signUp";
    },
    showMe() {
      return API_HOST + "v1/private/me";
    }
  },
  budget: {
    account: {
      index() {
        return API_HOST + `v1/private/budget/accounts`;
      },
      item(id) {
        return API_HOST + `v1/private/budget/accounts/${id}`;
      },
      operations(id) {
        return API_HOST + `v1/private/budget/accounts/${id}/operations`;
      }
    },
    categories: {
      showAll() {
        return API_HOST + `v1/private/budget/categories`;
      }
    }
  },
  external: {
    lastfm: {
      recent(account) {
        return API_HOST + `v1/proxy/lastfm/${account}/recent`;
      }
    }
  }
};

const authCookieName = "JWT";

export default vue => {
  if (!vue.$cookies || !vue.$http) {
    console.error("Unable to initiate API");
    return;
  }

  const setAuthCookie = (jwt, timeoutSeconds = 30 * 24 * 60 * 60) => {
    if (jwt) vue.$cookies.set(authCookieName, jwt, timeoutSeconds + "s");
    else vue.$cookies.remove(authCookieName);
  };
  const getCookie = () => {
    return vue.$cookies.get(authCookieName);
  };
  const setSettings = (cookie = null) => {
    return {
      headers: {
        Authorization: "Bearer " + cookie || getCookie()
      }
    };
  };

  const signIn = jwt => {
    setAuthCookie(jwt);
    vue.$store.commit("signIn");
    return jwt;
  };
  const signOut = () => {
    setAuthCookie(null);
    vue.$store.commit("signOut");
    return true;
  };

  const cookieValue = getCookie();
  if (cookieValue)
    vue.$http
      .get(METHOD_URLS.user.showMe(), setSettings(cookieValue))
      .then(() => signIn(cookieValue))
      .catch(() => signOut());

  const api = {
    settings: {
      loadAppSettings() {
        return vue.$http.get(METHOD_URLS.settings.public()).catch(() => {
          vue.$bus.$emit(UI_EVENTS.ERROR_CONFIG);
        });
      }
    },
    user: {
      signIn(email, password) {
        vue.$http
          .post(METHOD_URLS.user.signIn(), { email, password })
          .then(res => signIn(res.body.jwt))
          .catch(() => {
            vue.$bus.$emit(UI_EVENTS.ERROR_RESTRICTED);
            signOut();
          });
      },

      signUp(email, password, password_confirmation) {
        vue.$http
          .get(METHOD_URLS.user.signUp(), {
            user: { email, password, password_confirmation }
          })
          .then(res => signIn(res.body.jwt))
          .catch(() => {});
      },

      signOut,

      showMe() {
        return vue.$http
          .get(METHOD_URLS.user.showMe(), setSettings())
          .catch(() => signOut());
      },

      show(id) {
        return vue.$http
          .get(METHOD_URLS.user.show(id), setSettings())
          .catch(() => signOut());
      }
    },
    budget: {
      account: {
        showAll() {
          return vue.$http
            .get(METHOD_URLS.budget.account.index(), setSettings())
            .catch(() => {});
        },
        show(id) {
          return vue.$http
            .get(METHOD_URLS.budget.account.item(id), setSettings())
            .catch(() => {});
        },
        delete(id) {
          return vue.$http
            .delete(METHOD_URLS.budget.account.item(id), setSettings())
            .catch(() => {});
        },
        showOperations(id) {
          return vue.$http
            .get(METHOD_URLS.budget.account.operations(id), setSettings())
            .catch(() => {});
        }
      },
      categories: {
        showAll() {
          return vue.$http
            .get(METHOD_URLS.budget.categories.showAll(), setSettings())
            .catch(() => {});
        }
      }
    },
    external: {
      lastfm: {
        recent(account) {
          return vue.$http
            .get(METHOD_URLS.external.lastfm.recent(account), setSettings())
            .catch(() => {});
        },
        loved(account) {
          return vue.$http
            .get(METHOD_URLS.external.lastfm.loved(account), setSettings())
            .catch(() => {});
        }
      }
    }
  };

  return api;
};
