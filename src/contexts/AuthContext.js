//We will create a React Context in this file that will house all authentication info (currentUser, Login, Logout).
//contexts allow us to store information and transport that info to the components that use it. We could store this info
//in the App component and just pass porps to send the user information to other components but this isn't ideal for larger
//apps. Instead, we create the context and a components that will communicate this context to its children. Think of this
//much like Session storage in a .NET application.
import React, { useState, useEffect, useContext } from 'react'
import {auth} from '../base' //gives us access to the auth object which initializes authentication (who are you?)
//Below are firebase functions we need to use in our logic below (in the component portion of the code)
import { GithubAuthProvider, signInWithPopup, signOut } from 'firebase/auth' 

//Below we create a context (storage object) for all of our auth info
const AuthContext = React.createContext()

//Below we create a function that will allow us to use the context in components. We will import this function any time
//we want the currentUser, Login, or Logout functionality
export function useAuth() {
    return useContext(AuthContext)
}

//This component will provide the AuthContext info to the children components nested inside of it. See App.js where we call
//to an instance of this component and nest all other components inside of it. We renamed 'AuthContext' below to 'AuthProvider'
//to differentitate it from the context storage object above (AuthContext)
export default function AuthProvider({children}) {

    //Create hooks for currentUser and another custom hook to determine if the context has info to share with child components
    //before rendering the child components to the screen.
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true); //As this component mounts, this waits to display the child component

    //Login functionality
    //Instantiate a GitHub AuthProvider object
    const githubAuthProvider = new GithubAuthProvider()

    async function login() {
        return (signInWithPopup(auth, githubAuthProvider).then(authData => {
            console.log(authData)
            setCurrentUser(authData.user)
            //Here we could add some functionality to save the user to db or decide a default role for them
        }))
    }

    //Logout functionality 
    async function logout() {
        signOut(auth).then(setCurrentUser(null))
    }

    //Below we write an object to hold currentUser info and login/logout functions so we can use them in child components.
    //We will pass this as a prop in the return below
    const value = {currentUser, login, logout}

    useEffect(() => {
        //authChange will use firebase functionality to get user info, set the currentUser hook to the value retrieved,
        //and allow components to load in using the custom hook (loading).
        const authChange = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return authChange
    }, [])

  return (
    <AuthContext.Provider value={value}>
        {/* Below we are waiting for the AuthContext info to populate before loading the child components in the UI */}
        {!loading && children}
    </AuthContext.Provider>
  )
}
