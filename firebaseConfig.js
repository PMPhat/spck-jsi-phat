import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
const firebaseConfig = {
  apiKey: "AIzaSyBuO2DIbDMPHQkwKqEPaBlm3A8oDVZnwbY",
  authDomain: "spck-jsi01.firebaseapp.com",
  projectId: "spck-jsi01",
  storageBucket: "spck-jsi01.appspot.com",
  messagingSenderId: "492743046557",
  appId: "1:492743046557:web:91f52f25105c11d5706b74",
  measurementId: "G-S9T7SJTLPE",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const dangKy = async (auth, email, password) => {
  let isChecked;
  let info;
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    console.log(user);
    isChecked = true;
  } catch (error) {
    console.log(error.code);
    isChecked = false;
    info = error.code;
  }
  return {
    isChecked,
    info,
  };
};

export const dangNhap = async (auth, email, password) => {
  let isChecked;
  let info;
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    console.log(user);
    isChecked = true;
  } catch (error) {
    console.log(error.code);
    isChecked = false;
    info = error.code;
  }
  return {
    isChecked,
    info,
  };
};
