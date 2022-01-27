import * as React from "react";
import {TransactionProvider} from "./context/transactions";
import {SpeechProvider} from "@speechly/react-client";
import {AppWithTheme} from "./context/theme";
import Login from "./components/auth/Login";
import {auth} from "./firebase";
import {onAuthStateChanged, signOut} from "firebase/auth";

const App = () => {
  const [user, setUser] = React.useState(JSON.parse(localStorage.getItem("XauthUser")) || null);

  React.useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        console.log("AuthUser", authUser);
        setUser(authUser);
        localStorage.setItem("XauthUser", JSON.stringify(authUser));
      }
    });
  }, []);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      signOut(auth)
        .then(() => {
          console.log("Logged out");
          setUser(null);
          localStorage.removeItem("XauthUser");
        })
        .catch(() => {
          console.log("error in logout");
        });
    }
  };

  return user ? (
    <SpeechProvider appId={process.env.REACT_APP_SPEECHLY_ID} language='en-US'>
      <TransactionProvider>
        <AppWithTheme handleLogout={handleLogout} user={user} />
      </TransactionProvider>
    </SpeechProvider>
  ) : (
    <Login />
  );
};

export default App;
