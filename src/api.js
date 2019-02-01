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
    console.error("Something was not loaded...");
    process.exit(1);
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

  return {
    user: {
      signIn(email, password) {
        vue.$http
          .post(METHOD_URLS.user.signIn(), { email, password })
          .then(res => {
            setAuthCookie(res.jwt);
            return res.jwt;
          })
          .catch(() => {});
      },

      signUp(email, password, password_confirmation) {
        vue.$http
          .get(METHOD_URLS.user.signUp(), {
            user: { email, password, password_confirmation }
          })
          .then(res => {
            console.log(res);
            setAuthCookie(res.jwt);
            return res.jwt;
          })
          .catch(() => {});
      },

      showMe() {
        vue.$http
          .get(METHOD_URLS.user.showMe(), setSettings())
          .then(res => res)
          .catch(() => {});
      },

      show(id) {
        vue.$http
          .get(METHOD_URLS.user.show(id), setSettings())
          .then(res => res)
          .catch(() => {});
      }
    }
  };
};
