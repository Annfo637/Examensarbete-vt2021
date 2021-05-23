import React, { createContext, useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { v4 as uuidv4 } from "uuid";

export const AuthContext = createContext({});

export default function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserDB, setCurrentUserDB] = useState(null);
  const [pendingUsers, setPendingUsers] = useState([]);
  const [approvedUsers, setApprovedUsers] = useState(null);
  const [adminUsers, setAdminUsers] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);

  const dbUsers = db.collection("users");
  const dbPending = db.collection("pendingUsers");
  const dbAdmin = db.collection("adminUsers");

  //ONLY FOR ADMIN
  async function approveUser(user) {
    const email = user.email;
    const password = user.password;

    return auth.createUserWithEmailAndPassword(email, password).then((cred) => {
      dbPending
        .doc(user.tempID)
        .delete()
        .catch((err) => {
          console.error(err);
        });

      return dbUsers.doc(cred.user.uid).set({
        userID: cred.user.uid,
        fullName: user.fullName,
        email,
        password,
        admin: false,
      });
    });
  }

  function makeAdminUser(user) {
    const userID = user.userID;
    const newAdmin = {
      userID,
      fullName: user.fullName,
      email: user.email,
      password: user.password,
      admin: true,
    };

    dbUsers
      .doc(userID)
      .delete()
      .catch((err) => {
        console.error(err);
      });

    return dbAdmin.doc(userID).set(newAdmin);
  }

  function removeAdminUser(user) {
    const userID = user.userID;
    const removedAdmin = {
      userID,
      fullName: user.fullName,
      email: user.email,
      password: user.password,
      admin: false,
    };

    console.log(removedAdmin.admin);
    dbAdmin
      .doc(userID)
      .delete()
      .catch((err) => {
        console.error(err);
      });

    return dbUsers.doc(userID).set(removedAdmin);
  }

  function deleteUser(type, user) {
    if (type === "pending") {
      console.log("pending");
      dbPending
        .doc(user.tempID)
        .delete()
        .catch((err) => {
          console.error(err);
        });
    } else if (type === "approved") {
      console.log("approved");
      dbUsers
        .doc(user.userID)
        .delete()
        .catch((err) => {
          console.error(err);
        });
    } else {
      console.log("admin");
      dbAdmin
        .doc(user.userID)
        .delete()
        .catch((err) => {
          console.error(err);
        });
    }
  }

  //REGISTER, LOGIN/OUT, UPDATE PASSWORD
  function registerUser(name, email, password) {
    const newUser = {
      fullName: name,
      email,
      password,
      tempID: uuidv4(),
      admin: false,
    };

    dbPending
      .doc(newUser.tempID)
      .set(newUser)
      .catch((err) => {
        console.log(err);
      });
  }

  async function loginUser(email, password) {
    return auth.signInWithEmailAndPassword(email, password).then((cred) => {
      let adminID = [];
      adminUsers.forEach((user) => {
        adminID.push(user.userID);
      });
      setIsAdmin(adminID.includes(cred.user.uid));
    });
  }

  function logoutUser() {
    setCurrentUserDB(null);
    setIsAdmin(false);
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  //FUNCTIONS FOR FETCHING USERS FROM FIRESTORE
  function getPendingUsers() {
    dbPending.onSnapshot((dbSnapshot) => {
      const dbItems = [];
      dbSnapshot.forEach((doc) => {
        dbItems.push(doc.data());
      });
      setPendingUsers(dbItems);
    });
  }

  function getApprovedUsers() {
    dbUsers.onSnapshot((dbSnapshot) => {
      const dbItems = [];
      dbSnapshot.forEach((doc) => {
        dbItems.push(doc.data());
      });
      setApprovedUsers(dbItems);
    });
  }

  function getAdminUsers() {
    dbAdmin.onSnapshot((dbSnapshot) => {
      const dbItems = [];
      dbSnapshot.forEach((doc) => {
        dbItems.push(doc.data());
      });
      setAdminUsers(dbItems);
    });
  }

  useEffect(() => {
    const authObserver = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    getAdminUsers();
    getPendingUsers();
    return authObserver;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const value = {
    currentUser,
    currentUserDB,
    setCurrentUserDB,
    pendingUsers,
    getPendingUsers,
    approvedUsers,
    getApprovedUsers,
    adminUsers,
    isAdmin,
    setIsAdmin,
    getAdminUsers,
    registerUser,
    approveUser,
    makeAdminUser,
    removeAdminUser,
    deleteUser,
    loginUser,
    logoutUser,
    resetPassword,
    updatePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
