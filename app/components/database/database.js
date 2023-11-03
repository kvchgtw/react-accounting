// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore"; 


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyBpR3Adp9lxcBOkWJPv10sCe9BmsfIDJOE",
  authDomain: "react-accounting-44d80.firebaseapp.com",
  projectId: "react-accounting-44d80",
  storageBucket: "react-accounting-44d80.appspot.com",
  messagingSenderId: "118916683505",
  appId: "1:118916683505:web:a3bcc966f7cfcd52da7b50",
  measurementId: "G-0XG3VK3353"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

// write data
// async function Database(){
// try {
//     const docRef = await addDoc(collection(db, "member"), {
//       username: "Ada",
//       password: "Lovelace"
//     });
//     console.log("Console log Document written with ID: ", docRef.id);
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }

//   };


//Read Data and use where to query data

async function Database() {
  try {
    const colRefs = collection(db, 'member');
    const q = query(colRefs, where("username", "==", "test"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      console.log("Document ID:", doc.id);
      console.log("Document username:", doc.data().username);
      console.log("Document password :", doc.data().password);
    });
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
}

export default Database;