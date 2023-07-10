import React, {useState, useEffect} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, signInWithEmail, logOut } from "./firebase";
import Form from "./components/Form";
import DataLookup from "./components/DataLookup";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe(); // Unsubscribe on cleanup
  }, []);

  return (
    <div className="parent">
      <div>
        {user ? (
          <>
            <button onClick={logOut}>Logout</button>
            <DataLookup />
          </>
        ) : (
          <Form />
        )}
      </div>
    </div>
  );
}

export default App;
