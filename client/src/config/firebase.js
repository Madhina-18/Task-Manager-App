import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyBJwu13A9QMG5p2Tfq13vGUgw9mi0ac0Bo",
  authDomain: "task-app-final-56dab.firebaseapp.com",
  projectId: "task-app-final-56dab",
  storageBucket: "task-app-final-56dab.firebasestorage.app",
  messagingSenderId: "637821664952",
  appId: "1:637821664952:web:6e3c0ff0b38d94c549fe4d",
  measurementId: "G-7220C2K4K4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export default auth