import React, { createContext, useEffect, useState } from 'react';

import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from '../firebase/firebase.config';

// main auth context create
export const AuthContext = createContext(null) 
// getAuth connect firebase
const auth = getAuth(app)

const AuthProvider = ({children}) => {
    
    const [user, setUser] = useState(null)
    // if reload website then loading is active 
    const [loading, setLoading] = useState(true)

    // register props
    const register = (email, password) =>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    // login props
    const login = (email, password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    // logout props
    const logOut = () => {
        return signOut(auth)
    }
    // contain user info when logged in
    useEffect(() =>{
        const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser);
            setLoading(false)
        })
        return () =>{
            unsubscribe()
        }
    },[])

    const authInfo = {
        user,
        register,
        login,
        loading,
        logOut
    }
    return (
        <AuthContext.Provider value = {authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;