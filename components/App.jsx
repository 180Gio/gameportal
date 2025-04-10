import "bootstrap/dist/css/bootstrap.min.css";
import React, {useEffect, useState} from "react";
import SiteHeader from "./SiteHeader.jsx";
import SignIn from "./SignIn.jsx";
import UpcomingGamesPage from "./pages/UpcomingGamesPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import {ToastProvider} from './toast/ToastProvider.jsx';
import ToastNotifications from "./toast/ToastNotification.jsx";
import "../src/css/index.css"
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../firebase/firebase.js";
import {getUser} from "../firestore/userService.js";

export default function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [userDb, setUserDb] = useState(null);

    const [page, setPage] = useState(1);

    useEffect(() => {
        if (!loggedIn) {
            setUserDb(null)
        }
    }, [loggedIn])
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user && user.emailVerified) {
                getUser(user.email).then(userDb => {
                    setLoggedIn(true)
                    setUserDb(userDb)
                })
            }
        });
        return () => unsubscribe();
    }, []);

    function renderPage() {
        switch (page) {
            case 1:
                return <UpcomingGamesPage userDb={userDb}/>
            case 2:
            // return <NewsPage/>
            case 3:
                return <ProfilePage userDb={userDb}/>
            case 4:
                // return <GameFinderPage/>
                return <p>Page in construction</p>
        }
    }

    return (
        <>
            <ToastProvider>
                <SiteHeader setLoggedIn={setLoggedIn} setPage={setPage} page={page} userDb={userDb}
                            setUserDb={setUserDb}/>
                {loggedIn ?
                    <div className="g-4 px-5">
                        {renderPage()}
                    </div> :
                    <div className={"credentials-wrapper"}>
                        <SignIn setLoggedIn={setLoggedIn} setUserDb={setUserDb}/>
                    </div>
                }
                <footer>
                    <ToastNotifications/>
                </footer>
            </ToastProvider>
        </>
    )
}