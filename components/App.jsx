import "bootstrap/dist/css/bootstrap.min.css";
import React, {useEffect, useState} from "react";
import SiteHeader from "./SiteHeader.jsx";
import SignIn from "./SignIn.jsx";
import UpcomingGamesPage from "./pages/UpcomingGamesPage.jsx";
import NewsPage from "./pages/NewsPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import GameFinderPage from "./pages/GameFinderPage.jsx";
import {ToastProvider} from './toast/ToastProvider.jsx';
import ToastNotifications from "./toast/ToastNotification.jsx";
import "../src/css/index.css"
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../firebase/firebase.js";
import {getUser} from "../firebase/firestore.js";

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
            if (user) {
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
                return <UpcomingGamesPage/>
            case 2:
                return <NewsPage/>
            case 3:
                return <ProfilePage/>
            case 4:
                return <GameFinderPage/>
        }
    }

    return (
        <>
            <ToastProvider>
                <SiteHeader setLoggedIn={setLoggedIn} setPage={setPage} page={page} userDb={userDb}
                            setUserDb={setUserDb}/>
                {loggedIn ? renderPage() :
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