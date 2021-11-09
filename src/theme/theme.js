const light = {
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          background: "linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
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
          background: "linear-gradient(to top, #16222a, #3a6073)",
        },
      },
    },
  },
  palette: {
    type: "dark",
  },
};

export { light, dark };
