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
import {deleteWaitingForGame, getGamesWaitingFor} from "../firestore/gamesWaitingForService.js";
import {getGamesNewsList} from "../firestore/gamesNewsService.js";
import {getSteamNews} from "../external/steamApi.js";
import {isArrayEmpty} from "../src/util.js";

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
        } else {
            checkNotifications();
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

    async function createNotification(title, body) {
        if (Notification.permission !== "granted") {
            await Notification.requestPermission();
        }
        if (Notification.permission === "granted") {
            new Notification(title, {body: body});
        }
    }

    function checkNotifications() {
        if (Notification.permission !== "denied") {
            let notificationPreferences = userDb.notificationPreferences;
            if (notificationPreferences.gameOut) {
                getGamesWaitingFor(userDb.email).then(gamesWaiting => {
                    let today = new Date();
                    let releasedLastWeek = gamesWaiting.filter(game => {
                        let splitDate = game.releaseDate.split("/");
                        let gameDate = new Date(Date.UTC(splitDate[2], splitDate[1] - 1, splitDate[0]));
                        return gameDate <= today;
                    })
                    releasedLastWeek.forEach(game => {
                        createNotification("GamePortal - Finalmente!", "Finalmente " + game.gameName + " è uscito!");
                        deleteWaitingForGame(userDb.email, game.gameName)
                    })
                })
            }
            if (notificationPreferences.news) {
                getGamesNewsList(userDb.email).then(gamesNews => {
                    let todayMillis = new Date().getTime();
                    let lastWeekMillis = todayMillis - (7 * 24 * 60 * 60 * 1000);
                    let gamesWithNews = gamesNews.filter(async game => {
                        await getSteamNews({appid: game.steamAppId}).then(steamNews => {
                            if (!isArrayEmpty(steamNews)) {
                                return steamNews[0].date * 1000 <= todayMillis && steamNews[0].date * 1000 >= lastWeekMillis;
                            }
                        })
                    })
                    gamesWithNews.forEach(game => {
                        createNotification("GamePortal - Novità in arrivo!", "Ci sono novità su " + game.gameName + ", visualizzale nel tab News!");
                    })

                })
            }
        } else {
            console.warn("Notification permission denied")
        }
    }

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