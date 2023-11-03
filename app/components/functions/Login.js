'use client'
import React, { useState } from 'react';
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from '../database/database'
import bcrypt from "bcryptjs"; // For hashing passwords

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    // Retrieve user input
  const typedEmail = email;
  const typedPassword = password;

  // Query Firestore to check if the email exists
  const usersCollectionRef = collection(db, "member");
  const q = query(usersCollectionRef, where("email", "==", typedEmail));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.size === 1) {
    // Email exists, check the password
    const userDoc = querySnapshot.docs[0];
    const storedPassword = userDoc.data().password; // Retrieve hashed password from Firestore

   

    if (storedPassword ===  typedPassword){
      // Passwords match, login successful
      console.log("Login successful!");
      // Redirect to the dashboard or other authenticated pages
    } else {
      // Passwords don't match, login failed
      console.log("Incorrect password. Login failed.", "typed pw:", typedPassword, "correct pw:", storedPassword);
    }
  } else {
    // Email not found in Firestore, login failed
    console.log("Email not found. Login failed!");
  }


  };

  return (
    <div>
      <h2>Login</h2>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={handleEmailChange} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={handlePasswordChange} />
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;

