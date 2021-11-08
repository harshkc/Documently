import React from "react";
import { Grid } from "@material-ui/core";

import useStyles from "./styles";
import Details from "../components/Details/Details";
import Main from "../components/Main/Main";

import {
  PushToTalkButton,
  PushToTalkButtonContainer,
} from "@speechly/react-ui";
import { SpeechState, useSpeechContext } from "@speechly/react-client";

const App = () => {
  const { grid, main, desktop, mobile, last } = useStyles();
  const { speechState } = useSpeechContext();
  const mainRef = React.useRef(null);

  const executeScroll = () =>
    mainRef.current.scrollIntoView({ behavior: "smooth" });

  React.useEffect(() => {
    if (speechState === SpeechState.Recording) {
      executeScroll();
    }
  }, [speechState]);

  return (
    <div>
      <Grid
        className={grid}
        container
        spacing={0}
        alignItems="center"
        justifyContent="center"
        style={{ height: "100vh" }}
      >
        <Grid item xs={12} sm={4} className={mobile}>
          <Details />
        </Grid>
        <Grid ref={mainRef} item xs={12} sm={3} className={main}>
          <Main />
        </Grid>
        <Grid item xs={12} sm={4} className={desktop}>
          <Details />
        </Grid>
        <Grid item xs={12} sm={4} className={last}>
          <Details isExpense={true} />
        </Grid>
        <PushToTalkButtonContainer>
          <PushToTalkButton />
        </PushToTalkButtonContainer>
      </Grid>
    </div>
  );
};

export default App;
