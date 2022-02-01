import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    //center the content
    marginTop: "3rem",
    marginLeft: "4rem",
    marginRight: "4rem",
  },
  grid: {
    "& > *": {
      margin: theme.spacing(2),
    },
  },
}));

export default useStyles;
