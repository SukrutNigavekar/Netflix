import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {createUserWithEmailAndPassword,
     getAuth, 
     signInWithEmailAndPassword,
     signOut} from 'firebase/auth'
import {addDoc, 
    collection, 
    getFirestore} from 'firebase/firestore'
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBCI60wAqq-mg-Uu2Ks8ZaoOGffYfqsE58",
  authDomain: "netflix-firebase-48ea7.firebaseapp.com",
  projectId: "netflix-firebase-48ea7",
  storageBucket: "netflix-firebase-48ea7.firebasestorage.app",
  messagingSenderId: "898992931765",
  appId: "1:898992931765:web:b8382f4c57c99819c54ffc",
  measurementId: "G-H2JR92YBYF"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async(name,email,password)=>{
    try{
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db,"user"),{
            uid: user.uid,
            name,
            authProvider : "local",
            email,
            password,
        });
    }   
    catch(error){
        console.log(error.message);
        toast.error(error.code.split('/')[1]).split('-').join(' ');
    }
}

const login = async(email, password)=>{
    try{
        await signInWithEmailAndPassword(auth, email, password);
    }
    catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1]).split('-').join(' ');
    }
}
const logout = async()=>{
    signOut(auth);
}

export {auth,db, login,logout,signup}