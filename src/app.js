import * as React from "react";
import {TransactionProvider} from "./context/transactions";
import {SpeechProvider} from "@speechly/react-client";
import {AppWithTheme} from "./context/theme";
import Login from "./components/auth/Login";
import {auth, db} from "./firebase";
import {onAuthStateChanged, signOut} from "firebase/auth";
import {doc, setDoc, getDoc} from "firebase/firestore";

const App = () => {
  const [user, setUser] = React.useState(JSON.parse(localStorage.getItem("XauthUser")) || null);

  React.useEffect(() => {
    const createUser = async (authUser) => {
      const userSnapshot = await getDoc(doc(db, "users", authUser.id));
      if (userSnapshot.exists()) {
        return;
      } else {
        await setDoc(doc(db, "users", authUser.id), authUser);
      }
    };

    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        const userModel = {
          id: authUser.uid,
          email: authUser.email,
          photoURL: authUser.photoURL,
          displayName: authUser.displayName,
        };
        setUser(userModel);
        createUser(userModel);
        localStorage.setItem("XauthUser", JSON.stringify(userModel));
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
      <TransactionProvider user={user}>
        <AppWithTheme handleLogout={handleLogout} user={user} />
      </TransactionProvider>
    </SpeechProvider>
  ) : (
    <Login />
  );
};

export default App;
