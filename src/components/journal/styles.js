import {makeStyles} from "@material-ui/core/styles";
import {blueGrey} from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
    borderRadius: "10px",
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonSuccess: {
    backgroundColor: blueGrey[500],
    "&:hover": {
      backgroundColor: blueGrey[700],
    },
  },
  fabProgress: {
    color: blueGrey[500],
    position: "absolute",
    top: -6,
    left: -6,
    zIndex: 1,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  flexed: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  cardContent: {
    paddingTop: 0,
  },
  divider: {
    margin: "10px 0",
  },
}));
export default useStyles;
