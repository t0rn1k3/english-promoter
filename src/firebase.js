import "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCdSnyclXGO2d_1_7_QB02EAfTXUIuPXBI",
  authDomain: "english-promoter.firebaseapp.com",
  projectId: "english-promoter",
  storageBucket: "english-promoter.firebasestorage.app",
  messagingSenderId: "1048757889510",
  appId: "1:1048757889510:web:d3ccd4e8257ccd39988e27",
  measurementId: "G-QCTN1WL8X0",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export const signInAnonymouslyToFirebase = async () => {
  try {
    const userCredential = await signInAnonymously(auth);
    const token = await userCredential.user.getIdToken();
    return token;
  } catch (error) {
    console.error("Error signing in anonymously:", error);
    throw error;
  }
};

export { auth };
export default firebaseApp;
