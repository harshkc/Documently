import {makeStyles} from "@material-ui/core/styles";
import loginBG from "../../assets/login-bg.jpg";

const useStyles = makeStyles((theme) => ({
  loginContainer: {
    fontFamily: "Open Sans",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundImage: `url(${loginBG})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  content: {
    background: "rgba(255, 255, 252,0.97)",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
    borderRadius: "10px",
    padding: "20px",
    maxWidth: "70vw",
    minHeight: "45vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default useStyles;
