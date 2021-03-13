import React, { createContext, useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { v4 as uuidv4 } from "uuid";

export const AuthContext = createContext({});

export default function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserDB, setCurrentUserDB] = useState(null);
  const [pendingUsers, setPendingUsers] = useState(null);
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

    console.log(newAdmin.admin);
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

  //REGISTER, LOGIN/OUT, UPDATE USER OR PASSWORD
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
  //login with firebase.auth and redirects depending on
  //whether user is in admin db-collection or not
  async function loginUser(email, password, history) {
    return auth.signInWithEmailAndPassword(email, password).then((cred) => {
      let adminID = [];
      adminUsers.forEach((user) => {
        adminID.push(user.userID);
      });
      console.log("inloggad user är admin:", adminID.includes(cred.user.uid));
      setIsAdmin(adminID.includes(cred.user.uid));
      // adminID.includes(cred.user.uid)
      //   ? history.push("/admin")
      //   : history.push("/");
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

  function updateName(name) {
    console.log(name);
    const updatedUser = auth.currentUser.updateProfile({ displayName: name });
    return updatedUser;
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

  //useEffects
  useEffect(() => {
    console.log("useEffect", isAdmin);
  }, [isAdmin]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log(user);
      setCurrentUser(user);
    });
    getAdminUsers();
    return unsubscribe; //döpa om till observer?
  }, []);

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
    loginUser,
    logoutUser,
    resetPassword,
    updateName,
    updatePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// async function loginUser(email, password) {
//   return auth.signInWithEmailAndPassword(email, password).then((cred) => {
//     console.log(cred);
//     let adminID = [];
//     adminUsers.forEach((user) => {
//       console.log(user.userID);
//       console.log(cred.user.uid);
//       adminID.push(user.userID);
//     });
//     console.log("inloggad user är admin:", adminID.includes(cred.user.uid));
//     setIsAdmin(adminID.includes(cred.user.uid));
//     console.log(isAdmin);
//     //return isAdmin;
//   });
// }
