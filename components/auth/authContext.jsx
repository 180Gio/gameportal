import {createContext, useContext, useEffect, useState} from 'react';
import {auth} from "../../firebase/firebase.js";
import {onAuthStateChanged} from "firebase/auth";

const AuthContext = createContext(null);

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, initUser);
    }, []);

    async function initUser(user){
        if(user){
            setUser({...user});
            setLoggedIn(true);
        } else {
            setUser(null);
            setLoggedIn(false);
        }
        setLoading(false);
    }

    const value = {
        user,
        loggedIn,
        loading
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}