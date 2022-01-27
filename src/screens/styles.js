import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  desktop: {
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  mobile: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  navbar: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  navVisibile: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  main: {
    [theme.breakpoints.up("md")]: {
      paddingBottom: "5%",
    },
  },
  last: {
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(3),
      paddingBottom: "200px",
    },
  },
  grid: {
    "& > *": {
      margin: theme.spacing(2),
    },
  },
  drawerPaper: {
    width: 220,
  },
}));

export default useStyles;
