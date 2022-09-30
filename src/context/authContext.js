import { createContext, useContext, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebaseConfig/firebase";
import { useState } from "react";

export const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  return context;
};

export const AuthProvider = ({ children }) => {
  // Get and Set User state
  const [user, setUser] = useState(null);

  // If any user load the page
  const [loading, setLoading] = useState(true);

  // Register
  const signup = async (email, password) => {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
  };

  // Login
  const login = async (email, password) => {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
  };

  // Logout
  const logout = () => signOut(auth);

  // Login Google
  const loginWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };

  // Reset Password
  const resetPassword = (email) => {
    sendPasswordResetEmail(auth, email);
  };

  // Check if user is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <authContext.Provider
      value={{
        signup,
        login,
        user,
        logout,
        loading,
        loginWithGoogle,
        resetPassword,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
