import React, { createContext, useState, useEffect } from "react";
import { auth, db } from "../firebase";

export const AuthContext = createContext({});

export default function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserDB, setCurrentUserDB] = useState(null);

  const dbUsers = db.collection("users");

  async function registerUser(name, email, password) {
    return auth.createUserWithEmailAndPassword(email, password).then((cred) => {
      return dbUsers.doc(cred.user.uid).set({
        fullName: name,
      });
    });
  }

  function loginUser(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logoutUser() {
    setCurrentUserDB(null);
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateName(name) {
    console.log(name);
    const updatedUser = auth.currentUser.updateProfile({ displayName: name });
    return updatedUser;
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return unsubscribe; //döpa om till observer?
  }, []);

  const value = {
    currentUser,
    currentUserDB,
    setCurrentUserDB,
    registerUser,
    loginUser,
    logoutUser,
    resetPassword,
    updateName,
    updatePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
