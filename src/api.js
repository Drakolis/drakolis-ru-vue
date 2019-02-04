import { UI_EVENTS } from "./bus.js";

const API_HOST = "http://localhost:8000/";

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
  const setAuthHeaders = () => {
    return vue.$cookies.get(authCookieName);
  };
  const setSettings = () => {
    return {
      headers: {
        Authorization: setAuthHeaders()
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
        vue.$http
          .get(METHOD_URLS.user.showMe(), setSettings())
          .then(res => res.body)
          .catch(() => signOut());
      },

      show(id) {
        vue.$http
          .get(METHOD_URLS.user.show(id), setSettings())
          .then(res => res.body)
          .catch(() => signOut());
      }
    }
  };
};
