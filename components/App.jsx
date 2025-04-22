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
import GameFinderPage from "./pages/GameFinderPage/GameFinderPage.jsx";
import OfflineComponent from "./utilComponent/OfflineComponent.jsx";

export default function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [userDb, setUserDb] = useState(null);
    const [isOnline, setIsOnline] = useState(true);

    const [page, setPage] = useState(1);

    function checkIfOnline() {
        fetch('https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png', {
            mode: 'no-cors',
            cache: "no-cache"
        }).then(() => {
            setIsOnline(true)
        }).catch(() => {
            setIsOnline(false)
        });
    }

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

        checkIfOnline();
        window.addEventListener("online", () => checkIfOnline());
        window.addEventListener("offline", () => checkIfOnline());
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
                return <GameFinderPage/>
        }
    }

    return (
        <>
            <ToastProvider>
                <SiteHeader setLoggedIn={setLoggedIn} setPage={setPage} page={page} userDb={userDb}
                            setUserDb={setUserDb}/>
                {!isOnline ? <OfflineComponent/> : loggedIn ?
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