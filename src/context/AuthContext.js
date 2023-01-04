import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  sendEmailVerification,
} from "firebase/auth";
import {
  doc,
  update,
  updateDoc,
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  FieldValue,
  Timestamp
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [details, setDetails] = useState(JSON.parse(localStorage.getItem('details')) || {
    id: "",
    uid: "",
    name: "",
    email: "",
    starting: 0,
    current: 0,
    trades: {}
  });
  
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const handleDetails = (details) => {
    window.sessionStorage.setItem("details", details);
    setDetails(details)
  }

  const createUser = (email, password, info) => {
    return createUserWithEmailAndPassword(auth, email, password).then(
      async (userCredential) => {
        sendVerification(userCredential.user);
        try {
          let newUser = {
            uid: userCredential.user.uid,
            ...info,
            trades: {},
          };
          const docRef = await addDoc(collection(db, "usage"), newUser);
          console.log("Document written with ID: ", docRef.id);
          handleDetails({...newUser, id: docRef.id});
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      }
    );
  };

  const sendVerification = (user) => {
    return sendEmailVerification(user);
  };

  const forgotPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const closeTrade = async (trade) => {
    console.log(trade);
    const {day, timestamp, price_sold, sell_notes, quanity} = trade;
    const tradeTimestamp = Timestamp.now().toDate();
    const timeSold = tradeTimestamp.getTime();
    let updatedTrades = {};
    if (details.trades[day.key]?.positions !== undefined) {
      updatedTrades = details.trades[day.key]?.positions;
    }
    let starting = details.current;
    if (details.trades[day.key]?.starting !== undefined) {
      starting = details.trades[day.key].starting
    }
    updatedTrades[timestamp] = {...updatedTrades[timestamp], time_sold: timeSold, sell_price: price_sold, sell_notes}
    console.log(updatedTrades);
    await updateDoc(doc(db, "usage", details.id), {
      ...details,
      current: details.current + (quanity * (price_sold * 100)),
      trades: {
        ...details.trades,
        [day.key]: {
          starting,
          positions: updatedTrades
        } 
      }
    }).finally(() => '');
  }

  const addTrade = async (payload) => {
    const tradeTimestamp = Timestamp.now().toDate();
    const today = payload.day || tradeTimestamp.toLocaleString().split(',')[0];
    let starting = details.current;
    if (details.trades[today]?.starting !== undefined) {
      starting = details.trades[today].starting
    }
    console.log(starting);
    let updatedTrades = {};
    if (details.trades[today]?.positions !== undefined) {
      updatedTrades = details.trades[today]?.positions;
    }
    console.log(updatedTrades);
    updatedTrades[tradeTimestamp.getTime()] = payload
    if (details.current - payload.total >= 0) {
      await updateDoc(doc(db, "usage", details.id), {
        ...details,
        current: details.current - payload.total,
        trades: {
          ...details.trades,
          [today]: {
            starting: starting,
            positions: updatedTrades
          } 
        }
      }).finally(() => '');
    } else {
      return false
    }
  }

  const updateUsage = async (service) => {
    await updateDoc(doc(db, "usage", details.id), {
      ...details,
      services: {
        ...details.services,
        [service]: {
          uses: details.services[service].uses + 1,
          limit: details.services[service].limit,
        },
      },
    }).finally(() => console.log(details));
  };

  const updateDetails = async (newDetails) => {
    await updateDoc(doc(db, "usage", details.id), {
      ...details,
      details: newDetails
    }).finally(() => console.log(details));
  };

  const logIn = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password).then(
      (UserCredentials) => {
        const q = query(
          collection(db, "usage"),
          where("uid", "==", UserCredentials.user.uid)
        );
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          let limit = [];
          querySnapshot.forEach((doc) => {
            console.log(doc);
            limit.push({ ...doc.data(), id: doc.id });
          });
          handleDetails(limit[0]);
        });
        return () => unsubscribe();
      }
    );
  };

  const logOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // console.log(currentUser)
      setUser(currentUser);
      const q = query(
        collection(db, "usage"),
        where("uid", "==", currentUser.uid)
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let limit = [];
        querySnapshot.forEach((doc) => {
          limit.push({ ...doc.data(), id: doc.id });
        });
        handleDetails(limit[0]);
      });
      return () => unsubscribe();
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <UserContext.Provider
      value={{
        createUser,
        details,
        user,
        logOut,
        logIn,
        forgotPassword,
        sendVerification,
        addTrade,
        closeTrade,
        updateUsage,
        updateDetails,
        navigate,
        formatter
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
