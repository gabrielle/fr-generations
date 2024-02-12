import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: "AIzaSyBt-3LbMM1bK-4cZPIymfoKV24OfOzm7s4",
    authDomain: "frdragons.firebaseapp.com",
    projectId: "frdragons",
    storageBucket: "frdragons.appspot.com",
    messagingSenderId: "1006913540176",
    appId: "1:1006913540176:web:66fc98dad1fad39cd30155",
    measurementId: "G-74F16NMK9N"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  //const analytics = getAnalytics(app);

  export const db = getFirestore(app);