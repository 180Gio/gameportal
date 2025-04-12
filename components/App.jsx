import "bootstrap/dist/css/bootstrap.min.css";
import React, {useEffect, useState} from "react";
import SiteHeader from "./site/SiteHeader.jsx";
import SignIn from "./site/SignIn.jsx";
import UpcomingGamesPage from "./pages/UpcomingGamesPage/UpcomingGamesPage.jsx";
import ProfilePage from "./pages/ProfilePage/ProfilePage.jsx";
import {ToastProvider} from './utilComponent/toast/ToastProvider.jsx';
import ToastNotifications from "./utilComponent/toast/ToastNotification.jsx";
import "../src/css/index.css"
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../firebase/firebase.js";
import {getUser} from "../firestore/userService.js";
import NewsPage from "./pages/NewsPage/NewsPage.jsx";

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
        onAuthStateChanged(auth, (user) => {
            if (user && user.emailVerified) {
                getUser(user.email).then(userDb => {
                    setLoggedIn(true)
                    setUserDb(userDb)
                })
            }
        })
    }, []);

    function renderPage() {
        switch (page) {
            case 1:
                return <UpcomingGamesPage userDb={userDb}/>
            case 2:
                //TODO notifiche per gioco
                return <NewsPage/>
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