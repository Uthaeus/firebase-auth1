import { useState, useEffect, createContext, useContext } from "react";
import { auth } from "../firebase";

export const AuthContext = createContext({
    
});

export function useAuth() {
    return useContext(AuthContext);
}

function AuthContextProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
        });

        return unsubscribe;
    }, []);

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password);
    }

    function signin(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }

    const value = {
        currentUser,
        signup,
        signin
    }

    return (
        <AuthContext.Provider value={value}>
            { children }
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;