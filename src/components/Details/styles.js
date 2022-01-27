import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  income: {
    opacity: "0.97",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
    borderRadius: "10px",
    borderBottom: "10px solid rgba(0, 255, 0, 0.5)",
  },
  expense: {
    opacity: "0.97",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
    borderRadius: "10px",
    borderBottom: "10px solid rgba(255, 0, 0, 0.5)",
  },
}));

export default useStyles;
