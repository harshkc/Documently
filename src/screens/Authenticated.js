import React from "react";
import {TransactionProvider} from "../context/transactions";
import {SpeechProvider} from "@speechly/react-client";
import {AppWithTheme} from "../context/theme";

const Authenticated = ({user, handleLogout}) => {
  return (
    <SpeechProvider appId={process.env.REACT_APP_SPEECHLY_ID} language='en-US'>
      <TransactionProvider user={user}>
        <AppWithTheme handleLogout={handleLogout} user={user} />
      </TransactionProvider>
    </SpeechProvider>
  );
};

export default Authenticated;
