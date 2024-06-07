import { getAuth, signOut } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBrXS9zQOlmv6BfZgrTLHY402zKsE7Zm9c",
  authDomain: "geo-kort-og-lydbog.firebaseapp.com",
  projectId: "geo-kort-og-lydbog",
  storageBucket: "geo-kort-og-lydbog.appspot.com",
  messagingSenderId: "447721431608",
  appId: "1:447721431608:web:d793a2a1904c6176cfbccd",
  measurementId: "G-5N25FFYYME"
};

/*
const auth = getAuth();
export const signout = () => {signOut(auth).then(() => {
  window.location.href="/"
}).catch((error) => {
  // An error happened.
});
}
*/

