import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDTGSrGzjn3S9dPLx8PdltcK8dI3cVNZQ8",
  authDomain: "todo-df69d.firebaseapp.com",
  projectId: "todo-df69d",
  storageBucket: "todo-df69d.appspot.com",
  messagingSenderId: "394121669487",
  appId: "1:394121669487:web:d6fedb6155610970a1169a",
  measurementId: "G-GGBLEVJXYW",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
