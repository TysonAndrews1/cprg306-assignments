'use client'
import { useState,useEffect } from "react";
import React from "react";
import { useUserAuth } from "./_utils/auth-context";
 




export default function Page() {
// Use the useUserAuth hook to get the user object and the login and logout functions
const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();
const [loading, setLoading] = useState(true); // Track loading state
const [error, setError] = useState(null); // Track any potential error
 
// Sign in to Firebase with GitHub authentication
const handleGitHubSignIn = async () =>{
    await gitHubSignIn();
}
// Sign out of Firebase
const handleSignOut = async () => {
    try {
      await firebaseSignOut();
    } catch (err) {
      setError(err.message);
    }
  };
 
// Display some of the user's information
 // Simulate loading state and check if user is available
//  useEffect(() => {
//     if (user) {
//       setLoading(false);
//     }
//   }, [user]); // Dependency on user state

//   if (loading) {
//     return <p>Loading...</p>; // Show a loading state while fetching user data
//   }

return (
    <main>
      <h1>Shopping List</h1>

      {/* Display an error message if there was an issue */}
      {error && <p>Error: {error}</p>}

      {/* Check if the user is authenticated */}
      {user ? (
        <>
          <p>Welcome, {user.displayName} ({user.email})</p>
          <button onClick={handleSignOut}>Sign Out</button>
        </>
      ) : (
        <button onClick={handleGitHubSignIn}>Sign In with GitHub</button>
      )}
    </main>
  );
}