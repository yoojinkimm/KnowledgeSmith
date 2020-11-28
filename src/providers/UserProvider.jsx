import React, { createContext, useEffect, useState } from "react";
import { auth } from '../firebase';

export const UserContext = createContext({ user: null });

function UserProvider ({ render }) {
    const [user, setUser] = useState(null);
    const [language, setLanguage] = useState('ko');

    useEffect(() => {
        auth.onAuthStateChanged( userAuth => {
            if (userAuth) {
                setUser(userAuth);
                localStorage.setItem('token', userAuth.getIdToken);
                localStorage.setItem('uid', userAuth.uid);
            } else {
                localStorage.setItem('token', '');
                localStorage.setItem('uid', '');
                console.log('no user')
            }
        })
    }, [])

    useEffect(() => {
        console.log('language :', language)
    }, [language])

    return(
        <UserContext.Provider value={{
            user: user,
            setUser,
            language: language,
            setLanguage
        }}>
            {render}
        </UserContext.Provider>
    )
}

export default UserProvider;