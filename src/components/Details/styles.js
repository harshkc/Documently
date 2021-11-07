import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  income: {
    borderBottom: "10px solid rgba(0, 255, 0, 0.5)",
  },
  expense: {
    borderBottom: "10px solid rgba(255, 0, 0, 0.5)",
  },
}));

export default useStyles;
