import { UI_EVENTS } from "./bus.js";
import { API_HOST } from "@/config";

const METHOD_URLS = {
  user: {
    signIn() {
      return API_HOST + "api/v1/signIn";
    },
    signUp() {
      return API_HOST + "api/v1/signUp";
    },
    showMe() {
      return API_HOST + "api/v1/showMe";
    },
    show(id) {
      return API_HOST + `api/v1/show/${id}`;
    }
  },
  budget: {
    account: {
      index() {
        return API_HOST + `api/v1/budget/accounts`;
      },
      item(id) {
        return API_HOST + `api/v1/budget/accounts/${id}`;
      },
      operations(id) {
        return API_HOST + `api/v1/budget/accounts/${id}/operations`;
      }
    },
    categories: {
      showAll() {
        return API_HOST + `api/v1/budget/categories`;
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
    vue.$cookies.set(authCookieName, jwt, timeoutSeconds + "s");
  };
  const getCookie = () => {
    return vue.$cookies.get(authCookieName);
  };
  const setSettings = () => {
    return {
      headers: {
        Authorization: "Bearer " + getCookie()
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
  if (cookieValue) signIn(cookieValue);

  return {
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
    }
  };
};
