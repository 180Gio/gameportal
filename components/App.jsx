import "bootstrap/dist/css/bootstrap.min.css";
import {useEffect, useState} from "react";
import SiteHeader from "./SiteHeader.jsx";
import SignIn from "./SignIn.jsx";
import UpcomingGamesPage from "./pages/UpcomingGamesPage.jsx";
import NewsPage from "./pages/NewsPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import GameFinderPage from "./pages/GameFinderPage.jsx";

export default function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [userDb, setUserDb] = useState(null);

    const [page, setPage] = useState(1);

    useEffect(() => {
        if (!loggedIn) {
            setUserDb(null)
        }
    }, [loggedIn])

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
            <SiteHeader setLoggedIn={setLoggedIn} setPage={setPage} page={page} userDb={userDb} setUserDb={setUserDb}/>
            {loggedIn ? renderPage() :
                <div className={"credentials-wrapper"}>
                    <SignIn setLoggedIn={setLoggedIn} setUserDb={setUserDb}/>
                </div>
            }
        </>
    )
}