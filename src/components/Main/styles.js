import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    opacity: "0.99",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
    borderRadius: "10px",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
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
    margin: "20px 0",
  },
}));
export default useStyles;
