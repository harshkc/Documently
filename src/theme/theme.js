import loginBG from "../assets/login-bg.jpg";

const light = {
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1),rgba(0, 0, 0, 0.5)),${`url(${loginBG})`}`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        },
      },
    },
  },
  palette: {
    type: "light",
  },
};

const dark = {
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.55),rgba(0, 0, 0, 0.6)),${`url(${loginBG})`}`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        },
      },
    },
  },
  palette: {
    type: "dark",
  },
};

export {light, dark};
